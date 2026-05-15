{
  /* <article className="flex flex-1 gap-4 text-sm font-semibold">
          <div className="size-25 bg-emerald-500 rounded-full"></div>
          <div className="flex flex-col justify-start gap-2 text-xs">
            <div className="flex flex-row items-center gap-2">
              <p className="text-lg">Juarez de Vasconcelos da Silva</p>
              <span className="bg-green-100 text-green-600 rounded-2xl px-4">
                ativo
              </span>
            </div>
            <p>
              Técnico Judiciário - Apoio Especializado - Tecnologia da
              Informação
            </p>
            <p>Diretor do Núcleo de Tecnologia da Informação</p>
            <p className="text-sky-600 text-xs">Matrícula: AM200401</p>
          </div>
        </article> */
}

type ServidorInfoCardProps = {
  name?: string;
  status?: string;
  position?: string;
  department?: string;
  register?: string;
};
export const ServidorInfoCard = ({
  name = "",
  status = "",
  position = "",
  department = "",
  register = "",
}: ServidorInfoCardProps) => {
  return (
    <div className="flex flex-1 gap-4 border rounded-md p-4 text-sm font-semibold min-w-120">
      {/* 
          Utilizamos template literals para injetar a classe. 
          Certifique-se de que a string passada em iconBgColor seja uma classe completa do Tailwind.
      */}
      <div className="size-15 bg-emerald-500 rounded-full"></div>
      <div className="flex flex-col justify-start gap-2 text-xs">
        <div className="flex flex-row items-center gap-2">
          <p className="text-lg">{name}</p>
          <span className="bg-green-100 text-green-600 rounded-2xl px-4">
            {status}
          </span>
        </div>
        <p>{position}</p>
        <p>{department}</p>
        <p className="text-sky-600 text-xs">Matrícula: {register}</p>
      </div>
    </div>
  );
};
