export const filterCountries = (data) => {
  if(!data) return null;

  let normalized = {};
  const { Valute } = data;
  for (const currency in Valute) {
    if (Object.hasOwnProperty.call(Valute, currency)) {
      const { Name } = Valute[currency] || {};
      normalized[currency] = Name;
    }
  }

  return normalized;
}

export const filterRates = (data) => {
  if(!data) return null;

  return data.rates
}