import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const ExcelExport = (props) => {
    const { sheets = [], name, rules } = props;
    const [error, setError] = useState([]);

    const exportFile = () => {
        if (!sheets.length) {
            console.error("No sheets provided for export.");
            return;
        }

        const wb = XLSX.utils.book_new();

        sheets.forEach((sheet, index) => {
            const ws = XLSX.utils.aoa_to_sheet(sheet.data);
            XLSX.utils.book_append_sheet(wb, ws, sheet.name || `Sheet${index + 1}`);
        });

        XLSX.writeFile(wb, !!name ? `${name}.xlsx` : 'exported_data.xlsx');
    }

    const chkRules = () => {
        let required = rules.find(rul => !!rul.required);
        sheets.forEach((sheet, index) => {
            if (!!required) {

                const lstErr = notNull(sheet);
            }
        });
    }

    const notNull = (data) => {
        if (!!data && data.length < 0) {
            return [{
                error: 'Sheet không hợp lệ',
            }];
        } else {
            const lstErr = [];
            const columnsToCheck = data[0];
            for (let columnIndex = 0; columnIndex < columnsToCheck.length; columnIndex++) {
                const columnName = columnsToCheck[columnIndex];
                const ruleItem = chkRulesItem(columnName);
                if(!!ruleItem) {
                    if(ruleItem != 'allowNull') {

                    }
                }
                // Duyệt qua từng hàng bắt đầu từ hàng thứ 1 (bỏ qua hàng tiêu đề)
                for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
                    const cellValue = data[rowIndex][columnIndex];
                    // Kiểm tra nếu giá trị của cột đang xét là rỗng hoặc null
                    if (cellValue === '' || cellValue === null) {
                        lstErr.push({
                            column: columnName,
                            row: rowIndex + 1,
                            error: 'Không được phép rỗng'
                        });
                    }
                }
            }
            return lstErr;
        }
    }

    const chkRulesItem = (key) => {
        let rule;
        const ex = rules?.item?.find(obj => !!Object.keys(obj)[key]);
        if(!!ex) {
            rule = ex.rule;
        }
        return rule;
    }

    return (
        <Tooltip title="Xuất Excel" placement="top">
            <Button onClick={exportFile} size='middle' htmlType='button'>
                <DownloadOutlined />
            </Button>
        </Tooltip>
    );
}

export default ExcelExport;
