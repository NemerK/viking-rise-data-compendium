'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translationService } from '@/services/translationService';

export function UniversalTranslator({ children }: { children: React.ReactNode }) {
  const { currentLanguage, isTranslating, setIsTranslating } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [originalTexts, setOriginalTexts] = useState<Map<Text, string>>(new Map());
  const [translatedTexts, setTranslatedTexts] = useState<Map<string, string>>(new Map());
  const [translationProgress, setTranslationProgress] = useState(0);
  const [lastLanguage, setLastLanguage] = useState<string>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Use a ref to track the current language to avoid dependency issues
  const currentLanguageRef = useRef(currentLanguage);
  currentLanguageRef.current = currentLanguage;

  // Debounce function to prevent excessive calls
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const translateAllText = useCallback(async () => {
    if (!wrapperRef.current) return;
    
    const currentLang = currentLanguageRef.current;
    
    // If English is selected, restore original texts
    if (currentLang === 'en') {
      originalTexts.forEach((originalText, textNode) => {
        if (textNode.textContent !== originalText) {
          textNode.textContent = originalText;
        }
      });
      setIsTranslating(false);
      setTranslationProgress(0);
      setLastLanguage('en');
      return;
    }

    // If same language as last time and already initialized, skip translation
    if (currentLang === lastLanguage && isInitialized) {
      return;
    }

    // Skip translation if API key is not configured
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      console.log('Skipping translation - Google Translate API key not configured');
      setIsTranslating(false);
      setTranslationProgress(0);
      return;
    }

    setIsTranslating(true);
    setTranslationProgress(0);

    // Find all text nodes
    const walker = document.createTreeWalker(
      wrapperRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const text = node.textContent?.trim();
          if (!text || text.length === 0) return NodeFilter.FILTER_REJECT;
          if (text.match(/^[\d\s\-_.,!?()]+$/)) return NodeFilter.FILTER_REJECT;
          if (text.length < 2) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    // Update originalTexts with any new nodes found
    setOriginalTexts(prev => {
      const newMap = new Map(prev);
      textNodes.forEach(textNode => {
        if (!newMap.has(textNode)) {
          newMap.set(textNode, textNode.textContent || '');
        }
      });
      return newMap;
    });

    // Translate each text node
    let completed = 0;
    const total = textNodes.length;

    for (const textNode of textNodes) {
      const originalText = textNode.textContent?.trim();
      if (!originalText) {
        completed++;
        setTranslationProgress((completed / total) * 100);
        continue;
      }

      // Check if we already have this translation cached
      const cacheKey = `${originalText}-${currentLang}`;
      if (translatedTexts.has(cacheKey)) {
        const cachedTranslation = translatedTexts.get(cacheKey)!;
        textNode.textContent = cachedTranslation;
        completed++;
        setTranslationProgress((completed / total) * 100);
        continue;
      }

      // Check if this text node is already translated to the current language
      const currentText = textNode.textContent;
      if (currentText !== originalText && currentText.length > 0) {
        // This text is already translated, skip it
        completed++;
        setTranslationProgress((completed / total) * 100);
        continue;
      }

      try {
        const result = await translationService.translateText({
          text: originalText,
          targetLanguage: currentLang
        });

        if (result.success && result.translatedText && result.translatedText !== originalText) {
          textNode.textContent = result.translatedText;
          // Cache the translation
          setTranslatedTexts(prev => new Map(prev).set(cacheKey, result.translatedText!));
        } else if (!result.success) {
          console.warn(`Translation failed for "${originalText}":`, result.error);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }

      completed++;
      setTranslationProgress((completed / total) * 100);
      
      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setIsTranslating(false);
    setTranslationProgress(100);
    setLastLanguage(currentLang);
    setIsInitialized(true);
  }, [originalTexts, setIsTranslating, lastLanguage, translatedTexts, isInitialized]);

  // Debounced version of translateAllText
  const debouncedTranslateAllText = useMemo(
    () => debounce(translateAllText, 300),
    [translateAllText, debounce]
  );

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(translateAllText, 100);
    return () => clearTimeout(timeoutId);
  }, [translateAllText, currentLanguage]);

  // Watch for DOM changes and retranslate when content changes
  useEffect(() => {
    if (!wrapperRef.current || currentLanguage === 'en') return;

    const observer = new MutationObserver((mutations) => {
      let shouldRetranslate = false;
      
      mutations.forEach((mutation) => {
        // Check if new text nodes were added
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent?.trim();
              if (text && text.length > 2 && !text.match(/^[\d\s\-_.,!?()]+$/)) {
                shouldRetranslate = true;
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added element contains text nodes
              const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: (textNode) => {
                    const text = textNode.textContent?.trim();
                    if (text && text.length > 2 && !text.match(/^[\d\s\-_.,!?()]+$/)) {
                      return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                  }
                }
              );
              
              if (walker.nextNode()) {
                shouldRetranslate = true;
              }
            }
          });
        }
      });

      if (shouldRetranslate) {
        // Use debounced version to prevent excessive calls
        debouncedTranslateAllText();
      }
    });

    observer.observe(wrapperRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [debouncedTranslateAllText, currentLanguage]);

  return (
    <div ref={wrapperRef} className="relative">
      {children}
      
      {/* Translation Progress Indicator */}
      {isTranslating && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800/90 backdrop-blur-md border border-gray-600 rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-white">Translating...</span>
              <span className="text-xs text-gray-400">{Math.round(translationProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
