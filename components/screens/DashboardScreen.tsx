
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CarIcon, UserIcon } from '../icons';

export const DashboardScreen: React.FC = () => {
    const { currentUser, setView, bookings, cars } = useAppContext();

    if (!currentUser) {
        setView('auth');
        return null;
    }

    const userBookings = bookings.filter(b => b.renterId === currentUser.id).length;
    const userCars = cars.filter(c => c.ownerId === currentUser.id).length;

    const DashboardCard: React.FC<{ title: string; value: string | number; description: string; onClick: () => void; icon: React.ReactNode }> = ({ title, value, description, onClick, icon }) => (
        <div 
            onClick={onClick} 
            className="bg-light-bg dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
        >
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
                    <div className="bg-accent dark:bg-gray-700 p-3 rounded-full">
                        {icon}
                    </div>
                </div>
                <p className="text-4xl font-bold text-primary dark:text-secondary mt-2">{value}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{description}</p>
        </div>
    );

    return (
        <div className="p-4 md:p-8 md:ml-20">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-dark-text dark:text-light-text">Bonjour, {currentUser.name.split(' ')[0]}!</h1>
                <p className="text-md text-gray-600 dark:text-gray-400">Prêt pour votre prochaine aventure ?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard 
                    title="Parcourir"
                    value="Explorer"
                    description="Trouvez la voiture parfaite pour votre voyage en Haïti."
                    onClick={() => setView('browse')}
                    icon={<CarIcon className="w-6 h-6 text-primary dark:text-secondary"/>}
                />
                <DashboardCard 
                    title="Mes Réservations"
                    value={userBookings}
                    description="Consultez et gérez vos locations en cours et passées."
                    onClick={() => setView('account', { initialTab: 'bookings' })}
                    icon={<UserIcon className="w-6 h-6 text-primary dark:text-secondary"/>}
                />
                <DashboardCard 
                    title="Mes Voitures"
                    value={userCars}
                    description="Gérez vos véhicules en location et consultez vos revenus."
                    onClick={() => setView('account', { initialTab: 'cars' })}
                    icon={<CarIcon className="w-6 h-6 text-primary dark:text-secondary"/>}
                />
            </div>
            
            {currentUser.role === 'ADMIN' && (
                 <div className="mt-8">
                     <button onClick={() => setView('admin')} className="bg-primary text-light-text font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-transform transform hover:-translate-y-1">
                        Tableau de bord Administrateur
                     </button>
                 </div>
            )}
        </div>
    );
};
