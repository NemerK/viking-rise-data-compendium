'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useAITranslation(text: string) {
  const { currentLanguage, detectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = useCallback(async (textToTranslate: string, targetLang: string) => {
    if (!textToTranslate || textToTranslate.trim() === '') return textToTranslate;
    if (targetLang === 'en' || targetLang === 'auto') return textToTranslate;

    setIsTranslating(true);
    
    try {
      // Simulate AI translation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      
      // Mock translation - in real implementation, this would call an AI service
      const mockTranslations: { [key: string]: { [key: string]: string } } = {
        'ru': {
          'Heroes': 'Герои',
          'Skills': 'Навыки',
          'Team Builder': 'Конструктор команд',
          'Guides': 'Руководства',
          'Events': 'События',
          'KVK': 'КВК',
          'Back to Home': 'Назад на главную',
          'Back to Heroes': 'Назад к героям',
          'Back to Skills': 'Назад к навыкам',
          'Back to Guides': 'Назад к руководствам',
          'Viking Rise Compendium': 'Справочник Viking Rise',
          'Your complete guide to Viking Rise heroes, skills, and strategies': 'Ваш полный гид по героям, навыкам и стратегиям Viking Rise',
          'Bjorn': 'Бьорн',
          'Lagertha': 'Лагерта',
          'Harald': 'Харальд',
          'Olena': 'Олена',
          'Artur': 'Артур',
          'Verdandi': 'Верданди',
          'Gregory': 'Григорий',
          'Yvette': 'Иветта',
          'Margit': 'Маргит',
          'Leif': 'Лейф',
          'Freydis': 'Фрейдис',
          'Heahmund': 'Хеахмунд',
          'Rollo': 'Ролло',
          'Athelstan': 'Ательстан',
          'Infantry': 'Пехота',
          'Pikeman': 'Копейщик',
          'Archer': 'Лучник',
          'Porter': 'Носильщик',
          'Polymath': 'Универсал',
          'Base Game': 'Базовая игра',
          'Season 1': 'Сезон 1',
          'Season 2': 'Сезон 2',
          'Season 3': 'Сезон 3',
          'Valhalla Collaboration': 'Коллаборация Вальхалла',
          'First Strike': 'Первый удар',
          'Enrage': 'Ярость',
          'Divine Blessing': 'Божественное благословение',
          'Counter Strike': 'Контрудар',
          'Shield Wall': 'Стена щитов',
          'Search heroes...': 'Поиск героев...',
          'Search skills...': 'Поиск навыков...',
          'View All Heroes': 'Все герои',
          'View All Skills': 'Все навыки',
          'Guide': 'Руководство',
          'F2P Road': 'Путь F2P',
          'Kingdom vs Kingdom': 'Королевство против Королевства',
          'Current Events': 'Текущие события',
          'Upcoming Events': 'Предстоящие события',
          'Hero Training Event': 'Событие тренировки героев',
          'Resource Gathering': 'Сбор ресурсов',
          'Alliance War': 'Война альянсов',
          'Active': 'Активно',
          'Upcoming': 'Предстоящее',
          'Ongoing': 'Идет',
          'Double XP for hero training': 'Двойной опыт за тренировку героев',
          'Increased resource collection': 'Увеличенный сбор ресурсов',
          'Weekly alliance battles': 'Еженедельные битвы альянсов',
          'Battle Phase starts in 3 days': 'Боевая фаза начнется через 3 дня',
          'View KVK Details': 'Подробности КВК',
          '12 Kingdoms': '12 Королевств'
        },
        'ko': {
          'Heroes': '영웅',
          'Skills': '스킬',
          'Team Builder': '팀 빌더',
          'Guides': '가이드',
          'Events': '이벤트',
          'KVK': 'KVK',
          'Back to Home': '홈으로',
          'Back to Heroes': '영웅으로',
          'Back to Skills': '스킬로',
          'Back to Guides': '가이드로',
          'Viking Rise Compendium': '바이킹 라이즈 컴펜디엄',
          'Bjorn': '비욘',
          'Lagertha': '라게르타',
          'Harald': '하랄드',
          'Olena': '올레나',
          'Artur': '아르투르',
          'Verdandi': '베르단디',
          'Gregory': '그레고리',
          'Yvette': '이베트',
          'Infantry': '보병',
          'Pikeman': '창병',
          'Archer': '궁수',
          'Porter': '운반자',
          'Polymath': '다재다능',
          'Base Game': '기본 게임',
          'Season 1': '시즌 1',
          'Season 2': '시즌 2',
          'Season 3': '시즌 3',
          'Valhalla Collaboration': '발할라 콜라보',
          'First Strike': '선제공격',
          'Enrage': '분노',
          'Divine Blessing': '신성한 축복',
          'Counter Strike': '반격',
          'Shield Wall': '방패벽'
        },
        'ja': {
          'Heroes': 'ヒーロー',
          'Skills': 'スキル',
          'Team Builder': 'チームビルダー',
          'Guides': 'ガイド',
          'Events': 'イベント',
          'KVK': 'KVK',
          'Back to Home': 'ホームに戻る',
          'Back to Heroes': 'ヒーローに戻る',
          'Back to Skills': 'スキルに戻る',
          'Back to Guides': 'ガイドに戻る',
          'Viking Rise Compendium': 'バイキングライズコンペンディウム',
          'Bjorn': 'ビョルン',
          'Lagertha': 'ラゲルタ',
          'Harald': 'ハラルド',
          'Olena': 'オレナ',
          'Artur': 'アルトゥル',
          'Verdandi': 'ヴェルダンディ',
          'Gregory': 'グレゴリー',
          'Yvette': 'イベット',
          'Infantry': '歩兵',
          'Pikeman': '槍兵',
          'Archer': '弓兵',
          'Porter': '運搬者',
          'Polymath': '万能',
          'Base Game': 'ベースゲーム',
          'Season 1': 'シーズン1',
          'Season 2': 'シーズン2',
          'Season 3': 'シーズン3',
          'Valhalla Collaboration': 'ヴァルハラコラボ',
          'First Strike': '先制攻撃',
          'Enrage': '怒り',
          'Divine Blessing': '神聖な祝福',
          'Counter Strike': 'カウンター',
          'Shield Wall': 'シールドウォール'
        }
      };

      const translation = mockTranslations[targetLang]?.[textToTranslate];
      return translation || textToTranslate;
    } catch (error) {
      console.error('Translation error:', error);
      return textToTranslate;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  useEffect(() => {
    const targetLang = currentLanguage === 'auto' ? detectedLanguage : currentLanguage;
    
    if (targetLang === 'en' || targetLang === 'auto') {
      setTranslatedText(text);
      return;
    }

    translateText(text, targetLang).then(setTranslatedText);
  }, [text, currentLanguage, detectedLanguage, translateText]);

  return {
    translatedText,
    isTranslating
  };
}
