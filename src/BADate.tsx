"use client";

import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import BABox from './BABox';


type propsType = {
    label: string,
    disabled?: boolean,
    required?: boolean,
    onChange?: any,
    value?: any,
    minDate?: any,
    maxDate?: any,
    validate?: boolean,
    picker?: 'week' | 'month' | 'quarter' | 'year' | undefined;
    showTime?: boolean,
}




export default function BADate(props: propsType) {
    const { label, disabled, required, onChange, value, showTime, minDate, maxDate, picker } = props;
    const { Title } = Typography;
    const validatePeriod = (date: any, dateString: any) => {
        if (!date) {
            onChange(null, dateString);
            return;
        }
        // Use local timezone (dayjs returns local by default)
        const localDate = dayjs(date).toDate();
        onChange(localDate, dateString);
    };


    return <BABox className=''>
        {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
        <BABox>
            <DatePicker
                picker={picker}
                minDate={minDate}
                maxDate={maxDate}
                required={required}
                style={{ width: '100%' }}
                onChange={validatePeriod}
                value={value ? dayjs(value) : null}
                disabled={disabled}
                placeholder=''
                showTime={showTime}
                format={'DD-MMM-YYYY'}
            />
        </BABox>
    </BABox>
}