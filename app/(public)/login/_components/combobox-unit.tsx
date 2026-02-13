"use client";

import { useState } from "react";
import { UnitLoginType } from "../definitions";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/app/ui/components/shadcn/native-select";
import { FlagCell } from "@/app/(private)/dashboard/admin/tenant/list/_components/table";

export function ComboboxUnit({ items }: { items: UnitLoginType[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <NativeSelect>
      <NativeSelectOption value="">Escolha sua unidade</NativeSelectOption>
      {items.map((item) => (
        <NativeSelectOption key={item.id} value={item.id}>
          <FlagCell uf={item.nickname} nome={item.label}/>
          {item.nickname}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
