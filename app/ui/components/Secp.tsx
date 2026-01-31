import imgLogoSECP from "../../../public/brand/secp-logo.png";
import Image from "next/image";

export function Secp({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex justify-center">
        <Image
          src={imgLogoSECP}
          alt="SECP"
          width={120}
          height={120}
          priority
          className="h-auto w-16"
        />
      </div>
    </div>
  );
}
