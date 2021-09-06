import { useEffect } from "@storybook/addons";
import { addSeconds, format } from "date-fns";
import React, { CSSProperties, useRef, useState } from "react";

interface IProps {
    seconds?: number;
    onComplete?(): void;
    style?: CSSProperties;
}
export function Countdown({seconds = 60, style, onComplete}: IProps): JSX.Element {
    const [countdownSeconds, setCountdownSeconds] = useState(seconds);
    const timer = useRef<any>();
    useEffect(() => {
        timer.current = setInterval(() => {
            setCountdownSeconds(x => x + 1);
        }, 1000);
        return () => clearTimeout(timer.current);
    }, [])
    return <span style={style}>{format(addSeconds(new Date(0, 0), countdownSeconds), "mm:ss")}</span>;
}
