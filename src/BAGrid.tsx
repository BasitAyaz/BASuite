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
    allowMultiple,
    setDataSource,
    allowSearch,
    handleSearch,
    colSearchObj = {},
    allowDelete,
    onDelete
  } = props;

  const { token }: any = theme.useToken();

  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [gridSearchObj, setGridSearchObj] = useState<any>(colSearchObj);

  const onRowSelect = (data: any, i: number, checked: boolean) => {
    if (datasourse.length) {
      const listData = [...datasourse];
      listData[i] = { ...data, isSelected: checked };
      const selectionRemaining = listData.find((el) => !el.isSelected);
      if (!selectionRemaining) setIsAllSelected(true);
      else setIsAllSelected(false);
      setDataSource(listData);
    }
  };

  const onSelectAll = (checked: boolean) => {
    setIsAllSelected(checked);
    const listData = [...datasourse];
    listData.map((item) => ({ ...item, isSelected: checked }));
    setDataSource(listData.map((item) => ({ ...item, isSelected: checked })));
  };

  const indeterminate =
    !isAllSelected && datasourse?.find((el) => el.isSelected);

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
            {allowSearch && <th></th>}
            {allowMultiple && (
              <th>
                <BACheckbox
                  onChange={(e) => onSelectAll(e.target.checked)}
                  checked={isAllSelected || false}
                  isMultiple={indeterminate}
                />
              </th>
            )}
            {allowDelete && <th
              className={`p-1 text-left text-xs font-medium text-plain tracking-wider`}
            >Action</th>}
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
                {allowSearch && <td></td>}
                {allowMultiple && (
                  <td className="pl-1">
                    <BACheckbox
                      checked={row.isSelected || false}
                      onChange={(e) =>
                        onRowSelect(row, rowIndex, e.target.checked)
                      }
                    />
                  </td>
                )}
                {allowDelete && onDelete && <td
                  className={`p-1 whitespace-nowrap text-sm text-gray-900 h-0.5`}
                ><DeleteOutlined className="text-xl m-1 hover:text-red-600" onClick={() => onDelete(rowIndex)} /></td>}
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
