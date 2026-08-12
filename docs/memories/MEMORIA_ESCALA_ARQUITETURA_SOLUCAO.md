# Memória Estratégica: Escala Técnia & Arquitetura da Solução

> **Documentação de Engenharia e Escalabilidade de Negócio**  
> **Ecossistema Imobiliário Terra Nova**  
> **Objetivo:** Definir os limites de escala, custos operacionais (Unit Economics) e garantia de resiliência do ecossistema.

---

## 1. Arquitetura Multi-Tenant & Segurança por Design

Para suportar desde 10 até 100.000+ imobiliárias simultâneas sem degradação de performance ou risco de segurança, a solução adota **Multi-tenancy Rígido por `tenant_id`**.

```sql
-- Estrutura de Conexões Meta Multi-Tenant (Segurança AES-256)
CREATE TABLE meta_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
    waba_id VARCHAR(255) NOT NULL,
    phone_number_id VARCHAR(255) NOT NULL,
    business_id VARCHAR(255) NOT NULL,
    access_token TEXT NOT NULL, -- Token de longa duração criptografado em AES-256
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    token_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Garantias de Segurança:
1. **Isolamento de Dados**: Todas as queries de busca vetorial (`pgvector`) e consultas no Supabase contêm filtro obrigatório `WHERE tenant_id = current_setting('app.current_tenant_id')`.
2. **Criptografia em Repouso**: Tokens OAuth da Meta e chaves de API são armazenados com criptografia simétrica AES-256.
3. **Isolamento de Reputação WABA**: Cada cliente roda sob sua própria WABA via Embedded Signup, eliminando qualquer risco de banimento cruzado.

---

## 2. Unit Economics & Roteamento Inteligente de IA

O custo de processamento por conversa é o fator determinante para a margem de lucro de um SaaS de IA. O Terra Nova utiliza **Roteamento Híbrido de Modelos (LLM Router)** para otimizar custo e latência.

```
                               ┌──────────────────────────┐
                               │     Mensagem de Lead     │
                               └──────────────────────────┘
                                            │
                                            ▼
                               ┌──────────────────────────┐
                               │  Classificador de Intent │
                               └──────────────────────────┘
                                      │            │
             ┌────────────────────────┘            └────────────────────────┐
             ▼                                                              ▼
 ┌──────────────────────────┐                                   ┌──────────────────────────┐
 │ Perguntas Simples / FAQ  │                                   │ Qualificação Complexa /  │
 │ (Preço, Horário, Endereço)│                                  │ Negociação / Análise Agro│
 └──────────────────────────┘                                   └──────────────────────────┘
             │                                                              │
             ▼                                                              ▼
 ┌──────────────────────────┐                                   ┌──────────────────────────┐
 │ Modelo Leve / Econômico  │                                   │ Modelo Avançado (GPT-4o) │
 │ (DeepSeek / Gemini Flash)│                                   │ / Reasoning Avançado     │
 │ Cost: ~$0.0002 / msg     │                                   │ Cost: ~$0.003 / msg      │
 └──────────────────────────┘                                   └──────────────────────────┘
```

### Matriz de Custos por Operação (Unit Costs):

| Operação | Tecnologia | Custo Médio Estimado | Impacto na Margem SaaS |
| :--- | :--- | :--- | :--- |
| **Geração de Embedding (Imóvel)** | `text-embedding-3-small` | R$ 0,0001 por imóvel | Negligenciável |
| **Atendimento de Lead Simples** | Gemini 1.5 Flash / DeepSeek | R$ 0,001 por resposta | Excelente (> 85% margem) |
| **Qualificação Estruturada (SDR Agent)** | GPT-4o | R$ 0,015 por sessão | Alta eficiência de conversão |
| **Processamento de Webhook** | Deno Edge Functions / Redis | R$ 0,00005 por evento | Negligenciável |

---

## 3. Resiliência do Event Bus & Capability Layer

Webhooks da Meta exigem tempos de resposta inferiores a 3 segundos. Chamadas diretas a LLMs ou banco de dados durante a execução do Webhook Controller geram *timeouts* e perdas de mensagens.

### Fluxo Desacoplado de Alta Performance:

```
┌──────────────┐      < 100ms      ┌──────────────┐   Push Fila   ┌──────────────┐
│ Meta Webhook │ ────────────────> │ Controller   │ ────────────> │ Redis / Bull │
└──────────────┘ HTTP 200 OK Auto   └──────────────┘               └──────────────┘
                                                                          │
                                                                          ▼
                                                                  ┌──────────────┐
                                                                  │ Worker IA &  │
                                                                  │ Event Bus    │
                                                                  └──────────────┘
```

1. **Recepção em Sub-100ms**: O controller valida a assinatura HMAC da Meta, enfileira o evento no Redis e responde HTTP 200 imediatamente.
2. **Workers Desacoplados**: Trabalhadores em segundo plano consomem a fila, invocam o SDR Agent e atualizam o estado do CRM.
3. **Gerenciamento de Janela de 24h Meta**: A *Capability Layer* checa a data da última mensagem enviada pelo lead. Se > 23h50m, o sistema chaveia automaticamente para *Message Template* aprovado pela Meta.

---

## 4. Capacidade de Carga & Plano de Expansão de Escala

```
  [ Fase 1: Atual ]      ──► 10 a 50 Tenants          (Infra Supabase Starter + Deno)
  [ Fase 2: Escala ]     ──► 50 a 2.000 Tenants       (Supabase Pro + Redis Dedicated Cluster)
  [ Fase 3: Hiperescala] ──► 2.000 a 100.000 Tenants (Kubernetes Workers + pgvector Read Replicas)
```

### Gargalos Mitigados:
- **Expiracão de Mídias Meta**: Captura e upload automático de áudios e fotos de leads para Supabase Storage / S3 antes da expiração da URL original da Meta CDN.
- **Renovação de Tokens OAuth**: Cron Job automático executado a cada 30 dias para renovar tokens de 60 dias da Meta.
