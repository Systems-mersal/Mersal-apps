import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../../components/common/Avatar";
import { Badge } from "../../../components/common/Badge";
import { AppText } from "../../../components/typography/AppText";

const avatarSource = require("../../../assets/figma/profile/avatar.png");

export function ProfileHeader() {
  const { t } = useTranslation("profile");

  return (
    <View className="items-center pb-2 pt-4">
      <Avatar source={avatarSource} size={80} />
      <AppText variant="subtitle" className="mt-3 text-white">
        {t("user-name")}
      </AppText>
      <AppText variant="caption" className="mt-1 text-white/80">
        {t("user-email")}
      </AppText>
      <View className="mt-3">
        <Badge
          label={t("golden")}
          variant="neutral"
          className="border border-peachGold bg-peachGold/20"
        />
      </View>
    </View>
  );
}

export function ProfileStats() {
  const { t } = useTranslation("profile");

  return (
    <View className="mx-6 -mt-4 flex-row rounded-[20px] bg-white p-4 shadow-sm">
      <View className="flex-1 items-center border-e border-border">
        <AppText variant="title" className="text-primary">
          {t("stats-bookings")}
        </AppText>
        <AppText variant="caption" muted className="mt-1 text-center">
          {t("total-bookings")}
        </AppText>
      </View>
      <View className="flex-1 items-center">
        <AppText variant="title" className="text-primary">
          {t("stats-favorites")}
        </AppText>
        <AppText variant="caption" muted className="mt-1 text-center">
          {t("favorite-cars")}
        </AppText>
      </View>
    </View>
  );
}
