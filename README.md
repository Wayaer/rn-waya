# 全功能版本的的wayae必须依赖以下库
*本库仅供个人使用，用于封装基础方法和组件，他人使用若有问题自行负责
```
  yarn add rn-fetch-blob
         
  yarn add rn-curiosity       

  yarn add @react-native-community/async-storage 

  yarn add @react-native-community/netinfo 
```


#组件
   
Checkbox
```html
<CustomCheckbox
      onChange={(check)=>{
         //
      }}
      checkedIcon={ }     //选中时 的图片
      uncheckedIcon={  }  //未选中时 的图片
      checked={  }        // 默认状态
   />
```

渐变组件   
```html

   <LinearGradient
       horizontal={true}
       colors={['#000000', '#ffffff']}
       viewStyle={{
           flexDirection: 'row',
           height: Constant.CurrentHeight + Utils.getHeight(100),
           paddingTop: Constant.CurrentHeight,
           alignItems: 'center',
           width: Screen_Width,
           justifyContent: 'space-between',
           paddingHorizontal: Utils.getWidth(25),
       }}
       style={{}}>
   </LinearGradient>
``` 
单线动画
```html
  <BarLine
    progress={this.state.progress}  //0 ~ 1
    style={{
        width: this.width,
        unfilledColor: Colors.gray999,
        color: Colors.blueStart,
    }}/>}

```

时间选择器 
```html
 <DatePicker/>
```
<img  src="src/res/ios_datePicker.png" width="420" height = "750"> <img  src="src/res/android_datePicker.png" width="420" height = "750">


属性

```pickerType || 'dateTime'  类型  

   
    /* pickerType:
     *       date        =>年月日选择
     *       dateTime    =>年月日时分秒选择
     *       time        =>时分秒选择
     */
     
 itemHeight         单层item高度
 
 title || 'Select'  头部文字
 
 cancelTextStyle    取消文字样式
 
 cancelTouchStyle   取消触摸区域样式
 
 sureTextStyle      确定文字样式
 
 sureTouchStyle     确定触摸区域样式
 
 titleTextStyle     头部文字样式
 
 showUnit || true  是否显示文字（年月日）
 
 pickerTimeInterval || ['2019-01-01', '2029-01-01']   选择时间区间  //不支持time类型
 
 defaultSelectTime: '2019-02-28 03:04:05',  默认选中时间  //不支持time类型
 
 ```

 
 
事件
```
onSure     确定 回调

onCancel   取消 回调
```


例

```
   Utils.alertPicker({
            showUnit: true, itemHeight: 30,
            showUnit={pickerValue.showUnit}//是否显示年月日时分秒 文字
            pickerType: 'dateTime', //time date dateTime
            defaultSelectTime: '2019-02-28 03:04:05',    //不支持time类型
            pickerTimeInterval: ['2018-01-12 23:34:45', '2026-01-07 23:34:45'],  //不支持time类型
            sureText: '确定', title: '时间选择器', cancelText: '取消',
        }, (time) => {
            Utils.Toast(time)

        }, () => {

        })
```    


#方法 Utils
[参考Utils文件](src/Utils.js)

```
  使用方法
  
  Utils.方法名()
  
  Utils.sendMessageNativeToJS()

```

#热更新

先查阅rn-curiosity文档配置原生双端代码

#JS调用热更新

```
  调用方式
  参数传递见方法注解，bundle 本地储存地址均为固定地址，不可改变

  Utils.uploadBundle()  //bundle版本校验及下载解压，
  
  Utils.downloadBundleZipWithUnZip()  //bundle 下载和解压，具体的版本校验自行判断

```
[参考Utils文件uploadBundle方法和downloadBundleZipWithUnZip方法](src/Utils.js)
```
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
         const localVersionCode = Constant.VersionCode;
         if (Constant.Android) {
           if ((netVersion.androidVersion) === localVersionCode && (netVersion.androidBundleVersion) > localAndroidBundleVersion) {
             Utils.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
             }, () => {
               bundleUnZip && bundleUnZip();
             });
           } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localAndroidBundleVersion) {
             Utils.deleteBundle();
           }
         } else if (Constant.IOS) {
           if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) > localIosBundleVersion) {
             Utils.downloadBundleZipWithUnZip(OSSUrl + 'android/bundle/' + (netVersion.androidBundleVersion) + '/bundle.zip', (percent) => {
             }, () => {
               bundleUnZip && bundleUnZip();
             });
           } else if ((netVersion.iosVersion) === localVersionCode && (netVersion.iosBundleVersion) < localIosBundleVersion) {
             this.deleteBundle();
           }
         }
       } else {
         return console.error('version type error (not number)');
       }
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
    */
   static downloadBundleZipWithUnZip(url, callbackPercent, callbackUnzip) {
     if (Constant.IOS) {
       const path = Constant.LibraryDirectory + '/';
       FetchBlob.downloadFile(url, path, 'bundle.zip', (percent) => {
         return callbackPercent(percent);
       }, () => {
         NativeUtils.unZipFile(path + 'bundle.zip', (zip) => {
           return callbackUnzip(zip);
         });
       }, (fail) => {
         return console.error('download Fail');
       });
     } else if (Constant.Android) {
       const path = Constant.FilesDir + '/';
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

  
```   
  
推荐库

```

 react-native-fast-image `  //大图片优化

 react-native-syan-image-picker //图片选择
 
 lottie-react-native 动画库
```


