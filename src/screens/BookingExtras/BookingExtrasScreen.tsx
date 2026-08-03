import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "../../components/buttons/AppButton";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";
import { BookingStepHeader } from "../shared/BookingStepHeader";
import { StickyBottomBar, ToggleSwitch } from "../shared/BookingUi";

type Props = NativeStackScreenProps<RootStackParamList, "BookingExtras">;

const EXTRA_KEYS = ["insurance", "driver", "childSeat", "gps", "airport"] as const;
type ExtraKey = (typeof EXTRA_KEYS)[number];

const DEFAULT_SELECTED: Record<ExtraKey, boolean> = {
  insurance: true,
  driver: false,
  childSeat: true,
  gps: false,
  airport: false,
};

const EXTRA_AMOUNTS: Record<ExtraKey, number> = {
  insurance: 200,
  driver: 150,
  childSeat: 50,
  gps: 30,
  airport: 100,
};

export function BookingExtrasScreen({ navigation, route }: Props) {
  const { t } = useTranslation(["booking-extras", "common"]);
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(DEFAULT_SELECTED);

  const totalExtras = useMemo(
    () =>
      EXTRA_KEYS.reduce(
        (sum, key) => (selected[key] ? sum + EXTRA_AMOUNTS[key] : sum),
        0,
      ),
    [selected],
  );

  const toggleExtra = (key: ExtraKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View className="flex-1 bg-backgroundWarm">
      <BookingStepHeader
        step={t("step", { current: 2, total: 4 })}
        title={t("title")}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 140, paddingHorizontal: 24 }}
      >
        <AppText variant="body" muted className="mb-3 mt-1 text-right">
          {t("subtitle")}
        </AppText>

        {EXTRA_KEYS.map((key) => (
          <View
            key={key}
            className="mb-3 flex-row items-center rounded-[20px] bg-white px-[18px] py-[18px]"
          >
            <ToggleSwitch
              value={selected[key]}
              onValueChange={() => toggleExtra(key)}
            />
            <View className="ml-4 flex-1 items-end">
              <AppText variant="label" className="text-right">
                {t(`items.${key}.name`)}
              </AppText>
              <AppText variant="caption" muted className="mt-1 text-right">
                {t(`items.${key}.description`)}
              </AppText>
              <AppText variant="label" className="mt-1 text-primary">
                {t(`items.${key}.price`)}
              </AppText>
            </View>
          </View>
        ))}
      </ScrollView>

      <StickyBottomBar className="py-[26px]">
        <View className="flex-row items-center justify-between">
          <AppButton
            label={t("continue")}
            onPress={() =>
              navigation.navigate("BookingReview", { vehicleId: route.params.vehicleId })
            }
            className="h-[58px] min-w-[161px] rounded-[29px]"
          />
          <View className="items-end">
            <AppText variant="caption" muted>
              {t("total-extras")}
            </AppText>
            <AppText variant="title" className="text-primary">
              {totalExtras} {t("common:currency")}
            </AppText>
            <AppText variant="caption" muted className="mt-0.5">
              {t("vat-disclaimer")}
            </AppText>
          </View>
        </View>
      </StickyBottomBar>
    </View>
  );
}
