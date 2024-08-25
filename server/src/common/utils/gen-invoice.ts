export const genInvoice = () => {
  return `INV${new Date().toISOString().split('-').join('').split('T')[0]}-SLA-${Math.floor(Math.random() * 100) + 1}`;
};
