// src/services/translationService.ts
// Google Translate API Service
// Uses Google Translate API (Free Tier: 500k characters/month)

export type TranslatableContent = {
  contentType: string; // e.g., 'text' | 'guide' | 'hero' etc.
  originalLanguage: string;
  translations: Record<string, string>; // { en: 'Hello', es: 'Hola', etc. }
};

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
  private baseUrl = 'https://translation.googleapis.com/language/translate/v2';
  private cache = new Map<string, string>(); // Cache for translated texts

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '';
    if (!this.apiKey) {
      console.warn(
        '⚠️ Google Translate API key not configured – translations will be skipped'
      );
    }
  }

  // Get cache key
  private getCacheKey(text: string, targetLanguage: string): string {
    return `${text.toLowerCase().trim()}-${targetLanguage}`;
  }

  // ✅ Detect language using simple heuristics
  detectLanguage(text: string): string {
    const cyrillic = /[а-яА-Я]/;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const arabic = /[\u0600-\u06FF]/;
    const hebrew = /[\u0590-\u05FF]/;
    const spanish = /[ñáéíóúü]/i;

    if (cyrillic.test(text)) return 'ru';
    if (korean.test(text)) return 'ko';
    if (arabic.test(text)) return 'ar';
    if (hebrew.test(text)) return 'he';
    if (spanish.test(text)) return 'es';
    return 'en';
  }

  // ✅ Translate text using Google Translate API
  async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    const { text, targetLanguage } = request;

    // If target is English, just return original
    if (targetLanguage === 'en') {
      return { translatedText: text, success: true };
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, targetLanguage);
    if (this.cache.has(cacheKey)) {
      return { translatedText: this.cache.get(cacheKey)!, success: true };
    }

    // Skip translation if no API key
    if (!this.apiKey) {
      return {
        translatedText: text,
        success: false,
        error: 'Google Translate API key not configured',
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          format: 'text',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Google Translate API request failed: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const translatedText =
        data.data?.translations?.[0]?.translatedText || text;

      // Cache it
      this.cache.set(cacheKey, translatedText);

      return { translatedText, success: true };
    } catch (error) {
      console.error('Google Translate failed:', error);
      return {
        translatedText: text,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

    // ✅ Wrapper to translate to all supported languages
  async translateContent(
    text: string,
    contentType: string
  ): Promise<TranslatableContent> {
    const originalLanguage = this.detectLanguage(text);

    // Define target languages you want
    const targetLanguages = ['en', 'es', 'fr', 'de', 'he', 'ru', 'ko', 'ar'];

    const translations: Record<string, string> = {
      [originalLanguage]: text,
    };

    for (const lang of targetLanguages) {
      if (lang === originalLanguage) continue;

      const result = await this.translateText({ text, targetLanguage: lang });
      translations[lang] = result.translatedText;
    }

    return {
      contentType,
      originalLanguage,
      translations,
    };
  }

  // ✅ Helper to get translation from stored TranslatableContent
  getTranslation(content: TranslatableContent, lang: string): string {
    return (
      content.translations[lang] ||
      content.translations[content.originalLanguage] ||
      ''
    );
  }

  // ✅ Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// ✅ Export singleton instance
export const translationService = new GoogleTranslateService();
