import { Radio, Typography } from "antd";

type propsType = {
    onChange?: any,
    value?: any,
    options: {
        label: any,
        value: any,
    }[],
    required?: boolean,
    label?: string,
    disabled?: boolean,
}

export default function BARadio(props: propsType) {
    const { onChange, value, options, required, label, disabled } = props;

    const { Title } = Typography;

    return <>
        {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
        <Radio.Group
            disabled={disabled}
            onChange={onChange}
            value={value}
            options={options}
        />
    </>
}