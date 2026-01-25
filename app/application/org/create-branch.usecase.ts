import { BranchRepository } from "@/app/domain/org/ports";

export class CreateBranchUseCase {
  constructor(private branches: BranchRepository) {}

  async execute(input: {
    companyId: string;
    code: string;
    name: string;
    timezone: string;
  }) {
    if (!input.companyId) throw new Error("companyId é obrigatório");
    if (!input.timezone) throw new Error("timezone é obrigatório");
    return this.branches.create({
      companyId: input.companyId,
      code: input.code.trim(),
      name: input.name.trim(),
      timezone: input.timezone,
    });
  }
}
