'use strict';
import {
    Image,
    ImageBackground,
    Animated,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Easing,
    LayoutAnimation, Platform, Keyboard, Dimensions,
} from 'react-native';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {UT} from '../utils/utils';
import {Constant} from '../constant/constant';


/**
 * 自定义 点击按钮
 */
export class TouchView extends PureComponent {
    constructor(props) {
        super(props);
        if (this.props.onPress) {
            this.time = 0;
        }  // 上次点击时间
    }

    render() {
        if (this.props.onPress) {
            return (
                <TouchableOpacity
                    {...this.props}
                    activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : this.props.onPress ? 0.36 : 1}
                    onPress={() => {
                        if (this.props.onPress) {
                            let now = new Date().getTime();
                            if ((now - this.time) < 200) {
                                return;
                            }
                            this.time = now;
                            this.props.onPress();
                        }
                    }}>
                    {this.props.children}
                </TouchableOpacity>
            );
        } else {
            return (<View
                {...this.props}>
                {this.props.children}
            </View>);

        }
    }
}

/**
 * 自定义 CenterView
 *
 * style  //样式
 */
export class CenterView extends PureComponent {
    render() {
        return (<TouchView
                {...this.props}
                onPress={this.props.onPress}
                style={[{
                    alignItems: 'center',
                    justifyContent: 'center',
                }, this.props.style]}>
                {this.props.children}
            </TouchView>
        );

    }
}

/**
 * 自定义 Button
 */
export class SimpleButton extends PureComponent {
    render() {
        return (
            <CenterView
                {...this.props}
                style={this.props.buttonStyle}
                onPress={this.props.onPress}>
                <Text
                    {...this.props}
                    style={this.props.textStyle}>
                    {this.props.children}
                </Text>
            </CenterView>
        );
    }
}

/**
 * 自定义 Image
 *
 */
export class CustomImage extends PureComponent {
    //resizeMode
    // cover 模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
    // contain 模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
    // stretch 模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
    // center 模式, 9月11号的0.33版本才支持，contain模式基础上支持等比放大。

    render() {
        if (this.props.onPress) {
            return (
                <CenterView
                    {...this.props}
                    style={this.props.buttonStyle}
                    onPress={this.props.onPress}>
                    {this.renderImage()}
                </CenterView>
            );
        } else {
            return this.renderImage();
        }
    }

    renderImage = () => {
        return (<Image
                {...this.props}
                source={this.props.source || this.props.url && {uri: this.props.url} || this.props.require && this.props.require}
                style={[{resizeMode: 'contain'}, this.props.style]}/>
        );
    };
}


/*
* 自定义ImageBackground
* */
export class CustomImageBackground extends PureComponent {
    render() {
        return (
            <ImageBackground
                {...this.props}
                source={this.props.source || this.props.url && {uri: this.props.url} || this.props.require && this.props.require}
                style={[{
                    width: Constant.Screen_Width,
                    resizeMode: 'contain',
                }, this.props.style]}>
                {this.props.children}
            </ImageBackground>
        );
    }
}


/**
 * 自定义 Checkbox
 */
export class CustomCheckbox extends PureComponent {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.checkedIcon = props.checkedIcon;
        this.uncheckedIcon = props.uncheckedIcon;
        this.state = {
            checked: props.checked || false,
        };
    }

    render() {
        return (
            <TouchView
                style={[{flexDirection: 'row'}, this.props.style]}
                onPress={() => {
                    this.setState({
                        checked: this.props.checked || !this.state.checked,
                    }, () => {
                        return this.onChange(this.state.checked);
                    });
                }}>
                <CustomImage
                    require={this.state.checked ? (this.checkedIcon || require('../res/icons/checkbox_true.png')) : (this.uncheckedIcon || require('../res/icons/checkbox_false.png'))}
                    style={[{
                        width: UT.getWidth(30),
                        height: UT.getWidth(30),
                    }, this.props.imageStyle]}/>
                <Text style={[{
                    marginLeft: UT.getWidth(10),
                    color: Constant.mainBlack,
                }, this.props.titleStyle]}>{this.props.title}</Text>
            </TouchView>
        );
    }
}

/**
 * 自定义 TabBarItem
 */
export class TabBarItem extends PureComponent {
    render() {
        return (
            <TouchView
                {...this.props}
                style={[{alignItems: 'center', justifyContent: 'center'}, this.props.style]}
                onPress={this.props.onPress}>
                <CustomImage
                    {...this.props}
                    source={this.props.imageSource}
                    style={[{
                        width: UT.getWidth(23),
                        height: UT.getWidth(23),
                    }, this.props.imageStyle]}/>
                <CustomButton
                    {...this.props}
                    textStyle={[{marginTop: 1}, this.props.textStyle]}>{this.props.text}</CustomButton>
            </TouchView>
        );
    }
}


export class ToastComponent extends PureComponent {

    static defaultProps = {
        duration: 1500,
        textColor: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        paddingH: 10,
        paddingV: 5,
        borderRadius: 5,
        backgroundColor: 0x00000099,
    };

    opacity = new Animated.Value(0);

