import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
export const metadata: Metadata = { title: "Шерзод Ахмедов | Middle Flutter и Full-stack разработчик", description: "Портфолио Шерзода Ахмедова: Flutter, full-stack, ИИ-системы и игры. Ташкент. Открыт к удалённой работе и переезду.", openGraph: { locale: "ru_RU" } };
export default function Page() { return <HomePage locale="ru" />; }
