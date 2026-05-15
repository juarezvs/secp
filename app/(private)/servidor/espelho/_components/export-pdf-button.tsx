"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileTextIcon, Loader2Icon } from "lucide-react";
import { RelatorioPontoPDF } from "./relatorio-pdf";

interface ExportPdfButtonProps {
  dados: unknown[];
  filename?: string;
}

export function ExportPdfButton({ dados, filename = "espelho-ponto.pdf" }: ExportPdfButtonProps) {
  return (
    <PDFDownloadLink
      document={<RelatorioPontoPDF dados={dados} />}
      fileName={filename}
      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
    >
      {({ loading }) =>
        loading ? (
          <>
            <Loader2Icon size={16} className="animate-spin" />
            Preparando...
          </>
        ) : (
          <>
            <FileTextIcon size={16} />
            Exportar PDF
          </>
        )
      }
    </PDFDownloadLink>
  );
}