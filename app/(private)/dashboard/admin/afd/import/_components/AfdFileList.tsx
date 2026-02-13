"use client";

import React, { useMemo } from "react";

export type FileItem = {
  id: string;
  file: File;
};

function bytesToHuman(n: number) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function AfdFileList({
  items,
  onRemove,
}: {
  items: FileItem[];
  onRemove: (id: string) => void;
}) {
  const rows = useMemo(
    () =>
      items.map((it) => ({
        id: it.id,
        name: it.file.name,
        size: it.file.size,
        type: it.file.type || "—",
        lastModified: new Date(it.file.lastModified).toLocaleString(),
      })),
    [items],
  );

  if (!rows.length) {
    return (
      <div className="rounded-lg border p-4 text-sm text-gray-600">
        Nenhum arquivo selecionado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">
        Arquivos selecionados
      </div>

      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.name}</p>
              <p className="mt-0.5 text-xs text-gray-600">
                {bytesToHuman(r.size)} • {r.type} • {r.lastModified}
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg border px-3 py-1.5 text-xs text-white bg-red-700 cursor-pointer hover:bg-red-500 transition-colors"
              onClick={() => onRemove(r.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
