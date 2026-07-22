import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CarCard } from "../../components/common/Card/CarCard";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { cars } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { CategoryList } from "./components/CategoryList";
import { HomeHeader } from "./components/HomeHeader";
import { PromoBanner } from "./components/PromoBanner";

function SectionHeader({
  titleKey,
  onSeeAll,
}: {
  titleKey:
    | "home.categories"
    | "home.featuredCars"
    | "home.nearYou"
    | "home.recentlyAdded";
  onSeeAll?: () => void;
}) {
  const { t } = useLocale();
  return (
    <View className="mb-3 flex-row items-center justify-between px-4">
      <Pressable onPress={onSeeAll}>
        <Text className="font-tajawal-medium text-sm text-primary">
          {t("common.seeAll")}
        </Text>
      </Pressable>
      <Text className="font-tajawal-black text-base text-foreground">
        {t(titleKey)}
      </Text>
    </View>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const goListing = () => router.push("/listing");
  const goDetails = (id: string) => router.push(`/details/${id}`);

  return (
    <ScreenWrapper className="flex-1 bg-background" edges={["top"]}>
      <HomeHeader />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <PromoBanner />

        <View className="mt-4">
          <SectionHeader titleKey="home.categories" onSeeAll={goListing} />
          <CategoryList />
        </View>

        <View className="mt-4">
          <SectionHeader titleKey="home.featuredCars" onSeeAll={goListing} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 px-4"
          >
            {cars.slice(0, 4).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                compact
                onPress={() => goDetails(car.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mt-4">
          <SectionHeader titleKey="home.nearYou" onSeeAll={goListing} />
          <View className="flex-row flex-wrap gap-3 px-4">
            {cars.slice(2, 6).map((car) => (
              <View key={car.id} className="w-[48%]">
                <CarCard car={car} onPress={() => goDetails(car.id)} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
