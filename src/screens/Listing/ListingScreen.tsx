import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { StatusBadge } from "../../components/common/Badge/StatusBadge";
import { CarCard } from "../../components/common/Card/CarCard";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { cars } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

const CHIP_KEYS = [
  "listing.all",
  "listing.automatic",
  "listing.petrol",
  "listing.luxury",
  "listing.fiveSeats",
] as const;

export function ListingScreen() {
  const router = useRouter();
  const { t, locale, isRTL } = useLocale();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeChip, setActiveChip] = useState(0);
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <ScreenWrapper className="flex-1 bg-background" edges={["top"]}>
      <View className="bg-card shadow-sm">
        <View className="flex-row items-center gap-2 px-4 pb-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-xl bg-muted"
          >
            <BackIcon size={18} color={colors.foreground} />
          </Pressable>
          <Pressable
            onPress={() => router.push("/search")}
            className="min-h-[44px] flex-1 flex-row items-center gap-2 rounded-xl border border-border bg-input px-3"
          >
            <Search size={15} color={colors.mutedForeground} />
            <Text className="flex-1 font-tajawal text-sm text-muted-foreground">
              {t("listing.carsInRiyadh")}
            </Text>
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <SlidersHorizontal size={17} color={colors.white} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-4 pb-3"
        >
          {CHIP_KEYS.map((key, index) => (
            <Pressable
              key={key}
              onPress={() => setActiveChip(index)}
              className={`rounded-full px-3 py-1.5 ${
                activeChip === index ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text
                className={`font-tajawal-bold text-xs ${
                  activeChip === index ? "text-white" : "text-gray-600"
                }`}
              >
                {t(key)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center gap-1 rounded-xl bg-card p-1 shadow-card">
          <Pressable
            onPress={() => setView("grid")}
            className={`rounded-lg p-1.5 ${view === "grid" ? "bg-primary" : ""}`}
          >
            <Grid3X3
              size={15}
              color={view === "grid" ? colors.white : colors.mutedForeground}
            />
          </Pressable>
          <Pressable
            onPress={() => setView("list")}
            className={`rounded-lg p-1.5 ${view === "list" ? "bg-primary" : ""}`}
          >
            <List
              size={15}
              color={view === "list" ? colors.white : colors.mutedForeground}
            />
          </Pressable>
        </View>
        <Text className="font-tajawal-medium text-xs text-muted-foreground">
          {t("listing.carsAvailable")}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {view === "grid" ? (
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {cars.map((car) => (
              <View key={car.id} className="w-[48%]">
                <CarCard
                  car={car}
                  onPress={() => router.push(`/details/${car.id}`)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View className="gap-3">
            {cars.map((car) => {
              const title =
                locale === "ar"
                  ? `${car.brand} ${car.model}`
                  : `${car.brandEn} ${car.modelEn}`;
              return (
                <Pressable
                  key={car.id}
                  onPress={() => router.push(`/details/${car.id}`)}
                  className="flex-row overflow-hidden rounded-2xl bg-card shadow-card"
                >
                  <Image
                    source={{ uri: car.image }}
                    className="h-28 w-32 bg-muted"
                    resizeMode="cover"
                  />
                  <View className="flex-1 justify-between p-3">
                    <View className="flex-row items-start justify-between">
                      <StatusBadge
                        status={car.available ? "available" : "unavailable"}
                      />
                      <Text className="flex-1 text-end font-tajawal-black text-sm text-foreground">
                        {title}
                      </Text>
                    </View>
                    <Text className="text-end font-tajawal text-[11px] text-muted-foreground">
                      {car.year} ·{" "}
                      {locale === "ar" ? car.transmission : car.transmissionEn}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="font-tajawal-bold text-[11px] text-foreground">
                        ★ {car.rating}
                      </Text>
                      <Text className="font-tajawal-extrabold text-primary">
                        {car.price}{" "}
                        <Text className="font-tajawal text-[10px] text-muted-foreground">
                          {t("common.sarPerDay")}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
