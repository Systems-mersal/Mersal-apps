import React, { useCallback, useEffect, useRef, useState } from "react";
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

import { AppButton } from "../../components/buttons/AppButton";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";
import { fontFamily } from "../../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Otp">;

const OTP_LENGTH = 4;
const RESEND_SECONDS = 60;

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function OtpScreen({ navigation, route }: Props) {
  const { t } = useTranslation("otp");
  const phone = route.params?.phone ?? "+966 5XX XXX XXXX";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleVerify = useCallback(() => {
    navigation.replace("MainTabs");
  }, [navigation]);

  const handleResend = useCallback(() => {
    if (secondsLeft > 0) {
      return;
    }
    setSecondsLeft(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  }, [secondsLeft]);

  const handleChange = useCallback(
    (value: string, index: number) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...otp];
      next[index] = digit;
      setOtp(next);

      if (digit && index < OTP_LENGTH - 1) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace" && !otp[index] && index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const backIcon = I18nManager.isRTL ? "chevron-right" : "chevron-left";

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
          <View className="min-h-full">
            <View className="mt-2 flex-row items-center gap-3">
              <Pressable
                accessibilityRole="button"
                onPress={handleBack}
                className="h-10 w-10 items-center justify-center active:opacity-70"
                hitSlop={8}
              >
                <AppIcon name={backIcon} size={24} color="#1f2937" />
              </Pressable>
              <AppText
                className="text-[18px] text-text"
                style={{ fontFamily: fontFamily.bold }}
              >
                {t("header")}
              </AppText>
            </View>

            <View className="mt-10 items-center gap-3">
              <AppText
                className="text-center text-[24px] text-text"
                style={{ fontFamily: fontFamily.bold, lineHeight: 32 }}
              >
                {t("title")}
              </AppText>
              <AppText
                className="text-center text-[15px] text-textMuted"
                style={{ fontFamily: fontFamily.semibold, lineHeight: 22 }}
              >
                {t("sent-to")}
              </AppText>
              <AppText
                className="text-center text-[16px] text-text"
                style={{ fontFamily: fontFamily.semibold }}
              >
                {phone}
              </AppText>
            </View>

            <View className="mt-10 flex-row justify-center gap-3">
              {otp.map((digit, index) => {
                const isActive = index === activeIndex;
                return (
                  <View
                    key={index}
                    className={`h-16 w-16 items-center justify-center rounded-2xl border bg-background ${
                      isActive ? "border-2 border-primary" : "border border-border"
                    }`}
                  >
                    <TextInput
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      value={digit}
                      onChangeText={(value) => handleChange(value, index)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(nativeEvent.key, index)
                      }
                      onFocus={() => setActiveIndex(index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      className="h-full w-full text-center text-[20px] text-text"
                      style={{ fontFamily: fontFamily.bold }}
                    />
                  </View>
                );
              })}
            </View>

            <View className="mt-6 items-center">
              {secondsLeft > 0 ? (
                <AppText variant="caption" muted>
                  {t("resend-in", { time: formatTimer(secondsLeft) })}
                </AppText>
              ) : null}
            </View>

            <View className="mt-8">
              <AppButton label={t("verify")} onPress={handleVerify} />
            </View>

            <View className="mt-auto flex-row flex-wrap items-center justify-center gap-1 pt-10">
              <AppText variant="body" muted>
                {t("didnt-receive")}
              </AppText>
              <Pressable
                accessibilityRole="button"
                onPress={handleResend}
                disabled={secondsLeft > 0}
                hitSlop={8}
              >
                <AppText
                  variant="body"
                  className={secondsLeft > 0 ? "text-textMuted" : "text-primary"}
                >
                  {t("resend")}
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
