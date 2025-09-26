"use client";

import { Input, message, Typography, Grid } from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import BAModal from "./BAModal";
import BAGrid from "./BAGrid";
import BAPagination from "./BAPagination";
import BAButton from "./BAButton";
import BABox from "./BABox";
import createApiFunction from "./config/apimethods";

const { useBreakpoint } = Grid;

type propsType = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: any;
  onCancel?: any;
  value?: any;
  type?: any;
  controller?: any;
  apiName?: string;
  config?: any;
  displayField?: any;
  multiple?: any;
  onRowClick?: any;
  onBlur?: any;
  allowMultiple?: boolean;
  onSelectMultiple?: any;
  isRowSelected?: boolean;
  isAllSelected?: boolean;
  data?: any;
  useLookup?: boolean;
  fillObj?: any;
  params?: any
  apiFunctions?: any
};



export default function BASearchLookup(props: propsType) {

  const screens = useBreakpoint();
  const isMobile = !screens.md; // md = 768px breakpoint

  const {
    label,
    placeholder,
    disabled,
    required,
    className,
    onChange,
    value,
    type,
    controller,
    config,
    displayField,
    onRowClick,
    onBlur,
    allowMultiple,
    onSelectMultiple,
    fillObj,
    onCancel,
    apiFunctions,
  } = props;
  const { Get } = apiFunctions
  const { Title } = Typography;

  const [listData, setListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<any>(false);
  const [paginationConfig, setPaginationConfig] = useState({
    pageSize: 10,
    page: 1,
    totalRecords: 0,
  });
  const [inpValue, setInpValue] = useState<any>(value);

  const getData = (pgObj?: any, SearchObj?: any) => {
    setLoading(true);



    const updatedSearchObj = Object.fromEntries(
      Object.entries(SearchObj || {}).filter(([_, value]) => value)
    );
    Get(`lookup/${controller}`, null, {
      page: pgObj?.page || paginationConfig.page,
      limit: pgObj?.pageSize || paginationConfig.pageSize,
      selector: config.map((col: any) => col.key).filter(Boolean).join(","),
      search: updatedSearchObj,
      filter: JSON.stringify({ ...SearchObj })
    })
      .then((res: any) => {
        if (res?.items) {
          setListData([...res.items]);
          setPaginationConfig({ ...paginationConfig, totalRecords: res.meta?.totalItems });
          setLoading(false);
        } else {
          message.error(res.message || "An error occurred.");
        }
      }).catch((err: any) => {
        setLoading(false);
        message.error(err.error)
      });
  };
  const handleOpen = () => {
    setOpenModal(true);
    getData();
  };

  const handleCancel = () => {
    onChange(null, null, {});
    setInpValue("");
    onCancel && onCancel();
  }

  const onInputChange = (e: any) => {
    setInpValue(e.target.value);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleOpen();
    }
  };
  const onOK = () => setOpenModal(false);

  const pageChange = async (page: any, pageSize: any) => {
    paginationConfig.pageSize = pageSize;
    paginationConfig.page = page;
    setPaginationConfig({ ...paginationConfig });
    getData({ ...paginationConfig, page, pageSize });
  };

  const setSelectedRows = () => {
    const selectedRows = listData.filter((el: any) => el.isSelected);
    onSelectMultiple(selectedRows);
    onOK();
  };

  useEffect(() => {
    if (fillObj && value) {
      setInpValue(fillObj[displayField]);
    }
  }, [])

  return (
    <>
      <BAModal
        title={label ? label : "Search Lookup"}
        open={openModal}
        handleOK={onOK}
        close={setOpenModal}
        width={isMobile ? "95%" : "70%"}
        content={
          <>
            <BAGrid
              closeModal={onOK}
              displayField={displayField}
              onChange={onChange}
              datasourse={listData}
              cols={config}
              loading={loading}
              onRowClick={(i: number, data: any) => {
                if (!allowMultiple) onOK();
                onRowClick(i, data, listData);
                setInpValue(data[displayField]);
              }}
              allowMultiple={allowMultiple}
              setDataSource={setListData}
              allowSearch
              handleSearch={getData}
            />
            <BAPagination
              pageSize={paginationConfig.pageSize}
              totalRecords={paginationConfig.totalRecords}
              onPageChange={pageChange}
              multiSelect={allowMultiple}
              onOk={() => (allowMultiple ? setSelectedRows() : {})}
            />
          </>
        }
      />
      {type === "button" ? (
        <BAButton label={label} disabled={disabled} onClick={handleOpen} />
      ) : (
        <BABox className={`${className}`}>
          {label && <Title level={5}>{label}<span className="text-2xl">{required && "*"}</span></Title>}
          <BABox>
            <Input
              value={inpValue}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              suffix={
                <>
                  {value ? <CloseOutlined disabled={disabled} onClick={() => disabled ? {} : handleCancel()} /> : <SearchOutlined disabled={disabled} onClick={() => disabled ? {} : handleOpen()} />}
                  {/* <BAIconButton
                  className="bg-primary"

                  icon={<SearchOutlined />}

                /> */}
                </>
              }
              className={className}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              onBlur={(e) => {
                if (value === "") {
                  onChange(e, "", {});
                }
                if (onBlur) {
                  onBlur(e);
                }
              }}
            />
          </BABox>
        </BABox>
      )}
    </>
  );
}
