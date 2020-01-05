import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {TouchView} from "../Component";

export default class MultiSelectItem extends Component<Props> {
    constructor(props){
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
                    {...this.props.textStyle}, this.isSelect && {color: this.props.selectColor}]}>{this.name}</Text>
                {
                    this.isSelect && this.icon && (
                        <Image source={this.icon} style={this.iconStyles}/>
                    )
                }
            </TouchView>
        )
    }
}
