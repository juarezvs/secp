import { CompanyRepository } from "@/app/domain/org/ports";

export class CreateCompanyUseCase {
  constructor(private companies: CompanyRepository) {}

  async execute(input: { code: string; name: string }) {
    if (!input.code?.trim() || !input.name?.trim())
      throw new Error("code e name são obrigatórios");
    return this.companies.create({
      code: input.code.trim(),
      name: input.name.trim(),
    });
  }
}
