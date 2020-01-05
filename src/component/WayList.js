/* params：
*  dataSource：Array; 数据源
*  renderItem: function; 数据项渲染
*  ref: function; 加载状态操作
*  allLoaded：Boolean; 是否加载完所有数据
*  onLoading: function; 表格尾部加载数据
*  onRefresh: function; 下拉刷新函数
*  disableLoad: boolean;  是否禁用加载；
*  emptyText: String; 无数据时提示文字
*  isFirstLoad:boolean;  是否是第一次加载，默认true
*  NoData: 无数据组件；
*/

import {Text, View} from 'react-native';
import {ChineseWithLastDateHeader} from './CustomList/ChineseWithLastDateHeader';
import {ChineseWithLastDateFooter} from './CustomList/ChineseWithLastDateFooter';
import {SpringScrollView} from 'rn-scrollview';
import {BaseComponent} from './BaseComponent';

export class WayList extends BaseComponent {
    constructor(props) {
        super(props);
        const allLoaded = props.allLoaded !== undefined ? props.allLoaded : true;
        const isFirstLoad = props.isFirstLoad !== undefined ? props.isFirstLoad : true;

        this.state = {
            network: true,

            isRefresh: false,
            isFirstLoad: isFirstLoad,
            allLoaded: allLoaded,

            data: props.dataSource ? props.dataSource : [],
            currentPage: props.currentPage ? props.currentPage : 1,
        };
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
        const thisState = this.state;
        const disableLoad = nextProps.disableLoad;

        let dataSource = [];
        if (nextProps.currentPage === 1 || disableLoad) {
            dataSource = nextProps.dataSource;
        } else {
            dataSource = thisState.data.concat(nextProps.dataSource);
        }

        this.setState({
            allLoaded: nextProps.allLoaded,
            data: dataSource,
            isFirstLoad: nextProps.isFirstLoad,
        });
    }

    componentWillUnmount() {
    }


    onRefresh = () => {
        this.setState({
            data: [],
            isRefresh: true,
        }, () => {
            this.props.onRefresh();
        });
    };

    endRefresh = () => {
        this.setState({
            isRefresh:false,
        });

        if (!this.state.isFirstLoad && this.state.data.length > 0) {
            this._scrollView.endRefresh();
        }
    };

    endLoading = () => {
        if (!this.state.isFirstLoad && this.state.data.length > 0) {
            this._scrollView.endLoading();
        }
    };

    render() {
        const thisState = this.state;
        const thisProps = this.props;
        const disableLoad = thisProps.disableLoad;

        const startRefresh = disableLoad ? null : () => this.onRefresh();
        const startLoading = disableLoad ? null : () => this.props.onLoading();

        const showTable = thisState.network && (thisState.isRefresh || thisState.data.length > 0) && !thisState.isFirstLoad;

        const showEmpty = thisState.network && thisState.data.length === 0 && !thisState.isFirstLoad;

        return (
            <View style={{flex: 1}}>
                {
                    showTable && (
                        <SpringScrollView
                            ref={ref => (this._scrollView = ref)}
                            style={{flex: 1}}
                            onRefresh={startRefresh}
                            allLoaded={this.state.allLoaded}
                            onLoading={startLoading}
                            refreshHeader={ChineseWithLastDateHeader}
                            loadingFooter={ChineseWithLastDateFooter}
                        >
                            {
                                thisState.data.map((item,index) => {
                                    return (
                                        <View key={index}>
                                            {this.props.renderItem(item, index)}
                                        </View>
                                    );
                                })
                            }
                        </SpringScrollView>
                    )
                }

                {
                    showEmpty && (
                        this.props.nodata || <Text>暂无数据</Text>
                    )
                }
            </View>
        );
    }
}
