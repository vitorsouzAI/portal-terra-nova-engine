import { MaringaDevelopment } from '../types';
import { mockMaringaDevelopments } from '../data/mockMaringaDevelopments';

export class DWVService {
  /**
   * Fetches developments from DWV API (or fallback to hydrated mock data)
   */
  static async fetchMaringaDevelopments(developerFilter?: string): Promise<MaringaDevelopment[]> {
    // In production, this calls DWV Open Integration API v2 endpoint:
    // const response = await fetch('https://api.dwv.com.br/v2/developments?city=Maringa', { headers: { Authorization: `Bearer ${DWV_KEY}` } });
    
    // Simulate async API response
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    if (developerFilter && developerFilter !== 'all') {
      return mockMaringaDevelopments.filter((dev) =>
        dev.developerName.toLowerCase().includes(developerFilter.toLowerCase())
      );
    }
    
    return mockMaringaDevelopments;
  }

  /**
   * Returns list of unique builders in Maringá
   */
  static getMaringaDevelopersList(): string[] {
    const developers = mockMaringaDevelopments.map((d) => d.developerName);
    return Array.from(new Set(developers));
  }
}
