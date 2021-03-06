import { fetch } from 'whatwg-fetch';
import { filterCountries, filterRates } from './helpers/normalize';

const URLS = {
  COUNTRIES: 'https://www.cbr-xml-daily.ru/daily_json.js',
  RATES: 'https://www.cbr-xml-daily.ru/latest.js',
}
const getRequest = (url) => fetch(url)
  .then(response => response.json())

export const getCountries = () => getRequest(URLS.COUNTRIES).then(filterCountries);
export const getRates = () => getRequest(URLS.RATES).then(filterRates)