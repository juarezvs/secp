import { SectionTitle } from "@/app/_ui/components/private/section-title";
import ImportTable from "./_components/table";

export default function Page() {
  return (
    <>
      <section>
        <SectionTitle
          title="Últimas importações realizadas."
          descripton="Verifique se todas foram processadas. Caso exista alguma pendente, reprocesse. "
        />
      </section>

      <main className="mx-auto w-full max-w-4xl p-6">
      <ImportTable data={[]}  />

        
      </main>
    </>
  );
}
