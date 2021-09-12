import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SharedState, useSharedState } from "../packages/shared-state";

export default {
    title: 'Example/SharedState',
    component: SharedState,
} as ComponentMeta<typeof SharedState>;

function Counter() {
    const [count] = useSharedState();
    return <div>{count}</div>
}

function UpdateCounter() {
    const [, updateCount] = useSharedState<number>();
    return <button onClick={() => updateCount(x => x + 1)}>Increment</button>
}

export function Usage() {
    return (
        <div>
            <SharedState value={1}>
                <Counter />
                <UpdateCounter />
            </SharedState>
        </div>
    )
}
