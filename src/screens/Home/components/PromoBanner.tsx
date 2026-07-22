import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";

export function PromoBanner() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <View className="mx-4 mt-4 overflow-hidden rounded-2xl">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1555215695-3d98baf72a82?w=600&h=200&fit=crop&auto=format",
        }}
        className="h-[130px]"
        imageStyle={{ opacity: 0.25 }}
      >
        <LinearGradient
          colors={["#0A1D6E", colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-full justify-between p-4"
        >
          <View>
            <View className="self-start rounded-full bg-amber-400 px-2 py-0.5">
              <Text className="font-tajawal-black text-[10px] text-amber-900">
                {t("home.limitedOffer")}
              </Text>
            </View>
            <Text className="mt-1.5 font-tajawal-black text-lg leading-tight text-white">
              {t("home.promoTitle")}
            </Text>
            <Text className="mt-0.5 font-tajawal text-[11px] text-white/70">
              {t("home.promoSubtitle")}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/listing")}
            className="self-start rounded-xl bg-white px-4 py-1.5"
          >
            <Text className="font-tajawal-black text-xs text-primary">
              {t("home.bookNow")}
            </Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
