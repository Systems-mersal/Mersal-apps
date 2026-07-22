import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../../../components/common/Button/PrimaryButton";
import { OrDivider } from "../../../components/common/Divider/OrDivider";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";

export function LoginForm() {
  const router = useRouter();
  const { t, isRTL } = useLocale();
  const [phone, setPhone] = useState("");

  return (
    <View className="flex-1 bg-card px-5 py-6">
      <Text className="mb-1 text-end font-tajawal-black text-xl text-foreground">
        {t("login.title")}
      </Text>
      <Text className="mb-5 text-end font-tajawal text-sm text-muted-foreground">
        {t("login.subtitle")}
      </Text>

      <Text className="mb-2 text-end font-tajawal-bold text-sm text-gray-700">
        {t("login.mobileNumber")}
      </Text>

      <View className={`mb-4 flex-row gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        <View className="flex-row items-center gap-1.5 rounded-xl border border-border bg-input px-3 py-3">
          <Text className="text-lg">🇸🇦</Text>
          <Text className="font-tajawal-bold text-sm text-gray-700">+966</Text>
          <ChevronDown size={13} color={colors.mutedForeground} />
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder={t("login.phonePlaceholder")}
          placeholderTextColor={colors.mutedForeground}
          textAlign="left"
          className="min-h-[50px] flex-1 rounded-xl border border-border bg-input px-4 font-tajawal text-sm text-foreground"
        />
      </View>

      <PrimaryButton
        label={t("login.continue")}
        onPress={() => router.push("/otp")}
        className="mb-0"
      />

      <OrDivider />

      <PrimaryButton
        variant="outline"
        label={t("login.browseAsGuest")}
        onPress={() => router.replace("/home")}
      />

      <Text className="mt-4 text-center font-tajawal text-[11px] text-muted-foreground">
        {t("login.terms")}
      </Text>
    </View>
  );
}
