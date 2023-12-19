import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../../../Components/Redux/Reducers';
import { PagePath, SearchElement, columns } from '../Constants';
import { Spin, message } from 'antd';
import DataGird from '../../../../Components/DataGird';
import { _fetchData } from '../../../../Utils/CallAPI';
import { HOSTNAME } from '../../../../Utils/Constants/SystemVars';
import { Notification } from '../../../../Utils/Notification';
import SearchForm from '../../../../Components/SearchForm';
import DataGird2 from '../../../../Components/DataGird/indexNew';

const Search = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoadComplete, setisLoadComplete] = useState(false);
  useEffect(() => {
    dispatch(setBreadcrumb(PagePath));
    loadData({});
  }, []);

  const handleSelectRow = (rowKeys, selectedRows) => {
    console.log("rowKeys, selectedRows", rowKeys, selectedRows)
    
  }
  const loadData = async (postData) => {
    setisLoadComplete(false);
    const response = await dispatch(_fetchData(HOSTNAME, 'api/user/search', postData));
    if (!response.iserror) {
      console.log(response?.resultObject);
      setData(response?.resultObject);
      setisLoadComplete(true)
    }
    else {
      Notification('Thông báo', response.message, 'error');
      setisLoadComplete(true)
    }
  }

  const onSubmit = (MLObject) => {
    console.log('MLObject', MLObject);
    let postData = {
      $or: [
        { username: MLObject.keyword }, { email: MLObject.keyword }
      ]
    }
    loadData(postData);
    // message.success('Submit success!');
  }
  const handleDeleteRow = (rows) => {
    console.log("handleDeleteRow", rows)

}

  return (
    <>
      <SearchForm
        listColumn={SearchElement}
        layout='vertical'
        onSubmit={onSubmit}
      />
      {
        isLoadComplete && <DataGird2
          pKey='username'
          title='Danh sách nhân viên'
          listColumn={columns}
          dataSource={data}
          defaultCurrentPage={2}
          defaultPageSize={1}
          size='small' // mặc định small
          bordered='enable' // mặc định enable
          showHeader={true} // Mặc định true
          showSizeChanger={true} // mặc định true
          pageSizeOptions={['10', '20', '50', '100']}
          scroll={{y : 1000, x : 1000}}
          isShowHeaderAction={true}
          isShowButtonAdd={true}
          urlAdd='/User/Add'
          onSelectRowItem={handleSelectRow}
          onDeleteItem={(item) => console.log(item)}
          // onDeleteItem={handleDeleteRow}
        />
      }
    </>
  );
}
export default Search;