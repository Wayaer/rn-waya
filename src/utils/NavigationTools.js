import {NavigationActions, StackActions} from 'react-navigation';

export class NavigationTools {

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
     * 重置堆栈，并初始化到指定页面
     * @param self
     * @param routeName
     */
    static goToResetView(self, routeName) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: routeName}),
            ],
        });
        self.props.navigation.dispatch(resetAction);
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


}
