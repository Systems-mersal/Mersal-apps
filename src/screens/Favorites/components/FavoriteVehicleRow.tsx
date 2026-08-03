import React, { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { AppIcon } from "../../../components/icons/AppIcon";
import { AppText } from "../../../components/typography/AppText";
import type { Vehicle } from "../../../types";
import { useVehicleLabel, VehiclePriceRow } from "../../../components/common/CategoryChips";

export interface FavoriteVehicleRowProps {
  vehicle: Vehicle;
  onPress: (vehicleId: string) => void;
}

export const FavoriteVehicleRow = memo(function FavoriteVehicleRow({
  vehicle,
  onPress,
}: FavoriteVehicleRowProps) {
  const { name, location } = useVehicleLabel(vehicle);

  return (
    <Pressable
      onPress={() => onPress(vehicle.id)}
      className="mb-4 flex-row items-center rounded-[20px] border border-border bg-white p-4"
    >
      <View className="flex-1 pe-4">
        <AppText variant="subtitle" numberOfLines={2}>
          {name}
        </AppText>
        <View className="mt-2">
          <VehiclePriceRow
            price={vehicle.pricePerDay}
            rating={vehicle.rating}
            location={location}
          />
        </View>
      </View>
      <Image
        source={vehicle.imageSource}
        className="h-[112px] w-[112px] rounded-2xl"
        resizeMode="cover"
      />
    </Pressable>
  );
});

export function FavoritesHeaderActions() {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <AppIcon name="chevron-left" size={20} color="#ffffff" />
      </View>
      <View className="h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <AppIcon name="heart" size={20} color="#ffccaa" />
      </View>
    </View>
  );
}
