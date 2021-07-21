import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';


const columns = [
    {
      title: 'Код посылки',
      dataIndex: 'parcelno',
      width: '25%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Адрес посылки',
      dataIndex: 'propaddr',
      width: '25%',

    },
    {
      title: 'Долгота',
      dataIndex: 'latitude',
      width: '25%',

    },
    {
      title: 'Широта',
      dataIndex: 'longitude',
      width: '25%',

    },
  ];

  function ParcelsTable(props){
    function rowKeySelection(){
      props.data.map(item => {
        return String(item.id)
      })
    }
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.propaddr === 'Disabled User',
        // Column configuration not to be checked
        propaddr: record.propaddr,
      }),
    };
  
    const [selectionType, setSelectionType] = useState('radio');
      return(
        <div>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>
  
        <Divider />
  
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={props.data}
        />
      </div>
      )
  }

  export default ParcelsTable;