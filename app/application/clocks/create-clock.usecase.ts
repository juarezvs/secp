import { ClockRepository } from "@/app/domain/clocks/ports";

export class CreateClockUseCase {
  constructor(private clocks: ClockRepository) {}

  async execute(input: {
    branchId: string;
    serial: string;
    model: string;
    ip?: string;
  }) {
    if (!input.branchId) throw new Error("branchId é obrigatório");
    if (!input.serial) throw new Error("serial é obrigatório");

    return this.clocks.create({
      branchId: input.branchId,
      serial: input.serial.trim(),
      model: input.model.trim(),
      ip: input.ip?.trim() || null,
    });
  }
}
