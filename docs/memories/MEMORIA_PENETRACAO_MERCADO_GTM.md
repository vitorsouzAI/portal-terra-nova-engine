# Memória Estratégica: Penetração Real de Mercado (GTM & Tração)

> **Documentação de Diretrizes de Go-to-Market (GTM)**  
> **Ecossistema Imobiliário Terra Nova**  
> **Objetivo:** Orientar a penetração acelerada, aquisição de clientes e domínio do mercado imobiliário.

---

## 1. Tese de Posicionamento & Proposta Única de Valor (UVP)

O Terra Nova **NÃO** deve ser vendido como "mais um CRM imobiliário" ou "um chatbot de WhatsApp". O mercado está saturado de ferramentas genéricas e receoso com custos de implementação e taxas de abandono.

### A Proposta Única de Valor (UVP):
> *"O Primeiro Cérebro de IA Imobiliário que Converte Leads em Visitas em Menos de 30 Segundos, Conectado com Zero Atrito ao Seu Próprio WhatsApp."*

### As 3 Búzias do Posicionamento:
1. **Atendimento Imediato & Humanizado (< 30s)**: Converte a "hora de ouro" do lead antes que ele chame o concorrente.
2. **Propriedade e Isolamento de Dados**: Seu WhatsApp, seus dados, sua reputação intacta.
3. **Busca Inteligente Semântica**: Compreende nuances de propriedades rurais e urbanas de alto padrão sem que o cliente dependa de filtros burros.

---

## 2. Onboarding de Zero Atrito (The 5-Minute Time-to-Value)

A principal barreira de adoção em SaaS imobiliário é a complexidade de configuração. O Terra Nova quebra essa barreira com o **Embedded Signup da Meta (Tech Provider)**.

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ 1. Cadastro Simplificado │ ──► │ 2. Popup Meta Official  │ ──► │ 3. Carga Semântica IA   │
│ (Nome + E-mail + Empresa)│     │ (Embedded Signup 2 min) │     │ (Importação de Imóveis) │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                             │
                                                                             ▼
                                                                ┌─────────────────────────┐
                                                                │ 4. SDR IA Ativo (Go-Live│
                                                                │ em Menos de 5 Minutos!) │
                                                                └─────────────────────────┘
```

- **Passo 1:** Corretor se registra no portal Terra Nova.
- **Passo 2:** Clica em "Conectar WhatsApp" -> Abre popup oficial da Meta -> Seleciona o número da empresa -> Autorização concedida automaticamente (`tenant_id` registrado no Supabase).
- **Passo 3:** O sistema importa a carteira de imóveis (via CSV ou integração CRM) e gera os embeddings automaticamente via `pgvector`.
- **Passo 4:** SDR IA pronto para operar e responder leads imediatamente.

---

## 3. Canais de Aquisição & Estratégia de Tração Inicial

### Canal 1: Venda Direta Consultiva (Outbound High-Ticket)
- **Foco:** Grandes imobiliárias rurais, loteadoras e gestores de fundos imobiliários/agronegócio.
- **Tática:** Demonstração interativa enviando um lead teste para o SDR IA do prospect ao vivo durante a reunião.
- **Métrica Alvo:** Ticket médio R$ 2.500 ~ R$ 7.500/mês por empresa.

### Canal 2: Parcerias de Distribuição (Inbound B2B)
- **Foco:** Associações de corretores (CRECI estaduais, Secovi, redes de franquias imobiliárias).
- **Tática:** Workshops e webinars educativos sobre "Como a IA está redefinindo a venda de imóveis de alto valor".
- **Oferta:** Período de avaliação com benefício exclusivo para membros associados.

### Canal 3: Tráfego Pago de Alta Intenção (Meta & Google Ads)
- **Foco:** Corretores autônomos de elite e proprietários de imobiliárias locais.
- **Criativo Chave:** Vídeo demonstrativo comparando o tempo de resposta do corretor tradicional (4 horas) vs. SDR IA Terra Nova (15 segundos).

---

## 4. Matriz de Precificação (Pricing Tiers)

```
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│     STARTER BROKER      │   │    AGENCY PRO (ICP)     │   │ ENTERPRISE / AGRO FUND  │
│    R$ 297 / mês         │   │    R$ 997 / mês         │   │   R$ 3.500+ / mês       │
├─────────────────────────┤   ├─────────────────────────┤   ├─────────────────────────┤
│ • 1 WhatsApp Conectado  │   │ • Até 5 Números WA      │   │ • WABAs Ilimitadas      │
│ • Até 500 Leads / mês   │   │ • 3.000 Leads / mês     │   │ • Volumetria Customizada│
│ • Agente SDR IA Padrão  │   │ • Agente SDR Custom     │   │ • Suporte Dedicado      │
│ • Busca Semântica Basic │   │ • Vector Search Completo│   │ • Integração ERP/CRM API│
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

---

## 5. Combate às Principais Objeções do Mercado

| Objeção Frequente | Resposta & Contra-Argumento Estruturado |
| :--- | :--- |
| **"A IA vai substituir meus corretores?"** | *"Não. O Terra Nova substitui o trabalho braçal de responder perguntas repetitivas e qualificar curiosos. Ele entrega o lead quente e agendado na mão do seu corretor."* |
| **"E se meu WhatsApp for banido?"** | *"Ao contrário de robôs piratas de disparos, usamos a Graph API Oficial da Meta com login Embedded na sua própria conta. Risco de banimento operacional por spam pirata é zero."* |
| **"Tenho muitos imóveis rurais com especificidades avançadas."** | *"Nossa busca vetorial compreende termos de agronegócio (aptidão agrícola, tipo de solo, outorga, topografia) com precisão cirúrgica."* |
| **"Minha equipe não sabe mexer em IA complexa."** | *"O corretor não precisa codificar nada. Ele continua usando o WhatsApp normalmente; a inteligência roda nos bastidores."* |

---

## 6. Framework de Retenção & Redução de Churn

- **NPS Proativo**: Monitoramento automático do tempo médio de resposta e taxa de agendamento de reuniões.
- **Relatório Semanal de ROI por E-mail/WA**: Envio automático de relatórios demonstrando quantos leads foram qualificados e quantas horas de trabalho da equipe foram economizadas.
- **Lock-in Positivo por Inteligência Persistente**: Quanto mais o sistema atende leads da imobiliária, mais refinada e valiosa fica a memória semântica da empresa no `pgvector`.
