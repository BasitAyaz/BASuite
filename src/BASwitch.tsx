import { Typography } from "antd";
import { Switch } from 'antd';
import BABox from "./BABox";

type propsType = {
    label: string,
    value: boolean,
    onChange: any,
    disabled?: boolean,
    required?: boolean,
    className?: string,
    labelClass?: string,
    size?: 'small' | 'default'
}

export default function BASwitch(props: propsType) {
    const { label, value, onChange, disabled, required, className, labelClass, size } = props
    const { Title } = Typography;
    return <>
        <BABox>
            {label && <Title level={5} className={`${labelClass}`}>{label}{required && "*"}</Title>}
            <BABox >
                <Switch size={size} defaultChecked={value} onChange={onChange} disabled={disabled} value={value} />
            </BABox>
        </BABox>
    </>
}