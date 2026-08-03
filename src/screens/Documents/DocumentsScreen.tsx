import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppIcon } from "../../components/icons/AppIcon";
import { AppText } from "../../components/typography/AppText";
import type { RootStackParamList } from "../../navigation/types";
import { DocumentCard } from "./components/DocumentCard";

type Props = NativeStackScreenProps<RootStackParamList, "Documents">;

export function DocumentsScreen({ navigation }: Props) {
  const { t } = useTranslation("documents");
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View
        className="flex-row items-center justify-between border-b border-border bg-white px-6 pb-4"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Notifications")}
          className="h-11 w-11 items-center justify-center rounded-full bg-background active:opacity-70"
        >
          <AppIcon name="bell" size={20} color="#1f2937" />
        </Pressable>
        <AppText variant="title">{t("title")}</AppText>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          className="h-11 w-11 items-center justify-center rounded-full bg-background active:opacity-70"
        >
          <AppIcon name="chevron-right" size={20} color="#1f2937" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <DocumentCard
          title={t("driving-license")}
          status="verified"
          statusLabel={t("verified")}
          uploadedAt={t("uploaded-at", { date: t("dates.license") })}
          numberLabel={t("license-number", { number: t("masked-numbers.license") })}
          updateLabel={t("update")}
        />
        <DocumentCard
          title={t("id-card")}
          status="verified"
          statusLabel={t("verified")}
          uploadedAt={t("uploaded-at", { date: t("dates.id") })}
          numberLabel={t("id-number", { number: t("masked-numbers.id") })}
          updateLabel={t("update")}
        />
        <DocumentCard
          title={t("passport")}
          status="pending"
          statusLabel={t("pending")}
          uploadedAt={t("uploaded-at", { date: t("dates.passport") })}
          numberLabel={t("passport-number", { number: t("masked-numbers.passport") })}
          updateLabel={t("update")}
        />

        <Pressable
          accessibilityRole="button"
          className="mt-1 h-[54px] flex-row items-center justify-center rounded-[27px] border border-dashed border-primary bg-primary/5 active:opacity-80"
        >
          <AppText variant="label" className="text-primary">
            {t("upload-new")}
          </AppText>
          <AppIcon name="plus" size={16} color="#117066" />
        </Pressable>
      </ScrollView>
    </View>
  );
}
