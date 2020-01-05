import React from 'react';
import {StyleSheet} from 'react-native';
import type {GroupPropType} from 'rn-scrollview/src/Types';
import {BaseComponent} from '../BaseComponent';

export class Group extends BaseComponent<GroupPropType> {
    _currentIndex = 0;
    _offset = 0;
    _margin = 0;

    constructor(props) {
        super(props);
        if (props.initialContentOffset) {
            this.contentConversion(props.initialContentOffset.y, true);
        }
    }

    contentConversion(offset: number, init: boolean = false) {
        this._offset = offset;
        const {input, output} = this.props;
        const cc = [];
        output.forEach(v => cc.indexOf(v) < 0 && cc.push(v));
        for (let i = 0; i < input.length; ++i) {
            if (offset >= input[i] && offset <= input[i + 1]) {
                this.update(cc.indexOf(output[i]), init);
                break;
            }
        }
    }

    update(index: number, init: boolean) {
        if (index < 0 || index >= this.props.indexes.length || this._currentIndex === index) {
            return;
        }
        this._currentIndex = index;
        !init && this.forceUpdate();
    }

    componentWillReceiveProps(next: GroupPropType) {
        if (next.offset) {
            this._offset = null;
            this.contentConversion(next.offset);
        }
    }

    render() {
        const {indexes, heightForSection, heightForIndexPath, renderIndexPath, inverted} = this.props;
        if (this._currentIndex >= indexes.length) {
            return null;
        }
        this._margin = 0;
        return indexes[this._currentIndex].map((indexPath, index) => {
            if (indexPath.row === -1) {
                this._margin = heightForSection(indexPath.section);
                return null;
            }
            const height = heightForIndexPath(indexPath);
            if (height === 0) {
                return null;
            }
            const cell = React.Children.only(renderIndexPath(indexPath));
            const marginTop = this._margin;
            this._margin = 0;
            const style = StyleSheet.flatten([
                cell.props.style,
                {
                    height,
                    marginTop,
                    alignSelf: 'stretch',
                    flex: 0,
                    transform: [{scaleY: inverted ? -1 : 1}],
                },
            ]);
            const key = cell.props.key ? cell.props.key : index;
            return React.cloneElement(cell, {
                key,
                style,
            });
        });
    }
}
