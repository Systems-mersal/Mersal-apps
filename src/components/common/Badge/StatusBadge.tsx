import { Text, View } from "react-native";
import { TranslationKey, useLocale } from "../../../localization/i18n";

type Status =
  | "active"
  | "pending"
  | "completed"
  | "cancelled"
  | "available"
  | "unavailable";

const STATUS_STYLES: Record<
  Status,
  { className: string; textClassName: string; labelKey: TranslationKey }
> = {
  active: {
    className: "bg-emerald-100",
    textClassName: "text-emerald-700",
    labelKey: "common.statusActive",
  },
  pending: {
    className: "bg-amber-100",
    textClassName: "text-amber-700",
    labelKey: "common.statusPending",
  },
  completed: {
    className: "bg-gray-100",
    textClassName: "text-gray-600",
    labelKey: "common.statusCompleted",
  },
  cancelled: {
    className: "bg-red-100",
    textClassName: "text-red-600",
    labelKey: "common.statusCancelled",
  },
  available: {
    className: "bg-emerald-100",
    textClassName: "text-emerald-700",
    labelKey: "common.available",
  },
  unavailable: {
    className: "bg-red-100",
    textClassName: "text-red-600",
    labelKey: "common.unavailable",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useLocale();
  const style = STATUS_STYLES[status];

  return (
    <View className={`rounded-full px-2 py-0.5 ${style.className}`}>
      <Text className={`font-tajawal-bold text-[10px] ${style.textClassName}`}>
        {t(style.labelKey)}
      </Text>
    </View>
  );
}
