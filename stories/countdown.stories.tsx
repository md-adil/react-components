import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
// import {useState} from "@storybook/addon-actions"; 
import { Countdown, CountdownProps } from "../packages/countdown/src";

export default {
    title: 'Example/Countdown',
    component: Countdown,
    argTypes: {
        onComplete: { action: 'Completed'}
    }
} as ComponentMeta<typeof Countdown>;


const Template: any = (args: any) => <Countdown {...args} />
export const Default = Template.bind({});

export function Usage({ seconds = 5 }: CountdownProps) {
    const [ isCompleted, setCompleted ] = useState(false);
    return (
        <div>
            <Countdown seconds={seconds} onComplete={() => setCompleted(true)} />
            { isCompleted && <h4>Completed</h4>}
        </div>
    )
}

Default.args = {
    seconds: 5
}

