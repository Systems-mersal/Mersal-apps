import { Heart, Settings, Users } from "lucide-react-native";
import { Fuel } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";
import type { Car } from "../../../types/car";
import { StatusBadge } from "../Badge/StatusBadge";

type CarCardProps = {
  car: Car;
  onPress?: () => void;
  compact?: boolean;
};

export function CarCard({ car, onPress, compact = false }: CarCardProps) {
  const { locale, t } = useLocale();
  const title =
    locale === "ar"
      ? `${car.brand} ${car.model}`
      : `${car.brandEn} ${car.modelEn}`;

  return (
    <Pressable
      onPress={onPress}
      className={`overflow-hidden rounded-2xl bg-card shadow-card active:scale-[0.98] ${
        compact ? "w-[196px]" : "w-full"
      }`}
    >
      <View className="relative">
        <Image
          source={{ uri: car.image }}
          className={`w-full bg-muted ${compact ? "h-36" : "h-36"}`}
          resizeMode="cover"
        />
        <Pressable className="absolute start-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-white/90">
          <Heart size={13} color={colors.mutedForeground} />
        </Pressable>
        {car.badge ? (
          <View className="absolute end-2 top-2 rounded-full bg-primary px-2 py-0.5">
            <Text className="font-tajawal-bold text-[10px] text-white">
              {car.badge}
            </Text>
          </View>
        ) : null}
        {!car.available ? (
          <View className="absolute inset-0 items-center justify-center bg-black/40">
            <StatusBadge status="unavailable" />
          </View>
        ) : null}
      </View>

      <View className="gap-1 p-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-1">
            <Text className="font-tajawal-bold text-[11px] text-foreground">
              ★ {car.rating}
            </Text>
          </View>
          <Text
            className="flex-1 text-end font-tajawal-bold text-sm text-foreground"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <Text className="text-end font-tajawal text-[10px] text-muted-foreground">
          {car.year}
        </Text>
        <View className="flex-row items-center justify-end gap-2">
          <View className="flex-row items-center gap-0.5">
            <Users size={9} color={colors.mutedForeground} />
            <Text className="font-tajawal text-[10px] text-muted-foreground">
              {car.seats}
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5">
            <Fuel size={9} color={colors.mutedForeground} />
            <Text className="font-tajawal text-[10px] text-muted-foreground">
              {locale === "ar" ? car.fuel : car.fuelEn}
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5">
            <Settings size={9} color={colors.mutedForeground} />
            <Text className="font-tajawal text-[10px] text-muted-foreground">
              {locale === "ar" ? car.transmission : car.transmissionEn}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 font-tajawal text-[10px] text-muted-foreground"
            numberOfLines={1}
          >
            {locale === "ar" ? car.company : car.companyEn}
          </Text>
          <Text className="font-tajawal-extrabold text-base text-primary">
            {car.price}
            <Text className="font-tajawal text-[10px] text-muted-foreground">
              {" "}
              {t("common.sarPerDay")}
            </Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
