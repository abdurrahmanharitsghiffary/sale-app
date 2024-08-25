"use client";

import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function SortFilter() {
  const router = useRouter();

  const handleSortChange = (event: SelectChangeEvent) => {
    const sortBy = event.target.value as string;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("sort_by", sortBy);
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    const orderBy = event.target.value as string;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("order_by", orderBy);
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel id="sort-by-label" htmlFor="sort-by-select">
          Sort By
        </InputLabel>
        <Select
          label="Sort By"
          id="sort-by-select"
          labelId="sort-by-label"
          defaultValue="ASC"
          onChange={handleSortChange}
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="order-by-label" htmlFor="order-by-select">
          Order By
        </InputLabel>
        <Select
          label="Order By"
          id="order-by-select"
          labelId="order-by-label"
          defaultValue="id"
          onChange={handleOrderChange}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="invoice_id">Invoice ID</MenuItem>
          <MenuItem value="transaction_date">Transaction Date</MenuItem>
          <MenuItem value="customer_name">Customer Name</MenuItem>
          <MenuItem value="tax">Tax</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
