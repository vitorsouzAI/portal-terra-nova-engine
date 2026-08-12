# Portal Terra Nova - Engine V1.0

Infrastrutura de confiança e inteligência para ativos reais rurais.

## Tecnologias

- **Front:** Lovable (React/Next.js)
- **Back:** Supabase (PostgreSQL + pgvector)
- **IA:** GPT-4o / DeepSeek (SDR & Search)

## Estrutura do Projeto

```
portal-terra-nova-engine/
├── docs/
│   └── ARCHITECTURE.md          # Documentação do Protocolo Canônico
├── supabase/
│   ├── migrations/
│   │   └── 20260207_init_schema.sql  # Schema inicial com pgvector
│   └── functions/
│       ├── sdr-agent/               # Agent IA para outbound
│       │   └── index.ts
│       └── stripe-webhook/          # Webhook de pagamentos
│           └── index.ts
├── .env.example                 # Variáveis de ambiente
├── README.md                    # Este arquivo
└── .gitignore                   # Git ignore
```

## Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/vitorsouzAI/portal-terra-nova-engine.git
cd portal-terra-nova-engine
```

2. **Configure variáveis de ambiente:**

```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

3. **Deploy no Supabase:**

```bash
npm install supabase
supabase link --project-ref your-project-id
supabase push
```

## Edge Functions

### SDR Agent (`/supabase/functions/sdr-agent`)

Ia que gera mensagens personalizadas de vendas para propriedades rurais.

**Entrada:**
```json
{
  "propertyId": "uuid",
  "strategy": "consultative",
  "prompt": "Analise esta propriedade..."
}
```

**Saída:**
```json
{
  "success": true,
  "response": "Mensagem de vendas gerada..."
}
```

### Stripe Webhook (`/supabase/functions/stripe-webhook`)

Processa eventos de pagamento do Stripe.

**Eventos suportados:**
- `payment_intent.succeeded` - Pagamento aprovado
- `payment_intent.payment_failed` - Pagamento rejeitado
- `charge.refunded` - Reembolso processado

## Development

```bash
# Iniciar servidor local
npm run dev

# Testes
npm run test

# Build
npm run build
```

## Contribuições

Contribuições são bem-vindas! Por favor abra uma issue ou pull request.

## License

MIT - Ver LICENSE para detalhes

## Contato

- **Email:** dev@terranova.com
- **Discord:** [Comunidade Terra Nova](https://discord.gg/terranova)
