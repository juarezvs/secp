import { SectionTitle } from "@/app/ui/components/private/SectionTitle";
import { RefreshCcw } from "lucide-react";

// src/app/(private)/dashboard/page.tsx
export default function Page() {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Sincronizar"
        descripton="Permite sincronizar os dados dos servidores com os do SARH."
        icon={<RefreshCcw className="w-8" />}
      />
    </div>
  );
}
