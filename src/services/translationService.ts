// Google Translate API Service
// Uses Google Translate API (Free Tier: 500k characters/month)

interface TranslationRequest {
  text: string;
  targetLanguage: string;
}

interface TranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
}

class GoogleTranslateService {
  private apiKey: string;
  private baseUrl: string = 'https://translation.googleapis.com/language/translate/v2';
  private cache = new Map<string, string>(); // Cache for translated texts

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Google Translate API key not configured - translations will be skipped');
    }
  }

  // Get cache key
  private getCacheKey(text: string, targetLanguage: string): string {
    return `${text.toLowerCase().trim()}-${targetLanguage}`;
  }

  // Translate text using Google Translate API
  async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    const { text, targetLanguage } = request;

    // If target is English, return original text
    if (targetLanguage === 'en') {
      return {
        translatedText: text,
        success: true
      };
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, targetLanguage);
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      return {
        translatedText: cached,
        success: true
      };
    }

    // Check if API key is configured
    if (!this.apiKey) {
      console.warn('Google Translate API key not configured');
      return {
        translatedText: text,
        success: false,
        error: 'Google Translate API key not configured'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: 'en',
          format: 'text'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Google Translate API request failed: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const translatedText = data.data?.translations?.[0]?.translatedText || text;

      // Cache the result
      this.cache.set(cacheKey, translatedText);

      return {
        translatedText,
        success: true
      };
    } catch (error) {
      console.error('Google Translate failed:', error);
      return {
        translatedText: text,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const translationService = new GoogleTranslateService();