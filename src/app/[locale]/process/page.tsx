import { getTranslations } from "next-intl/server";
import ProcessClient from "./ProcessClient";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "process" });
  return {
    title: `${t("title")} | Indra Luxe`,
    description: t("subtitle"),
  };
}

export default function ProcessPage() {
  return <ProcessClient />;
}
