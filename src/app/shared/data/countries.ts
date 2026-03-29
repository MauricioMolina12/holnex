import { Country } from '../models/country.model';

export const COUNTRIES: Country[] = [
  // --- Latin America ---
  { id: 'MX', name: 'Mexico',            localName: 'México',             dialCode: '+52',  flag: '🇲🇽', region: 'Latin America' },
  { id: 'CO', name: 'Colombia',          localName: 'Colombia',           dialCode: '+57',  flag: '🇨🇴', region: 'Latin America' },
  { id: 'AR', name: 'Argentina',         localName: 'Argentina',          dialCode: '+54',  flag: '🇦🇷', region: 'Latin America' },
  { id: 'CL', name: 'Chile',             localName: 'Chile',              dialCode: '+56',  flag: '🇨🇱', region: 'Latin America' },
  { id: 'PE', name: 'Peru',              localName: 'Perú',               dialCode: '+51',  flag: '🇵🇪', region: 'Latin America' },
  { id: 'VE', name: 'Venezuela',         localName: 'Venezuela',          dialCode: '+58',  flag: '🇻🇪', region: 'Latin America' },
  { id: 'EC', name: 'Ecuador',           localName: 'Ecuador',            dialCode: '+593', flag: '🇪🇨', region: 'Latin America' },
  { id: 'BO', name: 'Bolivia',           localName: 'Bolivia',            dialCode: '+591', flag: '🇧🇴', region: 'Latin America' },
  { id: 'PY', name: 'Paraguay',          localName: 'Paraguay',           dialCode: '+595', flag: '🇵🇾', region: 'Latin America' },
  { id: 'UY', name: 'Uruguay',           localName: 'Uruguay',            dialCode: '+598', flag: '🇺🇾', region: 'Latin America' },
  { id: 'BR', name: 'Brazil',            localName: 'Brasil',             dialCode: '+55',  flag: '🇧🇷', region: 'Latin America' },
  { id: 'CR', name: 'Costa Rica',        localName: 'Costa Rica',         dialCode: '+506', flag: '🇨🇷', region: 'Latin America' },
  { id: 'PA', name: 'Panama',            localName: 'Panamá',             dialCode: '+507', flag: '🇵🇦', region: 'Latin America' },
  { id: 'GT', name: 'Guatemala',         localName: 'Guatemala',          dialCode: '+502', flag: '🇬🇹', region: 'Latin America' },
  { id: 'HN', name: 'Honduras',          localName: 'Honduras',           dialCode: '+504', flag: '🇭🇳', region: 'Latin America' },
  { id: 'SV', name: 'El Salvador',       localName: 'El Salvador',        dialCode: '+503', flag: '🇸🇻', region: 'Latin America' },
  { id: 'NI', name: 'Nicaragua',         localName: 'Nicaragua',          dialCode: '+505', flag: '🇳🇮', region: 'Latin America' },
  { id: 'DO', name: 'Dominican Republic',localName: 'Rep. Dominicana',    dialCode: '+1',   flag: '🇩🇴', region: 'Latin America' },
  { id: 'CU', name: 'Cuba',              localName: 'Cuba',               dialCode: '+53',  flag: '🇨🇺', region: 'Latin America' },
  { id: 'PR', name: 'Puerto Rico',       localName: 'Puerto Rico',        dialCode: '+1',   flag: '🇵🇷', region: 'Latin America' },

  // --- North America ---
  { id: 'US', name: 'United States',     localName: 'United States',      dialCode: '+1',   flag: '🇺🇸', region: 'North America' },
  { id: 'CA', name: 'Canada',            localName: 'Canada',             dialCode: '+1',   flag: '🇨🇦', region: 'North America' },

  // --- Europe ---
  { id: 'ES', name: 'Spain',             localName: 'España',             dialCode: '+34',  flag: '🇪🇸', region: 'Europe' },
  { id: 'FR', name: 'France',            localName: 'France',             dialCode: '+33',  flag: '🇫🇷', region: 'Europe' },
  { id: 'DE', name: 'Germany',           localName: 'Deutschland',        dialCode: '+49',  flag: '🇩🇪', region: 'Europe' },
  { id: 'IT', name: 'Italy',             localName: 'Italia',             dialCode: '+39',  flag: '🇮🇹', region: 'Europe' },
  { id: 'PT', name: 'Portugal',          localName: 'Portugal',           dialCode: '+351', flag: '🇵🇹', region: 'Europe' },
  { id: 'GB', name: 'United Kingdom',    localName: 'United Kingdom',     dialCode: '+44',  flag: '🇬🇧', region: 'Europe' },
  { id: 'NL', name: 'Netherlands',       localName: 'Nederland',          dialCode: '+31',  flag: '🇳🇱', region: 'Europe' },
  { id: 'BE', name: 'Belgium',           localName: 'België',             dialCode: '+32',  flag: '🇧🇪', region: 'Europe' },
  { id: 'CH', name: 'Switzerland',       localName: 'Schweiz',            dialCode: '+41',  flag: '🇨🇭', region: 'Europe' },
  { id: 'SE', name: 'Sweden',            localName: 'Sverige',            dialCode: '+46',  flag: '🇸🇪', region: 'Europe' },
  { id: 'NO', name: 'Norway',            localName: 'Norge',              dialCode: '+47',  flag: '🇳🇴', region: 'Europe' },
  { id: 'PL', name: 'Poland',            localName: 'Polska',             dialCode: '+48',  flag: '🇵🇱', region: 'Europe' },
  { id: 'RU', name: 'Russia',            localName: 'Россия',             dialCode: '+7',   flag: '🇷🇺', region: 'Europe' },

  // --- Asia ---
  { id: 'CN', name: 'China',             localName: '中国',                dialCode: '+86',  flag: '🇨🇳', region: 'Asia' },
  { id: 'JP', name: 'Japan',             localName: '日本',                dialCode: '+81',  flag: '🇯🇵', region: 'Asia' },
  { id: 'KR', name: 'South Korea',       localName: '한국',                dialCode: '+82',  flag: '🇰🇷', region: 'Asia' },
  { id: 'IN', name: 'India',             localName: 'India',              dialCode: '+91',  flag: '🇮🇳', region: 'Asia' },
  { id: 'ID', name: 'Indonesia',         localName: 'Indonesia',          dialCode: '+62',  flag: '🇮🇩', region: 'Asia' },
  { id: 'TH', name: 'Thailand',          localName: 'ประเทศไทย',           dialCode: '+66',  flag: '🇹🇭', region: 'Asia' },
  { id: 'VN', name: 'Vietnam',           localName: 'Việt Nam',           dialCode: '+84',  flag: '🇻🇳', region: 'Asia' },
  { id: 'PH', name: 'Philippines',       localName: 'Pilipinas',          dialCode: '+63',  flag: '🇵🇭', region: 'Asia' },
  { id: 'SG', name: 'Singapore',         localName: 'Singapore',          dialCode: '+65',  flag: '🇸🇬', region: 'Asia' },
  { id: 'MY', name: 'Malaysia',          localName: 'Malaysia',           dialCode: '+60',  flag: '🇲🇾', region: 'Asia' },

  // --- Middle East ---
  { id: 'AE', name: 'United Arab Emirates', localName: 'الإمارات',        dialCode: '+971', flag: '🇦🇪', region: 'Middle East' },
  { id: 'SA', name: 'Saudi Arabia',      localName: 'المملكة العربية',    dialCode: '+966', flag: '🇸🇦', region: 'Middle East' },
  { id: 'IL', name: 'Israel',            localName: 'ישראל',              dialCode: '+972', flag: '🇮🇱', region: 'Middle East' },
  { id: 'TR', name: 'Turkey',            localName: 'Türkiye',            dialCode: '+90',  flag: '🇹🇷', region: 'Middle East' },

  // --- Africa ---
  { id: 'ZA', name: 'South Africa',      localName: 'South Africa',       dialCode: '+27',  flag: '🇿🇦', region: 'Africa' },
  { id: 'NG', name: 'Nigeria',           localName: 'Nigeria',            dialCode: '+234', flag: '🇳🇬', region: 'Africa' },
  { id: 'EG', name: 'Egypt',             localName: 'مصر',                dialCode: '+20',  flag: '🇪🇬', region: 'Africa' },
  { id: 'MA', name: 'Morocco',           localName: 'المغرب',              dialCode: '+212', flag: '🇲🇦', region: 'Africa' },

  // --- Oceania ---
  { id: 'AU', name: 'Australia',         localName: 'Australia',          dialCode: '+61',  flag: '🇦🇺', region: 'Oceania' },
  { id: 'NZ', name: 'New Zealand',       localName: 'New Zealand',        dialCode: '+64',  flag: '🇳🇿', region: 'Oceania' },
];

/** Get a country by ISO alpha-2 id */
export function getCountryById(id: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === id);
}

/** Get countries grouped by region */
export function getCountriesByRegion(): Record<string, Country[]> {
  return COUNTRIES.reduce((acc, country) => {
    if (!acc[country.region]) acc[country.region] = [];
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, Country[]>);
}
