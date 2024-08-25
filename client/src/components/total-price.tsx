import { SaleItemSchema } from "@/interfaces/dto/sale.dto";
import { Box, Typography } from "@mui/material";

interface TotalPriceProps {
  details: SaleItemSchema[];
  discount: string;
  tax: string;
}
function TotalPrice({ details, tax, discount }: TotalPriceProps) {
  const subtotal = details.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const taxN = parseFloat((tax || "0").replace("%", "")) / 100;
  const discountN = parseFloat((discount || "0").replace("%", "")) / 100;

  const taxAmount = subtotal * taxN;
  const discountAmount = subtotal * discountN;
  const finalTotalPrice = subtotal + taxAmount - discountAmount;

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h6" component="h2" gutterBottom>
        Summary
      </Typography>
      <Typography variant="body1">
        <strong>Subtotal:</strong> Rp.{subtotal.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        <strong>Discount:</strong> -Rp.{discountAmount.toFixed(2)} ({discount})
      </Typography>
      <Typography variant="body1">
        <strong>Tax:</strong> +Rp.{taxAmount.toFixed(2)} ({tax})
      </Typography>
      <Typography variant="h6" component="h2">
        <strong>Total Price:</strong> Rp.{finalTotalPrice.toFixed(2)}
      </Typography>
    </Box>
  );
}

export default TotalPrice;
