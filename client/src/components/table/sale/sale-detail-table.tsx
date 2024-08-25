"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useGetSaleById } from "@/hooks/api/get-sale-by-id";
import NotFoundPage from "@/components/not-found";
import Loading from "@/components/loading";

interface SaleDetailTableProps {
  saleId: number;
}

export default function SaleDetailTable({ saleId }: SaleDetailTableProps) {
  const { data, isError, error, isLoading } = useGetSaleById(saleId);
  const sale = data?.data;
  console.log(data, "DATA");
  console.log(error, "ERRORR");
  console.log(isError, "isError");

  if (isLoading) return <Loading />;
  if (isError) return <NotFoundPage message="Sale not found" />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{sale?.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transaction Date</TableCell>
            <TableCell>
              {new Date(
                sale?.transaction_date ?? Date.now()
              ).toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Invoice ID</TableCell>
            <TableCell>{sale?.invoice_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>{sale?.customer_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell>{sale?.tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount</TableCell>
            <TableCell>{sale?.discount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Price</TableCell>
            <TableCell>{sale?.total_price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Updated At</TableCell>
            <TableCell>
              {new Date(sale?.updated_at ?? Date.now()).toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell>
              {sale?.details.map((detail, index) => (
                <div key={index}>
                  <Typography>Product ID: {detail.product_id}</Typography>
                  <Typography>Quantity: {detail.quantity}</Typography>
                  <Typography>Price: {detail.price}</Typography>
                </div>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
