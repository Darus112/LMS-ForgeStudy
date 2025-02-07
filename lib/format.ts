export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};
