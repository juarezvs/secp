import fs from "node:fs/promises";
import { afdFileToJson, LAYOUT_BASE } from "./afd-to-json";

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Uso: ts-node scripts/convert-afd.ts <arquivo.afd>");
    process.exit(1);
  }

  const json = await afdFileToJson(input, LAYOUT_BASE);

  console.log("json: ", json);
  const outPath = input.replace(/\.(afd|txt|dat)$/i, "") + ".json";

  await fs.writeFile(outPath, JSON.stringify(json, null, 2), "utf-8");
  console.log("Gerado:", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
