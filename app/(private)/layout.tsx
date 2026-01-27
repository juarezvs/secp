import { Header } from "./dashboard/_components/Header";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="font-sans bg-secp-gray">{children}</div>
    </section>
  );
}
