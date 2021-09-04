import React from 'react';

import Code, {CodeProps} from "../packages/react-code-print/code";
import { Story, Meta } from '@storybook/react';

export default {
    component: Code,
    title: 'Code',
    argTypes: {
        indent: {control: 'number'},
        value: {control: 'object'},
        color: {
            control: 'boolean',
            description: "true",
            defaultValue: true
        }
    }
} as Meta;

const template: Story<CodeProps> = (args) => <Code {...args}/>

export const Default = template.bind({});

const person = {
    profile: {
        firstName: 'John',
        lastName: 'Do'
    }
}

Default.args = {
    indent: 4,
    color: true,
    value: {person}
}