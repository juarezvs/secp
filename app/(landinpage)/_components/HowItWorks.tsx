export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">
          Como funciona
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            "Conecte seus relógios",
            "Parametrize regras",
            "Acompanhe e aprove",
          ].map((title, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#002F6C] to-[#007A33] text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#002F6C]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {i === 0 && "Importe automaticamente batidas dos relógios."}
                {i === 1 &&
                  "Defina jornadas, feriados, escalas e exceções por unidade e servidor."}
                {i === 2 &&
                  "Monitore indicadores e aprove solicitações com total rastreabilidade."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
