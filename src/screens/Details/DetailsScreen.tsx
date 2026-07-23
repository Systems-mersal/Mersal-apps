import { useLocalSearchParams, useRouter } from "expo-router";
import {
  BadgeCheck,
  Car,
  ChevronLeft,
  ChevronRight,
  FileText,
  Fuel,
  Heart,
  MessageCircle,
  Navigation,
  Phone,
  Settings,
  Share2,
  Shield,
  User,
  Users,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { StatusBadge } from "../../components/common/Badge/StatusBadge";
import { PrimaryButton } from "../../components/common/Button/PrimaryButton";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { getCarById } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, locale, isRTL } = useLocale();
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;
  const car = getCarById(id ?? "1") ?? getCarById("1")!;
  const [activeImg, setActiveImg] = useState(0);
  const [fav, setFav] = useState(false);

  const imgs = useMemo(
    () => [
      car.image,
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=240&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549399542-7d3b0e25b98c?w=400&h=240&fit=crop&auto=format",
    ],
    [car.image],
  );

  const title =
    locale === "ar"
      ? `${car.brand} ${car.model}`
      : `${car.brandEn} ${car.modelEn}`;

  const specs = [
    {
      Icon: Settings,
      label: t("details.transmission"),
      value: locale === "ar" ? car.transmission : car.transmissionEn,
    },
    {
      Icon: Fuel,
      label: t("details.fuel"),
      value: locale === "ar" ? car.fuel : car.fuelEn,
    },
    { Icon: Users, label: t("details.seats"), value: `${car.seats}` },
    { Icon: Car, label: t("details.year"), value: `${car.year}` },
    { Icon: Navigation, label: t("details.mileage"), value: car.mileage },
    {
      Icon: Shield,
      label: t("details.insurance"),
      value: t("details.included"),
    },
  ];

  const terms = [
    {
      Icon: Shield,
      label: t("details.insurance"),
      value: t("details.included"),
    },
    {
      Icon: Navigation,
      label: t("details.mileage"),
      value: t("details.unlimited"),
    },
    {
      Icon: Fuel,
      label: t("details.fuelPolicy"),
      value: t("details.fullFull"),
    },
    {
      Icon: FileText,
      label: t("details.minAge"),
      value: t("details.age21"),
    },
  ];

  return (
    <ScreenWrapper className="flex-1 bg-background" edges={[]} withSafeArea={false}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative bg-foreground">
          <Image
            source={{ uri: imgs[activeImg] }}
            className="h-56 w-full bg-muted"
            resizeMode="cover"
          />
          <View className="absolute start-4 end-4 top-12 flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="h-9 w-9 items-center justify-center rounded-full bg-black/30"
            >
              <BackIcon size={18} color={colors.white} />
            </Pressable>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setFav((v) => !v)}
                className="h-9 w-9 items-center justify-center rounded-full bg-black/30"
              >
                <Heart
                  size={17}
                  color={fav ? "#F87171" : colors.white}
                  fill={fav ? "#F87171" : "transparent"}
                />
              </Pressable>
              <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-black/30">
                <Share2 size={16} color={colors.white} />
              </Pressable>
            </View>
          </View>
          <View className="absolute bottom-3 w-full flex-row justify-center gap-1.5">
            {imgs.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => setActiveImg(index)}
                className={`h-1.5 rounded-full ${
                  index === activeImg ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </View>
        </View>

        <View className="border-b border-border bg-card px-4 py-4">
          <View className="mb-2 flex-row items-start justify-between">
            <StatusBadge status="available" />
            <Text className="flex-1 text-end font-tajawal-black text-xl text-foreground">
              {title}
            </Text>
          </View>
          <View className="flex-row items-center justify-end gap-2">
            <Text className="font-tajawal text-sm text-muted-foreground">
              {locale === "ar" ? car.company : car.companyEn}
            </Text>
            <Text className="font-tajawal-bold text-sm text-foreground">
              ★ {car.rating}
            </Text>
          </View>
        </View>

        <View className="mx-4 my-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("details.specifications")}
          </Text>
          <View className="flex-row flex-wrap gap-2.5">
            {specs.map((spec) => {
              const Icon = spec.Icon;
              return (
                <View
                  key={spec.label}
                  className="w-[30%] items-center gap-1.5 rounded-2xl bg-muted p-3"
                >
                  <View className="h-8 w-8 items-center justify-center rounded-xl bg-secondary">
                    <Icon size={15} color={colors.primary} />
                  </View>
                  <Text className="text-center font-tajawal text-[10px] text-muted-foreground">
                    {spec.label}
                  </Text>
                  <Text className="text-center font-tajawal-black text-xs text-foreground">
                    {spec.value}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("details.rentalTerms")}
          </Text>
          <View className="gap-3">
            {terms.map((item) => {
              const Icon = item.Icon;
              return (
                <View key={item.label} className="flex-row items-center gap-3">
                  <Text className="font-tajawal-bold text-sm text-foreground">
                    {item.value}
                  </Text>
                  <View className="flex-1" />
                  <Text className="font-tajawal text-sm text-muted-foreground">
                    {item.label}
                  </Text>
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                    <Icon size={13} color={colors.success} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("details.rentalCompany")}
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row gap-2">
              <Pressable className="h-9 w-9 items-center justify-center rounded-xl bg-secondary">
                <Phone size={15} color={colors.primary} />
              </Pressable>
              <Pressable
                onPress={() => router.push("/company")}
                className="h-9 w-9 items-center justify-center rounded-xl bg-secondary"
              >
                <MessageCircle size={15} color={colors.primary} />
              </Pressable>
            </View>
            <Pressable
              onPress={() => router.push("/company")}
              className="flex-1"
            >
              <View className="mb-0.5 flex-row items-center justify-end gap-1.5">
                <BadgeCheck size={14} color={colors.success} />
                <Text className="font-tajawal-black text-foreground">
                  {locale === "ar" ? car.company : car.companyEn}
                </Text>
              </View>
              <Text className="text-end font-tajawal text-xs text-muted-foreground">
                ★ 4.8 · 312
              </Text>
            </Pressable>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
              <Car size={22} color={colors.primary} />
            </View>
          </View>
        </View>

        <View className="mx-4 mb-3 rounded-2xl bg-card p-4 shadow-card">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-tajawal-medium text-sm text-primary">
              {t("details.all")}
            </Text>
            <Text className="font-tajawal-black text-base text-foreground">
              {t("details.reviews")}
            </Text>
          </View>
          <View className="mb-4 flex-row items-center gap-4 rounded-2xl bg-muted p-3">
            <View className="flex-1 gap-1">
              {[5, 4, 3, 2, 1].map((n) => (
                <View key={n} className="flex-row items-center gap-2">
                  <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <View
                      className="h-full rounded-full bg-amber-400"
                      style={{
                        width:
                          n === 5
                            ? "72%"
                            : n === 4
                              ? "18%"
                              : n === 3
                                ? "7%"
                                : "3%",
                      }}
                    />
                  </View>
                  <Text className="w-2 font-tajawal text-[10px] text-muted-foreground">
                    {n}
                  </Text>
                </View>
              ))}
            </View>
            <View className="items-center">
              <Text className="font-tajawal-black text-3xl text-primary">
                {car.rating}
              </Text>
              <Text className="mt-0.5 font-tajawal text-[10px] text-muted-foreground">
                {car.reviews} {t("details.reviewsCount")}
              </Text>
            </View>
          </View>

          {[
            {
              name: t("details.review1Name"),
              text: t("details.review1Text"),
              time: t("details.weekAgo"),
            },
            {
              name: t("details.review2Name"),
              text: t("details.review2Text"),
              time: t("details.twoWeeksAgo"),
            },
          ].map((review, index) => (
            <View
              key={review.name}
              className={index > 0 ? "mt-3 border-t border-border pt-3" : ""}
            >
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="font-tajawal text-[11px] text-muted-foreground">
                  {review.time}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="font-tajawal-bold text-sm text-foreground">
                    {review.name}
                  </Text>
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <User size={13} color={colors.primary} />
                  </View>
                </View>
              </View>
              <Text className="text-end font-tajawal text-sm text-gray-600">
                {review.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 start-0 end-0 flex-row items-center gap-4 border-t border-border bg-card px-4 py-3 pb-8">
        <PrimaryButton
          label={t("details.bookNow")}
          onPress={() => router.push(`/booking/${car.id}`)}
          className="flex-1"
        />
        <View>
          <Text className="text-end font-tajawal text-[11px] text-muted-foreground">
            {t("details.perDay")}
          </Text>
          <Text className="font-tajawal-black text-xl text-primary">
            {car.price}{" "}
            <Text className="font-tajawal text-xs text-muted-foreground">
              {t("common.sar")}
            </Text>
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
