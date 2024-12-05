'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SWRConfig } from 'swr';

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
        >
            <SWRConfig
                value={{
                    fetcher: (url) => fetch(url).then(res => res.json()),
                    revalidateOnFocus: false
                }}
            >
                {children}
            </SWRConfig>
        </NextThemesProvider>
    );
}