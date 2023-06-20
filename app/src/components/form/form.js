import React from 'react';
import { 
    Container, 
    Error, 
    Base, 
    Title, 
    Text, 
    TextSmall,
    Link,
    Input,
    TextArea, 
    Submit,
    Select,
    Option
} from './styles/style';

export default function Form({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Form.Base = function FormBase({ children, ...restProps }) {
    return <Base {...restProps}>{children}</Base>;
}

Form.Title = function FormTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
}

Form.Text = function FormText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
}

Form.TextSmall = function FormTextSmall({ children, ...restProps }) {
    return <TextSmall {...restProps}>{children}</TextSmall>;
}

Form.Link = function FormLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>;
}

Form.Error = function FormError({ children, ...restProps }) {
    return <Error {...restProps}>{children}</Error>;
}

Form.Input = function FormInput({ children, ...restProps }) {
    return <Input {...restProps} >{children}</Input>;
}

Form.TextArea = function FormTextArea({ children, ...restProps }) {
    return <TextArea {...restProps}>{children}</TextArea>;
}

Form.Submit = function FormSubmit({ children, ...restProps }) {
    return <Submit {...restProps}>{children}</Submit>
}

Form.Select =function FormSelect({ children, ...restProps }) {
    return <Select {...restProps}>{children}</Select>
}

Form.Option = function FormOption({ children, ...restProps }) {
    return <Option {...restProps}>{children}</Option>;
}