import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { auth } from "@/auth";
import { CalendarClock } from "lucide-react";
import { redirect } from "next/navigation";

// src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <SectionTitle
          title="Meu ponto"
          icon={<CalendarClock />}
          descripton="Acompanhe seus registros de horários."
        />
      </div>
    </div>
  );
}
