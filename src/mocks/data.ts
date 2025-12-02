import { User, PaymentMethod, Transaction, Contact } from '../types';

export const mockUser: User = {
  id: '1',
  phone: '+237691234567',
  kycLevel: 0,
};

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'MobileMoney',
    provider: 'OrangeMoney',
    lastDigits: '4567',
  },
  {
    id: '2',
    type: 'Card',
    provider: 'Visa',
    lastDigits: '8912',
  },
  {
    id: '3',
    type: 'MobileMoney',
    provider: 'Wave',
    lastDigits: '3456',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 25000,
    fees: 250,
    total: 25250,
    destination: '+237690123456',
    destinationName: 'Jean Mbella',
    source: 'Orange Money •••• 4567',
    date: '2025-12-01T14:30:00',
    status: 'completed',
  },
  {
    id: '2',
    amount: 15000,
    fees: 150,
    total: 15150,
    destination: '+237677654321',
    destinationName: 'Marie Ngo',
    source: 'Visa •••• 8912',
    date: '2025-11-30T09:15:00',
    status: 'completed',
  },
  {
    id: '3',
    amount: 50000,
    fees: 500,
    total: 50500,
    destination: '+237698765432',
    destinationName: 'Paul Kamga',
    source: 'Wave •••• 3456',
    date: '2025-11-29T16:45:00',
    status: 'completed',
  },
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jean Mbella',
    phone: '+237690123456',
  },
  {
    id: '2',
    name: 'Marie Ngo',
    phone: '+237677654321',
  },
  {
    id: '3',
    name: 'Paul Kamga',
    phone: '+237698765432',
  },
  {
    id: '4',
    name: 'Sandra Fotso',
    phone: '+237681234567',
  },
];

export const countries = [
  'Cameroun',
  'Sénégal',
  'Côte d\'Ivoire',
  'Burkina Faso',
  'Mali',
  'Gabon',
  'Congo',
  'France',
  'Belgique',
];
