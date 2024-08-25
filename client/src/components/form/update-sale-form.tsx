"use client";

import React, { FormEvent, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Paper,
  Typography,
  FormHelperText,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { Add, Delete } from "@mui/icons-material";
import { useGetProducts } from "@/hooks/api/get-products";
import TotalPrice from "../total-price";
import { useUpdateSaleForm } from "@/hooks/form/update-sale-form";
import { useParams } from "next/navigation";

export default function UpdateSaleForm() {
  const { id } = useParams();

  const {
    register,
    control,
    onSubmit,
    handleSubmit,
    watch,
    formState: { errors },
  } = useUpdateSaleForm(+id);
  const [selectedProduct, setSelectedProduct] = useState("");

  const tax = watch("tax");
  const discount = watch("discount");
  const details = watch("details");

  const { data } = useGetProducts();

  const products = data?.data ?? [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });
  console.log(products, "PRODUCTS");
  console.log(errors.details, "DETAILS ERROR");

  const handleSelectProduct = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectedProduct(e.target.value);
  };
  const handleNewProductFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === +selectedProduct);
    console.log(product, "PRODUCT");
    const fieldAlreadyExists = fields.find(
      (field) => field.product_id === +selectedProduct
    );

    setSelectedProduct("");
    if (!product) return;
    if (fieldAlreadyExists) return;
    append({ price: product.price, product_id: product.id, quantity: 0 });
  };

  return (
    <Paper className="flex p-4 flex-col gap-4 min-h-[100dvh] max-w-md mx-auto">
      <Box
        id="add-sale-form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <TextField
          label="Transaction Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("transaction_date", { valueAsDate: true })}
          error={!!errors.transaction_date}
          helperText={errors.transaction_date?.message}
        />
        <TextField
          label="Customer Name"
          {...register("customer_name")}
          error={!!errors.customer_name}
          helperText={errors.customer_name?.message}
        />
        <TextField
          label="Tax"
          {...register("tax")}
          error={!!errors.tax}
          helperText={errors.tax?.message}
        />
        <TextField
          label="Discount"
          {...register("discount")}
          error={!!errors.discount}
          helperText={errors.discount?.message}
        />

        {fields.map((field, i) => (
          <Box className="flex flex-col gap-2" key={i}>
            <Box className="flex gap-2 items-center justify-between">
              <Typography>Product Id: {field.product_id}</Typography>
              <IconButton color="error" onClick={() => remove(i)}>
                <Delete />
              </IconButton>
            </Box>

            <Box className="flex gap-2">
              <TextField
                label="Quantity"
                type="number"
                error={!!errors?.details?.[i]?.quantity?.message}
                helperText={errors?.details?.[i]?.quantity?.message}
                {...register(`details.${i}.quantity`, { valueAsNumber: true })}
              />
              <TextField
                label="Price"
                type="number"
                error={!!errors?.details?.[i]?.price?.message}
                helperText={errors?.details?.[i]?.price?.message}
                {...register(`details.${i}.price`, { valueAsNumber: true })}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        component="form"
        id="add-product-form"
        onSubmit={handleNewProductFormSubmit}
        className="w-full flex flex-col gap-2"
      >
        <Typography>Products</Typography>
        <FormControl error={Boolean(errors?.details?.message)}>
          <InputLabel id="select-product-label">Select Product</InputLabel>
          <Select
            labelId="select-product-label"
            label="Select Product"
            onChange={handleSelectProduct}
            value={selectedProduct}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {Boolean(errors.details?.message) &&
              "Must contain at least 1 product"}
          </FormHelperText>
        </FormControl>
      </Box>
      <Button
        type="submit"
        startIcon={<Add />}
        variant="contained"
        color="primary"
        className="w-fit"
        form="add-product-form"
      >
        Add Product
      </Button>
      <TotalPrice
        details={details ?? []}
        discount={discount ?? "0%"}
        tax={tax ?? "0%"}
      />
      <Button
        form="add-sale-form"
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Paper>
  );
}
