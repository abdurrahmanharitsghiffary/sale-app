import SaleDetailTable from "@/components/table/sale/sale-detail-table";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <SaleDetailTable saleId={+params?.id} />;
}
