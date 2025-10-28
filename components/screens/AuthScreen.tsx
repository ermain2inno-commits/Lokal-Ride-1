
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_USERS } from '../../constants';
import { LOGO_URL } from '../../constants';
import { ChevronLeftIcon } from '../icons';

export const AuthScreen: React.FC = () => {
  const { setCurrentUser, setView, addNotification } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = MOCK_USERS.find(u => u.email === email);
      if (user) { // In a real app, you'd check the password
        addNotification('Connexion réussie!', 'success');
        setCurrentUser(user);
        setView(user.role === 'ADMIN' ? 'admin' : 'dashboard');
      } else {
        addNotification('Email ou mot de passe incorrect.', 'error');
      }
    } else {
      // Simulate registration
      addNotification(`Bienvenue, ${name}! Votre compte a été créé.`, 'success');
      const newUser = { id: `${Date.now()}`, name, email, role: 'RENTER' as const, avatarUrl: `https://picsum.photos/seed/${name}/200`};
      // In a real app, you'd add this user to the database
      setCurrentUser(newUser);
      setView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-accent dark:bg-dark-bg flex items-center justify-center p-4 transition-colors duration-300">
       <button onClick={() => setView('welcome')} className="absolute top-6 left-6 text-primary dark:text-secondary hover:opacity-80 transition-opacity">
            <ChevronLeftIcon className="w-8 h-8"/>
            <span className="sr-only">Retour</span>
        </button>
      <div className="w-full max-w-md bg-light-bg dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300 transform hover:scale-105">
        <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Lokal Ride Logo" className="w-20 h-20 mx-auto mb-4 rounded-full" />
            <h2 className="text-3xl font-bold text-primary dark:text-light-text">{isLogin ? 'Connexion' : 'Inscription'}</h2>
            <p className="text-gray-500 dark:text-gray-400">
                {isLogin ? 'Heureux de vous revoir!' : 'Créez votre compte pour commencer.'}
            </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Nom complet</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Mot de passe</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white" />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg">
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          {isLogin ? 'Pas encore de compte?' : 'Déjà un compte?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary dark:text-secondary hover:underline ml-1">
            {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
          </button>
        </p>
      </div>
    </div>
  );
};
