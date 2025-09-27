"use client";

import { useState } from "react";
import { Input, Typography } from "antd";
import { PatternFormat, NumericFormat } from 'react-number-format';
import BABox from "./BABox";
import { OTPProps } from "antd/es/input/OTP";
import {
    LoadingOutlined,
} from '@ant-design/icons';

type propsType = {
    label: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    className?: string,
    onChange?: any,
    onInput?: any,
    onKeyDown?: any,
    onBlur?: any,
    value?: any,
    type?: any
    inputType?: "numericinput" | "maskinput" | "passwordinput" | "otpinput"
    mask?: string,
    textAlign?: "left" | "right" | "center" | undefined,
    validationType?: "email" | "contactNumber",
    onFocus?: any,
    decimalScale?: any,
    prefix?: any,
    suffix?: any,
    allowNegative?: boolean,
    loading?: boolean,
    maxlength?: any,
    length?: number,
    otpMark?: string,
}
export default function BAinput(props: propsType) {
    const {
        label,
        placeholder,
        disabled,
        required,
        onChange,
        onInput,
        value,
        type,
        onBlur,
        onKeyDown,
        validationType,
        mask,
        onFocus,
        textAlign,
        inputType,
        decimalScale,
        allowNegative,
        prefix,
        suffix,
        maxlength,
        otpMark,
        loading,
        length
    } = props;
    const [isError, setIsError] = useState(false);
    const { Title } = Typography;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const sharedProps: OTPProps = {
        onChange,
        onInput,
    };

    return <BABox>
        {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
        <BABox>
            {inputType === "maskinput" && mask ? <PatternFormat
                value={value}
                onChange={(e) => {
                    const rawNumber = e.target.value?.replace(/\D/g, ""); // Remove all non-numeric characters
                    onChange(rawNumber || null)
                }}
                customInput={Input}
                format={mask}
                disabled={disabled || loading}
                allowEmptyFormatting
                suffix={loading ? <LoadingOutlined /> : suffix}
                mask="_"
            /> : inputType === "passwordinput" ? <Input.Password

                value={value}
                placeholder={placeholder}
                suffix={loading ? <LoadingOutlined /> : suffix}
                prefix={prefix}
                disabled={disabled || loading}
                required={required}
                onChange={onChange}
            /> : inputType === "numericinput" ? <NumericFormat
                onKeyDown={onKeyDown}
                value={value}
                customInput={Input}
                thousandSeparator=","
                decimalScale={decimalScale}
                fixedDecimalScale
                allowNegative={allowNegative}
                prefix={prefix ? `${prefix} ` : ''}
                suffix={loading ? `${<LoadingOutlined />}` : suffix ? ` ${suffix}` : ''}
                placeholder={placeholder}
                disabled={disabled || loading}
                onValueChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                style={{
                    textAlign: 'right',
                }}
            /> : inputType === "otpinput" ? <Input.OTP
                {...sharedProps}
                value={value}
                length={length || 6}
                disabled={disabled}
                onChange={onChange}
                mask={otpMark}
                className="custom-otp"
            /> : <Input
                suffix={loading ? <LoadingOutlined /> : suffix}
                maxLength={maxlength}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                status={isError ? "error" : ""}
                type={type === 'number' ? 'Number' : 'text'}
                value={value}
                placeholder={placeholder}
                disabled={disabled || loading}
                required={required}
                style={{
                    textAlign: textAlign || "left"
                }}
                onChange={(e) => {
                    onChange(e)
                    if (validationType === 'email') {
                        if (emailRegex.test(e.target.value)) {
                            setIsError(false);
                        } else {
                            setIsError(true);
                        }
                    }
                }}
                onFocus={onFocus}
            />}
        </BABox>
    </BABox>
}
