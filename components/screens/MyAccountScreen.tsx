
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Car, Booking } from '../../types';

export const MyAccountScreen: React.FC = () => {
    const { currentUser, setView, viewParams, cars, bookings, updateCar } = useAppContext();
    const [activeTab, setActiveTab] = useState(viewParams?.initialTab || 'profile');

    if (!currentUser) {
        setView('auth');
        return null;
    }

    const userCars = cars.filter(c => c.ownerId === currentUser.id);
    const userBookings = bookings.filter(b => b.renterId === currentUser.id);

    const TabButton: React.FC<{ tabName: string, label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${activeTab === tabName ? 'bg-light-bg dark:bg-gray-800 text-primary dark:text-secondary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
        >
            {label}
        </button>
    );

    const CarListItem: React.FC<{ car: Car }> = ({ car }) => (
        <div className="flex items-center justify-between p-4 bg-accent dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
                <img src={car.images[0]} alt={car.model} className="w-24 h-16 object-cover rounded-md"/>
                <div>
                    <p className="font-bold">{car.make} {car.model}</p>
                    <p className={`text-sm font-semibold ${car.status === 'AVAILABLE' ? 'text-green-500' : 'text-yellow-500'}`}>{car.status}</p>
                </div>
            </div>
            <button onClick={() => setView('listCar', { carId: car.id })} className="text-sm bg-secondary text-white px-3 py-1 rounded-md hover:opacity-80">Modifier</button>
        </div>
    );
    
    const BookingListItem: React.FC<{ booking: Booking }> = ({ booking }) => {
        const car = cars.find(c => c.id === booking.carId);
        if (!car) return null;
        return (
            <div className="flex items-center justify-between p-4 bg-accent dark:bg-gray-700 rounded-lg">
                 <div className="flex items-center space-x-4">
                    <img src={car.images[0]} alt={car.model} className="w-24 h-16 object-cover rounded-md"/>
                    <div>
                        <p className="font-bold">{car.make} {car.model}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.startDate} au {booking.endDate}</p>
                        <p className="text-sm font-semibold text-blue-500">{booking.status}</p>
                    </div>
                </div>
                <p className="font-bold text-lg">${booking.totalPrice}</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 md:ml-20">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Mon Compte</h1>
            </header>
            <div className="border-b border-gray-300 dark:border-gray-700">
                <TabButton tabName="profile" label="Profil" />
                <TabButton tabName="bookings" label="Mes Réservations" />
                <TabButton tabName="cars" label="Mes Voitures" />
            </div>

            <div className="mt-6 bg-light-bg dark:bg-gray-800 p-6 rounded-b-lg rounded-r-lg shadow-md">
                {activeTab === 'profile' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Informations du profil</h2>
                        <div className="space-y-4">
                            <div><span className="font-semibold">Nom:</span> {currentUser.name}</div>
                            <div><span className="font-semibold">Email:</span> {currentUser.email}</div>
                            <div><span className="font-semibold">Rôle:</span> {currentUser.role}</div>
                            <button className="text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary">Modifier le profil</button>
                        </div>
                    </div>
                )}
                {activeTab === 'bookings' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Mes Réservations</h2>
                        <div className="space-y-4">
                            {userBookings.length > 0 ? userBookings.map(b => <BookingListItem key={b.id} booking={b} />) : <p>Vous n'avez aucune réservation.</p>}
                        </div>
                    </div>
                )}
                {activeTab === 'cars' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Mes Voitures</h2>
                            <button onClick={() => setView('listCar')} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary">+ Ajouter une voiture</button>
                        </div>
                        <div className="space-y-4">
                             {userCars.length > 0 ? userCars.map(c => <CarListItem key={c.id} car={c} />) : <p>Vous n'avez listé aucune voiture.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
