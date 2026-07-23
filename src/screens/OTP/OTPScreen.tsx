import { useRouter } from "expo-router";
import { Phone } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../../components/common/Button/PrimaryButton";
import { AppHeader } from "../../components/common/Header/AppHeader";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function OTPScreen() {
  const router = useRouter();
  const { t } = useLocale();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <ScreenWrapper className="flex-1 bg-card">
      <AppHeader
        title={t("otp.header")}
        onBack={() => router.back()}
      />

      <View className="flex-1 px-6 py-4">
        <View className="mb-5 h-20 w-20 items-center justify-center self-center rounded-full bg-secondary">
          <Phone size={32} color={colors.primary} />
        </View>

        <Text className="mb-2 text-center font-tajawal-black text-xl text-foreground">
          {t("otp.title")}
        </Text>
        <Text className="text-center font-tajawal text-sm text-muted-foreground">
          {t("otp.sentTo")}
        </Text>
        <Text className="mb-7 text-center font-tajawal-bold text-primary" style={{ writingDirection: "ltr" }}>
          +966 055 XXX XXXX
        </Text>

        <View className="mb-6 flex-row justify-center gap-2.5" style={{ direction: "ltr" }}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(value) => {
                const next = [...digits];
                next[index] = value.slice(-1);
                setDigits(next);
              }}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              className={`h-14 w-11 rounded-2xl border-2 font-tajawal-black text-xl ${
                digit
                  ? "border-primary bg-secondary text-primary"
                  : "border-border bg-input text-foreground"
              }`}
            />
          ))}
        </View>

        {seconds > 0 ? (
          <Text className="mb-6 text-center font-tajawal text-sm text-muted-foreground">
            {t("otp.resendIn")} {seconds}
            {t("otp.seconds")}
          </Text>
        ) : (
          <Pressable onPress={() => setSeconds(59)} className="mb-6">
            <Text className="text-center font-tajawal-bold text-sm text-primary">
              {t("otp.resendCode")}
            </Text>
          </Pressable>
        )}

        <PrimaryButton
          label={t("otp.verify")}
          onPress={() => router.replace("/home")}
        />
      </View>
    </ScreenWrapper>
  );
}
