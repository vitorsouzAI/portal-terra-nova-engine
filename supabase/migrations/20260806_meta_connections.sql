-- Migration: Multi-Tenant Meta WABA Connections Schema
-- Version: 20260806_meta_connections.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: meta_connections
CREATE TABLE IF NOT EXISTS meta_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL UNIQUE,
    waba_id VARCHAR(255) NOT NULL,
    phone_number_id VARCHAR(255) NOT NULL,
    business_id VARCHAR(255) NOT NULL,
    access_token TEXT NOT NULL, -- AES-256 encrypted OAuth token
    display_phone_number VARCHAR(50),
    verified_name VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, disconnected, rate_limited
    quality_rating VARCHAR(50) DEFAULT 'GREEN', -- GREEN, YELLOW, RED
    messaging_limit_tier VARCHAR(50) DEFAULT 'TIER_1K', -- TIER_1K, TIER_10K, TIER_100K, UNLIMITED
    token_expires_at TIMESTAMPTZ,
    last_health_check_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for instant lookup by tenant_id
CREATE INDEX IF NOT EXISTS idx_meta_connections_tenant_id ON meta_connections(tenant_id);
CREATE INDEX IF NOT EXISTS idx_meta_connections_phone_number_id ON meta_connections(phone_number_id);

-- Row Level Security (RLS) Policy
ALTER TABLE meta_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can view their own Meta connections"
    ON meta_connections
    FOR SELECT
    USING (tenant_id = auth.uid() OR current_setting('app.is_superadmin', true) = 'true');

CREATE POLICY "Tenants can insert/update their own Meta connections"
    ON meta_connections
    FOR ALL
    USING (tenant_id = auth.uid() OR current_setting('app.is_superadmin', true) = 'true');
