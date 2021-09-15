import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ParentState, useParentState } from "react-parent-state";

export default {
    title: 'Example/ParentState',
    component: ParentState,
} as ComponentMeta<typeof ParentState>;

function Counter() {
    const [count] = useParentState();
    return <div>{count}</div>
}

function UpdateCounter() {
    const [, updateCount] = useParentState<number>();
    return <button onClick={() => updateCount(x => x + 1)}>Increment</button>
}

export function Usage() {
    return (
        <div>
            <ParentState value={1}>
                <Counter />
                <UpdateCounter />
            </ParentState>
        </div>
    )
}
