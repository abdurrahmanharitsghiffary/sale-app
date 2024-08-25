import { isAxiosError } from "axios";

export const getAxiosErrMessage = (err: unknown) => {
  if (isAxiosError(err)) {
    return err.response?.data?.message;
  }
  return (err as any)?.message ?? "Something went wrong!";
};
