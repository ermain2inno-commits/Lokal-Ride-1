
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { User, Car, Booking, UserRole, CarStatus } from '../../types';

export const AdminDashboardScreen: React.FC = () => {
    const { currentUser, setView, users, cars, bookings, updateCar } = useAppContext();
    const [activeTab, setActiveTab] = useState('cars');

    if (!currentUser || currentUser.role !== UserRole.ADMIN) {
        setView('dashboard');
        return null;
    }

    const TabButton: React.FC<{ tabName: string, label: string, count: number }> = ({ tabName, label, count }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold transition-colors duration-200 flex items-center gap-2 rounded-t-lg ${activeTab === tabName ? 'bg-light-bg dark:bg-gray-800 text-primary dark:text-secondary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
        >
            {label} <span className="bg-primary text-light-text text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
        </button>
    );
    
    const carsToApprove = cars.filter(c => c.status === CarStatus.PENDING_APPROVAL);

    const handleCarApproval = (car: Car, approve: boolean) => {
        const newStatus = approve ? CarStatus.AVAILABLE : CarStatus.MAINTENANCE; // or a new 'REJECTED' status
        updateCar({ ...car, status: newStatus });
    };

    return (
        <div className="p-4 md:p-8 md:ml-20">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
            </header>
             <div className="border-b border-gray-300 dark:border-gray-700 flex space-x-2">
                <TabButton tabName="cars" label="Approbation Voitures" count={carsToApprove.length} />
                <TabButton tabName="users" label="Utilisateurs" count={users.length} />
                <TabButton tabName="bookings" label="Réservations" count={bookings.length} />
            </div>

            <div className="mt-6 bg-light-bg dark:bg-gray-800 p-6 rounded-b-lg rounded-r-lg shadow-md">
                {activeTab === 'cars' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Voitures en attente d'approbation</h2>
                        <div className="space-y-4">
                            {carsToApprove.length > 0 ? carsToApprove.map(car => (
                                <div key={car.id} className="p-4 bg-accent dark:bg-gray-700 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{car.make} {car.model}</p>
                                        <p className="text-sm text-gray-500">{car.location}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => handleCarApproval(car, true)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">Approuver</button>
                                        <button onClick={() => handleCarApproval(car, false)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Rejeter</button>
                                    </div>
                                </div>
                            )) : <p>Aucune voiture en attente.</p>}
                        </div>
                    </div>
                )}
                 {activeTab === 'users' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="p-2">Nom</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2">Rôle</th>
                                        <th className="p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} className="border-b dark:border-gray-700">
                                            <td className="p-2">{user.name}</td>
                                            <td className="p-2">{user.email}</td>
                                            <td className="p-2">{user.role}</td>
                                            <td className="p-2"><button className="text-red-500 text-sm">Supprimer</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                 {activeTab === 'bookings' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Toutes les réservations</h2>
                        <p>La gestion des réservations sera bientôt disponible.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
