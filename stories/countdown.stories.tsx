import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Countdown } from "../packages/countdown/src";

export default {
    title: 'Example/Countdown',
    component: Countdown
} as ComponentMeta<typeof Countdown>;

const Template: ComponentStory<typeof Countdown> = (args) => <Countdown {...args} />

export const Default = Template.bind({});

Default.args = {
    seconds: 5,
    onComplete: () => alert('Done')
}
