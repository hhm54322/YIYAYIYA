'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import AlvideoView from '../../component/AlvideoView'

export default class Page7 extends Component{
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>RN界面返回2</Text>
                <AlvideoView style={{width:200,height:250}}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});