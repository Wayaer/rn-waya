import React from 'react';

import {Animated, TouchableOpacity} from 'react-native';

import {BaseComponent} from './BaseComponent';

export class BaseDialog extends BaseComponent {

    static defaultProps = {
        removeSubviews: true,   //隐藏时，是否回收前景控件，false 更流畅，true：初始化更快，dismiss后就回收
        coverClickable: true,
        onCoverPress: null,
        showAnimationType: 'spring'
    }

    path = new Animated.Value(0);


    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    isShowing() {
        return this.state.isShow;
    }

    show(callback, state = {}) {
        this.setState({isShow: true, ...state}, () => {
            // eslint-disable-next-line eqeqeq
            if (!this.props.showAnimationType || this.props.showAnimationType === 'spring') {
                Animated.spring(this.path, {toValue: 1}).start(() => {
                    callback && callback();
                });
            } else {
                Animated.timing(this.path, {toValue: 1}).start(() => {
                    callback && callback();
                });
            }
        });
    }

    dismiss(callback) {
        Animated.timing(this.path, {toValue: 0, duration: 200}).start(() => {
            this.setState({isShow: false}, () => {
                callback && callback();
            });
        });
    }

    /**
     * 重写前景动画效果
     * @param {*} path
     */
    getContentInterpolate(path) {
        return [
            {
                translateY: path.interpolate(
                    {
                        inputRange: [0, 0.5, 1],
                        outputRange: [this.getSize(200), this.getSize(200), 0]
                    }
                )
            }
        ]
    }


    /**
     * 前景位置
     */
    getContentPosition() {
        return {justifyContent: 'center', alignItems: 'center'}
    }

    /**
     * 绘制前景控件
     */
    renderContent() {
        return null;
    }

    render() {
        if (this.state.isShow || (this.props && this.props.removeSubviews === false)) {
            return <Animated.View
                style={{
                    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                    backgroundColor: 0x00000050, opacity: this.path.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1, 1]
                    }), ...this.getContentPosition(),
                    transform: [
                        {
                            translateX: this.path.interpolate(
                                {
                                    inputRange: [0, 0.01, 1],
                                    outputRange: [-this.mScreenWidth, 0, 0]
                                }
                            )
                        }
                    ]
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (!this.props || (this.props.coverClickable || this.props.coverClickable == null)) {
                            this.dismiss(this.props.onCoverPress);
                        }
                    }}
                    style={{position: 'absolute', width: this.mScreenWidth, height: this.mScreenHeight}}/>

                <Animated.View style={{
                    opacity: this.path.interpolate({inputRange: [0, 0.5, 1], outputRange: [0, 0, 1]}),
                    transform: this.getContentInterpolate(this.path),
                }}>
                    {this.renderContent()}
                </Animated.View>
            </Animated.View>
        } else {
            return null;
        }
    }
}
