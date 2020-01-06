'use strict';
import {AsyncStorage, DatePicker, FontSize, ModalIndicator, Overlay, React, Toast} from '../../index';
import Storage from './Storage';
import {NativeConstant, NativeUtils} from 'rn-curiosity';
import {BackHandler, DeviceEventEmitter, FlatList, Platform, ToastAndroid} from 'react-native';
import {FetchBlob} from './FetchBlob';
import {CenterView, CustomButton} from '../component/Component';

const height = NativeConstant.ActualScreen_Height, scale = NativeConstant.Screen_Scale,
    width = NativeConstant.Screen_Width
const alertStyle = {height: height, width: width};
const defaultDuration = 1500;
const defaultPosition = 'center';
let storage;

export default class Utils {
    /**
     * promise例子
     * @param message
     * @param successCallback
     * @param failCallback
     */
    static promiseCallback(message, successCallback, failCallback) {
        NativeUtils.promiseCallback(message, successCallback, failCallback);
    }

    /**
     * Native发消息到JS
     * android
     * ios
     * @param message
     */
    static sendMessageNativeToJS(message) {
        NativeUtils.sendMessageNativeToJS(message);
    }

    /**
     * 隐藏第一屏
     * android
     * ios
     * @constructor
     */
    static SplashScreenHide() {
        NativeUtils.SplashScreenHide();
    }

    /**
     *
     * 显示第一屏 （不常用）
     * android
     * ios
     * @constructor
     */
    static SplashScreenShow() {
        NativeUtils.SplashScreenShow();
    }

    /**
     * 修改通知栏背景色和字体颜色
     * @param fontIconDark
     * @param statusBarColor
     */
    static setStatusBarColor(fontIconDark, statusBarColor) {
        NativeUtils.setStatusBarColor(fontIconDark, statusBarColor);
    }

    /**
     * 安装apk only android
     * apkFile apk路径
     * @param apkFilePath
     */
    static installApp(apkFilePath) {
        NativeUtils.installApp(apkFilePath);
    }

    /**
     * 退出app
     * android
     * ios
     * @constructor
     */
    static ExitApp() {
        NativeUtils.exitApp();
    }

    /**
     * url获取cookie
     * android
     * ios
     * @param url
     * @param callback
     */
    static getCookie(url, callback) {
        NativeUtils.getCookie(url, callback);
    }

    /**
     * 获取app多个信息，
     * android && ios 自行打印参数查看
     * @param callback
     */
    static getAppInfo(callback) {
        NativeUtils.getAppInfo(callback);
    }

    /**
     * 获取app版本名字 => '1.0.1
     * android
     * ios
     * @param callback
     */
    static getVersionName(callback) {
        return callback(NativeConstant.VersionName);
    }

    static VersionName() {
        return NativeConstant.VersionName;
    }

    /**
     * 获取版本号  => 1
     * android
     * ios
     * @param callback
     */
    static getVersionCode(callback) {
        return callback(NativeConstant.VersionCode);
    }

    static VersionCode() {
        return NativeConstant.VersionCode;
    }

    /**
     * 解压文件至压缩文件目录
     * data=> Success 解压完成  NotFile文件不存在
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static unZipFile(filePath, callback) {
        NativeUtils.unZipFile(filePath, callback);
    }

    /**
     * 删除文件或目录
     * android
     * ios
     * @param filePath
     */
    static deleteFile(filePath) {
        NativeUtils.deleteFile(filePath);
    }

    /**
     * 删除目录内容 （不删除目录）
     * android
     * ios
     * @param foldrPath
     */
    static deleteFolder(foldrPath) {
        NativeUtils.deleteFolder(foldrPath);
    }

    /**
     * 获取文件或目录大小
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static getFilePathSize(filePath, callback) {
        NativeUtils.getFilePathSize(filePath, callback);
    }

    /**
     * 是否有该路径
     * android
     * ios
     * @param filePath
     * @param callback
     */
    static isFolderExists(filePath, callback) {
        NativeUtils.isFolderExists(filePath, callback);
    }

    /**
     * 创建目录
     * android
     * 暂时不支持ios
     * @param filePath
     * @param callback
     */
    static createDirectory(filePath, callback) {
        NativeUtils.createDirectory(filePath, callback);
    }

