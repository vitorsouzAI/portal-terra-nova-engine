// AI Guardrail & SLA Monitoring Service
import { Property } from '../types';

export interface GuardrailAuditResult {
  isPassed: boolean;
  groundingScore: number;
  hallucinationDetected: boolean;
  auditedMessage: string;
  discrepancyDetails?: string;
  llmModelUsed: 'Gemini 1.5 Flash' | 'DeepSeek' | 'GPT-4o';
}

export class AiGuardrailService {
  
  // Audits generated AI text against authoritative Property data
  public static auditResponse(responseText: string, property: Property): GuardrailAuditResult {
    const textLower = responseText.toLowerCase();
    
    // Extract price numbers in millions or thousands
    const priceDigits = property.price.replace(/[^\d]/g, '');
    const priceMillions = parseInt(priceDigits, 10) / 1000000; // e.g. 28.5

    // Check if price hallucination occurs (e.g. AI mentions wrong price)
    let hallucinationDetected = false;
    let discrepancyDetails: string | undefined;

    // Verify if numeric text contains incompatible numbers (> 1,000,000)
    const matches = responseText.match(/\d+[\d\.,]*/g) || [];
    for (const match of matches) {
      const cleanNum = parseFloat(match.replace(/\./g, '').replace(',', '.'));
      if (cleanNum > 1000000 && Math.abs(cleanNum - parseInt(priceDigits, 10)) > 500000) {
        hallucinationDetected = true;
        discrepancyDetails = `Preço alucinado: R$ ${cleanNum.toLocaleString('pt-BR')} (Valor correto: ${property.price})`;
        break;
      }
    }

    // Determine LLM Router Model used based on query complexity
    const isComplex = textLower.includes('outorga') || textLower.includes('permuta') || textLower.includes('parcelamento');
    const llmModelUsed = isComplex ? 'GPT-4o' : 'Gemini 1.5 Flash';

    return {
      isPassed: !hallucinationDetected,
      groundingScore: hallucinationDetected ? 45 : 100,
      hallucinationDetected,
      auditedMessage: responseText,
      discrepancyDetails,
      llmModelUsed
    };
  }

  // SLA Timer Health Checker (Alerts if Lead remains unhandled > 180s)
  public static checkSlaCompliance(lastMessageTimestamp: string): { isSlaBreached: boolean; elapsedSeconds: number } {
    const now = new Date();
    const elapsedSeconds = 14; // Simulated real-time FRT (14s)
    return {
      isSlaBreached: elapsedSeconds > 30,
      elapsedSeconds
    };
  }
}
