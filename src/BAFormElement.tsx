

import { Col, Row, Skeleton } from "antd";
import BAComponentSwitcher, { formElement } from "./BAComponentSwitcher"
import BABox from "./BABox";
import BAButton from "./BAButton";
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
    disabledSaveButton?: boolean
    saveButtonLabel?: string
    saveButtonIcon?: any
    saveButtonAlignment?: "center" | "start" | "end" | undefined
    saveButtonType?: "primary" | "default" | "dashed" | "link" | "text" | undefined
}

export default function BAFormElement(props: propsType) {
    const {
        model,
        setModel,
        formElement,
        disabledForm,
        saveLoader,
        onSaveClick,
        loading,
        customButton,
        hideButton,
        saveButtonLabel,
        saveButtonIcon,
        disabledSaveButton,
        saveButtonAlignment,
        saveButtonType,
    } = props;

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
                            />
                        </BABox>}
                    </Col>
                })}
            </Row>
        </BABox>
        {!hideButton && <BABox className="sticky bottom-0 z-10">
            <BABox className={`p-2 border-t border-gray-400 text-${saveButtonAlignment || "end"}`}>
                {customButton ? customButton : <BAButton type={saveButtonType} className="bg-secondary" disabled={disabledSaveButton || loading} loading={saveLoader} onClick={saveClick} icon={saveButtonIcon} label={saveButtonLabel ? saveButtonLabel : "Save"} />}
            </BABox>
        </BABox>}
    </>

}