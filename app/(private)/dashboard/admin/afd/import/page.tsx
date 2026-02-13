import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { AfdDropzone } from "./_components/AfdDropzone";

export default function Page() {
  return (
    <>
      <section>
        <SectionTitle
          title="Importação de AFD"
          descripton="Siga as instruções para enviar seus arquivos AFD. Você pode enviar múltiplos arquivos de uma vez, mas certifique-se de que o total não exceda 300MB."
        />
      </section>

      <main className="mx-auto w-full max-w-4xl p-6">
        <header className="mb-6">
          <p className="mt-1 text-sm text-gray-600">
            Arraste e solte múltiplos arquivos AFD na área abaixo, ou clique
            para selecionar.
          </p>
        </header>

        <AfdDropzone
          uploadUrl="upload"
          maxFiles={50}
          maxTotalBytes={300 * 1024 * 1024}
          acceptExtensions={[".afd", ".txt", ".dat"]}
        />
      </main>
    </>
  );
}
