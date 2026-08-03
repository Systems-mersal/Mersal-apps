import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { AppIcon } from "../icons/AppIcon";
import { fontFamily } from "../../theme/typography";

export interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  className?: string;
  variant?: "home" | "explore";
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "",
  onFilterPress,
  className = "",
  variant = "home",
}: SearchBarProps) {
  const isHome = variant === "home";

  return (
    <View
      className={`flex-row items-center border border-border bg-white px-4 ${
        isHome ? "h-[54px] rounded-[16px] gap-3" : "h-[48px] rounded-[12px] gap-3"
      } ${className}`}
    >
      {isHome && onFilterPress ? (
        <Pressable
          onPress={onFilterPress}
          hitSlop={8}
          accessibilityRole="button"
          className="rounded-[8px] bg-primary p-[6px]"
        >
          <AppIcon name="sliders" size={18} color="#ffffff" />
        </Pressable>
      ) : null}

      {!isHome ? <AppIcon name="sliders" size={18} color="#6b7280" /> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        className="flex-1 text-right text-[14px] text-textMuted"
        style={{ fontFamily: fontFamily.regular, fontSize: 14 }}
        textAlign="right"
      />

      <AppIcon name="search" size={isHome ? 20 : 18} color="#6b7280" />
    </View>
  );
}
