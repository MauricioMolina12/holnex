export interface Country {
  /** ISO 3166-1 alpha-2 code — used as unique ID */
  id: string;
  /** English display name */
  name: string;
  /** Native / local name */
  localName: string;
  /** International dial code */
  dialCode: string;
  /** Unicode flag emoji */
  flag: string;
  /** Geographic region */
  region: 'Latin America' | 'North America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania' | 'Middle East';
}
