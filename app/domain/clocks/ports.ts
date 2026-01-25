export type ClockProps = {
  id: string;
  branchId: string;
  serial: string;
  model: string;
  ip?: string | null;
};

export interface ClockRepository {
  create(data: Omit<ClockProps, "id">): Promise<ClockProps>;
}
