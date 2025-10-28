
import { User, Car, Booking, UserRole, CarStatus } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Jean-Pierre', email: 'jean@lokal.com', role: UserRole.RENTER, avatarUrl: 'https://picsum.photos/seed/user1/200' },
  { id: '2', name: 'Marie Dubois', email: 'marie@lokal.com', role: UserRole.OWNER, avatarUrl: 'https://picsum.photos/seed/user2/200' },
  { id: '3', name: 'Admin Lokal', email: 'admin@lokal.com', role: UserRole.ADMIN, avatarUrl: 'https://picsum.photos/seed/admin/200' },
];

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    ownerId: '2',
    make: 'Toyota',
    model: 'RAV4',
    year: 2022,
    pricePerDay: 50,
    description: 'SUV spacieux et fiable, parfait pour les routes haïtiennes. Climatisation et connectivité Bluetooth.',
    location: 'Pétion-Ville, Haïti',
    images: ['https://picsum.photos/seed/car1a/800/600', 'https://picsum.photos/seed/car1b/800/600', 'https://picsum.photos/seed/car1c/800/600'],
    status: CarStatus.AVAILABLE,
    features: ['5 places', 'Climatisation', 'Automatique', 'Bluetooth'],
  },
  {
    id: 'c2',
    ownerId: '2',
    make: 'Hyundai',
    model: 'Grand i10',
    year: 2023,
    pricePerDay: 35,
    description: 'Compacte et économique, idéale pour se faufiler dans le trafic de Port-au-Prince. Très faible consommation.',
    location: 'Port-au-Prince, Haïti',
    images: ['https://picsum.photos/seed/car2a/800/600', 'https://picsum.photos/seed/car2b/800/600'],
    status: CarStatus.RENTED,
    features: ['4 places', 'Manuelle', 'Économique'],
  },
  {
    id: 'c3',
    ownerId: '2',
    make: 'Ford',
    model: 'Ranger',
    year: 2021,
    pricePerDay: 75,
    description: 'Pick-up robuste pour transporter du matériel ou explorer des zones plus reculées. 4x4 puissant.',
    location: 'Cap-Haïtien, Haïti',
    images: ['https://picsum.photos/seed/car3a/800/600', 'https://picsum.photos/seed/car3b/800/600'],
    status: CarStatus.AVAILABLE,
    features: ['4x4', 'Benne', 'Robuste', 'Climatisation'],
  },
   {
    id: 'c4',
    ownerId: '2',
    make: 'Suzuki',
    model: 'Jimny',
    year: 2023,
    pricePerDay: 60,
    description: 'Le compagnon d\'aventure parfait. Petit, agile et capable de vous emmener partout.',
    location: 'Jacmel, Haïti',
    images: ['https://picsum.photos/seed/car4a/800/600', 'https://picsum.photos/seed/car4b/800/600'],
    status: CarStatus.PENDING_APPROVAL,
    features: ['4x4', 'Compact', 'Aventure'],
  },
];

export const MOCK_BOOKINGS: Booking[] = [
    { id: 'b1', carId: 'c2', renterId: '1', startDate: '2024-07-20', endDate: '2024-07-25', totalPrice: 175, status: 'CONFIRMED' },
    { id: 'b2', carId: 'c3', renterId: '1', startDate: '2024-08-01', endDate: '2024-08-05', totalPrice: 300, status: 'PENDING' },
];

export const LOGO_URL = 'https://i.imgur.com/5u0w3Jc.png';
