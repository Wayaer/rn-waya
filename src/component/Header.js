'use strict';
import {CenterView, CustomImage, TouchView} from './Component';
import React, {PureComponent} from 'react';
import {Text} from 'react-native'
import {Colors, Constant, FontSize} from '../constant/Constant';
import Utils from '../utils/Utils';

export class CustomHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.leftImage = this.props.leftImage;
        this.leftImageOnPress = this.props.leftImageOnPress;
        this.leftImageStyle = this.props.leftImageStyle;
        this.rightImage = this.props.rightImage;
        this.rightImageOnPress = this.props.rightImageOnPress;
        this.rightImageStyle = this.props.rightImageStyle;
        this.titleText = this.props.titleText;
        this.titleTextStyle = this.props.titleTextStyle;

    }

    render() {
        return (
            <TouchView
                style={{
                    width: Constant.Screen_Width,
                    backgroundColor: Colors.mainBlack,
                    paddingTop: Constant.CurrentHeight,
                    paddingHorizontal: Utils.getWidth(24),
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: Utils.getHeight(90) + Constant.CurrentHeight
                }}>
                <CenterView style={{minWidth: Constant.Screen_Width / 4}}>
                    <CustomImage
                        onPress={this.leftImageOnPress}
                        require={this.leftImage}
                        style={this.leftImageStyle || {
                            width: Utils.getWidth(32),
                            height: Utils.getWidth(32)
                        }}/></CenterView>
                <Text style={this.titleTextStyle || {
                    color: Colors.mainWhite,
                    fontSize: FontSize.textSize_16,
                    fontWeight: 'bold',
                }}>{this.titleText}</Text>
                <CenterView style={{minWidth: Constant.Screen_Width / 4}}>
                    <CustomImage
                        onPress={this.rightImageOnPress}
                        require={this.rightImage}
                        style={this.rightImageStyle || {width: Utils.getWidth(32), height: Utils.getWidth(32)}}/>

                </CenterView>


            </TouchView>)
    }


}
