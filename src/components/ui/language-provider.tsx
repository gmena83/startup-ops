"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Locale = "en" | "es";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Locale, Record<string, string>> = {
    en: {
        "nav.features": "Features",
        "nav.howItWorks": "How It Works",
        "nav.pricing": "Pricing",
        "nav.login": "Log In",
        "nav.getStarted": "Get Started",
        "dashboard.overview": "Overview",
        "dashboard.automations": "Automations",
        "dashboard.settings": "Settings",
        "dashboard.logout": "Log Out",
        "auth.signInParams": "Sign in to your account",
        "auth.google": "Sign in with Google",
        "auth.email": "Sign in with Email",
        "auth.emailPlaceholder": "name@example.com",
        "auth.sendMagicLink": "Send Magic Link",
        "auth.linkedin": "Sign in with LinkedIn",
        "blogger.title": "Deep Research Blog Writer",
        "blogger.description": "Autonomous agent that research, synthesizes, and writes full articles.",
        "blogger.topicLabel": "Topic or Brief",
        "blogger.topicPlaceholder": "e.g., The future of AI in legal tech...",
        "blogger.submit": "Start Research & Write",
    },
    es: {
        "nav.features": "Características",
        "nav.howItWorks": "Cómo Funciona",
        "nav.pricing": "Precios",
        "nav.login": "Iniciar Sesión",
        "nav.getStarted": "Comenzar",
        "dashboard.overview": "Resumen",
        "dashboard.automations": "Automatizaciones",
        "dashboard.settings": "Configuración",
        "dashboard.logout": "Cerrar Sesión",
        "auth.signInParams": "Inicia sesión en tu cuenta",
        "auth.google": "Entrar con Google",
        "auth.email": "Entrar con Email",
        "auth.emailPlaceholder": "nombre@ejemplo.com",
        "auth.sendMagicLink": "Enviar Enlace Mágico",
    },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("en");

    useEffect(() => {
        const storedLocale = localStorage.getItem("locale") as Locale;
        if (storedLocale && (storedLocale === "en" || storedLocale === "es")) {
            setLocaleState(storedLocale);
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);
    }, []);

    const t = useCallback((key: string) => {
        return translations[locale][key] || key;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
