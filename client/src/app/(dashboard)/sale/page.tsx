import SaleTable from "@/components/table/sale/sale-table";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-[100dvh]">
      <Suspense>
        <SaleTable />
      </Suspense>
    </main>
  );
}
