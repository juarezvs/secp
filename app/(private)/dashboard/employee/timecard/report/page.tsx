import { SectionTitle } from "@/app/_ui/components/private/section-title";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_ui/components/shadcn/combobox";

import { FileClock } from "lucide-react";

// src/app/(private)/dashboard/page.tsx

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <SectionTitle
          title="Espelho de ponto"
          icon={<FileClock />}
          descripton="Acompanhe seu espelho de ponto atual. Se quiser consultar períodos anteriores basta escolher o calendário abaixo."
        />
        <section>
          <Combobox items={frameworks}>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </section>
      </div>
    </div>
  );
}
