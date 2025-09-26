import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import BAButton from "./BAButton";

interface FileUploadToBlobProps extends UploadProps {
  onFileUpload: (blob: any) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  uploadText?: string;
}

const FileUploadToBlob: React.FC<FileUploadToBlobProps> = ({
  onFileUpload,
  accept = ".jpg, .jpeg, .png, .pdf, .xls, .xlsx",
  multiple = false,
  disabled = false,
  uploadText = "Upload",
  ...rest
}) => {
  const props: UploadProps = {
    showUploadList: false,
    beforeUpload(file) {
      onFileUpload(file)
    },
    accept,
    multiple,
    ...rest,
  };

  return (
    <Upload {...props}>
      <BAButton
        icon={<UploadOutlined />}
        disabled={disabled}
        label={uploadText}
      />
    </Upload>
  );
};

export default FileUploadToBlob;
