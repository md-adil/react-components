import { createContext, createElement, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type State<T = any> = [T, Dispatch<SetStateAction<T>>];
const Context = createContext<State>([
    undefined,
    () => {
        throw new Error("Wrap parent element with <SharedState>");
    },
]);

export interface SharedStateProps<T> {
    children: ReactNode;
    value?: T;
    watch?: boolean;
}

export function SharedState<T>({ children, value, watch = false }: SharedStateProps<T>) {
    const state = useState<T>(value!);
    useEffect(() => {
        if (!watch) {
            return;
        }
        state[1](value!);
    }, [value]);
    return createElement(Context.Provider, { value: state }, children);
}

export function useSharedState<T = any>() {
    return useContext<State<T>>(Context);
}
