// Meta Embedded Signup v2 Service & API Connector

export interface MetaConnectionData {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
  displayPhoneNumber: string;
  verifiedName: string;
  accessToken: string;
  status: 'active' | 'disconnected' | 'rate_limited';
  qualityRating: 'GREEN' | 'YELLOW' | 'RED';
  messagingLimitTier: string;
}

// Facebook SDK Global Type Declaration
declare global {
  interface Window {
    FB?: {
      init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
      login: (
        callback: (response: { authResponse?: { code?: string; accessToken?: string } }) => void,
        options: { config_id?: string; response_type?: string; override_default_response_type?: boolean }
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

export class MetaService {
  private static appId = '109283749102938'; // Replace with Production Meta App ID
  private static configId = '901283749102'; // Replace with Meta Embedded Signup Configuration ID

  // Initialize Facebook SDK asynchronously
  public static initSdk(): Promise<void> {
    return new Promise((resolve) => {
      if (window.FB) {
        resolve();
        return;
      }

      window.fbAsyncInit = () => {
        window.FB?.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        resolve();
      };

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/pt_BR/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  }

  // Trigger Facebook Embedded Signup Popup
  public static launchEmbeddedSignup(): Promise<MetaConnectionData> {
    return new Promise((resolve, reject) => {
      // If window.FB is available, launch login popup
      if (window.FB) {
        window.FB.login(
          (response) => {
            if (response.authResponse?.code || response.authResponse?.accessToken) {
              console.log('[Meta Embedded Signup] Autorização concedida!', response.authResponse);

              // Mock Production Return Data for Seamless Demo Execution
              const connectionData: MetaConnectionData = {
                wabaId: 'waba_991823749102938',
                phoneNumberId: 'phone_5511999998888',
                businessId: 'biz_881923849102',
                displayPhoneNumber: '+55 (11) 99999-8888',
                verifiedName: 'Fazendas & Alto Padrão Brasil',
                accessToken: 'EAAG91823749102938_SECURE_TOKEN_AES256',
                status: 'active',
                qualityRating: 'GREEN',
                messagingLimitTier: 'TIER_1K'
              };

              resolve(connectionData);
            } else {
              reject(new Error('Autorização do WhatsApp via Meta foi cancelada pelo usuário.'));
            }
          },
          {
            config_id: this.configId,
            response_type: 'code',
            override_default_response_type: true
          }
        );
      } else {
        // Fallback for instant development simulation
        setTimeout(() => {
          resolve({
            wabaId: 'waba_991823749102938',
            phoneNumberId: 'phone_5511999998888',
            businessId: 'biz_881923849102',
            displayPhoneNumber: '+55 (11) 99999-8888',
            verifiedName: 'Fazendas & Alto Padrão Brasil',
            accessToken: 'EAAG91823749102938_SECURE_TOKEN_AES256',
            status: 'active',
            qualityRating: 'GREEN',
            messagingLimitTier: 'TIER_1K'
          });
        }, 1200);
      }
    });
  }
}
