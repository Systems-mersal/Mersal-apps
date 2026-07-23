import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, MessageCircle } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { StatusBadge } from "../../components/common/Badge/StatusBadge";
import { PrimaryButton } from "../../components/common/Button/PrimaryButton";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function ConfirmationScreen() {
  const router = useRouter();
  const { total } = useLocalSearchParams<{ id?: string; total?: string }>();
  const { t } = useLocale();

  const rows = [
    { label: t("confirmation.bookingNumber"), value: "BK-2024-005" },
    { label: t("confirmation.vehicle"), value: t("confirmation.vehicleValue") },
    { label: t("confirmation.company"), value: t("confirmation.companyValue") },
    {
      label: t("confirmation.duration"),
      value: t("confirmation.durationValue"),
    },
    {
      label: t("confirmation.estPrice"),
      value: total ? `${total} ${t("common.sar")}` : t("confirmation.priceValue"),
    },
  ];

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3 items-center rounded-2xl bg-card p-6 shadow-card">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle size={40} color={colors.success} />
          </View>
          <Text className="mb-1 text-center font-tajawal-black text-xl text-foreground">
            {t("confirmation.title")}
          </Text>
          <Text className="text-center font-tajawal text-sm text-muted-foreground">
            {t("confirmation.subtitle")}
          </Text>
        </View>

        <View className="mb-3 rounded-2xl bg-card p-4 shadow-card">
          <View className="mb-4 flex-row items-center justify-between">
            <StatusBadge status="pending" />
            <Text className="font-tajawal-black text-base text-foreground">
              {t("confirmation.details")}
            </Text>
          </View>
          <View className="gap-3">
            {rows.map((row) => (
              <View
                key={row.label}
                className="flex-row items-center justify-between"
              >
                <Text className="font-tajawal-bold text-foreground">
                  {row.value}
                </Text>
                <Text className="font-tajawal text-sm text-muted-foreground">
                  {row.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton
          label={t("confirmation.viewBookings")}
          onPress={() => router.replace("/bookings")}
          className="mb-3"
        />

        <View className="mb-3 flex-row gap-3">
          <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border-2 border-primary py-3">
            <MessageCircle size={16} color={colors.primary} />
            <Text className="font-tajawal-bold text-sm text-primary">
              {t("confirmation.chat")}
            </Text>
          </Pressable>
          <Pressable className="flex-1 items-center justify-center rounded-2xl border-2 border-red-200 py-3">
            <Text className="font-tajawal-bold text-sm text-red-500">
              {t("confirmation.cancel")}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.replace("/home")}>
          <Text className="py-2 text-center font-tajawal-medium text-sm text-muted-foreground">
            {t("confirmation.backHome")}
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenWrapper>
  );
}
