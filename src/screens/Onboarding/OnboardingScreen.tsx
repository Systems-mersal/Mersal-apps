import React, { useCallback, useMemo, useState } from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../../components/buttons/AppButton";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";
import { fontFamily } from "../../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;
type OnboardingStep = 0 | 1 | 2;

const STEP_IMAGES: ImageSourcePropType[] = [
  require("../../assets/figma/onboarding/step1.png"),
  require("../../assets/figma/onboarding/step2.png"),
  require("../../assets/figma/onboarding/step3.png"),
];

const STEP_KEYS = ["step1", "step2", "step3"] as const;

export function OnboardingScreen({ navigation }: Props) {
  const { t } = useTranslation("onboarding");
  const [step, setStep] = useState<OnboardingStep>(0);

  const stepKey = STEP_KEYS[step];
  const isLastStep = step === 2;

  const title = t(`${stepKey}.title`);
  const description = t(`${stepKey}.desc`);
  const buttonLabel = isLastStep ? t("get-started") : t("next");

  const indicators = useMemo(
    () =>
      STEP_KEYS.map((_, index) => (
        <View
          key={index}
          className={
            index === step
              ? "h-[8px] w-[24px] rounded-[4px] bg-primary"
              : "h-[8px] w-[8px] rounded-[4px] bg-border"
          }
        />
      )),
    [step],
  );

  const goToLogin = useCallback(() => {
    navigation.replace("Login");
  }, [navigation]);

  const handleSkip = useCallback(() => {
    goToLogin();
  }, [goToLogin]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      goToLogin();
      return;
    }
    setStep((current) => (current + 1) as OnboardingStep);
  }, [goToLogin, isLastStep]);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="h-12 justify-center">
          {!isLastStep ? (
            <Pressable
              accessibilityRole="button"
              onPress={handleSkip}
              className="self-start active:opacity-70"
              hitSlop={8}
            >
              <AppText variant="body" className="text-textMuted">
                {t("skip")}
              </AppText>
            </Pressable>
          ) : (
            <View className="h-6" />
          )}
        </View>

        <View className="mt-2 h-[380px] overflow-hidden rounded-[24px]">
          <Image
            source={STEP_IMAGES[step]}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>

        <View className="mt-8 items-center gap-3 px-2">
          <AppText
            className="text-center text-[24px] text-text"
            style={{ fontFamily: fontFamily.bold, lineHeight: 32 }}
          >
            {title}
          </AppText>
          <AppText
            className="text-center text-[15px] text-textMuted"
            style={{ fontFamily: fontFamily.semibold, lineHeight: 22 }}
          >
            {description}
          </AppText>
        </View>

        <View className="mt-8 flex-row items-center justify-center gap-2">{indicators}</View>

        <View className="mt-auto pb-6">
          <AppButton label={buttonLabel} onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}
