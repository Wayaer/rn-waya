/* 弹出选择器
* params:
* selectValue:string / obj; 默认选择项, 根据你的数组格式来定，默认第一项
* selectData：array; 选择数据组
* editable：Boolean; 是否可编辑
* width：number; 选择框宽度
* placeholder: string; 提示文字
* pickerTitle：string； 弹出框标题
* selected：function；选择回调
* style：object；样式
* renderSelectItem: function ; 渲染函数
* */
import React from 'react';
import {View} from 'react-native';
import {Select} from 'teaset';
import {BaseComponent, Utils} from '../../index';

export class PullSelect extends BaseComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectData: props.selectData ? props.selectData : [],
            selectValue: props.selectValue ? props.selectValue : '',
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectData: props.selectData ? props.selectData : [],
            selectValue: props.selectValue ? props.selectValue : '',
        })
    }

    selected = (item, index) => {
        this.setState({
            selectedIndex: index,
            selectValue:item
        });
        this.props.selected(item, index)
    };

    render() {
        const isEditable = !this.props.editable && this.props.editable !== undefined;
        const width = this.props.width ? Utils.getWidth(this.props.width) : Utils.getWidth(230);
        return (
            <View style={[
                    this.props.style && this.props.style,
                    {flex:1},
                    this.props.width ? {width:Utils.getWidth(this.props.width)} : null,
                ]}
            >
                <Select
                    style={[this.props.selectStyle && this.props.selectStyle,{
                        flex:1,
                        backgroundColor: isEditable ? this.props.disableColor : this.props.whiteColor,
                    }]}
                    valueStyle={{flex: 1, fontWeight: '500'}}
                    size={'sm'}
                    value={this.state.selectValue}
                    editable={this.props.editable}
                    items={this.state.selectData}
                    getItemText = {(item, index) => this.props.renderSelectItem(item, index)}
                    placeholder={this.props.placeholder ? this.props.placeholder : '请选择'}
                    pickerTitle={this.props.pickerTitle ? this.props.pickerTitle : '选择器'}
                    pickerType={'pull'}
                    onSelected={(item, index) => this.selected(item, index)}
                />
            </View>
        );
    }
}

