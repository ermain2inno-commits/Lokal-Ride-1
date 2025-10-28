
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { HomeIcon, CarIcon, UserIcon, SunIcon, MoonIcon, LogoutIcon } from '../icons';
import { LOGO_URL } from '../../constants';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setView, currentUser, setCurrentUser, isDarkMode, toggleDarkMode } = useAppContext();

  const handleLogout = () => {
    setCurrentUser(null);
    setView('welcome');
  };

  const NavItem: React.FC<{ viewName: any, label: string, icon: React.ReactNode }> = ({ viewName, label, icon }) => (
    <button
      onClick={() => setView(viewName)}
      className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-secondary transition-colors duration-200 w-full pt-3 pb-2"
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`flex flex-col h-screen bg-accent dark:bg-dark-bg text-dark-text dark:text-light-text transition-colors duration-300`}>
      <header className="flex-shrink-0 bg-light-bg dark:bg-gray-800 shadow-md p-3 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <img src={LOGO_URL} alt="Lokal Ride Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-primary dark:text-light-text">Lokal Ride</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
          </button>
          {currentUser && (
            <div className="flex items-center space-x-3">
               <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full border-2 border-primary" />
               <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <LogoutIcon className="w-6 h-6 text-gray-700 dark:text-gray-300"/>
               </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-light-bg dark:bg-gray-800 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] md:hidden flex justify-around z-20">
        <NavItem viewName="dashboard" label="Accueil" icon={<HomeIcon className="w-6 h-6 mb-1"/>} />
        <NavItem viewName="browse" label="Voitures" icon={<CarIcon className="w-6 h-6 mb-1"/>} />
        <NavItem viewName="account" label="Compte" icon={<UserIcon className="w-6 h-6 mb-1"/>} />
      </nav>
      
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full bg-light-bg dark:bg-gray-800 shadow-lg w-20 flex-col items-center justify-between py-8 z-10 mt-[76px]">
        <div className="flex flex-col items-center space-y-8">
            <NavItem viewName="dashboard" label="Accueil" icon={<HomeIcon className="w-7 h-7 mb-1"/>} />
            <NavItem viewName="browse" label="Voitures" icon={<CarIcon className="w-7 h-7 mb-1"/>} />
            <NavItem viewName="account" label="Compte" icon={<UserIcon className="w-7 h-7 mb-1"/>} />
        </div>
      </nav>
      
      <div className="hidden md:block w-20 flex-shrink-0"></div> {/* Spacer for desktop sidebar */}
    </div>
  );
};
