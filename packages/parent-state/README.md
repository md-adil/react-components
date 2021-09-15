# Parent state

### installation

    yarn add react-parent-state

```tsx
import {ParentState, useParentState} from "react-parent-state";


function Counter() {
    const [count] = useParentState();
    return <div>{count}</div>
}

function UpdateCounter() {
    const [, updateCount] = useParentState<number>();
    return <button onClick={() => updateCount(x => x + 1)}>Increment</button>
}

export function App() {
    return (
        <div>
            <ParentState value={1}>
                <Counter />
                <UpdateCounter />
            </ParentState>
        </div>
    )
}

// or with extended props

export function App(props) {
    return (
        <div>
            {/* watch option will watch property changes and update the state accordingly */}
            <ParentState value={props} watch>
                <Counter />
                <UpdateCounter />
            </ParentState>
        </div>
    )
}


```