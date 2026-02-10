import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { CalendarClock } from "lucide-react";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
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
