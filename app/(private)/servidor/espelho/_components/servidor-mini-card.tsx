type ServidorMiniCardProps = {
  title: string;
  subTitle?: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string; // Nova prop opcional
  iconTextColor?: string; // Nova prop opcional
  titleTextColor?: string; // Nova prop para cor do título, opcional
  valueTextColor?: string; // Nova prop para cor do valor, opcional
};
export const ServidorMiniCard = ({
  title,
  subTitle,
  value,
  icon,
  iconBgColor = "bg-slate-200", // Valor padrão caso não seja enviado
  iconTextColor = "text-white", // Valor padrão caso não seja enviado
  titleTextColor = "text-slate-800", // Valor padrão caso não seja enviado
  valueTextColor = "text-slate-800", // Valor padrão caso não seja enviado
}: ServidorMiniCardProps) => {
  return (
    <div className="flex flex-1 gap-4 border rounded-md p-4 text-sm font-semibold min-w-52">
      {/* 
          Utilizamos template literals para injetar a classe. 
          Certifique-se de que a string passada em iconBgColor seja uma classe completa do Tailwind.
      */}
      <div
        className={`flex items-center justify-center size-10 rounded-full shrink-0 ${iconBgColor} ${iconTextColor}`}
      >
        {icon}
      </div>
      <div>
        <p className={`font-medium ${titleTextColor}`}>{title}</p>
        <p className={`text-2xl font-bold ${valueTextColor}`}>{value}</p>
        {subTitle && (
          <p className="text-xs text-muted-foreground">{subTitle}</p>
        )}
      </div>
    </div>
  );
};
