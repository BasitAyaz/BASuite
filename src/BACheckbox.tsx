"use client";

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

type propTypes = {
  isMultiple?: boolean;
  label?: string;
  onChange?: CheckboxProps['onChange'];
  checked?: boolean
  disabled?: boolean
  required?: boolean
}

const BACheckbox = (props: propTypes) => {
  const { isMultiple, label, onChange, checked, disabled, required } = props

  return (
    <>
      <Checkbox disabled={disabled} indeterminate={isMultiple} onChange={onChange} checked={checked}>
        {label} {required && <span className='text-red-500'>*</span>}
      </Checkbox>
    </>
  );
};

export default BACheckbox;