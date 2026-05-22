export const formatPrice = (
  price: number,
  currency: string = "BDT",
): string => {
  if (!price && price !== 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};