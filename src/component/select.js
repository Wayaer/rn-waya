/* 多选
* params:
* dataSource:array ; [{name:'',val:''}] ,若name和val相同，则只需要[{name:''}]
* selectArray：array; [val1,val2,val3]
* selectChange:function;
* */
import React from 'react';
import {Image, View, Text} from 'react-native';
import {BaseComponent, TouchView, UT} from 'index';
import {Select} from 'teaset';

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
            UT.ToastInfo('至少选择一项');
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
            selectValue: item
        });
        this.props.selected(item, index)
    };

    render() {
        const isEditable = !this.props.editable && this.props.editable !== undefined;
        return (
            <View style={[
                this.props.style && this.props.style,
                {flex: 1},
                this.props.width ? {width: UT.getWidth(this.props.width)} : null,
            ]}
            >
                <Select
                    style={[this.props.selectStyle && this.props.selectStyle, {
                        flex: 1,
                        backgroundColor: isEditable ? this.props.disableColor : this.props.whiteColor,
                    }]}
                    valueStyle={{flex: 1, fontWeight: '500'}}
                    size={'sm'}
                    value={this.state.selectValue}
                    editable={this.props.editable}
                    items={this.state.selectData}
                    getItemText={(item, index) => this.props.renderSelectItem(item, index)}
                    placeholder={this.props.placeholder ? this.props.placeholder : '请选择'}
                    pickerTitle={this.props.pickerTitle ? this.props.pickerTitle : '选择器'}
                    pickerType={'pull'}
                    onSelected={(item, index) => this.selected(item, index)}
                />
            </View>
        );
    }
}

