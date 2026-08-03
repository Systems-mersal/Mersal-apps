import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "../../components/buttons/AppButton";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppText } from "../../components/typography/AppText";
import { getVehicleById } from "../../constants/vehicles";
import type { RootStackParamList } from "../../navigation/types";
import { StickyBottomBar } from "../shared/BookingUi";

const MERCEDES_DETAIL = require("../../assets/figma/cars/mercedes-detail.png");
const MAP_PLACEHOLDER = require("../../assets/figma/cars/map-placeholder.png");

type Props = NativeStackScreenProps<RootStackParamList, "VehicleDetails">;

const FEATURE_KEYS = ["wifi", "sound", "ac"] as const;

export function VehicleDetailsScreen({ navigation, route }: Props) {
  const { t } = useTranslation(["vehicle-details", "vehicles", "common"]);
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);

  const vehicle = getVehicleById(route.params.vehicleId);

  const galleryImage = useMemo(() => {
    if (!vehicle) return MERCEDES_DETAIL;
    return vehicle.id === "mercedes-e350" ? MERCEDES_DETAIL : vehicle.imageSource;
  }, [vehicle]);

  if (!vehicle) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <AppText>{t("common:error")}</AppText>
      </View>
    );
  }

  const transmissionLabel =
    vehicle.transmission === "automatic"
      ? t("vehicle-details:automatic")
      : t("vehicle-details:manual");

  const fuelLabel =
    vehicle.fuelType === "electric"
      ? t("vehicle-details:electric")
      : t("vehicle-details:petrol");

  const handleBook = () => {
    navigation.navigate("BookingDates", { vehicleId: vehicle.id });
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <View className="relative h-[260px] w-full">
          <Image source={galleryImage} className="h-full w-full" resizeMode="cover" />
          <View
            className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-6"
            style={{ paddingTop: insets.top + 8 }}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsFavorite((prev) => !prev)}
              className="h-[38px] w-[38px] items-center justify-center rounded-full bg-white/90 active:opacity-70"
            >
              <AppIcon
                name="heart"
                size={18}
                color={isFavorite ? "#117066" : "#1f2937"}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              className="h-[38px] w-[38px] items-center justify-center rounded-full bg-white/90 active:opacity-70"
            >
              <AppIcon name="chevron-right" size={18} color="#1f2937" />
            </Pressable>
          </View>
          <View className="absolute bottom-3 left-0 right-0 flex-row items-center justify-center gap-1.5">
            <View className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <View className="h-1.5 w-[18px] rounded-full bg-white" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/50" />
          </View>
        </View>

        <View className="-mt-6 rounded-tl-[24px] rounded-tr-[24px] bg-white px-6 pt-6">
          <AppText variant="title" className="text-right">
            {t(`vehicles:${vehicle.nameKey}`)}
            {vehicle.year ? ` ${vehicle.year}` : ""}
          </AppText>

          <View className="mt-2 flex-row flex-wrap items-center justify-end gap-2">
            <AppText variant="caption" muted>
              {t("vehicle-details:review-count", { count: 128 })}
            </AppText>
            <AppText variant="caption" className="text-text">
              {vehicle.rating}
            </AppText>
            <AppIcon name="star" size={14} color="#117066" />
            <AppText variant="caption" muted>
              •
            </AppText>
            <AppText variant="caption" muted>
              {t(`vehicle-details:categories.${vehicle.category}`)}
            </AppText>
          </View>

          <View className="mt-6 flex-row justify-between gap-2">
            {[
              { value: transmissionLabel, label: t("vehicle-details:transmission") },
              { value: fuelLabel, label: t("vehicle-details:fuel-type") },
              {
                value: t("vehicle-details:seats-count", { count: vehicle.seats }),
                label: t("vehicle-details:capacity"),
              },
              {
                value: String(vehicle.year ?? 2025),
                label: t("vehicle-details:model-year"),
              },
            ].map((spec) => (
              <View
                key={spec.label}
                className="flex-1 items-center rounded-2xl bg-background px-1 py-3"
              >
                <AppText variant="label" className="text-center text-sm">
                  {spec.value}
                </AppText>
                <AppText variant="caption" muted className="mt-1 text-center text-xs">
                  {spec.label}
                </AppText>
              </View>
            ))}
          </View>

          <AppText variant="subtitle" className="mt-6 text-right">
            {t("vehicle-details:features")}
          </AppText>
          <View className="mt-3 flex-row flex-wrap justify-end gap-2">
            {FEATURE_KEYS.map((key) => (
              <View key={key} className="rounded-full border border-border px-3 py-2">
                <AppText variant="caption">{t(`vehicle-details:feature-items.${key}`)}</AppText>
              </View>
            ))}
          </View>

          <AppText variant="subtitle" className="mt-6 text-right">
            {t("vehicle-details:terms-title")}
          </AppText>
          <View className="mt-3 rounded-[20px] bg-backgroundWarm px-4 py-4">
            <View className="mb-3 flex-row items-center justify-end gap-2">
              <AppText variant="body" className="flex-1 text-right">
                {t("vehicle-details:insurance-included")}
              </AppText>
              <AppIcon name="shield" size={16} color="#117066" />
            </View>
            <View className="flex-row items-center justify-end gap-2">
              <AppText variant="body" className="flex-1 text-right">
                {t("vehicle-details:mileage-included")}
              </AppText>
              <AppIcon name="compass" size={16} color="#117066" />
            </View>
          </View>

          <AppText variant="subtitle" className="mt-6 text-right">
            {t("vehicle-details:pickup-location")}
          </AppText>
          <View className="relative mt-3 h-[100px] overflow-hidden rounded-[20px]">
            <Image source={MAP_PLACEHOLDER} className="h-full w-full" resizeMode="cover" />
            <View className="absolute inset-0 items-center justify-center">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <AppIcon name="map-pin" size={16} color="#117066" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <StickyBottomBar>
        <View className="flex-row items-center justify-between">
          <AppButton
            label={t("vehicle-details:book-now")}
            onPress={handleBook}
            className="h-14 min-w-[180px] rounded-[28px]"
          />
          <View className="items-end">
            <View className="flex-row items-baseline gap-1">
              <AppText variant="caption" muted>
                {t("vehicle-details:per-day")}
              </AppText>
              <AppText variant="subtitle" className="text-primary">
                {vehicle.pricePerDay} {t("common:currency")}
              </AppText>
            </View>
            <AppText variant="caption" muted className="mt-0.5">
              {t("vehicle-details:vat-included")}
            </AppText>
          </View>
        </View>
      </StickyBottomBar>
    </View>
  );
}
