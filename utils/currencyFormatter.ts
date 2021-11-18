export const currencyFormatter = (value, currency = "BRL") => Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 3,
    notation: 'compact',
}).format(value);
