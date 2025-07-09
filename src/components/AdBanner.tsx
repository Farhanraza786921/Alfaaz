'use client';

import { useEffect, useRef } from 'react';

export function AdBanner() {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const hasInjectedScript = useRef(false);

    useEffect(() => {
        if (!adContainerRef.current || hasInjectedScript.current) {
            return;
        }

        const adContainer = adContainerRef.current;
        
        const configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.innerHTML = `
            atOptions = {
                'key' : 'b360047346bdaaf28021541f3cf732f8',
                'format' : 'iframe',
                'height' : 60,
                'width' : 468,
                'params' : {}
            };
        `;
        adContainer.appendChild(configScript);
        
        const adScript = document.createElement('script');
        adScript.type = 'text/javascript';
        adScript.src = 'https://www.highperformanceformat.com/b360047346bdaaf28021541f3cf732f8/invoke.js';
        adScript.async = true;
        adContainer.appendChild(adScript);

        hasInjectedScript.current = true;

    }, []);

    return <div ref={adContainerRef} className="mx-auto my-4 flex justify-center items-center w-full max-w-[468px] h-[60px]"></div>;
};
