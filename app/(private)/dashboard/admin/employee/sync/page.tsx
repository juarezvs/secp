import { SectionTitle } from "@/app/ui/components/private/SectionTitle";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// src/app/(private)/dashboard/page.tsx
export default function Page() {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Sincronizar"
        descripton="Permite sincronizar os dados dos servidores com os do SARH."
        icon={<ArrowPathIcon className="w-8" />}
      />
    </div>
  );
}
