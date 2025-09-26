"use client";

import { App, ConfigProvider } from "antd"
import '@ant-design/v5-patch-for-react-19';
export let displayError: (messageTxt: string, severity: "error" | "success") => void;
export let showLoader: (messageTxt: boolean) => void;
export let appTheme: object;

type propsType = {
    apiInvironment: {
        baseURL: string,
        baseHeaders?: any
    }
    colorPrimary?: string,
    children?: any
}

export default function MasterContainer({ colorPrimary, children, apiInvironment }: propsType) {



    appTheme = {
        components: {
            Button: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 4,
                fontSize: 16,
                algorithm: true, // Enable algorithm
            },
            Input: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 0,
                algorithm: true, // Enable algorithm
            },
            Switch: {
                colorPrimary: colorPrimary || '#13999e',
                algorithm: true, // Enable algorithm
            },
            Select: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 0,
                algorithm: true, // Enable algorithm
            },
            DatePicker: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 0,
                algorithm: true, // Enable algorithm
            },
            Tabs: {
                colorPrimary: colorPrimary || '#13999e',
                algorithm: true, // Enable algorithm
            },
            Checkbox: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 0,
                algorithm: true, // Enable algorithm
            },
            Pagination: {
                colorPrimary: colorPrimary || '#13999e',
                borderRadius: 4,
                algorithm: true, // Enable algorithm
            },
            token: {
                colorPrimary: colorPrimary || '#13999e'
            },
        },
    }


    return <>
        <ConfigProvider
            theme={appTheme}
        >
            <App>
                {children}
            </App>
        </ConfigProvider>
    </>
}
