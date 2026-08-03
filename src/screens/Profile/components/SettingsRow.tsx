import React from "react";
import { Pressable, View } from "react-native";
import { AppIcon } from "../../../components/icons/AppIcon";
import { AppText } from "../../../components/typography/AppText";

export interface SettingsRowProps {
  label: string;
  onPress?: () => void;
}

export function SettingsRow({ label, onPress }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-border py-4 active:opacity-70"
    >
      <AppText variant="body">{label}</AppText>
      <AppIcon name="chevron-right" size={18} color="#6b7280" />
    </Pressable>
  );
}

export function SettingsList({
  rows,
}: {
  rows: Array<{ key: string; label: string; onPress?: () => void }>;
}) {
  return (
    <View className="mt-6 rounded-[20px] bg-white px-4">
      {rows.map((row, index) => (
        <View key={row.key}>
          <SettingsRow label={row.label} onPress={row.onPress} />
          {index === rows.length - 1 ? null : null}
        </View>
      ))}
    </View>
  );
}
