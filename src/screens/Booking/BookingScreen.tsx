import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Check, MapPin, Navigation } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { PrimaryButton } from "../../components/common/Button/PrimaryButton";
import { AppHeader } from "../../components/common/Header/AppHeader";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { getCarById } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

type ExtraKey = "driver" | "gps" | "child" | "insurance";

export function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, locale } = useLocale();
  const car = getCarById(id ?? "1") ?? getCarById("1")!;
  const [extras, setExtras] = useState<Record<ExtraKey, boolean>>({
    driver: false,
    gps: false,
    child: false,
    insurance: false,
  });

  const extrasList = useMemo(
    () => [
      { key: "driver" as const, label: t("booking.extraDriver"), price: 50 },
      { key: "gps" as const, label: t("booking.gps"), price: 25 },
      { key: "child" as const, label: t("booking.childSeat"), price: 30 },
      {
        key: "insurance" as const,
        label: t("booking.insuranceUpgrade"),
        price: 80,
      },
    ],
    [t],
  );

  const base = car.price * 3;
  const xtra = extrasList
    .filter((item) => extras[item.key])
    .reduce((sum, item) => sum + item.price * 3, 0);
  const tax = Math.round((base + xtra) * 0.15);
  const total = base + xtra + tax;

  const title =
    locale === "ar"
      ? `${car.brand} ${car.model}`
      : `${car.brandEn} ${car.modelEn}`;

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="bg-card">
        <AppHeader title={t("booking.title")} onBack={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="m-4 flex-row overflow-hidden rounded-2xl bg-card shadow-card">
          <Image
            source={{ uri: car.image }}
            className="h-[76px] w-24 bg-muted"
            resizeMode="cover"
          />
          <View className="flex-1 p-3">
            <Text className="text-end font-tajawal-black text-sm text-foreground">
              {title}
            </Text>
            <Text className="mb-1 text-end font-tajawal text-[11px] text-muted-foreground">
              {car.year} ·{" "}
              {locale === "ar" ? car.transmission : car.transmissionEn}
            </Text>
            <Text className="text-end font-tajawal-black text-sm text-primary">
              {car.price}{" "}
              <Text className="font-tajawal text-[10px] text-muted-foreground">
                {t("booking.sarPerDay")}
              </Text>
            </Text>
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("booking.rentalDates")}
          </Text>
          <View className="flex-row gap-2">
            {[
              {
                label: t("booking.pickup"),
                date: t("booking.pickupDate"),
                active: true,
              },
              {
                label: t("booking.return"),
                date: t("booking.returnDate"),
                active: false,
              },
            ].map((item) => (
              <View
                key={item.label}
                className={`flex-1 rounded-2xl border-2 p-3 ${
                  item.active
                    ? "border-primary bg-secondary"
                    : "border-border bg-muted"
                }`}
              >
                <Text className="mb-1 text-end font-tajawal text-[11px] text-muted-foreground">
                  {item.label}
                </Text>
                <View className="flex-row items-center justify-end gap-1.5">
                  <Text className="font-tajawal-black text-sm text-foreground">
                    {item.date}
                  </Text>
                  <Calendar
                    size={14}
                    color={item.active ? colors.primary : colors.mutedForeground}
                  />
                </View>
              </View>
            ))}
          </View>
          <View className="mt-2.5 items-center">
            <Text className="rounded-full bg-secondary px-3 py-1 font-tajawal-bold text-[11px] text-primary">
              {t("booking.duration")}
            </Text>
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("booking.pickupReturn")}
          </Text>
          <View className="gap-2">
            {[
              {
                Icon: MapPin,
                label: t("booking.pickupBranch"),
                value: t("booking.olayaBranch"),
              },
              {
                Icon: Navigation,
                label: t("booking.returnBranch"),
                value: t("booking.olayaBranch"),
              },
            ].map((item) => {
              const Icon = item.Icon;
              return (
                <View
                  key={item.label}
                  className="flex-row items-center gap-3 rounded-xl bg-muted px-3 py-2.5"
                >
                  <View className="flex-1">
                    <Text className="text-end font-tajawal text-[11px] text-muted-foreground">
                      {item.label}
                    </Text>
                    <Text className="text-end font-tajawal-bold text-sm text-foreground">
                      {item.value}
                    </Text>
                  </View>
                  <Icon size={15} color={colors.primary} />
                </View>
              );
            })}
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("booking.optionalExtras")}
          </Text>
          <View className="gap-2">
            {extrasList.map((item) => {
              const on = extras[item.key];
              return (
                <Pressable
                  key={item.key}
                  onPress={() =>
                    setExtras((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                  }
                  className={`flex-row items-center gap-3 rounded-2xl border-2 px-3 py-3 ${
                    on ? "border-primary/30 bg-secondary" : "border-border bg-muted"
                  }`}
                >
                  <Text className="font-tajawal-black text-sm text-primary">
                    +{item.price * 3} {t("common.sar")}
                  </Text>
                  <View className="flex-1">
                    <Text className="text-end font-tajawal-bold text-sm text-foreground">
                      {item.label}
                    </Text>
                    <Text className="text-end font-tajawal text-[10px] text-muted-foreground">
                      +{item.price} {t("booking.sarPerDay")}
                    </Text>
                  </View>
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                      on ? "border-primary bg-primary" : "border-border bg-card"
                    }`}
                  >
                    {on ? <Check size={12} color={colors.white} /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("booking.priceSummary")}
          </Text>
          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <Text className="font-tajawal-bold text-foreground">{base}</Text>
              <Text className="font-tajawal text-sm text-muted-foreground">
                {car.price} {t("booking.daysTimes")}
              </Text>
            </View>
            {xtra > 0 ? (
              <View className="flex-row justify-between">
                <Text className="font-tajawal-bold text-foreground">{xtra}</Text>
                <Text className="font-tajawal text-sm text-muted-foreground">
                  {t("booking.extras")}
                </Text>
              </View>
            ) : null}
            <View className="flex-row justify-between">
              <Text className="font-tajawal-bold text-foreground">{tax}</Text>
              <Text className="font-tajawal text-sm text-muted-foreground">
                {t("booking.vat")}
              </Text>
            </View>
            <View className="flex-row items-center justify-between border-t border-border pt-2.5">
              <Text className="font-tajawal-black text-xl text-primary">
                {total}{" "}
                <Text className="font-tajawal text-xs text-muted-foreground">
                  {t("common.sar")}
                </Text>
              </Text>
              <Text className="font-tajawal-black text-foreground">
                {t("booking.total")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 start-0 end-0 border-t border-border bg-card px-4 py-3 pb-8">
        <PrimaryButton
          label={t("booking.submit")}
          onPress={() =>
            router.push({
              pathname: "/confirmation",
              params: { id: car.id, total: String(total) },
            })
          }
        />
      </View>
    </ScreenWrapper>
  );
}
