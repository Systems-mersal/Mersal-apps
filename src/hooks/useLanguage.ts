import { useCallback } from "react";
import { DevSettings, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";

export type AppLanguage = "ar" | "en";

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = (i18n.language?.startsWith("ar") ? "ar" : "en") as AppLanguage;
  const isRTL = language === "ar";

  const setLanguage = useCallback(
    async (lang: AppLanguage) => {
      const shouldBeRTL = lang === "ar";
      await i18n.changeLanguage(lang);

      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        if (__DEV__) {
          DevSettings.reload();
        }
      }
    },
    [i18n],
  );

  const toggleLanguage = useCallback(async () => {
    await setLanguage(language === "ar" ? "en" : "ar");
  }, [language, setLanguage]);

  return { language, isRTL, setLanguage, toggleLanguage };
}
