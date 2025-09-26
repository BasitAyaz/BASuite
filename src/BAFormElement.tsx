

import { Col, Row, Skeleton } from "antd";
import BAComponentSwitcher, { formElement } from "./BAComponentSwitcher"
import BABox from "./BABox";
import BAButton from "./BAButton";
import { SaveOutlined } from '@ant-design/icons';
import { checkRequiredElement } from "./config/helpers";

type propsType = {
    model: any,
    setModel: any,
    formElement: formElement[],
    onSaveClick?: () => void,
    saveLoader?: boolean
    disabledForm?: boolean,
    loading?: boolean,
    containerClass?: string,
    buttonContainerClass?: string,
    customButton?: React.ReactNode,
    hideButton?: boolean
    apiFunctions?: any
}

export default function BAFormElement(props: propsType) {
    const { model, setModel, formElement, disabledForm, saveLoader, onSaveClick, loading, customButton, hideButton, apiFunctions } = props;

    const saveClick = () => {
        if (checkRequiredElement(formElement, model) && onSaveClick) {
            onSaveClick()
        }
    }

    return <>

        <BABox className={"overflow-hidden"}>
            <Row>
                {formElement.map((element, index) => {
                    return !element.isHide && <Col key={index} xs={24} sm={24} md={element.col * 2} className={element.className}>
                        {loading ? <BABox className="p-1"><Skeleton.Input block active /></BABox> : <BABox className="p-2">
                            <BAComponentSwitcher
                                element={element}
                                model={model}
                                setModel={setModel}
                                disabledForm={disabledForm}
                                apiFunctions={apiFunctions}
                            />
                        </BABox>}
                    </Col>
                })}
            </Row>
        </BABox>
        {!hideButton && <BABox className="sticky bottom-0 z-10">
            <BABox className={"p-2 shadow bg-[#f8f9fa] rounded text-end"}>
                {customButton ? customButton : <BAButton className="bg-secondary" disabled={loading} loading={saveLoader} onClick={saveClick} icon={<SaveOutlined />} label="Save" />}
            </BABox>
        </BABox>}
    </>

}