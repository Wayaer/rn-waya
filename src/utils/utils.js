'use strict';
import {ModalIndicator, Overlay, Toast} from 'teaset';
import {BackHandler, DeviceEventEmitter, Dimensions, FlatList, Platform, ToastAndroid} from 'react-native';
import React from 'react';
import {SimpleButton, CenterView} from '../component/custom';
import {FontSize} from '../constant/constant';
import {DatePicker} from '../component/date';

const {height, width, scale} = Dimensions.get('window');
const alertStyle = {height: height, width: width};
const defaultDuration = 1500;
const defaultPosition = 'center';

export class UT {

    /**
     * log信息打印
     * @param content
     */
    static log(content) {
        if (!content) {
            return this.logError('content');
        }
        console.warn('LogInfo=> ', content);
    }

    /**
     * 检验传入参数是否正确
     * @param content
     */
    static logError(content) {
        console.error('LogError=> Please the incoming ' + content);
    }


    /**
     * loading
     * @param content
     */
    static loadingShow(content) {
        ModalIndicator.show(content ? content : '加载中...');
        setTimeout(() => {
            ModalIndicator.hide();
        }, 30000);
    }

    /**
     * 隐藏loading
     */
    static loadingHide() {
        ModalIndicator.hide();
    }

    /**
     * 确保输入的全部是数字
     * @param number
     * @returns { string}
     */
    static allAreNum(number) {
        number = number.replace(/[^\d]/g, '' + '');
        return number;
    }


    /**
     * 全面屏适配
     * @returns {boolean}
     */
    static phoneFit() {
        const y = scale * height;
        if (Platform.OS === 'android') {
            if (y < 1300) { //720p以下手机
                return false;
            } else if (y > 1300 && y < 1650) {//720p 18:9
                return true;
            } else if (y > 1700 && y < 1930) {//1080p 16:9
                return false;
            } else if (y > 1930 && y < 2400) {//1080p 18:9 19.5:9
                return true;
            } else if (y > 2400 && y < 2560) {//2k 16:9
                return false;
            } else if (y > 2560 && y < 3300) {//2k 18:9  19.5:9
                return true;
            }
            return false;
        } else if (Platform.OS === 'ios') {
            if (y < 1400) {//4.7寸 16:9
                return false;
            } else if (y > 1400 && y < 1850) {//iphone xr 18:9
                return true;
            } else if (y > 1850 && y < 2300) {//iphone plus 16:9
                return false;
            } else if (y > 2300) {//iphone x  18:9
                return true;
            }
            return false;
        }
    }

    /**
     * 全面屏适配
     * @returns {number} 返回全面屏对应的16：9 屏幕高度
     */
    static phoneFitHeight() {
        const s = scale, h = height,
            y = scale * height;
        if (Platform.OS === 'android') {
            if (y < 1000) { //720p以下手机
                return h;
            } else if (y > 1000 && y < 1300) {//720p 16:9
                return h;
            } else if (y > 1300 && y < 1650) {//720p 18:9
                return 1280 / s;
            } else if (y > 1700 && y < 1930) {//1080p 16:9
                return h;
            } else if (y > 1930 && y < 2400) {//1080p 18:9 19.5:9
                return 1920 / s;
            } else if (y > 2400 && y < 2560) {//2k 16:9
                return h;
            } else if (y > 2560 && y < 3300) {//2k 18:9  19.5:9
                return 2560 / s;
            } else {
                return h;
            }
        } else if (Platform.OS === 'ios') {
            if (y < 1400) {//4.7寸 16:9
                return h;
            } else if (y > 1400 && y < 1850) {//iphone xr 18:9
                return 1334 / s;
            } else if (y > 1850 && y < 2300) {//iphone plus 16:9
                return h;
            } else if (y > 2300) {//iphone x  18:9
                return 2208 / s;
            }
        }
    }


    /**
     * 获取等比例 设备宽度
     * @param w
     * @returns {number}
     */
    static getWidth(w) {
        return (w / 750) * width;
    }

    /**
     * 获取等比例 设备高度//18:9高度转换16:9屏幕高度
     * @param h
     * @returns {number}
     */
    static getHeight(h) {
        return (h / 1334) * UT.phoneFitHeight();
    }

    /**
     * 获取等比例 设备高度//真实高度=>包含18:9
     * @param h
     * @returns {number}
     */
    static getActualHeight(h) {
        return (h / 1334) * width;
    }

    /**
     * 发送消息
     * @param eventType
     * @param data
     */
    static sendMessage(eventType, data) {
        DeviceEventEmitter.emit(eventType, data || '');
    }

    /**
     * 监听消息
     * @param eventType
     * @param callback  处理监听消息 返回消息内容
     */
    static receivesMessage(eventType, callback) {
        return DeviceEventEmitter.addListener(eventType, callback);
    }

    /**
     * 注销监听
     * @param receivesMessage
     */
    static removeReceivesMessage(receivesMessage) {
        receivesMessage.remove();
    }


