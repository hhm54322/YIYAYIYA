'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    NativeModules,
    InteractionManager
} from 'react-native';
var Push = NativeModules.PushNative;

export default class Page4 extends Component{
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
    }
    onClick = ()=>{
        console.log(123);
        InteractionManager.runAfterInteractions(()=> {
            console.log(332211);
            Push.RNOpenOneVC('测试');
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick}> */}
                    <Text style={styles.welcome}>我是Page4</Text>
                {/* </TouchableOpacity> */}
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