'use client';

import { useState, useEffect } from 'react';
import { translationService, TranslatableContent } from '@/services/translationService';
import { useLanguage } from '@/contexts/LanguageContext';

interface DynamicContentManagerProps {
  contentType: TranslatableContent['contentType'];
  onContentUpdate?: (content: TranslatableContent) => void;
  initialContent?: string;
}

export default function DynamicContentManager({ 
  contentType, 
  onContentUpdate, 
  initialContent = '' 
}: DynamicContentManagerProps) {
  const [inputText, setInputText] = useState(initialContent);
  const [translatedContent, setTranslatedContent] = useState<TranslatableContent | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const { currentLanguage } = useLanguage();

  // Auto-translate when text changes
  useEffect(() => {
    if (inputText.trim().length > 3) {
      handleTranslate();
    }
  }, [inputText]);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      const detected = translationService.detectLanguage(inputText);
      setDetectedLanguage(detected);
      
      const result = await translationService.translateContent(inputText, contentType);
      setTranslatedContent(result);
      
      if (onContentUpdate) {
        onContentUpdate(result);
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const getCurrentTranslation = (): string => {
    if (!translatedContent) return inputText;
    return translationService.getTranslation(translatedContent, currentLanguage);
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          ✍️ Add Content in Any Language
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content ({contentType})
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your content in any language... (English, Russian, Korean, etc.)"
              className="w-full h-32 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {detectedLanguage && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Detected language:</span>
              <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded">
                {detectedLanguage.toUpperCase()}
              </span>
            </div>
          )}

          {isTranslating && (
            <div className="flex items-center space-x-2 text-sm text-yellow-400">
              <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
              <span>Translating to all languages...</span>
            </div>
          )}
        </div>
      </div>

      {/* Translation Preview */}
      {translatedContent && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            🌍 Live Translation Preview
          </h3>
          
          <div className="space-y-4">
            {/* Current Language Display */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Current Language ({currentLanguage.toUpperCase()})
                </span>
                <span className="text-xs text-gray-500">
                  Auto-translated
                </span>
              </div>
              <p className="text-white leading-relaxed">
                {getCurrentTranslation()}
              </p>
            </div>

            {/* All Translations */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">All Translations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(translatedContent.translations).map(([lang, text]) => (
                  <div 
                    key={lang}
                    className={`p-3 rounded-lg border ${
                      lang === currentLanguage 
                        ? 'bg-blue-600/20 border-blue-500/50' 
                        : 'bg-gray-700/30 border-gray-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-400 uppercase">
                        {lang}
                      </span>
                      {lang === translatedContent.originalLanguage && (
                        <span className="text-xs text-green-400">Original</span>
                      )}
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          {isTranslating ? 'Translating...' : '🔄 Refresh Translations'}
        </button>
        
        <button
          onClick={() => {
            setInputText('');
            setTranslatedContent(null);
            setDetectedLanguage('');
          }}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}
