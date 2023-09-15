export const priceProperty = (price) =>
  Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
