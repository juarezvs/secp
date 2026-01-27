import "server-only";
import crypto from "node:crypto";

export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// para CLOCK: usa serial + nsr
export function clockIdempotencyKey(params: {
  clockSerial: string;
  nsr: string;
}) {
  return sha256(`CLOCK:${params.clockSerial}:${params.nsr}`);
}

// para SECP: usa employee + instante UTC
export function secpIdempotencyKey(params: {
  employeeId: string;
  occurredAtUtcISO: string;
}) {
  return sha256(`SECP:${params.employeeId}:${params.occurredAtUtcISO}`);
}
