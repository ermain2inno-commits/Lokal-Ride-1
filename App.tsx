import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { BrowseCarsScreen } from './components/screens/BrowseCarsScreen';
import { CarDetailsScreen } from './components/screens/CarDetailsScreen';
import { MyAccountScreen } from './components/screens/MyAccountScreen';
import { ListCarScreen } from './components/screens/ListCarScreen';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';
import { NotificationHandler } from './components/ui/NotificationHandler';

const AppContent: React.FC = () => {
    const { view, currentUser } = useAppContext();

    // Fix: Allow unauthenticated users to access 'browse' and 'details' views.
    // The original logic would always show the WelcomeScreen, preventing users from browsing cars before logging in.
    // This change ensures that if the view is 'browse' or 'details', the component proceeds to render it within the MainLayout.
    if (!currentUser && view !== 'browse' && view !== 'details') {
        if (view === 'auth') return <AuthScreen />;
        return <WelcomeScreen />;
    }

    const renderView = () => {
        switch (view) {
            case 'dashboard': return <DashboardScreen />;
            case 'browse': return <BrowseCarsScreen />;
            case 'details': return <CarDetailsScreen />;
            case 'account': return <MyAccountScreen />;
            case 'listCar': return <ListCarScreen />;
            case 'admin': return <AdminDashboardScreen />;
            default: return <DashboardScreen />;
        }
    };
    
    return <MainLayout>{renderView()}</MainLayout>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
        <NotificationHandler />
        <AppContent />
    </AppProvider>
  );
};

export default App;
