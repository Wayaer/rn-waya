/* tabs
* params:
* 参考：https://github.com/rilyu/teaset/blob/master/docs/cn/SegmentedBar.md
* activeIndex:string , number  当前默认选中值
* barItems: Array, [{title:'',value:''}] 数据源
* justifyItem：string ; fixed, scrollable
* tabChange:function 点击事件回调  传回整个item的值
* activeColor:string;  激活颜色
* titleColor:string;   文字颜色
* isHeader：boolean; 是否是渲染在头部；
* height: number; 組件高度
* */
import React from 'react';
import {View} from 'react-native';
import {BaseComponent, Utils} from '../../index';
import {SegmentedBar} from 'teaset';
import {Colors, FontSize} from '../constant/Constant';

export class Tabs extends BaseComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex ? props.activeIndex : 0,
            justifyItem: props.justifyItem ? props.justifyItem : 'fixed',
            indicatorType: props.indicatorType ? props.indicatorType : 'boxWidth',
            indicatorPosition: 'bottom',
            animated: true,
            autoScroll: true,
            custom: false,
            barItems: props.barItems ? props.barItems : [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeIndex !== this.state.activeIndex) {
            this.setState({
                activeIndex: nextProps.activeIndex,
            });
        }

    }

    onSegmentedBarChange(index) {
        const thisState = this.state;
        if (index !== thisState.activeIndex) {
            this.setState({
                activeIndex: index,
            }, () => {
                this.props.tabChange(thisState.barItems[index]);
            });
            if (this.refs.carousel) {
                this.refs.carousel.scrollToPage(index, false);
            }
        }
    }

    render() {

        let {justifyItem, indicatorType, indicatorPosition, animated, autoScroll, activeIndex, barItems} = this.state;

        const thisProps = this.props;

        const attribute = indicatorType === 'customWidth' ? {indicatorWidth: thisProps.indicatorWidth} : {};

        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <SegmentedBar
                    {...attribute}
                    style={{height: this.props.height || Utils.getHeight(88), backgroundColor: 'rgba(0,0,0,0)'}}
                    justifyItem={justifyItem}
                    indicatorType={indicatorType}
                    indicatorPosition={indicatorPosition}
                    indicatorLineColor={thisProps.activeColor ? thisProps.activeColor : Colors.mainBlue}
                    indicatorLineWidth={thisProps.isHeader ? 0 : 2}
                    animated={animated}
                    autoScroll={autoScroll}
                    activeIndex={activeIndex}
                    onChange={index => this.onSegmentedBarChange(index)}
                >
                    {
                        barItems.map((item, index) => (
                            <SegmentedBar.Item
                                key={'item' + index}
                                titleStyle={{
                                    fontSize: thisProps.isHeader ? FontSize.textSize_18 : FontSize.textSize_16,
                                    color: thisProps.titleColor ? thisProps.titleColor : Colors.mainBlack,
                                }}
                                activeTitleStyle={{
                                    fontSize: thisProps.isHeader ? FontSize.textSize_18 : FontSize.textSize_16,
                                    fontWeight: '700',
                                    color: thisProps.activeColor ? thisProps.activeColor : Colors.mainBlue,
                                }}
                                title={item.title}
                            />
                        ))}
                </SegmentedBar>
            </View>

        );
    }
}
