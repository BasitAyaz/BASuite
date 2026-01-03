

import BAButton from "./BAButton";
import BAinput from "./BAInput";
import BASelect from "./BASelect";
import BASwitch from "./BASwitch";
import BADate from "./BADate";
import BABox from "./BABox";
import BAPera from "./BAPera";
import BATextarea from "./BATextarea";
import BACheckbox from "./BACheckbox";
import BARadio from "./BARadio";


type propsType = {
    model: any,
    setModel: any,
    element: formElement,
    disabledForm?: boolean,
    rowChangeEv?: any,
    rowIndex?: number,
}

export default function BAComponentSwitcher(props: propsType) {
    const { model, setModel, element, disabledForm, rowChangeEv, rowIndex } = props;
    const fillModel = (key: any, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };

    switch (element.elementType) {
        case "input":
            return <BAinput
                inputType={element.inputType}
                otpMark={element.otpMark}
                maxlength={element.maxlength}
                loading={element.loading}
                length={element.lenght}
                mask={element.mask}
                type={element.type}
                value={model[element.key]}
                textAlign={element.textAlign}
                onBlur={() => {
                    if (element.blurEv) element.blurEv(model[element.key], rowIndex, element)
                }}
                onChange={(ev: any) => {
                    setModel({
                        ...model,
                        [element.key]: element.mask ? ev : (element.type == 'number' ? Number(ev.target.value) : ev.target.value)
                    })
                    if (rowChangeEv) {
                        rowChangeEv(ev, (element.type == 'number' ? Number(ev.target.value) : ev.target.value), element, rowIndex)
                    }
                    if (element.ChangeEv) {
                        element.ChangeEv(rowIndex, element.key, (element.type == 'number' ? Number(ev.target.value) : ev.target.value), element, rowIndex);
                    }
                }}
                placeholder={element.placeholder}
                disabled={disabledForm || element.disabled}
                required={element.required}
                label={element.label}
                onFocus={() => element.focusEv ? element.focusEv(model[element.key]) : {}}
            />
        case "textarea":
            return <BATextarea
                value={model[element.key]}
                onBlur={() => {
                    if (element.blurEv) element.blurEv(model[element.key], rowIndex, element)
                }}
                onChange={(ev: any) => {
                    setModel({
                        ...model,
                        [element.key]: ev.target.value
                    })
                    if (rowChangeEv) {
                        rowChangeEv(ev, ev.target.value, element, rowIndex)
                    }
                    if (element.ChangeEv) {
                        element.ChangeEv(rowIndex, element.key, ev.target.value, element, rowIndex);
                    }
                }}
                placeholder={element.placeholder}
                disabled={disabledForm || element.disabled}
                required={element.required}
                label={element.label}
            />
        case "button":
            return <BAButton
                onClick={element.onClick}
                disabled={disabledForm || element.disabled}
                label={element.label}
                loading={element.loading}
            />
        case "select":
            return <BASelect
                api={element.api}
                apiParams={typeof element.apiParams === 'object' ? element.apiParams : typeof element.apiParams === "function" ? element.apiParams(rowIndex) : null}
                loading={element.loading}
                onFocus={() => element.focusEv ? element.focusEv(model[element.key], rowIndex) : {}}
                multiple={element.multiple}
                disabled={disabledForm || element.disabled}
                label={element.label}
                valueField={element.valueField}
                displayField={element.displayField}
                showSearch={element.showSearch}
                onChange={(e: any, obj: any) => {
                    setModel({ ...model, [element.key]: e });
                    if (rowChangeEv) {
                        rowChangeEv(e, (element.type == 'number' ? Number(e) : e), element, rowIndex)
                    }
                    if (element.ChangeEv) {
                        element.ChangeEv(rowIndex, element.key, e, element, rowIndex, obj);
                    }
                }}
                options={element.options ?? []}
                required={element.required}
                value={model[element.key]}
            />
        // case "lookup":
        //     return <BASearchLookup
        //         label={element.label}
        //         controller={element.controller}
        //         data={element.data}
        //         params={element.params}
        //         config={element.config}
        //         displayField={element.displayField || ""}
        //         value={model && model[element.key]}
        //         multiple={element.multiple}
        //         required={element.required}
        //         allowMultiple={element.multiSelect}
        //         disabled={disabledForm || element.disabled}
        //         type={element.type}
        //         onSelectMultiple={(data: any[]) => handleMultiSelect(element, data, element.multiSelect, element.arrKey)}
        //         onCancel={() => {
        //             if (element.onCancel) {
        //                 element.onCancel(rowIndex);
        //             }
        //         }}
        //         onRowClick={async (i: number, data: any, list: any[]) => {
        //             const lookupData = { ...data };
        //             setModel({ ...model, [element.key]: lookupData[element.valueField || ""] });
        //             if (element.ChangeEv) {
        //                 element.ChangeEv(rowIndex, lookupData[element.key], lookupData, element, list);
        //             }
        //             if (rowChangeEv) {
        //                 rowChangeEv(null, lookupData, element, rowIndex);
        //             }
        //         }}
        //         useLookup={element.useLookup}
        //         onBlur={() => handleLookupBlur(element.fieldAlias || element.key, model[element.key], element.controller, element)}
        //         onChange={(e: any, val: any, obj: any) => {
        //             if (val) {
        //                 fillModel(element.key, val);
        //                 if (element.ChangeEv) {
        //                     element.ChangeEv(e, val, obj, element, rowIndex);
        //                 }
        //             }
        //             else if (!element.multiple) {
        //                 const lookupData: any = {};
        //                 if (element.reqFields?.length) {
        //                     for (var i = 0; i < element.reqFields.length; i++) {
        //                         lookupData[element.reqFields[i]] = "";
        //                     }
        //                 }
        //                 (element.arrKey && (!val || !obj)) ? setModel({ ...model, [element.arrKey]: [], ...lookupData }) : setModel({ ...model, [element.key]: e ? e.target.value : "", ...lookupData });
        //                 if (rowChangeEv) {
        //                     rowChangeEv(e, (element.type == 'number' ? Number(val) : val), element, rowIndex);
        //                 }
        //             } else {
        //                 if (element.arrKey && (!val || !obj)) setModel({ ...model, [element.arrKey]: [], [element.key]: "" });
        //             }
        //         }}
        //         apiFunctions={apiFunctions}
        //     />
        case "datepicker":
            return (
                <BADate
                    required={element.required}
                    disabled={disabledForm || element.disabled}
                    label={element.label}
                    value={model[element.key]}
                    onChange={(date: any, dateString: any) => {
                        if (element.ChangeEv) {
                            element.ChangeEv(element.key, date, dateString);
                        } else setModel({ ...model, [element.key]: (dateString) });
                        if (rowChangeEv) {
                            rowChangeEv(date, dateString, element, rowIndex)
                        }
                    }}
                />
            )
        case "boolean":
            return (
                <BASwitch
                    required={element.required}
                    disabled={element.disabled}
                    label={element.label}
                    value={model && model[element.key] ? model[element.key] : null}
                    onChange={(e: any) => {
                        setModel({ ...model, [element.key]: e });
                        if (element.ChangeEv) {
                            element.ChangeEv(null, e);
                        }
                        if (rowChangeEv) {
                            rowChangeEv(e, e, element, rowIndex)
                        }
                    }
                    }
                />
            );
        case "checkbox":
            return (
                <BACheckbox
                    required={element.required}
                    disabled={element.disabled}
                    label={element.label}
                    checked={model && model[element.key] ? model[element.key] : null}
                    onChange={(e: any) => {
                        setModel({ ...model, [element.key]: e.target.checked });
                        if (element.ChangeEv) {
                            element.ChangeEv(null, e);
                        }
                        if (rowChangeEv) {
                            rowChangeEv(e, e, element, rowIndex)
                        }
                    }
                    }
                />
            );
        case "radio":
            return (
                <BARadio
                    required={element.required}
                    disabled={element.disabled}
                    label={element.label}
                    value={model && model[element.key] ? model[element.key] : null}
                    onChange={(e: any) => {
                        setModel({ ...model, [element.key]: e.target.value });
                        if (element.ChangeEv) {
                            element.ChangeEv(null, e);
                        }
                        if (rowChangeEv) {
                            rowChangeEv(e, e, element, rowIndex);
                        }
                    }}
                    options={element.options || []}
                />
            );
        case "custombody":
            return (
                <BABox className={element.className}>
                    {element.body}
                </BABox>
            );
        case "heading":
            return (
                <BABox className="bg-[#E4F6F7] border-s-3 border-[#30ABAB] px-2">
                    <BAPera className="text-xl">{element.label}</BAPera>
                </BABox>
            );
        case "text":
            return (
                <BABox>
                    <BAPera className="font-bold">{element.label}</BAPera>
                    <BAPera className="">{model[element.key]}</BAPera>
                </BABox>
            );
        default:
            return null;
    }

}

