import React, { useMemo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../../components/buttons/AppButton";
import { AppText } from "../../components/typography/AppText";
import type { MainTabNavigationProp } from "../../navigation/types";
import { Screen } from "../../components/common/Screen";
import { ProfileHeader, ProfileStats } from "./components/ProfileHeader";
import { SettingsList } from "./components/SettingsRow";

export function ProfileScreen() {
  const { t } = useTranslation("profile");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainTabNavigationProp<"Profile">>();

  const settingsRows = useMemo(
    () => [
      { key: "personalInfo", label: t("rows.personal-info") },
      { key: "paymentMethods", label: t("rows.payment-methods") },
      {
        key: "notifications",
        label: t("rows.notifications"),
        onPress: () => navigation.navigate("Notifications"),
      },
      {
        key: "documents",
        label: t("rows.documents"),
        onPress: () => navigation.navigate("Documents"),
      },
      { key: "language", label: t("rows.language") },
      { key: "support", label: t("rows.support") },
      { key: "terms", label: t("rows.terms") },
      { key: "privacy", label: t("rows.privacy") },
    ],
    [navigation, t],
  );

  return (
    <View className="flex-1 bg-background">
      <View
        className="bg-primaryDark px-6 pb-8"
        style={{ paddingTop: insets.top + 8 }}
      >
        <AppText variant="label" className="mb-2 text-white/80">
          {t("title")}
        </AppText>
        <ProfileHeader />
      </View>

      <Screen
        scrollable
        edges={[]}
        className="bg-background"
        contentClassName="px-0"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <ProfileStats />

        <View className="px-6">
          <AppText variant="subtitle" className="mb-1 mt-6">
            {t("account-settings")}
          </AppText>
          <SettingsList rows={settingsRows} />

          <AppButton
            label={t("logout")}
            variant="outline"
            className="mt-6 border-danger"
            textClassName="text-danger"
            onPress={() => undefined}
          />

          <View className="mt-8 items-center pb-4">
            <AppText variant="caption" muted className="text-center">
              {t("copyright")}
            </AppText>
            <AppText variant="caption" muted className="mt-1">
              {t("version")}
            </AppText>
          </View>
        </View>
      </Screen>
    </View>
  );
}
