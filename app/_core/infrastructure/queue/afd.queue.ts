import { Queue } from "bullmq";
import { redis } from "./redis";

export type AfdJobData = {
  tenantId: string;
  importId: string;
  afdFileId: string;
  filePath: string;
  layoutName?: string;
  storeRawText?: boolean;
};

export const afdQueue = new Queue<AfdJobData>("afd-import", {
  connection: redis,
});
