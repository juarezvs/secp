"use client";
import * as React from "react";
import { toast } from "sonner";

import { Checkbox } from "@/app/ui/components/shadcn/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/shadcn/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/components/shadcn/dropdown-menu";

import { Button } from "@/app/_ui/components/shadcn/button";
import { TenantDTO } from "../../lib/definition";
import { DatabaseBackupIcon, MoreHorizontalIcon } from "lucide-react";
import { createTenantAction, resultTenant } from "../../actions";
import { es } from "zod/v4/locales";

const TenantSarhTable = ({ data }: { data: TenantDTO[] }) => {
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

  const handleImportSelected = async () => {
    const selectedData = data.filter((row) => selectedRows.has(row.id));

    selectedData.forEach(async (row) => {
      const res: resultTenant = await createTenantAction({
        name: row.descricao,
        nickname: row.sigla,
        externalSarhId: row.id,
      });

      if (res.success) {
        toast.success(`${row.descricao} importada com sucesso!`);
      } else {
        toast.warning(`${res.error}`);
      }
    });
  };

  const handleSelectRow = (id: string, checked: boolean) => {
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
      <Button
        variant="outline"
        // 1. O atributo HTML disabled recebe a lógica (true/false)
        disabled={!selectedRows.size}
        // 2. Classes Tailwind normais + classes para quando estiver desabilitado (disabled:)
        className=" cursor-pointer bg-secp-button-active text-white px-4 py-2 mb-2 rounded-xl hover:bg-secp-button-hover hover:text-white
                 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-80"
        onClick={handleImportSelected}
      >
        <DatabaseBackupIcon />
        Importar selecionados
      </Button>

      <Table>
        <TableHeader>
          <TableRow className="bg-secp-blue  hover:bg-secp-blue ">
            <TableHead className="w-8">
              <Checkbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="text-white uppercase font-semibold">
              Sigla
            </TableHead>
            <TableHead className="text-white uppercase font-semibold">
              Nome
            </TableHead>
            <TableHead className="text-white uppercase font-semibold"></TableHead>
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
              <TableCell className="hover:text-red-500">
                <Checkbox
                  id={`row-${row.id}-checkbox`}
                  name={`row-${row.id}-checkbox`}
                  checked={selectedRows.has(row.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(row.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{row.sigla}</TableCell>
              <TableCell>{row.descricao}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-zinc-400">
                      Ações
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={async () => {
                        await createTenantAction({
                          name: row.descricao,
                          nickname: row.sigla,
                          externalSarhId: row.id,
                        });
                      }}
                    >
                      Importar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Desativar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TenantSarhTable;