    /**
     * 跳转到android应用市场
     * 多个应用市场展示应用市场列表
     * appID => ios传入appId  android无需传入参数
     */
    static goToMarket(appID) {
        if (NativeConstant.Android) {
            NativeUtils.goToMarket(NativeConstant.PackageName, null);
        } else if (NativeConstant.IOS) {
            if (!appID) {
                return Utils.logError('appID');
            }
            NativeUtils.goToMarket(appID);
        }
    }


    /**
     * log信息打印
     * @param content
     */
    static log(content) {
        if (!content) {
            return Utils.logError('content');
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

    /**** react-navigation组件 ****/

    /**
     * 屏幕聚焦
     * @param self =>页面 this
     * @param callback
     */
    static navigationDidFocus(self, callback) {
        return self.props.navigation.addListener('didFocus', callback);
    }

    /**
     * 屏幕未聚焦
     * @param self
     * @param callback
     */
    static navigationDidBlur(self, callback) {
        return self.props.navigation.addListener('didBlur', callback);
    }

    /**
     * 屏幕将聚焦
     * @param self
     * @param callback
     */
    static navigationWillFocus(self, callback) {
        return self.props.navigation.addListener('willFocus', callback);
    }

    /**
     * 屏幕将没有聚焦
     * @param self
     * @param callback
     */
    static navigationWillBlur(self, callback) {
        return self.props.navigation.addListener('willBlur', callback);
    }

    /**
     * 去除页面焦点监听
     * @param navigation  ==> this.props.navigation
     */
    static navigationFocusRemoveListener(navigation) {
        navigation.remove();
    }

    /**
     * 返回上一页
     * @param self
     */
    static goBack(self) {
        self.props.navigation.goBack(null);
    }

    /**
     * 返回路由数量
     * @param self
     * @param n  n表示在堆栈内返回几层
     */
    static pop(self, n) {
        self.props.navigation.pop(n);
    }


    /**
     * 返回到栈顶
     * @param self
     */
    static popToTop(self) {
        self.props.navigation.popToTop();
    }

    /**
     * 返回上一页带参数 data
     * @param self
     * @param data
     */
    static goBackCallback(self, data) {
        const {goBack, state} = self.props.navigation;
        state.params.callback(data);
        goBack();
    }

    /**
     * 新路由替换当前路由
     * @param self
     * @param routeName
     * @param data
     */
    static replaceView(self, routeName, data) {
        self.props.navigation.replace(routeName, {data});
    }

    /**
     * 跳转至指定页面
     * @param self
     * @param routeName
     */
    static jumpView(self, routeName) {
        self.props.navigation.navigate(routeName);
    }

    /**
     * 跳转至指定页面 带参数 data
     * @param self
     * @param routeName
     * @param data
     */
    static jumpDataView(self, routeName, data) {
        self.props.navigation.navigate(routeName, {data});
    }

    /**
     * 跳转至指定页面 并监听下一页回调
     * @param self
     * @param routeName
     * @param callback
     */
    static jumpCallbackView(self, routeName, callback) {
        self.props.navigation.navigate(routeName, {
            callback: callback,
        });
    }

    /**
     * 跳转至指定页面 带参数 data 并监听下一页回调
     * @param self
     * @param routeName
     * @param data
     * @param callback
     */
    static jumpDataCallbackView(self, routeName, data, callback) {
        self.props.navigation.navigate(routeName, {
            data,
            callback: callback,
        });
    }


    /**
     * 类似于navigate, push将跳转到堆栈中的新的路由 与navigate的区别在于，如果有已经加载的页面，navigate方法将跳转到已经加载的页面，
     * 而不会重新创建一个新的页面。 push 总是会创建一个新的页面，所以一个页面可以被多次创建
     * 注意：与navigate相比较，push的使用范围无疑是更广的，它可以在相同的screen页面间跳转（只是页面routeName相同，而参数params不同），
     */

    /**
     * 创建一个新的路由
     * @param self
     * @param routeName
     */
    static pushView(self, routeName) {
        self.props.navigation.push(routeName);
    }

    /**
     * 创建一个新的路由 带参数 data
     * @param self
     * @param routeName
     * @param data
     */
    static pushDataView(self, routeName, data) {
        self.props.navigation.push(routeName, {data});
    }

    /**
     * 创建一个新的路由  并监听下一页回调
     * @param self
     * @param routeName
     * @param callback
     */
    static pushCallbackView(self, routeName, callback) {
        self.props.navigation.push(routeName, {
            callback: callback,
        });
    }

    /**
     * 创建一个新的路由 带参数 data 并监听下一页回调
     * @param self
     * @param routeName
     * @param data
     * @param callback
     */
    static pushDataCallbackView(self, routeName, data, callback) {
        self.props.navigation.push(routeName, {
            data,
            callback: callback,
        });
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
        return (h / 1334) * Utils.phoneFitHeight();
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
        let listView = Utils.alertPullView(<CenterView>
            <CustomButton textStyle={{
                margin: 20,
                fontSize: FontSize.textSize_16
            }}>{titleText}</CustomButton>
            <FlatList
                keyExtractor={(item, index) => (index + '1')}
                data={this.state.item}

                renderItem={({item, index}) => (
                    <CustomButton textStyle={{
                        margin: Utils.getWidth(25)
                    }} onPress={() => {
                        Overlay.hide(listView);
                        return callback && callback(index)
                    }}>{item}</CustomButton>

                )}
            />
            <CustomButton
                textStyle={{
                    margin: 20,
                }}
                onPress={() => {
                    Overlay.hide(listView);
                    return callback && callback('cancel')
                }}
            >{cancelText}</CustomButton>
        </CenterView>)
    }

    /**
     * 时间选择器
     * @param pickerValue  date=>年月日选择     dateTime=>年月日时分秒选择     time=>时分秒选择
     * @param onSureCallback
     * @param onCancelCallback
     */
    static alertPicker(pickerValue, onSureCallback, onCancelCallback) {
        let pickerView = Utils.alertPullView(
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
     * 本地持久化储存信息
     * @returns {Storage}
     */
    static getStorage() {
        if (storage === undefined) {
            storage = new Storage({
                size: 1000,
                // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
                // 如果不指定则数据只会保存在内存中，重启后即丢失
                storageBackend: AsyncStorage,
                defaultExpires: null,
                // 读写时在内存中缓存数据。默认启用。
                enableCache: true,
            });
        }
        return storage;
    }


    /**
     * 保存数据
     * @param key
     * @param object
     */
    static saveData(key, object) {
        Utils.isInit();
        storage.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: object,
            expires: null,
        });
    }

    /**
     * 删除单个数据
     * @param key
     */
    static removeData(key) {
        Utils.isInit();
        storage.remove({
            key: key,
        });
    }

    /**
     * 移除所有"key-id"数据（但会保留只有key的数据）
     */
    static removeAll() {
        Utils.isInit();
        storage.clearMap();
    }

    /**
     * 清除某个key下的所有数据
     * @param key
     */
    static clearDataByKey(key) {
        Utils.isInit();
        storage.clearMapForKey(key);
    }

    /**
     * 查找某个key下的所有数据
     * @param key
     * @param successCallBack
     * @param errorCallback
     */
    static findData(key, successCallBack, errorCallback) {
        Utils.isInit();
        storage.load({
            key: key,
        }).then(data => {
            return successCallBack(data);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * 查找某个key下的所有数据 同步
     * @param key
     */
    static async findAsyncData(key) {
        Utils.isInit();
        return await storage.load({
            key: key,
        });
    }

    static isInit() {
        if (storage === undefined) {
            console.log('请先调用getStorage()进行初始化');
        }
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


    /**
     * 此方法包含 校验bundle版本号匹配问题已经下载和解压
     * 版本号必须为int类型，字段key 不可改变
     * netVersion={
     *     androidBundleVersion:0,
     *     androidVersion:1,
     *     iosBundleVersion:0,
     *     iosVersion:1,
     *   }
     * OSS目录文件 服务器文件下载目录,目录不可更改
     *
     * ├── OSS
     *      ├──android
     *            ├──bundle
     *                 ├── 0  (版本号)
     *                     └──bundle.zip
     *                 ├── 1  (版本号)
     *                     └──bundle.zip
     *                 ├── 2  (版本号)
     *                     └──bundle.zip
     *            ├──apk
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *       ├──ios
     *            ├──bundle
     *                 ├── 0  (版本号)
     *                     └──bundle.zip
     *                 ├── 1  (版本号)
     *                     └──bundle.zip
     *                 ├── 2  (版本号)
     *                     └──bundle.zip
     *            ├──ipa     //分发平台版本号
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *            ├──store_ipa  //官方版本号
     *                 ├── 0  (版本号)
     *                     └──0.apk
     *                 ├── 1  (版本号)
     *                     └──1.apk
     *                 ├── 2  (版本号)
     *                     └──2.apk
     *
     * @param netVersion
     * @param localAndroidBundleVersion    可在package.json中加入两个字段 并从中获取
     * @param localIosBundleVersion        可在package.json中加入两个字段 并从中获取
     * @param OSSUrl
     * @param bundleUnZip
     */
    static uploadBundle(netVersion, localAndroidBundleVersion, localIosBundleVersion, OSSUrl, bundleUnZip) {
        if (this.checkNumber(netVersion.androidBundleVersion) &&
            this.checkNumber(netVersion.androidVersion) &&
            this.checkNumber(netVersion.iosBundleVersion) &&
            this.checkNumber(netVersion.iosVersion) &&
            this.checkNumber(localAndroidBundleVersion) &&
            this.checkNumber(localIosBundleVersion)) {
            const localVersionCode = NativeConstant.VersionCode;
            if (NativeConstant.Android) {
                if ((netVersion.androidVersion) === localVersionCode && (netVersion.androidBundleVersion) > localAndroidBundleVersion) {
                    Utils.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
                    }, () => {
                        bundleUnZip && bundleUnZip();
                    });
                } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localAndroidBundleVersion) {
                    Utils.deleteBundle();
                }
            } else if (NativeConstant.IOS) {
                if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) > localIosBundleVersion) {
                    Utils.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
                    }, () => {
                        bundleUnZip && bundleUnZip();
                    });
                } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localIosBundleVersion) {
                    Utils.deleteBundle();
                }
            }
        } else {
            return console.error('version type error (not number)');
        }
    }

    /**
     * 校验类型是否为number
     * @param num
     * @returns {boolean}
     */
    static checkNumber(num) {
        return typeof num === 'number';
    }


    /**
     * 下载并解压bundle文件,此方法只可以下载和解压至固定位置，
     * 固定位置
     * android:/data/user/0/{packageName}/files/
     * ios:/var/mobile/Containers/Data/Application/{186EE408-3B95-4A09-B8E2-E1C14B333E2B}/Library/
     *
     * @param url
     * @param callbackPercent
     * @param callbackUnzip
     * @param androidExternalFiles  true 保存在外置储存  false保存在内部储存 默认false
     */
    static downloadBundleZipWithUnZip(url, callbackPercent, callbackUnzip, androidExternalFiles) {
        if (androidExternalFiles == null) androidExternalFiles = false;
        if (NativeConstant.IOS) {
            const path = NativeConstant.LibraryDirectory + '/';
            FetchBlob.downloadFile(url, path, 'bundle.zip', (percent) => {
                return callbackPercent(percent);
            }, () => {
                NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
                    return callbackUnzip(zip);
                });
            }, (fail) => {
                return console.error('download Fail');
            });
        } else if (NativeConstant.Android) {
            const path = (androidExternalFiles ? NativeConstant.ExternalFilesDir : NativeConstant.FilesDir) + '/';
            FetchBlob.downloadFile(url, path, 'bundle.zip', (percent) => {
                return callbackPercent(percent);
            }, () => {
                NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
                    return callbackUnzip(zip);
                });
            }, (fail) => {
                return console.error('download Fail');
            });
        }
    }


    /**
     * 删除Bundle文件或目录
     * android 固定地址 /data/user/0/{包名}/files/bundle/
     *         固定地址 /data/user/0/{包名}/files/bundle.zip
     * ios 固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle.zip
     *     固定路径 /var/mobile/Containers/Data/Application/{570EAD8E-C3F9-4A8D-9A17-ACD3355AC501}/Library/bundle/
     */
    static deleteBundle() {
        if (NativeConstant.IOS) {
            const library = NativeConstant.LibraryDirectory + '/';
            NativeUtils.deleteFile(library + 'bundle');
            NativeUtils.deleteFile(library + 'bundle.zip');
        } else if (NativeConstant.Android) {
            const filesDir = NativeConstant.FilesDir + '/';
            NativeUtils.deleteFile(filesDir + 'bundle');
            NativeUtils.deleteFile(filesDir + 'bundle.zip');
        }
    }

    /**
     * 清除本地缓存目录
     */
    static cleanCache() {
        if (NativeConstant.IOS) {
            const cache = NativeConstant.CachesDirectory + '/';
            NativeUtils.deleteFolder(cache);
        } else if (NativeConstant.Android) {
            const ExternalCacheDir = NativeConstant.ExternalCacheDir + '/';
            const CacheDir = NativeConstant.CacheDir + '/';
            NativeUtils.deleteFile(ExternalCacheDir);
            NativeUtils.deleteFile(CacheDir);
        }
    }

    static getDaysInOneMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

}
