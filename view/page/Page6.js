'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Page6 extends Component{
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>我是Page6</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});