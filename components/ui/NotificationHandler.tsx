
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '../icons';

export const NotificationHandler: React.FC = () => {
    const { notifications } = useAppContext();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-5 right-5 z-50 space-y-3 w-full max-w-sm">
            {notifications.map(notif => {
                const isSuccess = notif.type === 'success';
                const bgColor = isSuccess ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
                const textColor = isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
                const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';

                return (
                    <div
                        key={notif.id}
                        className={`p-4 rounded-lg shadow-lg flex items-start space-x-3 ${bgColor} ${textColor} animate-fade-in-right`}
                    >
                        <div className="flex-shrink-0">
                            {isSuccess ? 
                                <CheckCircleIcon className={`w-6 h-6 ${iconColor}`} /> : 
                                <ExclamationCircleIcon className={`w-6 h-6 ${iconColor}`} />
                            }
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{notif.message}</p>
                        </div>
                    </div>
                );
            })}
            <style>{`
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
