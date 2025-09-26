import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

type propTypes = {
  isMultiple?: boolean;
  label?: string;
  onChange?: CheckboxProps['onChange'];
  checked?: boolean
  disabled?: boolean
}

const BACheckbox = (props: propTypes) => {
  const { isMultiple, label, onChange, checked, disabled } = props

  return (
    <>
      <Checkbox disabled={disabled} indeterminate={isMultiple} onChange={onChange} checked={checked}>
        {label}
      </Checkbox>
    </>
  );
};

export default BACheckbox;