"use client";

import { theme } from "antd";

export default function BAFieldset({ title, body }: { title: string; body: React.ReactNode }) {
    const { token }: any = theme.useToken();
    return (
        <fieldset className="rounded-lg border bg-white p-2">
            <legend style={{ backgroundColor: token.token.colorPrimary }} className="rounded-lg p-2 px-4 text-white">{title}</legend>
            {body}
        </fieldset>
    );
}