import { getLocales } from "expo-localization";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { I18nManager } from "react-native";

import arBooking from "./ar/booking.json";
import arBookings from "./ar/bookings.json";
import arCommon from "./ar/common.json";
import arCompany from "./ar/company.json";
import arConfirmation from "./ar/confirmation.json";
import arDetails from "./ar/details.json";
import arFavorites from "./ar/favorites.json";
import arHome from "./ar/home.json";
import arListing from "./ar/listing.json";
import arLogin from "./ar/login.json";
import arNotifications from "./ar/notifications.json";
import arOtp from "./ar/otp.json";
import arProfile from "./ar/profile.json";
import arSearch from "./ar/search.json";
import enBooking from "./en/booking.json";
import enBookings from "./en/bookings.json";
import enCommon from "./en/common.json";
import enCompany from "./en/company.json";
import enConfirmation from "./en/confirmation.json";
import enDetails from "./en/details.json";
import enFavorites from "./en/favorites.json";
import enHome from "./en/home.json";
import enListing from "./en/listing.json";
import enLogin from "./en/login.json";
import enNotifications from "./en/notifications.json";
import enOtp from "./en/otp.json";
import enProfile from "./en/profile.json";
import enSearch from "./en/search.json";

export type Locale = "ar" | "en";
type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];

const dictionaries = {
  en: {
    common: enCommon,
    login: enLogin,
    otp: enOtp,
    home: enHome,
    bookings: enBookings,
    notifications: enNotifications,
    profile: enProfile,
    listing: enListing,
    search: enSearch,
    details: enDetails,
    booking: enBooking,
    confirmation: enConfirmation,
    favorites: enFavorites,
    company: enCompany,
  },
  ar: {
    common: arCommon,
    login: arLogin,
    otp: arOtp,
    home: arHome,
    bookings: arBookings,
    notifications: arNotifications,
    profile: arProfile,
    listing: arListing,
    search: arSearch,
    details: arDetails,
    booking: arBooking,
    confirmation: arConfirmation,
    favorites: arFavorites,
    company: arCompany,
  },
} as const;

type Dictionary = typeof dictionaries.en;
export type TranslationKey = NestedKeyOf<Dictionary>;

type LocaleContextValue = {
  locale: Locale;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolveKey(dictionary: Dictionary, key: string): string {
  const [namespace, ...parts] = key.split(".");
  const section = dictionary[namespace as keyof Dictionary] as
    | Record<string, string>
    | undefined;
  if (!section) return key;
  const value = parts.reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as object)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, section);
  return typeof value === "string" ? value : key;
}

function getInitialLocale(): Locale {
  return getLocales()[0]?.languageCode === "ar" ? "ar" : "en";
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const isRTL = locale === "ar";

  const setLocale = useCallback((next: Locale) => {
    const shouldBeRTL = next === "ar";
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
    }
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: TranslationKey) => resolveKey(dictionaries[locale], key),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, isRTL, setLocale, toggleLocale, t }),
    [isRTL, locale, setLocale, t, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return value;
}
