"use client";

import BABox from "./BABox";
import { BACheckbox, BALoader, BAPera } from ".";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { theme } from "antd";

type propsType = {
  datasourse: any[];
  cols: {
    key: string;
    label: string;
    displayField?: (data: any, i: number) => any;
    HeaderField?: any;
  }[];
  loading?: boolean;
  onChange?: any;
  displayField?: any;
  closeModal?: any;
  onRowClick?: any;
  allowMultiple?: boolean;
  setDataSource?: any;
  className?: string;
  allowSearch?: boolean;
  allowDelete?: boolean;
  onDelete?: (index: number) => void;
  colSearchObj?: any,
  handleSearch?: (pgObj?: any, SearchObj?: any) => void;
};

export default function BAGrid(props: propsType) {
  const {
    datasourse,
    cols,
    loading,
    displayField,
    onRowClick,
  } = props;

  const { token }: any = theme.useToken();


  return (
    <BABox
      className={"overflow-x-auto h-[calc(100vh-16rem)]"}
    >
      <table
        style={{ tableLayout: "auto" }}
        className={
          loading
            ? "blur-background min-w-full divide-y overflow-hidden divide-gray-200"
            : "min-w-full divide-y  overflow-hidden divide-gray-200"
        }
      >
        <thead style={{ backgroundColor: token.token.colorPrimary, color: "white" }}>
          <tr>
            {cols.map((col: any, index: number) => (
              <th
                key={index}
                className={`p-2 border-bottom text-center text-xs font-medium tracking-wider`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {datasourse && datasourse.length > 0 ? (
            datasourse.map((row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                className={displayField ? " cursor-pointer transition " : row.rowClass && typeof row.rowClass === "function" ? row.rowClass(row) : ""}
                // style={{height:'12px'}}
                style={{ backgroundColor: row.rowColor && typeof row.rowColor === "function" ? row.rowColor(row) : rowIndex % 2 === 1 ? "" : "#edf0f4" }}
                onClick={() => (onRowClick ? onRowClick(rowIndex, row) : {})}
              >
                {cols.map((col: any, colIndex: number) => (
                  <td
                    key={colIndex}
                    className={`p-2 whitespace-nowrap text-sm border-bottom border-[lightgrey] text-gray-900 ${col.className ? col.className : ""
                      }`}
                  >
                    {col.displayField
                      ? col.displayField(row, rowIndex)
                      : row[col.key]}
                    {col.HeaderField ? col.HeaderField(rowIndex) : ""}
                  </td>
                ))}
              </tr>
            ))
          ) : loading ? (
            <tr>
              <td colSpan={cols.length + 1} className="text-center py-4"><BALoader /></td></tr>
          ) : (
            <tr>
              <td colSpan={cols.length + 1} className="text-center py-4">
                <BABox className="flex justify-center w-full">
                  <BAPera>No Data Found</BAPera>
                </BABox>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </BABox>
  );
}
