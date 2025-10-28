
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { LOGO_URL } from '../../constants';

export const WelcomeScreen: React.FC = () => {
  const { setView } = useAppContext();

  return (
    <div className="min-h-screen bg-cover bg-center text-light-text flex flex-col" style={{backgroundImage: "url('https://picsum.photos/seed/haiti/1920/1080')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-4 text-center">
        <img src={LOGO_URL} alt="Lokal Ride Logo" className="w-32 h-32 md:w-48 md:h-48 mb-4 rounded-full shadow-lg" />
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">Lokal Ride</h1>
        <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl">Votre aventure en Haïti commence ici. Louez des voitures auprès des locaux, en toute confiance.</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => setView('browse')} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Parcourir les voitures
          </button>
          <button onClick={() => setView('auth')} className="bg-transparent border-2 border-light-text hover:bg-light-text hover:text-dark-text text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Se connecter / S'inscrire
          </button>
        </div>
      </div>
       <footer className="relative z-10 text-center p-4 text-gray-300 text-sm">
        © {new Date().getFullYear()} Lokal Ride. Tous droits réservés.
      </footer>
    </div>
  );
};
