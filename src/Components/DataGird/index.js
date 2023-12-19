import React, { useEffect, useState } from 'react';
import {
    Button,
    Empty,
    Row,
    Space,
    Table,
    Modal,
    Col,
    Divider
} from 'antd';
import nodata from '../../Asset/Images/empty.svg'
import { Link } from 'react-router-dom';
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
    DEFAULT_TABLE_BORDERED,
    DEFAULT_TABLE_PAGE_NODATA,
    DEFAULT_TABLE_PAGE_SIZE_NUMBER,
    DEFAULT_TABLE_PAGE_SIZE_OPTIONS,
    DEFAULT_TABLE_SELECTION_TYPE,
    DEFAULT_TABLE_SIZE
} from '../Constants/TableConfig'
import { useNavigate } from "react-router-dom";
import FormContainer from '../FormContainer';

const DataGird = (props) => {
    let {
        title,
        listColumn,
        dataSource,
        selectionType,
        size,
        bordered,
        pageSizeNumber,
        isShowHeaderTable,
        onSelectRowItem,
        onPageChange,
        onDeleteItem,
        pageSizeOptions,
        isShowSizeChanger,
        isShowHeaderAction,
        isShowButtonAdd,
        isShowModalBtnAdd,
        urlAdd,
        modalWidth,
        TitleModal,
        listColumnModel,
        onSubmitModel
    } = props;
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [loading, setLoading] = useState(true);
    const [listCells, setListCells] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadings, setLoadings] = useState([]);
    const [disBtnDel, setDisBtnDel] = useState(true);
    const [selectRowItem, setSelectRowItem] = useState([]);
    const [selectRowKeys, setSelectRowKeys] = useState([]);

    let objjd = null;
    const onCloseModal = () => {
        objjd.destroy();
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log("rowSelection", selectedRowKeys, selectedRows)
            setDisBtnDel(selectedRowKeys.length > 0 && selectedRows.length> 0 ? false : true)
            setSelectRowItem(selectedRows)
            setSelectRowKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // })
    };

    useEffect(() => {
        const lstCell = getListCells();
        setListCells(lstCell)
    }, [listColumn])


    const getListCells = () => {
        let colums = [];

        listColumn?.map((item, index) => {
            if (item.dataIndex == 'edit') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Link to={`${item.link + record.id}`} key={item.key}>{!!item.icon ? item.icon : 'Edit'}</Link>
                    </Space>
                )
            }
            if (item.dataIndex == 'delete') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleDelete(record)} size={"small"} >
                            {!!item.icon ? item.icon : 'Delete'}
                        </Button>
                    </Space>
                )
            }
            if (item.dataIndex == 'groupAction') {

                item.render = (_, record) => (
                    <Space size="middle">
                        <Link to={`${item.link + record.id}`}><EditOutlined /></Link>
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleDelete(record)} icon={<DeleteOutlined />} size={"small"} />
                    </Space>
                )
            }
            return colums.push(item)
        })

        return colums
    }

    const handleDelete = (record) => {
        onDeleteItem?.(record)
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        onPageChange?.(pagination.current);
    }

    const locale = {
        emptyText: (
            <Empty
                image={nodata}
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>{DEFAULT_TABLE_PAGE_NODATA}</span>
                }
            >
            </Empty>
        )
    };

    const showLoadings = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 600);
    }

    const SubmitModel = (values) => {
        onSubmitModel?.(values)
    }

    const handleAdd = (index) => {
        showLoadings(index)
        checkNavige()
    }

    const checkNavige = () => {
        if (isShowModalBtnAdd) {
            const config = {
                title:
                    <Row className="modal-header" type='flex' justify={'space-between'} align='middle'>
                        <h5 className="modal-title">{!!TitleModal ? TitleModal : 'Thêm'}</h5>
                        <Button
                            onClick={onCloseModal}
                            icon={<CloseOutlined />}
                            type="text"
                            size='middle'
                            style={{ color: '#ff4d4f', padding: 0, width: 25, height: 25 }}
                        ></Button>
                    </Row>
                ,
                icon: null,
                closable: false,
                className: "modal-ant-custom",
                width: !!modalWidth ? modalWidth : 800,
                footer: null,
                content: (
                    <FormContainer layout='vertical' listColumn={!!listColumnModel ? listColumnModel : []} onCloseModal={onCloseModal} onSubmit={SubmitModel}></FormContainer>
                )
            };

            objjd = modal.confirm(config);
        }
        else {
            console.log("onSelectRowItem", urlAdd, isShowModalBtnAdd)

            navigate(urlAdd)
        }
    }

    const handleSelectRowsDelete = (index) => {
        showLoadings(index)
        onSelectRowItem?.(selectRowKeys, selectRowItem)
    }


    return (
        <> {!!title? <Divider>{title}</Divider> : ""}
        {
            !!isShowHeaderAction && <Row type='flex' justify={'end'} align='middle' style={{ marginBottom: 5, }}>
                {!!isShowButtonAdd && <Button
                    onClick={() => handleAdd(2)}
                    size='middle'
                    htmlType='button'
                    loading={loadings[2]}
                >
                    <PlusOutlined />Thêm
                </Button>}

                {!!onSelectRowItem && <Button
                    onClick={() => handleSelectRowsDelete(1)}
                    size='middle'
                    danger
                    type='dashed'
                    htmlType='button'
                    disabled={disBtnDel}
                    loading={loadings[1]}
                    style={{marginLeft : 5}}
                >
                    <DeleteOutlined />Xóa
                </Button>}
            </Row>
        }
        <Col>
            <Table
                rowSelection={{
                    type: !!selectionType ? selectionType : DEFAULT_TABLE_SELECTION_TYPE,
                    ...rowSelection,
                }}
                locale={locale}
                showHeader={isShowHeaderTable}
                columns={listCells}
                dataSource={dataSource}
                size={!!size ? size : DEFAULT_TABLE_SIZE}
                bordered={!!bordered ? bordered : DEFAULT_TABLE_BORDERED}
                pagination={{
                    pageSize: !!pageSizeNumber ? pageSizeNumber : DEFAULT_TABLE_PAGE_SIZE_NUMBER,
                    position: ['bottomRight'],
                    showSizeChanger: isShowSizeChanger,
                    defaultCurrent: currentPage,
                    total: (!!dataSource && dataSource.length > 0) ? dataSource[0].totalRows : dataSource.length,
                    pageSizeOptions: !!isShowSizeChanger ? (!!pageSizeOptions && pageSizeOptions.length > 0) ? pageSizeOptions : DEFAULT_TABLE_PAGE_SIZE_OPTIONS : [],
                }}
                onChange={handleTableChange}
                scroll={{
                    // y: 500,
                    x: 1300
                }}
            />
        </Col>
        {contextHolder}
        </>

    );

}

export default DataGird;
