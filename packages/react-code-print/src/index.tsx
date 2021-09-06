import React, { ButtonHTMLAttributes,useMemo, CSSProperties, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { filter } from "./data";
import styles from "./code.module.css";

function replacer<T>(_str: string, val: T) {
    if (typeof val === "string") {
        return `<span class=${styles.string}>${val}</span>`;
    }
    if (typeof val === "boolean") {
        return `<span class=${styles.boolean}>${val}</span>`;
    }
    if (typeof val === "number") {
        return `<span class=${styles.number}>${val}</span>`;
    }
    return val;
}

export interface CodeProps {
    value: any;
    indent?: number;
    height?: number;
    style?: CSSProperties;
    className?: string;
    color?: boolean;
}

export function Code({ value, indent = 4, height, style, className, color = true }: CodeProps) {
    const [search, setSearch] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const lines = useMemo(() => {
        if (!value) {
            return value;
        }
        if (typeof value === "function") {
            return value.toString();
        }
        if (!search) {
            return value;
        }

        if (typeof value.toJSON === "function") {
            return filter(value.toJSON(), search);
        }
        return filter(value, search);
    }, [value, search]);
    if (collapsed) {
        return (
            <div className={styles.container}>
                <div className={styles.controls}>
                    <button onClick={() => setCollapsed(false)} className={clsx(styles.btn, styles.expand)}>&#43;</button>
                </div>
            </div>
        )
    }
    const handleCopy = () => {
        if (!("clipboard" in navigator)) {
            return;
        }
        navigator.clipboard.writeText(JSON.stringify(lines, undefined, indent));
    };
    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <div className={styles.inputContainer}>
                    <input
                        value={search}
                        onKeyDown={e => { e.key === "Escape" && setSearch("") }}
                        onChange={(e) => setSearch(e.target.value)}
                        className={clsx(styles.input, {[styles.filled]: Boolean(search)})}
                        placeholder="Search for any value"
                    />
                    <button onClick={() => setSearch('')} className={clsx(styles.btn, styles.clear)}>&#x2715;</button>
                </div>
                <ButtonCopy className={clsx(styles.btn, styles.copy)} onCopy={handleCopy} />
                <button onClick={() => setCollapsed(true)} className={clsx(styles.btn, styles.collapse)}>-</button>
            </div>
            <pre
                style={{ ...style, maxHeight: height }}
                className={clsx(className, styles.code)}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(lines, color ? replacer : undefined, indent) }}
            />
        </div>
    );
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onCopy(): void;
}
export function ButtonCopy({onCopy, ...props}: IButtonProps) {
    const [isCopied, setCopied] = useState(false);
    const {current: state} = useRef<any>({});
    const handleCopy = () => {
        setCopied(true);
        state.timer = setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    useEffect(() => {
        return () => {
            if (!state.timer) {
                return;
            }
            clearTimeout(state.timer);
        }
    }, [])
    return <button onClick={handleCopy} {...props}>{isCopied ? 'Copied' : 'Copy'}</button>
}
