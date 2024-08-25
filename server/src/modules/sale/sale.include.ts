import { Prisma } from '@prisma/client';

export const saleInclude = {
  details: { select: { price: true, product_id: true, quantity: true } },
} satisfies Prisma.SaleInclude;

export type SaleIncludePayload = Prisma.SaleGetPayload<{
  include: typeof saleInclude;
}>;
