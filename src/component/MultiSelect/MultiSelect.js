/* 多选
* params:
* dataSource:array ; [{name:'',val:''}] ,若name和val相同，则只需要[{name:''}]
* selectArr：array; [val1,val2,val3]
* selectChange:function;
* */


import React, {Component} from 'react';
import {View} from 'react-native';
import MultiSelectItem from "./MultiSelectItem";
import {Toast} from "teaset";

export default class MultiSelect extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            dataSource:props.dataSource ? props.dataSource : [],
            selectArr:props.selectArr ? props.selectArr : [],
        };
    }

    componentWillReceiveProps(props){
        this.setState({
            dataSource:props.dataSource ? props.dataSource : [],
            selectArr:props.selectArr ? props.selectArr : [],
        })
    }

    setArrFilter = (val, type) => {
        let arr = this.state.selectArr;

        if (type === 'add') {
            arr.push(val);
        } else if (arr.length === 1) {
            Toast.info('至少选择一项');
            return false;
        } else {
            const valIndex = arr.indexOf(val);
            if (valIndex > -1) {
                arr.splice(valIndex,1);
            }
        }
        this.setState({
            selectArr : arr,
        });

        this.props.selectChange(arr)
    };

    render() {
        const width = this.props.width;
        return (
            <View style={{flexDirection: 'row', flexWrap:'wrap',}}>
                {
                    this.state.dataSource.map( (item) => {
                        const val = item.val ? item.val : item.name;

                        return <MultiSelectItem
                            key={item.name}
                            textStyle={this.props.textStyle || {}}
                            style={width ? {width:width} : {}}
                            isSelect={this.state.selectArr.indexOf(val) > -1}
                            onPress={(val, type) => this.setArrFilter(val, type)}
                            val={val}
                            name={item.name}
                        />
                    })
                }
            </View>
        )
    }
}
