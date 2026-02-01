import imgLogoSECP from "../../../public/brand/secp-logo.png";

import Image from "next/image";

export const Secp = () => {
  return (
    <div className="flex items-center gap-2">
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
};
