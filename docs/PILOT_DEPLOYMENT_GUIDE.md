# Guia de Deploy & Teste de Produção — Imobiliária Piloto (Terra Nova OS)

> **Manual Executivo de Lançamento em Produção**  
> **Status:** Pronto para Deploy da Imobiliária Piloto nº 1  

---

## 🚀 Checklist de Ativação do Piloto em 4 Passos

### 1. Inicialização do Servidor & Frontend
- **Endereço Local Dev:** `http://localhost:3000`
- **Comando de Build de Produção:** `npm run build` (Executado com zero erros).
- **Hospedagem Recomendada (Nuvem):** Vercel / Netlify / Cloudflare Pages.

---

### 2. Conexão do WhatsApp da Imobiliária Piloto (Onboarding de 2 Minutos)

1. Acesse o portal e clique no botão **`[ + Conectar WhatsApp ]`** no topo do painel.
2. **Para a Linha Comercial da Imobiliária (Opção 1):**
   - Escolha **Opção 1: WABA Meta Oficial (API Cloud)**.
   - Marque a caixa de confirmação de número comercial dedicado.
   - Clique em **`[ Conectar via Meta Embedded Signup ]`**.
   - Faça o login com a conta do Facebook/Meta da imobiliária e autorize o número.
   - **Resultado:** O status do sinal mudará para `🟢 GREEN (TIER_1K)` e o `waba_id` ficará gravado no Supabase.

3. **Para Corretores Autônomos com Celular Único (Opção 2):**
   - Escolha **Opção 2: Secretário Virtual IA**.
   - O sistema gera o link/QR Code de atendimento dedicado sem alterar o WhatsApp de celular do corretor.

---

### 3. Carga do Estoque de Imóveis da Imobiliária Piloto

1. Insira a carteira de imóveis da imobiliária via CSV ou pela interface do portal.
2. A Edge Function do Supabase gera automaticamente os embeddings semânticos no `pgvector` usando `text-embedding-3-small`.
3. Os dados de preço, área, CAR (para imóveis rurais) e amenidades ficam prontos para o RAG.

---

### 4. Roteiro de Teste de Validação E2E (End-to-End Test Plan)

#### Teste 1: Atendimento Imediato pelo SDR IA (< 30s)
- **Ação:** Envie uma mensagem de teste no WhatsApp da imobiliária piloto fingindo ser um lead de anúncio.
- **Resultado Esperado:** O SDR IA responde em **menos de 15 segundos**, cita os dados exatos do imóvel vetorizado no `pgvector` e oferece o agendamento da visita.

#### Teste 2: Validação da Trava de Alucinação (Guardrails)
- **Ação:** Pergunte por um detalhe que NÃO conste na ficha do imóvel (ex: *"Qual o valor do IPTU da fazenda?"*).
- **Resultado Esperado:** O SDR IA declara com precisão: *"Essa informação precisa ser confirmada com o especialista da nossa equipe. Vou registrar a pendência para te retornar."* (Zero alucinações de números).

#### Teste 3: Teste do Botão Master de Intervenção Humana
- **Ação:** No painel da Inbox do Terra Nova OS, clique no botão **`[ ⏸️ ASSUMIR CHAT / PAUSAR IA ]`** ou digite uma mensagem manual como corretor.
- **Resultado Esperado:** A IA entra em pausa de 24h na hora e o distintivo muda para `🔵 Atendimento Humano Ativo`.

---

## 📊 Painel de Monitoramento de Sucesso da Imobiliária Piloto

Durante os 14 dias do Beta Fechado, monitore diariamente no topo do painel:
- **FRT Médio (Tempo de Primeira Resposta):** Alvo &lt; 30s (Ideal de 12s a 18s).
- **Taxa de Qualificação:** % de leads que responderam sobre orçamento e urgência.
- **Visitas Agendadas:** Quantidade de agendamentos confirmados pela IA.
