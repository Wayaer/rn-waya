'use strict';
import React, {Component, PureComponent} from 'react';
//第三方
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

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

export * from './src/';
export * from 'rn-curiosity';
export * from 'react-native';

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
    RNFetchBlob,
};
