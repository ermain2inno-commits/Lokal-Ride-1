
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, Car, Booking, Notification } from '../types';
import { MOCK_USERS, MOCK_CARS, MOCK_BOOKINGS } from '../constants';

type View = 'welcome' | 'auth' | 'dashboard' | 'browse' | 'details' | 'account' | 'listCar' | 'admin';

interface AppContextType {
  view: View;
  setView: (view: View, params?: any) => void;
  viewParams: any;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  users: User[];
  cars: Car[];
  bookings: Booking[];
  addCar: (car: Car) => void;
  updateCar: (car: Car) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'totalPrice'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [view, setViewState] = useState<View>('welcome');
  const [viewParams, setViewParams] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const setView = (newView: View, params: any = null) => {
    setViewState(newView);
    setViewParams(params);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const newNotif = { id: Date.now(), message, type };
    setNotifications(prev => [...prev, newNotif]);
    setTimeout(() => {
      setNotifications(allNotifs => allNotifs.filter(n => n.id !== newNotif.id));
    }, 5000);
  }, []);
  
  const addCar = (car: Car) => {
      setCars(prev => [...prev, car]);
  };
  
  const updateCar = (updatedCar: Car) => {
      setCars(prev => prev.map(car => car.id === updatedCar.id ? updatedCar : car));
  }
  
  const addBooking = (bookingData: Omit<Booking, 'id' | 'totalPrice'>) => {
      const car = cars.find(c => c.id === bookingData.carId);
      if (!car) return;
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const newBooking: Booking = {
          ...bookingData,
          id: `b${Date.now()}`,
          totalPrice: days * car.pricePerDay,
      };
      setBookings(prev => [...prev, newBooking]);
  }

  return (
    <AppContext.Provider value={{ 
      view, setView, viewParams,
      currentUser, setCurrentUser, 
      isDarkMode, toggleDarkMode,
      notifications, addNotification,
      users, cars, bookings,
      addCar, updateCar, addBooking
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
