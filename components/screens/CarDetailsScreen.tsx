
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { MOCK_USERS } from '../../constants';

export const CarDetailsScreen: React.FC = () => {
    const { viewParams, cars, setView, addNotification, currentUser, addBooking } = useAppContext();
    const car = cars.find(c => c.id === viewParams.carId);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    if (!car) {
        return (
            <div className="flex items-center justify-center h-full p-4 md:ml-20">
                <p>Voiture non trouvée.</p>
                <button onClick={() => setView('browse')}>Retourner à la liste</button>
            </div>
        );
    }
    
    const owner = MOCK_USERS.find(u => u.id === car.ownerId);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length);
    };

    const handleBooking = () => {
        if (!currentUser) {
            addNotification('Veuillez vous connecter pour réserver.', 'error');
            setView('auth');
            return;
        }
        if (!startDate || !endDate) {
            addNotification('Veuillez sélectionner une date de début et de fin.', 'error');
            return;
        }
        if (new Date(startDate) >= new Date(endDate)) {
            addNotification('La date de fin doit être après la date de début.', 'error');
            return;
        }

        addBooking({
            carId: car.id,
            renterId: currentUser.id,
            startDate,
            endDate,
            status: 'PENDING',
        });

        addNotification('Votre demande de réservation a été envoyée!', 'success');
        setView('account', { initialTab: 'bookings' });
    };
    
    return (
        <div className="p-4 md:p-8 md:ml-20">
            <button onClick={() => setView('browse')} className="flex items-center text-primary dark:text-secondary mb-4 font-semibold hover:underline">
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Retour à la liste
            </button>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Carousel & Details */}
                <div className="lg:w-2/3">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <img src={car.images[currentImageIndex]} alt={`${car.make} ${car.model}`} className="w-full h-96 object-cover" />
                        {car.images.length > 1 && (
                             <>
                                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity">
                                    <ChevronLeftIcon className="w-6 h-6"/>
                                </button>
                                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity">
                                    <ChevronRightIcon className="w-6 h-6"/>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="mt-6 bg-light-bg dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                        <h1 className="text-3xl font-bold">{car.make} {car.model} <span className="text-xl font-light text-gray-500">{car.year}</span></h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{car.location}</p>
                        <p className="mt-4 text-dark-text dark:text-gray-300">{car.description}</p>
                        <div className="mt-4 border-t pt-4 dark:border-gray-700">
                             <h3 className="font-semibold mb-2">Caractéristiques</h3>
                             <div className="flex flex-wrap gap-2">
                                {car.features.map(feature => (
                                    <span key={feature} className="bg-accent dark:bg-gray-700 text-primary dark:text-secondary text-sm font-medium px-3 py-1 rounded-full">{feature}</span>
                                ))}
                             </div>
                        </div>
                         {owner && (
                            <div className="mt-6 flex items-center space-x-4 border-t pt-4 dark:border-gray-700">
                                <img src={owner.avatarUrl} alt={owner.name} className="w-14 h-14 rounded-full"/>
                                <div>
                                    <p className="text-sm text-gray-500">Propriétaire</p>
                                    <p className="font-semibold">{owner.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="lg:w-1/3">
                    <div className="sticky top-24 bg-light-bg dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <p className="text-2xl font-bold mb-4">
                            ${car.pricePerDay} <span className="text-base font-normal text-gray-500">/ jour</span>
                        </p>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Début</label>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fin</label>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>
                        <button onClick={handleBooking} className="mt-6 w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-all shadow-lg transform hover:-translate-y-1">
                            Réserver maintenant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
