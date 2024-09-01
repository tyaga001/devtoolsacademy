'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => console.log('Service Worker registration successful'),
                    (err) => console.log('Service Worker registration failed: ', err)
                );
            });
        }
    }, []);

    return null;
}