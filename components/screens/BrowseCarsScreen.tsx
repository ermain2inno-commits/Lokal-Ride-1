
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Car, CarStatus } from '../../types';

const CarCard: React.FC<{ car: Car; onClick: () => void }> = ({ car, onClick }) => {
    return (
        <div onClick={onClick} className="bg-light-bg dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 group">
            <div className="relative">
                <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-primary text-light-text text-sm font-bold py-1 px-3 rounded-full shadow-md">
                    ${car.pricePerDay} / jour
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-dark-text dark:text-light-text truncate">{car.make} {car.model}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 truncate">{car.location}</p>
            </div>
        </div>
    );
};

export const BrowseCarsScreen: React.FC = () => {
    const { cars, setView } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(100);

    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const matchesSearch = searchTerm === '' || 
                car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.location.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesPrice = car.pricePerDay <= maxPrice;

            return matchesSearch && matchesPrice && car.status === CarStatus.AVAILABLE;
        });
    }, [cars, searchTerm, maxPrice]);

    return (
        <div className="p-4 md:p-8 md:ml-20">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Trouvez votre voiture</h1>
                <p className="text-gray-600 dark:text-gray-400">Explorez notre catalogue de véhicules disponibles.</p>
            </header>

            <div className="sticky top-0 bg-accent dark:bg-dark-bg py-4 z-10 -mx-4 px-4 md:-mx-8 md:px-8 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher par marque, modèle, lieu..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="flex-grow w-full px-4 py-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                    />
                    <div className="flex flex-col items-start md:items-center md:flex-row gap-2">
                        <label htmlFor="price-range" className="text-sm font-medium whitespace-nowrap">Prix max: ${maxPrice}</label>
                        <input
                            id="price-range"
                            type="range"
                            min="20"
                            max="150"
                            step="5"
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                            className="w-full md:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>
            </div>

            {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCars.map(car => (
                        <CarCard key={car.id} car={car} onClick={() => setView('details', { carId: car.id })} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500 dark:text-gray-400">Aucune voiture ne correspond à vos critères.</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Essayez d'ajuster vos filtres.</p>
                </div>
            )}
        </div>
    );
};
