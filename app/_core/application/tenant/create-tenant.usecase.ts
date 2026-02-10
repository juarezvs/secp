import { TenantProps } from "../../domain/tenant/entities";
import { TenantRepository } from "../../domain/tenant/ports";

export class CreateTenantUseCase {
  constructor(private tenant: TenantRepository) {}

  async execute(input: TenantProps) {
    // if (!input.email.includes("@")) throw new Error("email inválido");

    return this.tenant.create({ ...input });
  }
}
