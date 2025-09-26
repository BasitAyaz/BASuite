"use client";

import { useState } from "react"
import BABox from "./BABox"
import BAPera from "./BAPera"
import {
    RightOutlined,
    DownOutlined
} from "@ant-design/icons";

export default function BACollapse(props: { label: string, children: any, icon?: any, expand?: boolean, labelClick?: any }) {
    const { label, children, icon, expand, labelClick } = props
    const [open, setOpen] = useState(expand)
    const handleOpen = () => {
        setOpen(!open)
        if (labelClick) {
            labelClick()
        }
    }
    return <>
        <BABox className="mb-2 border " >
            <BAPera onClick={handleOpen} className={`p-2 text-drawer font-semibold text-lg border-b hover:bg-[rgba(0,0,0,.1)] border-b-[drawer] cursor-pointer flex justify-between items-center`}><span>{icon && <span className="me-3 inline-block">{icon}</span>}{label}</span>{<span style={{ fontSize: "1rem" }}>{open ? <DownOutlined /> : <RightOutlined />}</span>}</BAPera>
            {open && <BABox className="p-2">
                {children}
            </BABox>}
        </BABox>
    </>
}