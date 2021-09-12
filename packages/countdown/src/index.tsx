import React, { CSSProperties, useRef, useState, useEffect } from "react";
import { addSeconds, format } from "date-fns";

export interface CountdownProps {
    seconds?: number;
    onComplete?(): void;
    style?: CSSProperties;
}
export function Countdown({seconds = 60, style, onComplete}: CountdownProps) {
    const [countdownSeconds, setCountdownSeconds] = useState(seconds);
    const timer = useRef<any>();
    useEffect(() => {
        timer.current = setInterval(() => {
            setCountdownSeconds(x => {
                if (x < 1) {
                    clearInterval(timer.current);
                    onComplete?.call(null);
                    return 0;
                }
                return x - 1
            });
        }, 1000);
        return () => clearTimeout(timer.current);
    }, [])
    return <span style={style}>{format(addSeconds(new Date(0, 0), countdownSeconds), "mm:ss")}</span>;
}
