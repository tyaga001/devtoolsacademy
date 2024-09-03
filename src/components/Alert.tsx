import React from 'react';
import { AlertCircle } from 'lucide-react';

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
    <div className="text-sm">{children}</div>
);

const Alert = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
            <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
            <div>{children}</div>
        </div>
    );
};

Alert.Description = AlertDescription;

export { Alert, AlertDescription };