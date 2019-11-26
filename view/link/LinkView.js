'use strict';
import React, {Component} from 'react';
import {
    View,
    WebView,
    StyleSheet
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';

export default class LinkView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    style = {styles.container}
                    source={{uri:this.props.navigation.state.params.url}}
                >
                </WebView>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(647),
    },
})