    leftPath = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            toastVisible: false,
            toastText: '',
        };
    }

    show(message) {
        this.timeoutId && clearTimeout(this.timeoutId);
        this.opacity.setValue(0);
        this.setState({toastText: message, toastVisible: true});
        Animated.timing(this.opacity, {toValue: 1, duration: 200}).start();
        this.timeoutId = setTimeout(() => {
            Animated.timing(this.opacity, {toValue: 0, duration: 200}).start(() => {
                this.setState({toastVisible: false});
            });
        }, this.props.duration);
    }

    componentWillUnmount() {
        this.timeoutId && clearTimeout(this.timeoutId);
    }

    render() {
        if (this.state.toastVisible) {
            return <Animated.View
                onLayout={(e) => {
                    //如果依靠父容器来定位Toast居中，
                    //在配合react-navigation设置全局单例Toast，会导致StackNavigator布局异常
                    this.leftPath.setValue((this.mScreenWidth - e.nativeEvent.layout.width) / 2);
                }}
                style={{
                    opacity: this.opacity, alignItems: 'center',
                    position: 'absolute',
                    top: this.mScreenHeight - this.getSize(300),
                    left: this.leftPath,
                }}>
                <View
                    style={{
                        borderRadius: this.props.borderRadius,
                        backgroundColor: this.props.backgroundColor,
                        paddingLeft: this.props.paddingH, paddingRight: this.props.paddingH,
                        paddingTop: this.props.paddingV, paddingBottom: this.props.paddingV,
                    }}>
                    <Text style={{
                        color: this.props.textColor,
                        fontSize: this.props.fontSize,
                        lineHeight: this.props.lineHeight,
                    }}>{this.state.toastText}</Text>
                </View>
            </Animated.View>;
        } else {
            return null;
        }
    }
}

/**
 * 图片懒加载
 */
export class LazyImage extends PureComponent {
    static propTypes = {
        /**
         * Image source
         */
        source: PropTypes.any,
        /**
         * Custom placeholder component
         */
        customPlaceholder: PropTypes.node,
        /**
         * Placeholder background color, if it is not provided,
         * it will fallback to `#e3e3e3`
         */
        placeholderColor: PropTypes.string,
    };

    static defaultProps = {
        customPlaceholder: null,
        placeholderColor: '#e3e3e3',
    };

    state = {
        isLoading: true,
        opacityStartValue: new Animated.Value(0),
    };

    handleLoadedImage = () => {
        const {opacityStartValue} = this.state;

        this.setState(
            {
                isLoading: false,
                opacityStartValue: new Animated.Value(0),
            },
            () => opacityStartValue.stopAnimation(),
        );
    };

    runAnimation = () => {
        const {opacityStartValue} = this.state;

        Animated.loop(
            Animated.timing(opacityStartValue, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    };

    render() {
        const {source, customPlaceholder, placeholderColor, ...rest} = this.props;
        const {opacityStartValue, isLoading} = this.state;

        return (
            <Animated.View
                style={{
                    position: 'relative',
                    opacity: opacityStartValue.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [1, 0.5, 1],
                    }),
                }}
            >
                {isLoading && (
                    <View style={{
                        ...StyleSheet.absoluteFill,
                        zIndex: 2,
                    }}>
                        {customPlaceholder ||
                        <View style={{
                            width: '100%',
                            height: '100%', backgroundColor: placeholderColor || '#e3e3e3',
                        }}/>
                        }
                    </View>
                )}
                <Image
                    source={typeof source === 'string' ? {uri: source} : source}
                    onLoadStart={this.runAnimation}
                    onLoadEnd={this.handleLoadedImage}
                    {...rest}
                />
            </Animated.View>
        );
    }
}

const defaultAnimation = {
    duration: 500,
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200,
    },
};

export class KeyBoardSpacer extends PureComponent {

    static defaultProps = {
        topSpacing: 0,
        onToggle: () => null,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            keyboardSpace: 0,
            isKeyboardOpened: false,
        };
        this._listeners = null;
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentDidMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            Keyboard.addListener(resetListener, this.resetKeyboardSpace),
        ];
    }

    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
    }

    updateKeyboardSpace(event) {
        if (!event.endCoordinates) {
            return;
        }

        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        // get updated on rotation
        const screenHeight = Dimensions.get('window').height;
        // when external physical keyboard is connected
        // event.endCoordinates.height still equals virtual keyboard height
        // however only the keyboard toolbar is showing if there should be one
        const keyboardSpace = (screenHeight - event.endCoordinates.screenY) + this.props.topSpacing;
        this.setState({
            keyboardSpace,
            isKeyboardOpened: true,
        }, this.props.onToggle(true, keyboardSpace));
    }

    resetKeyboardSpace(event) {
        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        this.setState({
            keyboardSpace: 0,
            isKeyboardOpened: false,
        }, this.props.onToggle(false, 0));
    }

    render() {
        return (
            <View style={[{
                left: 0,
                right: 0,
                bottom: 0, height: this.state.keyboardSpace,
            }, this.props.style]}/>);
    }
}
