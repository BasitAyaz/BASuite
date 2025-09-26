"use client";

import { Select, Typography } from "antd"
import BABox from "./BABox";


type propsType = {
    onChange: any,
    options: {
        value: any,
        label: string,
        disabled?: boolean,
    }[],
    value: any,
    label: string,
    disabled?: boolean,
    multiple?: boolean,
    required?: boolean,
    width?: any,
    onFocus?: any,
    loading?: any,
    showSearch?: boolean
    api?: string,
    apiParams?: any
    valueField?: string
    displayField?: string
}
export default function BASelect(props: propsType) {
    const { onChange, options, value, label, disabled, multiple, width, required, onFocus, loading, showSearch } = props;
    const { Title } = Typography;

    const handleChange = (ev: any, option: any) => {
        onChange(ev, option);
    }


    return <>
        <BABox className="">
            {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
            <BABox >
                <Select
                    showSearch={showSearch}
                    loading={loading}
                    onFocus={(ev: any) => {
                        if (onFocus) onFocus(ev);
                    }}
                    mode={multiple ? "multiple" : undefined}
                    disabled={disabled}
                    value={value}
                    style={{ width: width ? width : '100%' }}
                    onChange={handleChange}
                    options={options}
                />
            </BABox>
        </BABox>
    </>
}