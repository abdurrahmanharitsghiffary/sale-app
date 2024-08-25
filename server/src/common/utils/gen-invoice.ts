import { randomBytes } from "crypto";

export const genInvoice = () => {
  return `INV${new Date().toISOString().split('-').join('').split('T')[0]}-SLA-${randomBytes(5).toString("hex")}`;
};
