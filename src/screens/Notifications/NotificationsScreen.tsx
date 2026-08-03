import React, { useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Notifications">;

const NOTIFICATION_KEYS = [
  "booking-confirmed",
  "payment-received",
  "license-update",
  "weekend-offer",
] as const;

const DOT_COLORS: Record<(typeof NOTIFICATION_KEYS)[number], string> = {
  "booking-confirmed": "#10b981",
  "payment-received": "#117066",
  "license-update": "#f59e0b",
  "weekend-offer": "#ffccaa",
};

export function NotificationsScreen(_props: Props) {
  const { t } = useTranslation("notifications");
  const insets = useSafeAreaInsets();

  const items = useMemo(
    () =>
      NOTIFICATION_KEYS.map((key) => ({
        key,
        title: t(`items.${key}.title`),
        body: t(`items.${key}.body`),
        time: t(`items.${key}.time`),
        dotColor: DOT_COLORS[key],
      })),
    [t],
  );

  return (
    <View className="flex-1 bg-background">
      <View
        className="flex-row items-center justify-between border-b border-border bg-white px-6 pb-4"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => undefined}
          className="rounded-full border border-border px-3 py-2 active:opacity-70"
        >
          <AppText variant="caption">{t("mark-all-read")}</AppText>
        </Pressable>
        <AppText variant="title">{t("title")}</AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {items.map((item) => (
          <View
            key={item.key}
            className="mb-3 flex-row rounded-[20px] bg-white p-3.5"
          >
            <AppText variant="caption" muted className="w-14">
              {item.time}
            </AppText>
            <View className="ml-2 flex-1 items-end">
              <View className="flex-row items-center gap-2">
                <View
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.dotColor }}
                />
                <AppText variant="label" className="text-right">
                  {item.title}
                </AppText>
              </View>
              <AppText variant="caption" muted className="mt-1 text-right leading-5">
                {item.body}
              </AppText>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
