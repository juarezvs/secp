import { SectionTitle } from "@/app/ui/components/private/SectionTitle";

// src/app/(private)/dashboard/page.tsx
export default function Page() {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Importar"
        descripton="Permite importar servidor do SARH."
      />
    </div>
  );
}
