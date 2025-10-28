
export enum UserRole {
  RENTER = 'RENTER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
}

export interface Car {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  description: string;
  location: string;
  images: string[];
  status: CarStatus;
  features: string[];
}

export interface Booking {
  id: string;
  carId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
