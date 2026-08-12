export interface BrokerAttribution {
  brokerId: string;
  brokerName: string;
  brokerSlug: string;
  brokerPhone: string;
  brokerAvatar?: string;
  capturedAt: string;
  expiresAt: string; // First-Touch 30-Day Policy Window
}

export class AttributionService {
  private static STORAGE_KEY = 'terranova_broker_attribution';
  private static EXPIRY_DAYS = 30;

  /**
   * Parses URL query parameters (e.g. ?ref=corretor-joao or ?broker=123)
   * and enforces First-Touch 30-day attribution protection window.
   */
  static detectAndStoreAttribution(): BrokerAttribution | null {
    if (typeof window === 'undefined') return null;

    const existingAttribution = AttributionService.getStoredAttribution();
    const urlParams = new URLSearchParams(window.location.search);
    const refSlug = urlParams.get('ref') || urlParams.get('broker') || urlParams.get('corretor');

    // Rule 02-C: First-Touch protection within 30 days window
    if (existingAttribution && new Date(existingAttribution.expiresAt) > new Date()) {
      return existingAttribution;
    }

    if (refSlug) {
      const now = new Date();
      const expires = new Date(now.getTime() + AttributionService.EXPIRY_DAYS * 24 * 60 * 60 * 1000);

      const mockBrokerProfiles: Record<string, BrokerAttribution> = {
        'corretor-joao': {
          brokerId: 'broker-001',
          brokerName: 'João Silva (Corretor Autônomo)',
          brokerSlug: 'corretor-joao',
          brokerPhone: '5544999887766',
          capturedAt: now.toISOString(),
          expiresAt: expires.toISOString()
        },
        'corretora-maria': {
          brokerId: 'broker-002',
          brokerName: 'Maria Oliveira (Especialista Maringá)',
          brokerSlug: 'corretora-maria',
          brokerPhone: '5544988776655',
          capturedAt: now.toISOString(),
          expiresAt: expires.toISOString()
        }
      };

      const attribution = mockBrokerProfiles[refSlug.toLowerCase()] || {
        brokerId: `broker-${refSlug}`,
        brokerName: `Corretor ${refSlug.toUpperCase()}`,
        brokerSlug: refSlug.toLowerCase(),
        brokerPhone: '5544999999999',
        capturedAt: now.toISOString(),
        expiresAt: expires.toISOString()
      };

      try {
        localStorage.setItem(AttributionService.STORAGE_KEY, JSON.stringify(attribution));
      } catch (e) {
        console.error('Storage error:', e);
      }

      return attribution;
    }

    return existingAttribution;
  }

  /**
   * Retrieves currently active stored broker attribution if valid and unexpired
   */
  static getStoredAttribution(): BrokerAttribution | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(AttributionService.STORAGE_KEY);
      if (!stored) return null;

      const parsed: BrokerAttribution = JSON.parse(stored);
      if (new Date(parsed.expiresAt) <= new Date()) {
        localStorage.removeItem(AttributionService.STORAGE_KEY);
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  /**
   * Clears broker attribution
   */
  static clearAttribution(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AttributionService.STORAGE_KEY);
  }
}
