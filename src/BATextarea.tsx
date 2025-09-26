"use client";


import { Input, Typography } from "antd";
type propsType = {
    label: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    className?: string,
    onChange?: any,
    value?: string,
    type?: any,
    onBlur?: any
}
export default function BATextarea(props: propsType) {
    const { label, placeholder, disabled, required, onChange, value, onBlur } = props;

    const { TextArea } = Input;

    return <>
        {label && <Typography.Title level={5}>{label}{required && "*"}</Typography.Title>}
        <TextArea
            onBlur={onBlur}
            rows={4}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onChange={onChange}
        />
    </>
}
