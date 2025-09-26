import { message } from "antd";
import { formElement } from "../BAComponentSwitcher";
import dayjs from "dayjs";



export const formattedNumber = (numString: any) => {
  return numString ? Number(numString).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : '0.00';
}

export const formattedDate = (dateString: any, format: string = "YYYY-MM-DD") => {
  return dateString ? dayjs(dateString).format(format) : "";
};

export const goBack = () => {
  window.history.back()
}

export const checkRequiredElement = (elements: formElement[], model: any) => {
  let missing: any = []
  elements.forEach(x => {
    if (x.required) {
      if (x.elementType == 'boolean') {
        if ((model[x.key] === undefined || model[x.key] === null)) {
          missing.push(`Required ${x.label}`)
        }
      } if (x.type == 'number') {
        if (model[x.key] === undefined || model[x.key] === null || model[x.key] === '') {
          missing.push(`Required ${x.label}`)
        } else if (isNaN(model[x.key])) {
          missing.push(`Invalid ${x.label}`)
        }

      } else {
        if (!model[x.key]) {
          missing.push(`Required ${x.label}`)
        }
      }
    }
  })
  if (missing.length > 0) {
    message.error(missing)
    return false
  } else {
    return true
  }
}



export const customEncrypt = (input: any, encryptionKey: string) => {
  let result = '';
  let val = JSON.stringify(input)
  for (let i = 0; i < val.length; i++) {
    const charCode = (val.charCodeAt(i) + encryptionKey.charCodeAt(i % encryptionKey.length)) % 256;
    result += String.fromCharCode(charCode);
  }
  return result;
}

export const customDecrypt = (input: any, encryptionKey: string) => {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const charCode = (input.charCodeAt(i) - encryptionKey.charCodeAt(i % encryptionKey.length) + 256) % 256;
    result += String.fromCharCode(charCode);
  }
  return JSON.parse(result);
}

export const removeEmptyRows = (list: any[], key: string) => {
  if (!list || !key) return [];

  if (key.includes(',')) {
    const reqKeys = key.split(',').map(k => k.trim());
    return list.filter(item =>
      // Check if any of the keys has a value in this item
      reqKeys.some(reqKey => Boolean(item[reqKey]))
    );
  } else {
    // Single key case remains the same
    return list.filter(item => Boolean(item[key]));
  }
};

export const printContentSafe = (body: any, config?: any) => {

  const { pageType = 'A4', allowHeader = false, allowFooter = true, orientation = "portrait" } = (config || {})

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    message.error('Pop-up blocked. Please allow pop-ups for this site.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            counter-reset: page;
          }
          
          /* Print-specific styles */
          @page {
            size: ${pageType || 'A4'} ${orientation || 'portrait'};
            margin-top: 1cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
            margin-left: 0.5cm;
            
            /* Custom headers and footers using @page */
            ${allowHeader ? `
            @top-center {
              content: "My Custom Heeader";
              font-weight: bold;
              font-family: Arial, sans-serif;
            }
            @top-right {
              content: "Date: " attr(data-print-date);
            }
            @top-left {
              content: "Reference: DOC-2025";
            }` : ''}
            
            ${allowFooter ? `
            @bottom-center {
              content:  "Page " counter(page) " of " counter(pages);
            }
            @bottom-left {
              content: "";
              color: #777777;
            }
            @bottom-right {
              content: "${new Date().toLocaleDateString()}";
            }` : ''}
          }
          
          /* CSS counter for page numbers */
          .page-counter {
            counter-increment: page;
          }
          
          @media print {
            body {
              /* Enable background graphics/colors printing */
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* Other common print settings */
            html, body {
              /* A4 dimensions in portrait */
              width: 210mm;
              height: 283mm;
            }
            
            /* For custom label size if needed */
            .custom-size {
              width: 2.625cm;
              height: 1.0cm;
            }
            
            
            /* Optional: Hide specific elements when printing */
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body data-print-date="${new Date().toLocaleDateString()}">
       ${body}       
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print(); // No parameters - they're set via CSS
    }, 10);
  };

  printWindow.onafterprint = () => {
    printWindow.close();
  };
}

export const CreateConfig = (
  key: string,
  searchable: boolean,
  show: boolean,
  title: string,
  type: 'boolean' | 'date' | 'number' | 'percentage' | 'text' | 'time' | 'datetime' | 'filterList' | 'phone' | 'enum' | 'link',
  searchField?: string | null,
  width?: any,
  controller?: string,
  displayField?: any,
  filterEnums?: { value: any, label: string, key: string }[],
  hideFilter?: boolean,
) => {
  return {
    key,
    searchField: searchField ? searchField : key,
    searchable: searchable,
    show: show,
    label: title,
    type: type,
    width: width,
    controller: controller,
    displayField: displayField,
    filterEnums: filterEnums,
    hideFilter: hideFilter,
  }
}
