import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { splashLogoMarkXml } from "../../assets/figma/splash/logoMarkXml";
import { splashWordmarkXml } from "../../assets/figma/splash/wordmarkXml";
import { LocalSvg } from "../../components/icons/LocalSvg";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  const { t } = useTranslation("splash");

  const navigateToOnboarding = useCallback(() => {
    navigation.replace("Onboarding");
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(navigateToOnboarding, 2000);
    return () => clearTimeout(timer);
  }, [navigateToOnboarding]);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-primaryDark">
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center gap-8">
          <View
            className="h-[170px] w-[158px] items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <LocalSvg xml={splashLogoMarkXml} width={140} height={154} />
          </View>
          <LocalSvg xml={splashWordmarkXml} width={154} height={122} />
        </View>
      </View>

      <View className="items-center pb-8">
        <AppText
          variant="label"
          className="text-[14px] tracking-[2px]"
          style={{ color: "#a5d3ce" }}
        >
          {t("tagline")}
        </AppText>
      </View>
    </SafeAreaView>
  );
}
