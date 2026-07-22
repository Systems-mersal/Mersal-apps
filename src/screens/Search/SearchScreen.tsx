import { useRouter } from "expo-router";
import { Car, Clock, Search, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { cars } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

const BRANDS = [
  "Toyota",
  "Nissan",
  "BMW",
  "Hyundai",
  "Ford",
  "Kia",
  "Mercedes",
  "Audi",
];

export function SearchScreen() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");

  const recent = [
    t("search.recentToyota"),
    t("search.recentLuxury"),
    t("search.recentSuv"),
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return cars.filter(
      (car) =>
        car.brand.includes(query) ||
        car.model.includes(query) ||
        car.brandEn.toLowerCase().includes(q) ||
        car.modelEn.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <ScreenWrapper className="flex-1 bg-card" edges={["top"]}>
      <View className="flex-row items-center gap-2 border-b border-border px-4 pb-3">
        <Pressable onPress={() => router.back()}>
          <Text className="font-tajawal-bold text-sm text-primary">
            {t("common.cancel")}
          </Text>
        </Pressable>
        <View className="min-h-[44px] flex-1 flex-row items-center gap-2 rounded-2xl border border-border bg-input px-3">
          <Search size={15} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder={t("search.placeholder")}
            placeholderTextColor={colors.mutedForeground}
            className="flex-1 font-tajawal text-sm text-foreground"
          />
          {query ? (
            <Pressable onPress={() => setQuery("")}>
              <X size={14} color={colors.mutedForeground} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {results.length > 0 ? (
          <View className="px-4 pt-4">
            <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
              {t("search.results")}
            </Text>
            {results.map((car) => {
              const title =
                locale === "ar"
                  ? `${car.brand} ${car.model}`
                  : `${car.brandEn} ${car.modelEn}`;
              return (
                <Pressable
                  key={car.id}
                  onPress={() => router.push(`/details/${car.id}`)}
                  className="mb-2 flex-row items-center gap-3 rounded-2xl bg-muted p-3"
                >
                  <View className="flex-1">
                    <Text className="text-end font-tajawal-black text-sm text-foreground">
                      {title}
                    </Text>
                    <Text className="text-end font-tajawal text-[11px] text-muted-foreground">
                      {car.year} · {car.price} {t("common.sarPerDay")}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: car.image }}
                    className="h-10 w-14 rounded-xl bg-border"
                    resizeMode="cover"
                  />
                </Pressable>
              );
            })}
          </View>
        ) : (
          <>
            <View className="px-4 pt-4">
              <View className="mb-2 flex-row items-center justify-between">
                <Pressable>
                  <Text className="font-tajawal-bold text-xs text-red-400">
                    {t("search.clearAll")}
                  </Text>
                </Pressable>
                <Text className="font-tajawal-black text-base text-foreground">
                  {t("search.recent")}
                </Text>
              </View>
              {recent.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => router.push("/listing")}
                  className="flex-row items-center gap-3 border-b border-border/60 py-3"
                >
                  <Clock size={15} color={colors.border} />
                  <Text className="flex-1 font-tajawal text-sm text-gray-700">
                    {item}
                  </Text>
                  <X size={13} color={colors.border} />
                </Pressable>
              ))}
            </View>

            <View className="px-4 pt-4">
              <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
                {t("search.popularBrands")}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {BRANDS.map((brand) => (
                  <Pressable
                    key={brand}
                    onPress={() => router.push("/listing")}
                    className="w-[23%] items-center gap-1.5 rounded-2xl bg-muted py-3"
                  >
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-card shadow-card">
                      <Car size={15} color={colors.primary} />
                    </View>
                    <Text className="font-tajawal-bold text-[10px] text-gray-700">
                      {brand}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
