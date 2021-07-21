import React from "react";
import { Select } from 'antd';

const { Option } = Select;

function SearchSelect(props){
    return(
    <Select
        showSearch
        style={{ width: 150 }}
        value = {props.selected}
        placeholder="Выберете адрес"
        optionFilterProp="children"
        onChange={props.onChange}
        filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
  >
      {props.data.map(item => {
          if (item.own === props.owner){
            return (
                <Option key = {item.key} value = {item.propaddr}>{item.propaddr}</Option>
            )  
          }
      })}
  </Select>);
}

export default SearchSelect;
