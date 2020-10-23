/* 多选
* params:
* dataSource:array ; [{name:'',val:''}] ,若name和val相同，则只需要[{name:''}]
* selectArray：array; [val1,val2,val3]
* selectChange:function;
* */
import React from 'react';
import {Image, Text} from 'react-native';
import {TouchView} from './Component';
import {View} from 'react-native';
import {BaseComponent, Utils} from '../../index';

export class MultiSelect extends BaseComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: props.dataSource || [],
            selectArray: props.selectArray || [],
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: props.dataSource || [],
            selectArray: props.selectArray || [],
        });
    }

    setArrFilter = (val, type) => {
        let arr = this.state.selectArray;

        if (type === 'add') {
            arr.push(val);
        } else if (arr.length === 1) {
            Utils.ToastInfo('至少选择一项');
            return false;
        } else {
            const valIndex = arr.indexOf(val);
            if (valIndex > -1) {
                arr.splice(valIndex, 1);
            }
        }
        this.setState({
            selectArray: arr,
        });

        this.props.selectChange(arr);
    };

    render() {
        const width = this.props.width;
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.dataSource.map((item) => {
                        const val = item.val ? item.val : item.name;

                        return <MultiSelectItem
                            key={item.name}
                            textStyle={this.props.textStyle || {}}
                            style={width ? {width: width} : {}}
                            isSelect={this.state.selectArrayay.indexOf(val) > -1}
                            onPress={(val, type) => this.setArrFilter(val, type)}
                            val={val}
                            name={item.name}
                        />;
                    })
                }
            </View>
        );
    }
}


export class MultiSelectItem extends BaseComponent<Props> {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.icon = props.icon;
        this.isSelect = props.isSelect;
        this.name = props.name;
        this.iconStyles = props.iconStyles;
    }

    _onPress = () => {
        if (!this.isSelect) {
            this.props.onPress(this.props.value, 'add');
        } else {
            this.props.onPress(this.props.value, 'move');
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            isSelect: nextProps.isSelect,
        });
    }

    render() {
        return (
            <TouchView
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, {...this.props.style}]}
                onPress={() => this._onPress()}
            >
                <Text style={[
                    {...this.props.textStyle}, this.isSelect && {color: this.props.selectColor}]}>{this.name}</Text>
                {
                    this.isSelect && this.icon && (
                        <Image source={this.icon} style={this.iconStyles}/>
                    )
                }
            </TouchView>
        );
    }
}
