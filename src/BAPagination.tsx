"use client";

import { Pagination } from "antd";
import BABox from "./BABox";
import { useState } from "react";
import BASelect from "./BASelect";

type propsType = {
  totalRecords: number;
  onPageChange: any;
  onOk?: any;
  multiSelect?: boolean;
  content?: React.ReactNode;
  pageSize?: number;
};
export default function BAPagination(props: propsType) {
  const { totalRecords, onPageChange, pageSize } = props;
  const [pageConfig, setPageConfig] = useState({
    current: 1,
    pageSize: pageSize,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    if (onPageChange) onPageChange(page, pageSize);
    setPageConfig({ ...pageConfig, current: page, pageSize: pageSize });
  };

  const pageSizeChange = (value: any) => {
    setPageConfig({ ...pageConfig, pageSize: value });
    handlePageChange(1, value);
  };

  return (
    <>
      <BABox className="p-3 rounded-lg bg-white shadow mt-1 md:mt-2">
        <BABox className="flex justify-between items-center">
          <Pagination
            defaultCurrent={1}
            total={totalRecords}
            pageSize={pageConfig.pageSize}
            onChange={handlePageChange}
          />
          <BABox className="ms-2">Total Records: {totalRecords}</BABox>
        </BABox>
      </BABox>
    </>
  );
}
