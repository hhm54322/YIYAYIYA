'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../utils/SceneUtils';


//底部tabbar显示   
var datas=[
    {
        name:'集合',
        re:require('./img/collection.png')
    },{
        name:'家庭圈',
        re:require('./img/family.png')
    },{
        name:'资讯',
        re:require('./img/news.png')
    },{
        name:'生活',
        re:require('./img/life.png')
    },{
        name:'我的',
        re:require('./img/me.png')
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


    ///渲染每一个tab
    setTabbars() {
        var itemAry = [];
        for (var i = 0; i<datas.length; i++) {
            var styled = this.props.select === i ? styles.image1 : styles.image;
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
        if(!this.props.isShow){
            return (
                <View >
                    
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {this.setTabbars()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth:1,
        borderColor: '#cccccc',
        backgroundColor:'#f5f7fa'
    },
    itemView:{
        width:SceneUtils.screenWidth/5,
        height:SceneUtils.autoHeight(50),
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
    },
    image1:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        tintColor:'#5bdeb4',
    },
    text:{
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2'
    },
    text1:{
        fontSize:SceneUtils.setSpText(11),
        color:'#5bdeb4'
    },
});