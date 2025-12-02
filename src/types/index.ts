export type KYCLevel = 0 | 1 | 2;

export interface User {
  id: string;
  phone: string;
  kycLevel: KYCLevel;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: string;
  nationality?: string;
  avatar?: string;
}

export type PaymentMethodType = "Card" | "MobileMoney";
export type Provider = "OrangeMoney" | "Wave" | "MTN" | "Moov" | "Visa" | "Mastercard";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  provider: Provider;
  lastDigits: string;
}

export interface Transaction {
  id: string;
  amount: number;
  fees: number;
  total: number;
  destination: string;
  destinationName: string;
  source: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface KYCDocument {
  idFront?: File | null;
  idBack?: File | null;
  selfie?: File | null;
}
