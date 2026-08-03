import React, { useCallback, useState } from "react";
import {
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { loginLogoMarkXml } from "../../assets/figma/login/logoMarkXml";
import { appleIconXml } from "../../assets/figma/login/appleIconXml";
import { xIconXml } from "../../assets/figma/login/xIconXml";
import { AppButton } from "../../components/buttons/AppButton";
import { LocalSvg } from "../../components/icons/LocalSvg";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";
import { fontFamily } from "../../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation("login");
  const [phone, setPhone] = useState("");

  const handleContinue = useCallback(() => {
    navigation.navigate("Otp", { phone: phone.trim() || undefined });
  }, [navigation, phone]);

  const handleCreateAccount = useCallback(() => {
    navigation.navigate("Otp");
  }, [navigation]);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow px-6 pb-6"
        >
          <View className="min-h-full justify-between">
            <View>
              <View className="mt-4 flex-row items-center justify-center gap-2">
                <AppText
                  className="text-[16px] tracking-[2px] text-primary"
                  style={{ fontFamily: fontFamily.bold }}
                >
                  WELM
                </AppText>
                <LocalSvg xml={loginLogoMarkXml} width={36} height={36} />
              </View>

              <View className="mt-10 items-center gap-3">
                <AppText
                  className="text-center text-[24px] text-text"
                  style={{ fontFamily: fontFamily.bold, lineHeight: 32 }}
                >
                  {t("welcome")}
                </AppText>
                <AppText
                  className="text-center text-[15px] text-textMuted"
                  style={{ fontFamily: fontFamily.semibold, lineHeight: 22 }}
                >
                  {t("subtitle")}
                </AppText>
              </View>

              <View className="mt-10">
                <AppText variant="label" className="mb-2">
                  {t("phone")}
                </AppText>
                <View className="h-14 flex-row items-center rounded-2xl border border-border bg-background px-4">
                  <View className="flex-row items-center gap-2">
                    <View
                      className="rounded-sm"
                      style={{ width: 18, height: 12, backgroundColor: "#006c35" }}
                    />
                    <AppText variant="body" className="text-text">
                      +966
                    </AppText>
                  </View>
                  <View className="mx-3 h-6 w-px bg-border" />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder={t("phone")}
                    placeholderTextColor="#6b7280"
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    className="flex-1 text-text"
                    style={{
                      fontFamily: fontFamily.regular,
                      fontSize: 16,
                      textAlign: I18nManager.isRTL ? "right" : "left",
                      writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
                    }}
                  />
                </View>
              </View>

              <View className="mt-6">
                <AppButton label={t("continue")} onPress={handleContinue} />
              </View>

              <View className="mt-8 flex-row items-center gap-4">
                <View className="h-px flex-1 bg-border" />
                <AppText variant="caption" muted>
                  {t("or")}
                </AppText>
                <View className="h-px flex-1 bg-border" />
              </View>

              <View className="mt-6 flex-row items-center justify-center gap-4">
                <Pressable
                  accessibilityRole="button"
                  className="h-14 w-14 items-center justify-center rounded-full border border-border active:opacity-70"
                >
                  <LocalSvg xml={appleIconXml} width={24} height={24} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  className="h-14 w-14 items-center justify-center rounded-full border border-border active:opacity-70"
                >
                  <LocalSvg xml={xIconXml} width={24} height={24} />
                </Pressable>
              </View>
            </View>

            <View className="mt-10 flex-row flex-wrap items-center justify-center gap-1">
              <AppText variant="body" muted>
                {t("no-account")}
              </AppText>
              <Pressable accessibilityRole="button" onPress={handleCreateAccount} hitSlop={8}>
                <AppText variant="body" className="text-primary">
                  {t("create-account")}
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
