"use client"

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react"

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            const scrolled = window.scrollY;
            setIsVisible(scrolled > 300);
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollToTop = () => {
        if (typeof window === "undefined") return;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="fixed bottom-20 right-4 z-50">
            <button
                onClick={scrollToTop}
                className={`bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-opacity ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ArrowUp />
            </button>
        </div>
    );
};

export default BackToTop;