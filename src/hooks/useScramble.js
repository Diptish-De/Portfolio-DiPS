import { useRef, useState, useEffect } from "react";

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export const useScramble = (text, speed = 40) => {
    const [displayText, setDisplayText] = useState("");
    const iteration = useRef(0);
    const interval = useRef(null);

    useEffect(() => {
        let mounted = true;

        const startScramble = () => {
            clearInterval(interval.current);
            iteration.current = 0;

            interval.current = setInterval(() => {
                if (!mounted) return;

                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration.current) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration.current >= text.length) {
                    clearInterval(interval.current);
                }

                iteration.current += 1 / 3;
            }, speed);
        };

        startScramble();

        return () => {
            mounted = false;
            clearInterval(interval.current);
        };
    }, [text, speed]);

    return displayText;
};