export type formElement = {
    col: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12,
    elementType: "input" | "datepicker" | "select" | "radio" | "checkbox" | "boolean" | "textarea" | "button" | "custombody" | "heading" | "text",
    key: string,
    label: string,
    placeholder?: string,
    textAlign?: "left" | "right" | "center" | undefined,
    inputType?: "numericinput" | "maskinput" | "passwordinput" | "otpinput" | "emailinput",
    mask?: string,
    lenght?: number,
    otpMark?: string,
    fillObjName?: string,
    api?: string,
    fillObj?: any,
    valueField?: string | undefined,
    options?: {
        value: any,
        label: string,
        disabled?: boolean,
    }[],
    ChangeEv?: any,
    onCancel?: any,
    blurEv?: any,
    focusEv?: any,
    required?: boolean,
    removeDecimals?: boolean,
    isHide?: boolean,
    multiple?: boolean,
    maxlength?: number,
    disabled?: any,
    loading?: boolean,
    showSearch?: boolean,
    onClick?: any,
    body?: any,
    controller?: any,
    type?: any,
    apiParams?: any,
    config?: any,
    displayField?: any,
    singleValue?: any,
    className?: string
    multiSelect?: boolean,
    arrKey?: string,
    validatePeriod?: boolean,
    data?: any,
    showTime?: boolean,
    validateCodeKey?: string,
    validateController?: string,
    fieldAlias?: string;
    reqFields?: string[];
    useLookup?: boolean;
    aliasModel?: { actualKey: String; modelKey: String }[];
    params?: any
}