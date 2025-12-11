'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  isTranslating: boolean;
  setIsTranslating: (translating: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Always start with 'en' on server
  const [isTranslating, setIsTranslating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load saved language preference after hydration
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language preference
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', currentLanguage);
    }
  }, [currentLanguage, isClient]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setCurrentLanguage, 
      isTranslating, 
      setIsTranslating 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
