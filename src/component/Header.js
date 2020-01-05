import {BaseComponent} from './BaseComponent';
import {TouchView, Utils} from '../../index';
import {Image, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Colors, Constant, FontSize} from '../constant/Constant';

export class Header extends BaseComponent<PropTypes> {
    constructor(props) {
        super(props);
        this.state = {
            headerBackgroundColor: props.headerBackgroundColor || Colors.mainBlue,
            headerColor: props.headerColor || Colors.mainWhite,
        };
    }

    setHeaderBackgroundColor(color) {
        this.setState({
            headerBackgroundColor: color,
        });
    }

    render() {
        return (<View
            ref={this.props.ref}
            style={{
                width: Constant.Screen_Width,
                backgroundColor: this.state.headerBackgroundColor,
                paddingTop: Constant.CurrentHeight,
                paddingHorizontal: Utils.getWidth(24),
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: Utils.getHeight(90) + Constant.CurrentHeight,
            }}>
            <TouchView
                style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    minWidth: Constant.Screen_Width / 6,
                    padding: Utils.getHeight(10),
                }}
                onPress={this.props.leftImageOnPress}>
                <Image
                    source={this.props.leftImageSource}
                    style={this.props.leftImageStyle || {
                        width: Utils.getWidth(40),
                        height: Utils.getWidth(40),
                        // alignItems: 'flex-start',

                    }}/>
            </TouchView>
            <Text style={this.props.titleTextStyle || {
                color: Colors.mainWhite,
                fontSize: FontSize.textSize_18,
                fontWeight: 'bold',
            }}>{this.props.titleText}</Text>

            <View style={{
                minWidth: Constant.Screen_Width / 6,
            }}>
                {this.props.rightImageSource && <TouchView
                    style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        padding: Utils.getHeight(10),
                    }}
                    onPress={this.props.leftImageOnPress}>
                    <Image
                        source={this.props.leftImageSource}
                        style={this.props.leftImageStyle || {
                            width: Utils.getWidth(40),
                            height: Utils.getWidth(40),
                        }}/>
                </TouchView>}
            </View>

        </View>);
    }

}

Header.propTypes = {
    leftImageSource: PropTypes.leftImageSource,
    leftImageOnPress: PropTypes.leftImageOnPress,
    leftImageStyle: PropTypes.leftImageStyle,
    rightImageSource: PropTypes.rightImageSource,
    rightImageOnPress: PropTypes.rightImageOnPress,
    rightImageStyle: PropTypes.rightImageStyle,
    titleText: PropTypes.titleText,
    titleTextStyle: PropTypes.titleTextStyle,
    headerBackgroundColor: PropTypes.headerBackgroundColor,
    headerColor: PropTypes.headerColor,
    ref: PropTypes.ref,
};
