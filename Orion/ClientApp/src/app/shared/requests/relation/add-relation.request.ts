export class AddRelationRequest {
  name: string;
  code?: string | null;
  vatNumber?: string | null;
  website?: string | null;
  street?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  language?: string | null;
  email?: string | null;
  phone?: string | null;
  mobilePhone?: string | null;
  isCompany: boolean;

  constructor(
    name: string,
    isCompany: boolean,
    code?: string | null,
    vatNumber?: string | null,
    website?: string | null,
    street?: string | null,
    postalCode?: string | null,
    city?: string | null,
    country?: string | null,
    language?: string | null,
    email?: string | null,
    phone?: string | null,
    mobilePhone?: string | null
  ) {
    this.name = name;
    this.isCompany = isCompany;
    this.code = code;
    this.vatNumber = vatNumber;
    this.website = website;
    this.street = street;
    this.postalCode = postalCode;
    this.city = city;
    this.country = country;
    this.language = language;
    this.email = email;
    this.phone = phone;
    this.mobilePhone = mobilePhone;
  }
}
