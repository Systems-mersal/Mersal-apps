import React from "react";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../../components/common/Avatar";
import { AppIcon } from "../../../components/icons/AppIcon";
import { AppText } from "../../../components/typography/AppText";
import { fontFamily } from "../../../theme/typography";

const avatarSource = require("../../../assets/figma/home/avatar.png");

export interface HomeHeaderProps {
  onNotificationsPress: () => void;
}

export function HomeHeader({ onNotificationsPress }: HomeHeaderProps) {
  const { t } = useTranslation("home");

  return (
    <View className="mb-4 flex-row items-center justify-between py-4">
      <Pressable
        accessibilityRole="button"
        onPress={onNotificationsPress}
        className="rounded-[14px] border border-border bg-white p-3 active:opacity-70"
        hitSlop={8}
      >
        <AppIcon name="bell" size={20} color="#1f2937" />
      </Pressable>

      <View className="flex-row items-center gap-3">
        <View className="items-end gap-0.5">
          <AppText
            className="text-[13px] text-textMuted"
            style={{ fontFamily: fontFamily.regular }}
          >
            {t("welcome")}
          </AppText>
          <AppText
            className="text-[18px] text-text"
            style={{ fontFamily: fontFamily.bold }}
          >
            {t("user-name")}
          </AppText>
        </View>
        <Avatar source={avatarSource} size={44} />
      </View>
    </View>
  );
}
