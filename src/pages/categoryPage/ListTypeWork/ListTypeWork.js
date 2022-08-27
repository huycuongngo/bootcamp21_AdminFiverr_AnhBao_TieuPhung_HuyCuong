// import { Table } from 'antd';
// import qs from 'qs';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { deleteTypeJobServiceThunk, setTypeJobsServiceThunk } from '../categorySlice';
// import { SearchOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
// import { Input } from 'antd';

// const { Search } = Input;
// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

// const ListTypeWork = () => {
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 5,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { arrayTypeJobs } = useSelector(state => state.categoryReducer)

//   console.log("🚀 ~ file: ListTypeWork.js ~ line 38 ~ ListTypeWork ~ arrayTypeJobs", arrayTypeJobs)
//   const data = arrayTypeJobs;

//   useEffect(() => {
//     dispatch(setTypeJobsServiceThunk());
//     //return();
//   }, [])

//   const fetchData = (params = {}) => {
//     setLoading(true);
//     fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
//       .then((res) => res.json())
//       .then(({ results }) => {
//         setLoading(false);
//         setPagination({
//           ...params.pagination,
//           total: 200, // 200 is mock data, you should read it from server
//           // total: data.totalCount,
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData({
//       pagination,
//     });
//   }, []);

//   const handleTableChange = (newPagination, filters, sorter) => {
//     fetchData({
//       sortField: sorter.field,
//       sortOrder: sorter.order,
//       pagination: newPagination,
//       ...filters,
//     });
//   };

//   const columns = [
//     {
//       title: 'Type Job',
//       render: (text, typeJob, index) => {

//         return (
//           <NavLink to={`/category/${typeJob._id}`} key={index}>
//             {typeJob.name}
//           </NavLink>
//         );
//       },
//       width: '30%',
//     },
//     {
//       title: 'ID Type Job',
//       dataIndex: '_id',
//       key: 'subTypeJobs',
//       width: '30%',
//     },
//     {
//       title: 'Operation',
//       dataIndex: '_id',
//       render: (text, typeJob, index) => {

//         return (
//           <div className='flex' key={index}>
//             <NavLink key={1} className='bg-slate-400 text-white mr-2 p-2 text-2xl' to={`/category/edit/${typeJob._id}`}><EditOutlined /></NavLink>
//             <span style={{ cursor: 'pointer' }}

//               onClick={() => {
//                 if (window.confirm(`Ban co chac muon xoa ${typeJob.name}`)) {
//                   dispatch(deleteTypeJobServiceThunk(typeJob._id))
//                 }
//               }}
//               key={2} className='bg-red-400 text-white p-2 text-2xl hover:bg-red-500 hover:text-gray-500' ><DeleteOutlined /></span>
//           </div>
//         );
//       }
//     },
//   ];

//   const onSearch = (value) => console.log(value);

//   return (
//     <div>
//       <div className='flex justify-between items-center mb-5'>
//         <Search
//           placeholder="TypeJob name"
//           allowClear
//           size="large"
//           onSearch={onSearch}
//           style={{
//             width: '400px'
//           }}
//         />
//         <button
//           onClick={() => {
//             navigate("/category/addnew");
//           }}
//           className='bg-green-500 border-2 p-3 rounded-lg hover:shadow-md'><AppstoreAddOutlined />
//           <span className='ml-2'>New type job</span>
//         </button>
//       </div>
//       <Table
//         columns={columns}
//         key={data._id}
//         rowKey={data._id}
//         dataSource={data}
//         pagination={pagination}
//         loading={loading}
//         onChange={handleTableChange}
//         size="small"
//       />
//     </div>
//   );
// };

// export default ListTypeWork;

import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteTypeJobServiceThunk, setTypeJobsServiceThunk } from '../categorySlice';
import { SearchOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';


const ListTypeWork = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { arrayTypeJobs } = useSelector(state => state.categoryReducer)

  // console.log("🚀 ~ file: ListTypeWork.js ~ line 38 ~ ListTypeWork ~ arrayTypeJobs", arrayTypeJobs)
  const data = arrayTypeJobs;

  useEffect(() => {
    dispatch(setTypeJobsServiceThunk());
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              color: "gray"
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: 'TypeJob',
      dataIndex: 'name',
      render: (text, typeJob, index) => {

        return (
          <div>
            <a href="/" key={index}>
              {typeJob.name}
            </a>
          </div>
        );
      },
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'SubTypeJob',
      dataIndex: '_id',
      key: 'subTypeJobs',
      render: (text, typeJob, index) => {
      
        return (
          <NavLink to={`/category/typejob/${typeJob._id}`}>[...]</NavLink>
        );
      },
      width: '20%',
    },
    {
      title: 'ID TypeJob',
      dataIndex: '_id',
      key: 'subTypeJobs',
      width: '45%',
    },
    {
      title: 'Operation',
      dataIndex: '_id',
      render: (text, typeJob, index) => {

        return (
          <div className='flex' key={index}>
            <NavLink key={1} className='bg-slate-400 text-white mr-2 p-2 text-2xl' to={`/category/edit/${typeJob._id}`}><EditOutlined /></NavLink>
            <span style={{ cursor: 'pointer' }}

              onClick={() => {
                if (window.confirm(`Ban co chac muon xoa ${typeJob.name}`)) {
                  dispatch(deleteTypeJobServiceThunk(typeJob._id))
                }
              }}
              key={2} className='bg-red-400 text-white p-2 text-2xl hover:bg-red-500 hover:text-gray-500' ><DeleteOutlined /></span>
          </div>
        );
      }
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <button
          onClick={() => {
            navigate("/category/addnew");
          }}
          className='text-2xl bg-green-500 border-2 p-3 rounded-lg hover:shadow-md'><AppstoreAddOutlined />
          <span className='ml-2'>New type job</span>
        </button>
      </div>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

export default ListTypeWork;

