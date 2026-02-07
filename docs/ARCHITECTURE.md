# Protocolo Canônico - Portal Terra Nova

## Visão Geral
Documentação da arquitetura e protocolo de integração para o Portal Terra Nova Engine V1.0.

## Stack Tecnológico

### Frontend
- **Framework:** Lovable (React/Next.js)
- **Deployment:** Vercel / Netlify
- **Estado:** Context API + Zustand

### Backend
- **Database:** PostgreSQL (Supabase)
- **Vector Storage:** pgvector (Embeddings)
- **ORM:** Supabase Client / PostgREST
- **Edge Functions:** Deno/TypeScript

### IA & Inteligência
- **LLM Principal:** GPT-4o (OpenAI)
- **LLM Alternativo:** DeepSeek
- **Embeddings:** text-embedding-3-small
- **Agentes:** SDR Agent (Supabase Functions)

### Pagamentos
- **Gateway:** Stripe
- **Webhook:** Edge Functions
- **Status:** Production Ready

## Estrutura de Dados

### Tabelas Core
- `users` - Usuários e autenticação
- `properties` - Propriedades rurais
- `properties_embeddings` - Vetores para busca semântica
- `transactions` - Transações e pagamentos
- `ai_agents` - Configuração de agentes IA

## Fluxos Principais

1. **Autenticação:** Supabase Auth
2. **Busca:** Vector Search com pgvector
3. **Pagamento:** Stripe Webhook Integration
4. **IA:** OpenAI API + Custom Agents
