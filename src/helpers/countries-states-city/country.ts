import countryList from "@/data/locations/country.json";
import { compare, findEntryByCode } from "./utils";
import { ICountry } from "./interface";

// Get a country by isoCode.
function getCountryByCode(isoCode: string): ICountry | undefined {
  if (!isoCode) return undefined;

  return findEntryByCode(countryList, isoCode);
}

// Get a list of all countries.
function getAllCountries(): ICountry[] {
  return countryList;
}

function sortByIsoCode(countries: ICountry[]): ICountry[] {
  return countries.sort((a, b) => {
    return compare<ICountry>(a, b, (entity) => {
      return entity.isoCode;
    });
  });
}

function isCountrySupportedByName(name: string): boolean {
  return countryList.some(
    (country) => country.name.toLowerCase() === name.toLowerCase()
  );
}

function isCountrySupportedByIsoCode(isoCode: string): boolean {
  return countryList.some(
    (country) => country.isoCode.toLowerCase() === isoCode.toLowerCase()
  );
}

export default {
  getCountryByCode,
  getAllCountries,
  sortByIsoCode,
  isCountrySupportedByName,
  isCountrySupportedByIsoCode,
};
