

import { ArrowLeftOutlined } from "@ant-design/icons";
import BABox from "./BABox";
import BAIconButton from "./BAIconButton";
import BAPera from "./BAPera";
import { goBack } from "./config/helpers";

type propsType = {
    title: string,
    headerOptions?: any[],
    disableBack?: boolean
    extraTitle?: any,
    headClassName?: string,
}
export default function BAScreenHeader(props: propsType) {
    const { title, headerOptions, disableBack, extraTitle, headClassName } = props;

    return <>
        <BABox className={`py-2 border-bottom border-b-2 border-[#1B4394] flex justify-between items-center ${headClassName}`}>
            <BABox className="flex items-center md:pb-0">
                {!disableBack && <BAIconButton onClick={goBack} icon={<ArrowLeftOutlined />} />}
                <BAPera className="md:text-3xl text-xl ms-2">{title} {extraTitle}</BAPera>
            </BABox>
            <BABox className="flex justify-end">
                {headerOptions?.map((option: any, index: number) => {
                    return option.isHide ? <></> : <BABox key={index} className="md:ml-2 ml-1">{option.displayField()}</BABox>
                })}
            </BABox>
        </BABox>
    </>
}