"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSaleSchema, createSaleSchema } from "@/interfaces/dto/sale.dto";
import { useCreateSale } from "../api/create-sale";
import { toast } from "material-react-toastify";
import { getAxiosErrMessage } from "@/libs/get-axios-err-message";
import { useEffect } from "react";

export const useCreateSaleForm = () => {
  const form = useForm<CreateSaleSchema>({
    resolver: zodResolver(createSaleSchema),
    values: {
      customer_name: "",
      discount: "",
      tax: "",
      details: [],
    },
  });
  const { mutateAsync } = useCreateSale();

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) form.reset();
  }, [form.formState.isSubmitSuccessful]);

  const onSubmit: SubmitHandler<CreateSaleSchema> = async (data) => {
    const cleanedData = data;
    if (data?.transaction_date)
      data.transaction_date = new Date(data?.transaction_date);

    toast.promise(
      mutateAsync({
        ...cleanedData,
        tax: cleanedData.tax ? "0" : (+cleanedData.tax / 100).toString(),
        discount: cleanedData.discount
          ? "0"
          : (+cleanedData.discount / 100).toString(),
      }),
      {
        pending: "Storing sale information...",
        success: "Sale succefully created",
        error: {
          render(props) {
            return getAxiosErrMessage(props.data);
          },
        },
      }
    );
  };

  return { onSubmit, ...form };
};
