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

import { TenantDTO } from "../../../tenant/lib/definition";
// import { createTenantAction } from "../../import/actions";

const ImportTable = ({ data }: { data: TenantDTO[] }) => {
  // const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
  //   new Set(),
  // );

  // const selectAll = data.length > 0 && selectedRows.size === data.length;

  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedRows(new Set(data?.map((row) => row.id)));
  //   } else {
  //     setSelectedRows(new Set());
  //   }
  // };

  // const handleImportSelected = () => {
  //   const selectedData = data.filter((row) => selectedRows.has(row.id));
  //   console.log("SELECIONADO:", selectedData);

  //   selectedData.forEach((row) => {
  //     createTenantAction({
  //       name: row.descricao,
  //       nickname: row.sigla,
  //       externalId: row.id,
  //     });
  //   });
  // };

  // const handleSelectRow = (id: number, checked: boolean) => {
  //   setSelectedRows((prev) => {
  //     const next = new Set(prev);
  //     if (checked) next.add(id);
  //     else next.delete(id);
  //     return next;
  //   });

  //   const newSelected = new Set(selectedRows);
  //   if (checked) {
  //     newSelected.add(id);
  //   } else {
  //     newSelected.delete(id);
  //   }
  //   setSelectedRows(newSelected);
  // };

  return (
    <div className="mt-6 flow-root">
      <Table>
        <TableHeader>
          <TableRow className="bg-secp-blue  hover:bg-secp-blue ">
            <TableHead className="text-white uppercase font-semibold">
              Arquivo
            </TableHead>
            <TableHead className="text-white uppercase font-semibold">
              Tamanho
            </TableHead>
            <TableHead className="text-white uppercase font-semibold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              // onClick={() => {
              //   const checked = selectedRows.has(row.id);
              //   handleSelectRow(row.id, !checked);
              // }}
              //border text-secp-blue font-semibold border-zinc-400 shadow-md bg-[#DDE3EA]
              className="data-[state=selected]:bg-[#DDE3EA] data-[state=selected]:text-secp-blue data-[state=selected]:border-zinc-400 data-[state=selected]:font-semibold  hover:bg-secp-green/10 cursor-pointer"
              key={row.id}
              // data-state={selectedRows.has(row.id) ? "selected" : undefined}
            >
              <TableCell className="font-medium">{row.sigla}</TableCell>
              <TableCell>{row.descricao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
