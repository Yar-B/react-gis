import React from "react";
import {Select} from 'antd';

const { Option } = Select;


function Selector (props) {

    return (
        <Select 
            defaultValue={props.data[0].visible ?  props.data[0].propaddr : 'Select'} 
            style={{ width: 120, marginRight: '20px' }} 
            value = {props.selected}
            onChange={props.onChange}>
                {props.data.map(item => {
                    return (
                        <Option key={item.id} value={item.propaddr}>{item.propaddr}</Option>
                    )
                })}
        </Select>
    );
}

export default Selector;