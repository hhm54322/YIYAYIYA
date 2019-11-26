'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
var datas=[
    {
        name:'页面1',
        re:require('../../images/home.png')
    },{
        name:'页面2',
        re:require('../../images/service.png')
    },{
        name:'页面3',
        re:require('../../images/user.png')
    }
]
export default class Tabbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    _onTabbarPress(index){
        this.props.onTabbarPress(index);
    }
    setTabbars() {
        var itemAry = [];
        for (var i = 0; i<datas.length; i++) {

            var styled = this.props.select === i ? styles.image1 : styles.image
            if(i === 3){
                styled = {
                    width:35,
                    height:30,
                    tintColor:'rgb(150,150,150)',
                }
            }
            itemAry.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={1}
                    onPress={this._onTabbarPress.bind(this, i)}
                >
                    <View style={[styles.itemView]}>
                        <Image source = {datas[i].re} style={styled}></Image>
                        <Text style={this.props.select === i ? styles.text1 : styles.text}>{datas[i].name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        // 返回数组
        return itemAry;
    };

    render() {
        return (
            <View style={styles.container}>
                {this.setTabbars()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgb(51,51,51)',
        borderTopWidth:1,
        borderColor: 'rgb(70,70,70)',
    },
    itemView:{
        width:Dimensions.get('window').width/5,
        height:53,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width:35,
        height:30,
    },
    image1:{
        width:35,
        height:30,
        tintColor:'rgb(127,186,0)',
    },
    text:{
        fontSize:12,
        color:'rgb(238,238,238)'
    },
    text1:{
        fontSize:12,
        color:'rgb(127,186,0)'
    },
});