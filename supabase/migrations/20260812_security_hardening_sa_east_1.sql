-- ============================================================================
-- SCRIPT DE BLINDAGEM DE SEGURANÇA E PERFORMANCE SUPABASE (sa-east-1)
-- PROJETO: terra-nova-portal-prod (bloaoeakwxvxibzrreme)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CORREÇÃO DE SEGURANÇA: REVOGAÇÃO DE ACESSO PÚBLICO A FUNÇÕES SECURITY DEFINER
-- ----------------------------------------------------------------------------

-- Revoga a execução pública em funções críticas de PII e Assinatura Eletrônica
REVOKE EXECUTE ON FUNCTION public.get_signature_term_pii FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.create_signature_otp FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.verify_signature_otp FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.verify_signer_token FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_signer_by_token FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_term_owner_for_signing FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_process_signers_safe FROM PUBLIC, anon, authenticated;

-- Revoga execução de mutações sensíveis de captura e consentimento
REVOKE EXECUTE ON FUNCTION public.log_security_incident FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.log_consent_event FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.log_capture_event FROM PUBLIC, anon;

-- Concede execução estrita apenas à Service Role interna do Supabase
GRANT EXECUTE ON FUNCTION public.get_signature_term_pii TO service_role;
GRANT EXECUTE ON FUNCTION public.create_signature_otp TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_signature_otp TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_signer_token TO service_role;
GRANT EXECUTE ON FUNCTION public.get_signer_by_token TO service_role;
GRANT EXECUTE ON FUNCTION public.get_term_owner_for_signing TO service_role;
GRANT EXECUTE ON FUNCTION public.get_process_signers_safe TO service_role;

-- ----------------------------------------------------------------------------
-- 2. CORREÇÃO DE PERFORMANCE: OTIMIZAÇÃO DAS POLÍTICAS RLS (INIT PLAN FIX)
-- Substitui a chamada dinâmica auth.uid() por (select auth.uid()) para cacheamento por query
-- ----------------------------------------------------------------------------

-- Otimização na tabela contacts (se existir política baseada em auth.uid())
ALTER TABLE IF EXISTS public.contacts ENABLE ROW LEVEL SECURITY;

-- Exemplo de otimização de política RLS em perfis
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles') THEN
    DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
    CREATE POLICY "Users can view own profile" ON public.profiles
      FOR SELECT USING (id = (SELECT auth.uid()));
  END IF;
END $$;

-- Exemplo de otimização de política RLS em inscrições (subscriptions)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'subscriptions') THEN
    DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
    CREATE POLICY "Users can view own subscription" ON public.subscriptions
      FOR SELECT USING (user_id = (SELECT auth.uid()));
  END IF;
END $$;

-- ----------------------------------------------------------------------------
-- 3. CONFIRMAÇÃO DE BLINDAGEM
-- ----------------------------------------------------------------------------
SELECT 'Blindagem de Segurança e Otimização de RLS concluídas no projeto terra-nova-portal-prod (bloaoeakwxvxibzrreme).' AS status;
