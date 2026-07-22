import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocale } from "../../../localization/i18n";

const CATEGORIES = [
  { emoji: "🚗", key: "home.economy" as const },
  { emoji: "🚙", key: "home.sedan" as const },
  { emoji: "🛻", key: "home.suv" as const },
  { emoji: "✨", key: "home.luxury" as const },
  { emoji: "🚐", key: "home.pickup" as const },
  { emoji: "🚌", key: "home.van" as const },
];

export function CategoryList() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-4 pb-2"
    >
      {CATEGORIES.map((category) => (
        <Pressable
          key={category.key}
          onPress={() => router.push("/listing")}
          className="w-[62px] items-center gap-2"
        >
          <View className="h-[58px] w-[58px] items-center justify-center rounded-2xl bg-card shadow-card">
            <Text className="text-2xl">{category.emoji}</Text>
          </View>
          <Text className="text-center font-tajawal-bold text-[11px] text-gray-700">
            {t(category.key)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
