
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Car, CarStatus } from '../../types';
import { ChevronLeftIcon } from '../icons';

export const ListCarScreen: React.FC = () => {
    const { currentUser, addCar, updateCar, setView, viewParams, addNotification, cars } = useAppContext();
    const existingCar = viewParams?.carId ? cars.find(c => c.id === viewParams.carId) : null;
    
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [pricePerDay, setPricePerDay] = useState(50);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    
    useEffect(() => {
        if (existingCar) {
            setMake(existingCar.make);
            setModel(existingCar.model);
            setYear(existingCar.year);
            setPricePerDay(existingCar.pricePerDay);
            setDescription(existingCar.description);
            setLocation(existingCar.location);
        }
    }, [existingCar]);

    if (!currentUser) {
        setView('auth');
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(existingCar) {
            const updatedCarData: Car = {
                ...existingCar,
                make, model, year, pricePerDay, description, location
            };
            updateCar(updatedCarData);
            addNotification('Voiture mise à jour avec succès!', 'success');
        } else {
             const newCar: Car = {
                id: `c${Date.now()}`,
                ownerId: currentUser.id,
                make, model, year, pricePerDay, description, location,
                images: ['https://picsum.photos/seed/' + Date.now() + '/800/600'],
                status: CarStatus.PENDING_APPROVAL,
                features: ['5 places', 'Climatisation'],
            };
            addCar(newCar);
            addNotification('Voiture ajoutée! Elle sera visible après approbation.', 'success');
        }
       
        setView('account', { initialTab: 'cars' });
    };

    const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            {children}
        </div>
    );

    return (
        <div className="p-4 md:p-8 md:ml-20">
             <button onClick={() => setView('account', { initialTab: 'cars' })} className="flex items-center text-primary dark:text-secondary mb-4 font-semibold hover:underline">
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Retour à mes voitures
            </button>
            <div className="max-w-2xl mx-auto bg-light-bg dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-6">{existingCar ? 'Modifier la voiture' : 'Lister une nouvelle voiture'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Marque">
                            <input type="text" value={make} onChange={e => setMake(e.target.value)} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        </FormField>
                        <FormField label="Modèle">
                            <input type="text" value={model} onChange={e => setModel(e.target.value)} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        </FormField>
                        <FormField label="Année">
                            <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        </FormField>
                        <FormField label="Prix par jour ($)">
                            <input type="number" value={pricePerDay} onChange={e => setPricePerDay(parseInt(e.target.value))} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        </FormField>
                    </div>
                     <FormField label="Lieu (ex: Pétion-Ville, Haïti)">
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </FormField>
                    <FormField label="Description">
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
                    </FormField>

                    {/* Simulating photo upload */}
                    <FormField label="Photos">
                       <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                           <p className="text-gray-500">Le téléversement de photos sera bientôt disponible.</p>
                           {existingCar && <img src={existingCar.images[0]} className="w-32 h-auto mx-auto mt-2 rounded-md" />}
                       </div>
                    </FormField>

                    <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-all shadow-lg">
                        {existingCar ? 'Enregistrer les modifications' : 'Soumettre pour approbation'}
                    </button>
                </form>
            </div>
        </div>
    );
};