    /**
     * android 返回键监听
     * @param listener
     */
    static backHandlerAddEventListener(listener) {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', listener);
        }
    }

    /**
     * 移出 android 返回键监听
     * @param listener
     */
    static backHandlerRemoveEventListener(listener) {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', listener);
        }
    }

    /**
     * android Toast
     * @param text
     */
    static toastAndroid(text) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        }
    }

    /**
     * 自定义弹窗
     * @param view
     * @param style
     */
    static alertPopView(view, style) {
        return Overlay.show(
            <Overlay.PopView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                modal={style && style.modal || false}
                style={[alertStyle, style && style]}>{view}</Overlay.PopView>);
    }

    /**
     * 自定义弹窗
     * @param view
     * @param style
     */
    static alertPullView(view, style) {
        return Overlay.show(
            <Overlay.PullView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                side={style && style.side || 'bottom'}
                modal={style && style.modal || false}
                style={[alertStyle, {justifyContent: 'flex-end'}, style && style]}>{view}</Overlay.PullView>);
    }

    /**
     * 自定义气泡
     * @param view
     * @param style
     */
    static alertPopoverView(view, style) {
        return Overlay.show(
            <Overlay.PopoverView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                direction={style && style.direction || 'down'}
                autoDirection={style && style.autoDirection || true}
                align={style && style.align || 'end'}
                alignInsets={style && style.alignInsets || 0}
                showArrow={style && style.showArrow || true}
                paddingCorner={style && style.paddingCorner || 0}
                mmodal={style && style.modal || false}
                style={[alertStyle, {justifyContent: 'flex-end'}, style && style]}>{view}</Overlay.PopoverView>);
    }

    static pullListView(stringList, titleText, cancelText, callback) {
        let listView = UT.alertPullView(<CenterView>
            <SimpleButton textStyle={{
                margin: 20,
                fontSize: FontSize.textSize_16,
            }}>{titleText}</SimpleButton>
            <FlatList
                keyExtractor={(item, index) => (index + '1')}
                data={this.state.item}

                renderItem={({item, index}) => (
                    <SimpleButton textStyle={{
                        margin: UT.getWidth(25),
                    }} onPress={() => {
                        Overlay.hide(listView);
                        return callback && callback(index);
                    }}>{item}</SimpleButton>

                )}
            />
            <SimpleButton
                textStyle={{
                    margin: 20,
                }}
                onPress={() => {
                    Overlay.hide(listView);
                    return callback && callback('cancel');
                }}
            >{cancelText}</SimpleButton>
        </CenterView>);
    }

    /**
     * 时间选择器
     * @param pickerValue  date=>年月日选择     dateTime=>年月日时分秒选择     time=>时分秒选择
     * @param onSureCallback
     * @param onCancelCallback
     */
    static alertDatePicker(pickerValue, onSureCallback, onCancelCallback) {
        let pickerView = UT.alertPullView(
            <DatePicker
                pickerType={pickerValue.pickerType}
                itemHeight={pickerValue.itemHeight}
                cancelTextStyle={pickerValue.cancelTextStyle}
                cancelTouchStyle={pickerValue.cancelTouchStyle}
                sureTouchStyle={pickerValue.sureTouchStyle}
                sureTextStyle={pickerValue.sureTextStyle}
                titleTextStyle={pickerValue.titleTextStyle}
                textViewStyle={pickerValue.textViewStyle}
                textStyle={pickerValue.textStyle}
                showUnit={pickerValue.showUnit}//是否显示年月日时分秒
                sureText={pickerValue.sureText}
                defaultSelectTime={pickerValue.defaultSelectTime}//暂不支持time类型
                pickerTimeInterval={pickerValue.pickerTimeInterval}//暂不支持time类型
                cancelText={pickerValue.cancelText}
                title={pickerValue.title}
                onSure={(v) => {
                    Overlay.hide(pickerView);
                    return onSureCallback && onSureCallback(v);
                }}
                onCancel={() => {
                    Overlay.hide(pickerView);
                    return onCancelCallback && onCancelCallback();
                }}/>,
        );
    }

    /**
     * 检测日期是否合法
     * @param date
     * @returns {*}
     */
    static checkLegalDate(date) {
        return Number(new Date(date).getDate()) === Number(date.substring(date.length - 2)) || console.error('非法日期=>', date);
    }

    /**
     * 正则表达匹配
     * @param re
     * @param str
     * @returns {*}
     */
    static regularStr(re, str) {
        return re.test(str);
    }

    /**
     * Toast
     * @param content
     * @param duration
     * @param position
     * @constructor
     */
    static Toast = (content, duration, position) => {
        Toast.show({text: content, position: position || defaultPosition, duration: duration || defaultDuration});
    };
    static ToastSuccess = (content, duration, position) => {
        Toast.success(content, duration || defaultDuration, position || defaultPosition);
    };
    static ToastFail = (content, duration, position) => {
        Toast.fail(content, duration || defaultDuration, position || defaultPosition);
    };
    static ToastSmile = (content, duration, position) => {
        Toast.smile(content, duration || defaultDuration, position || defaultPosition);
    };
    static ToastSad = (content, duration, position) => {
        Toast.sad(content, duration || defaultDuration, position || defaultPosition);
    };
    static ToastInfo = (content, duration, position) => {
        Toast.info(content, duration || defaultDuration, position || defaultPosition);
    };
    static ToastStop = (content, duration, position) => {
        Toast.stop(content, duration || defaultDuration, position || defaultPosition);
    };


    static getDaysInOneMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

}
