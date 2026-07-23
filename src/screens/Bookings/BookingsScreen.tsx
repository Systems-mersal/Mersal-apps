import { useRouter } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { StatusBadge } from "../../components/common/Badge/StatusBadge";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { BookingStatus, bookings } from "../../data/mock";
import { useLocale } from "../../localization/i18n";

const TABS: { id: BookingStatus; labelKey: "bookings.upcoming" | "bookings.past" | "bookings.activeBooking" | "common.statusCompleted" | "common.statusCancelled" | "common.statusPending" | "common.statusActive" }[] = [
  { id: "active", labelKey: "common.statusActive" },
  { id: "pending", labelKey: "common.statusPending" },
  { id: "completed", labelKey: "common.statusCompleted" },
  { id: "cancelled", labelKey: "common.statusCancelled" },
];

export function BookingsScreen() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<BookingStatus>("active");
  const current = bookings.filter((booking) => booking.status === tab);

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="bg-card pb-1">
        <View className="px-4 pb-1 pt-2">
          <Text className="text-end font-tajawal-black text-xl text-foreground">
            {t("bookings.title")}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-4 py-3"
        >
          {TABS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setTab(item.id)}
              className={`rounded-full px-3.5 py-1.5 ${
                tab === item.id ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text
                className={`font-tajawal-bold text-xs ${
                  tab === item.id ? "text-white" : "text-gray-600"
                }`}
              >
                {t(item.labelKey)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-4 py-3 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {current.length === 0 ? (
          <View className="items-center py-16">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
              <CalendarDays size={30} color="#D1D5DB" />
            </View>
            <Text className="mb-4 font-tajawal-bold text-sm text-muted-foreground">
              {t("bookings.emptyTitle")}
            </Text>
            <Pressable onPress={() => router.push("/listing")}>
              <Text className="font-tajawal-bold text-sm text-primary">
                {t("bookings.browseCars")}
              </Text>
            </Pressable>
          </View>
        ) : (
          current.map((booking) => {
            const title =
              locale === "ar"
                ? `${booking.car.brand} ${booking.car.model}`
                : `${booking.car.brandEn} ${booking.car.modelEn}`;
            return (
              <Pressable
                key={booking.id}
                onPress={() => router.push(`/details/${booking.car.id}`)}
                className="overflow-hidden rounded-2xl bg-card shadow-card"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: booking.car.image }}
                    className="h-[88px] w-28 bg-muted"
                    resizeMode="cover"
                  />
                  <View className="flex-1 p-3">
                    <View className="mb-1 flex-row items-start justify-between">
                      <StatusBadge status={booking.status} />
                      <Text className="flex-1 text-end font-tajawal-black text-sm text-foreground">
                        {title}
                      </Text>
                    </View>
                    <Text className="mb-1 text-end font-tajawal text-[10px] text-muted-foreground">
                      {booking.id}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="font-tajawal-black text-sm text-primary">
                        {booking.total} {t("common.sar")}
                      </Text>
                      <Text className="font-tajawal text-[10px] text-muted-foreground">
                        {locale === "ar"
                          ? `${booking.from} - ${booking.to}`
                          : `${booking.fromEn} - ${booking.toEn}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
