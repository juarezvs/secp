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
    <div className="flex  gap-4 border rounded-xl  shadow-sm p-4 text-xs sm:text-sm md:text-base font-semibold ">
      {/* <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm" > */}
      <div
        className={`flex items-center justify-center  size-6 sm:size-8 rounded-full shrink-0 ${iconBgColor} ${iconTextColor}  `}
      >
        {icon}
      </div>
      <div>
        <p
          className={`text-xs ${titleTextColor} sm:text-green-500 md:text-red-500 lg:text-sky-500 xl:text-yellow-500`}
        >
          {title}
        </p>
        <p className={`text-lg font-bold ${valueTextColor}`}>{value}</p>
        {subTitle && (
          <p className="text-xs text-muted-foreground">{subTitle}</p>
        )}
      </div>
    </div>
  );
};
