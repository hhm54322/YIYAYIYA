'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    NativeModules,
    InteractionManager
} from 'react-native';

var Push = NativeModules.PushNative;

export default class Page1 extends Component{
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
    onClick1 = ()=>{
        const { navigate } = this.props.navigation;
        navigate('Page2')
    }
    onClick2 = ()=>{
        const { navigate } = this.props.navigation;
        navigate('Page3')
    }
    onClick3 = ()=>{
        console.log("onClick3");
        InteractionManager.runAfterInteractions(()=> {
            Push.RNLockToLandscape('full');
        });
    }
    onClick4 = ()=>{
        console.log("onClick4");
        InteractionManager.runAfterInteractions(()=> {
            Push.RNLockToLandscape('unFull');
        });
    }
    onClick5 = ()=>{
        console.log("onClick5");
        const { navigate } = this.props.navigation;
        navigate('Page7')
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick}>
                    <Text style={styles.welcome}>跳转ios原生</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick1}>
                    <Text style={styles.welcome}>RN界面跳转(嵌IOS原生控件)</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick2}>
                    <Text style={styles.welcome}>RN界面跳转tabBar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick3}>
                    <Text style={styles.welcome}>IOS强制横屏</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick4}>
                    <Text style={styles.welcome}>IOS强制竖屏</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={
                      this.onClick5}>
                    <Text style={styles.welcome}>RN界面跳转(嵌Android原生控件)</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'rgb(51,51,51)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});