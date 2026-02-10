import { EmployeeRepository } from "@/app/_core/domain/people/ports";

export class CreateEmployeeUseCase {
  constructor(private employees: EmployeeRepository) {}

  async execute(input: {
    companyId: string;
    branchId: string;
    email: string;
    name: string;
    matricula?: string;
    sarhUf?: string;
  }) {
    if (!input.email.includes("@")) throw new Error("email inválido");
    return this.employees.create({
      companyId: input.companyId,
      branchId: input.branchId,
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      matricula: input.matricula?.trim() || null,
      sarhUf: input.sarhUf?.trim().toUpperCase() || null,
    });
  }
}
