"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSaleSchema, UpdateSaleSchema } from "@/interfaces/dto/sale.dto";
import { useUpdateSale } from "../api/update-sale";
import { useGetSaleById } from "../api/get-sale-by-id";
import { getAxiosErrMessage } from "@/libs/get-axios-err-message";
import { toast } from "material-react-toastify";

export const useUpdateSaleForm = (id: number) => {
  const { data } = useGetSaleById(id);
  const sale = data?.data;
  console.log(sale, "SALE");
  const form = useForm<UpdateSaleSchema>({
    resolver: zodResolver(updateSaleSchema),
    values: {
      customer_name: sale?.customer_name,
      details: sale?.details,
      discount: `${+(sale?.discount ?? "0") * 100}%`,
      tax: `${+(sale?.tax ?? "0") * 100}%`,
      // @ts-ignore
      transaction_date: sale?.transaction_date.split("T")[0],
    },
  });
  const { mutateAsync } = useUpdateSale();

  const onSubmit: SubmitHandler<UpdateSaleSchema> = async (data) => {
    const cleanedData = data;
    if (data?.transaction_date)
      data.transaction_date = new Date(data?.transaction_date);

    toast.promise(
      mutateAsync({
        ...cleanedData,
        id,
        tax: cleanedData.tax
          ? "0"
          : (+(cleanedData?.tax ?? "0") / 100).toString(),
        discount: cleanedData.discount
          ? "0"
          : (+(cleanedData?.discount ?? "0") / 100).toString(),
      }),
      {
        pending: "Updating sale information...",
        success: "Sale succefully updated",
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
