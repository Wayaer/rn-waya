import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {TouchView} from "../Component";
import {Utils} from "../../../index";
export default class MultiSelectItem extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            val:props.val,
            isSelect:props.isSelect,
            name:props.name,
        };
    }

    _onPress = () => {
        if (!this.state.isSelect) {
            this.props.onPress(this.props.val,'add');
        } else {
            this.props.onPress(this.props.val, 'move');
        }
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            isSelect:nextProps.isSelect,
        })
    }
    render() {
        return (
            <TouchView
                style={[{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                },{...this.props.style}]}
                onPress={() => this._onPress()}
            >
                <Text style={[
                    {...this.props.textStyle}, this.state.isSelect && {color:this.props.selectColor}]}>{this.state.name}</Text>
                {
                    this.state.isSelect && this.props.icon && (
                        <Image source={this.props.icon} style={selectStyle.select_icon} />
                    )
                }
            </TouchView>
        )
    }
}
