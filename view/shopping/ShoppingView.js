'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    WebView
} from 'react-native';


export default class ShoppingView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={this.props.style}>
                <WebView
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    style = {this.props.style}
                    source={{uri:"http://www.baidu.com"}}
                >
                </WebView>
            </View>
        );
    }
}