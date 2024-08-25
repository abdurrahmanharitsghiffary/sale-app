"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
} from "@mui/material";
import Link from "next/link";
import { useGetSales } from "@/hooks/api/get-sales";
import SearchInput from "@/components/input/search-input";
import { useSearchParams } from "next/navigation";
import { useDeleteSale } from "@/hooks/api/delete-sale";
import { useConfirm } from "material-ui-confirm";
import SortFilter from "@/components/select/sort-filter";

export default function SaleTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort_by = searchParams.get("sort_by") ?? "ASC";
  const order_by = searchParams.get("order_by") ?? "id";

  const { data } = useGetSales({
    page: page + 1,
    limit: rowsPerPage,
    search,
    order_by,
    sort_by: sort_by as any,
  });
  const sales = data?.data ?? [];
  const { mutateAsync } = useDeleteSale();
  const confirm = useConfirm();

  const columns = [
    "Transaction Date",
    "Invoice ID",
    "Customer Name",
    "Quantity",
    "Actions",
  ];

  const handleDelete = (id: number) => {
    confirm({
      title: "Delete Sale",
      description: "Are you sure delete this sale?",
      confirmationText: "Delete",
      confirmationButtonProps: { variant: "contained", color: "error" },
    }).then(() => {
      mutateAsync(id);
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box className="flex gap-2 w-full">
        <SearchInput />
        <SortFilter />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  {new Date(sale.transaction_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{sale.invoice_id}</TableCell>
                <TableCell>{sale.customer_name}</TableCell>
                <TableCell>
                  {sale.details.reduce((a, { quantity }) => a + quantity, 0)}
                </TableCell>
                <TableCell>
                  <Link href={`/sale/${sale.id}`} passHref>
                    <Button variant="contained" color="primary" size="small">
                      Detail
                    </Button>
                  </Link>
                  <Link href={`/sale/${sale.id}/edit`} passHref>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      style={{ marginLeft: "8px" }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(sale.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.meta?.total_filtered_record ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
