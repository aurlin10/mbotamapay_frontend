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
    category: 'TRANSFER',
  },
  {
    id: '2',
    amount: 15000,
    fees: 150,
    total: 15150,
    destination: '+237677654321',
    destinationName: 'Restaurant Le Panorama',
    source: 'Visa •••• 8912',
    date: '2025-11-30T09:15:00',
    status: 'completed',
    category: 'FOOD',
  },
  {
    id: '3',
    amount: 50000,
    fees: 500,
    total: 50500,
    destination: '+237698765432',
    destinationName: 'Uber Cameroun',
    source: 'Wave •••• 3456',
    date: '2025-11-29T16:45:00',
    status: 'completed',
    category: 'TRANSPORT',
  },
  {
    id: '4',
    amount: 35000,
    fees: 350,
    total: 35350,
    destination: '+237681234567',
    destinationName: 'Pharmacie du Centre',
    source: 'Orange Money •••• 4567',
    date: '2025-11-28T11:20:00',
    status: 'completed',
    category: 'HEALTH',
  },
  {
    id: '5',
    amount: 120000,
    fees: 1200,
    total: 121200,
    destination: '+237699876543',
    destinationName: 'Amazon Shopping',
    source: 'Visa •••• 8912',
    date: '2025-11-27T14:00:00',
    status: 'completed',
    category: 'SHOPPING',
  },
  {
    id: '6',
    amount: 28000,
    fees: 280,
    total: 28280,
    destination: '+237698765432',
    destinationName: 'Electric Bill',
    source: 'Wave •••• 3456',
    date: '2025-11-26T09:30:00',
    status: 'completed',
    category: 'BILLS',
  },
  {
    id: '7',
    amount: 18000,
    fees: 180,
    total: 18180,
    destination: '+237690123456',
    destinationName: 'Netflix Subscription',
    source: 'Visa •••• 8912',
    date: '2025-11-25T19:15:00',
    status: 'completed',
    category: 'ENTERTAINMENT',
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

// Analytics mock data
export const mockMonthlyData = [
  { month: 'Juil', amount: 180000 },
  { month: 'Août', amount: 220000 },
  { month: 'Sept', amount: 195000 },
  { month: 'Oct', amount: 260000 },
  { month: 'Nov', amount: 291000 },
  { month: 'Déc', amount: 25000 },
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
