import { Bell } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

const NOTIFICATIONS = [
  {
    id: "1",
    titleKey: "notifications.bookingConfirmed" as const,
    bodyKey: "notifications.bookingConfirmedBody" as const,
    unread: true,
  },
  {
    id: "2",
    titleKey: "notifications.promoTitle" as const,
    bodyKey: "notifications.promoBody" as const,
    unread: true,
  },
  {
    id: "3",
    titleKey: "notifications.reminderTitle" as const,
    bodyKey: "notifications.reminderBody" as const,
    unread: false,
  },
];

export function NotificationsScreen() {
  const { t } = useLocale();

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="mb-2 flex-row items-center justify-between px-4 pt-2">
        <Pressable>
          <Text className="font-tajawal-medium text-sm text-primary">
            {t("notifications.markAllRead")}
          </Text>
        </Pressable>
        <Text className="font-tajawal-black text-xl text-foreground">
          {t("notifications.title")}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-4 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.map((item) => (
          <View
            key={item.id}
            className={`flex-row gap-3 rounded-2xl bg-card p-4 shadow-card ${
              item.unread ? "border border-secondary" : ""
            }`}
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
              <Bell size={18} color={colors.primary} />
            </View>
            <View className="flex-1">
              <View className="mb-1 flex-row items-center justify-between">
                {item.unread ? (
                  <View className="h-2 w-2 rounded-full bg-primary" />
                ) : (
                  <View />
                )}
                <Text className="flex-1 text-end font-tajawal-bold text-sm text-foreground">
                  {t(item.titleKey)}
                </Text>
              </View>
              <Text className="text-end font-tajawal text-xs leading-5 text-muted-foreground">
                {t(item.bodyKey)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
