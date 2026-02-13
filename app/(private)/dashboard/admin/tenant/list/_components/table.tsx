"use client";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/shadcn/table";

import { TenantDTO } from "../../lib/definition";
import { createTenantAction } from "../../actions";
import Image from "next/image";
import { toast } from "sonner";

type CityRow = {
  uf: string;
  nome: string;
};

export const FlagCell = ({ uf, nome }: CityRow) => {
  const code = (uf || "").trim().toLowerCase();
  const alowed = new Set([
    "sjac",
    "sjal",
    "sjap",
    "sjam",
    "sjba",
    "sjce",
    "sjdf",
    "sjes",
    "sjgo",
    "sjma",
    "sjmt",
    "sjms",
    "sjmg",
    "sjpa",
    "sjpb",
    "sjpr",
    "sjpe",
    "sjpi",
    "sjrj",
    "sjrn",
    "sjrs",
    "sjro",
    "sjrr",
    "sjsc",
    "sjsp",
    "sjse",
    "sjto",
  ]);
  if (!alowed.has(code)) {
    console.warn(`Código de estado inválido: ${code}`);
  }
  const flagUrl = alowed.has(code)
    ? `/flag/cities/svg/${code}-circle.svg`
    : "/flag/cities/svg/default.svg";
  console.log("FLAG URL:", flagUrl);
  return (
    <div className="flex items-center ">
      <Image
        src={flagUrl}
        alt={`Bandeira de ${nome} (${code.toUpperCase()})`}
        width={24}
        height={16}
      />
    </div>
  );
};

const TenantTable = ({ data }: { data: TenantDTO[] }) => {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(),
  );

  const selectAll = data.length > 0 && selectedRows.size === data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(data?.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleImportSelected = () => {
    const selectedData = data.filter((row) => selectedRows.has(row.id));

    selectedData.forEach((row) => {
      try {
        createTenantAction({
          name: row.descricao,
          nickname: row.sigla,
          externalSarhId: row.id,
        });
      } catch (error) {
        toast.error(`Erro ao importar o tenant: ${row.descricao}`);
        console.error(`Erro ao importar o tenant: ${row.descricao}`, error);
      }
    });
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });

    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className="mt-6 flow-root">
      <Table>
        <TableHeader>
          <TableRow className="bg-secp-blue  hover:bg-secp-blue ">
            <TableHead className="text-white uppercase font-semibold"></TableHead>

            <TableHead className="text-white uppercase font-semibold">
              Nome
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              onClick={() => {
                const checked = selectedRows.has(row.id);
                handleSelectRow(row.id, !checked);
              }}
              //border text-secp-blue font-semibold border-zinc-400 shadow-md bg-[#DDE3EA]
              className="data-[state=selected]:bg-[#DDE3EA] data-[state=selected]:text-secp-blue data-[state=selected]:border-zinc-400 data-[state=selected]:font-semibold  hover:bg-secp-green/10 cursor-pointer"
              key={row.id}
              data-state={selectedRows.has(row.id) ? "selected" : undefined}
            >
              <TableCell className="font-medium">
                <FlagCell uf={row.sigla} nome={row.descricao} />
              </TableCell>
              <TableCell>
                {row.sigla} - {row.descricao}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TenantTable;
