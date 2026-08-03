import React, { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { Vehicle } from "../../types";
import { AppIcon } from "../icons/AppIcon";
import { AppText } from "../typography/AppText";
import { useVehicleLabel } from "../common/CategoryChips";
import { fontFamily } from "../../theme/typography";

export interface FeaturedVehicleCardProps {
  vehicle: Vehicle;
  onPress: (vehicleId: string) => void;
  onBookPress: (vehicleId: string) => void;
  className?: string;
}

export const FeaturedVehicleCard = memo(function FeaturedVehicleCard({
  vehicle,
  onPress,
  onBookPress,
  className = "",
}: FeaturedVehicleCardProps) {
  const { t } = useTranslation(["home", "common"]);
  const { name } = useVehicleLabel(vehicle);

  return (
    <Pressable
      onPress={() => onPress(vehicle.id)}
      className={`overflow-hidden rounded-[20px] border border-border bg-white ${className}`}
    >
      <Image
        source={vehicle.imageSource}
        className="h-[180px] w-full"
        resizeMode="cover"
      />

      <View className="w-full gap-3 p-4">
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <AppText
              className="text-[13px] text-text"
              style={{ fontFamily: fontFamily.semibold }}
            >
              {vehicle.rating.toFixed(1)}
            </AppText>
            <AppIcon name="star" size={14} color="#F5B400" />
          </View>
          <AppText
            className="text-[16px] text-text"
            style={{ fontFamily: fontFamily.bold }}
            numberOfLines={1}
          >
            {name}
          </AppText>
        </View>

        <View className="w-full flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            onPress={() => onBookPress(vehicle.id)}
            className="rounded-[10px] bg-primary px-4 py-2 active:opacity-80"
          >
            <AppText
              className="text-[12px] text-white"
              style={{ fontFamily: fontFamily.bold }}
            >
              {t("home:book-now")}
            </AppText>
          </Pressable>

          <View className="flex-row items-baseline gap-1">
            <AppText
              className="text-[11px] text-textMuted"
              style={{ fontFamily: fontFamily.regular }}
            >
              {t("home:per-day")}
            </AppText>
            <AppText
              className="text-[16px] text-primary"
              style={{ fontFamily: fontFamily.bold }}
            >
              {`${vehicle.pricePerDay} ${t("common:currency")}`}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
});
