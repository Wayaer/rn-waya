'use strict';
import React, {Component, PureComponent} from 'react';
//第三方
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Utils from './src/utils/Utils';
import {
    ActionPopover,
    ActionSheet,
    AlbumView,
    Badge,
    BasePage,
    Carousel,
    Drawer,
    Input,
    KeyboardSpace,
    Label,
    ListRow,
    Menu,
    ModalIndicator,
    NavigationBar,
    NavigationPage,
    Overlay,
    Popover,
    PopoverPicker,
    Projector,
    PullPicker,
    SearchInput,
    SegmentedBar,
    SegmentedView,
    Select,
    Stepper,
    TabView,
    TeaNavigator,
    Theme,
    Toast,
    TopView,
    TransformView,
    Wheel,
} from 'teaset';


export * from 'rn-curiosity';
export * from 'react-native';
export * from './src/utils/FetchBlob';
export * from './src/component/Component';
export * from './src/constant/Constant';
export * from './src/component/Bar';
export * from './src/component/DatePicker';
export * from './src/component/LinearGradient';
export * from './src/component/AlertDialog';
export * from './src/component/AreaPicker';
export * from './src/component/BaseComponent';
export * from './src/component/BaseDialog';
export * from './src/component/CustomPicker';
// export * from './src/component/DateTimePicker';
export * from './src/component/DownloadDialog';
export * from './src/component/InputDialog';
export * from './src/component/KeyboardSpacer';
export * from './src/component/PickerView';
export * from './src/component/SimpleChooseDialog';
export * from './src/component/SimpleItemsDialog';
export * from './src/component/ToastComponent';
export * from './src/component/LazyImage';

export {
    Theme,

    Label,
    // Button,
    //     //Checkbox,
    Input,
    Select,
    Stepper,
    SearchInput,
    Badge,
    Popover,

    NavigationBar,
    ListRow,
    Carousel,
    Projector,
    SegmentedBar,
    SegmentedView,
    TabView,
    TransformView,
    AlbumView,
    Wheel,

    TopView,
    Overlay,
    Toast,
    ActionSheet,
    ActionPopover,
    PullPicker,
    PopoverPicker,
    Menu,
    Drawer,
    ModalIndicator,

    TeaNavigator,
    BasePage,
    NavigationPage,

    KeyboardSpace,
    /* curiosity */
    React,
    Component, PureComponent,
    NetInfo, AsyncStorage,
    RNFetchBlob, Utils,
};
