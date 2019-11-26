'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';

export default class SettingPlayVideoModalView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:1
        };
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        
    }
    //生命周期函数，render之前被调用
    componentWillMount(){

    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){

    }
    //返回按钮点击事件
    onTouchBack(){
        this.props.navigation.goBack();
    }
    //播放模式选择事件
    onTouchPlayVideoModal(index){
        if(this.state.selectedIndex != index){
            this.setState({
                selectedIndex : index
            })
        }
    }
    //显示顶层按钮和标题
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/navigation2.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBack();
                    }}>
                    <Image source = {require('../../images/back.png')} style = {styles.backImg}/>
                </TouchableWithoutFeedback>
                <Text style={styles.titleText}>自动播放视频</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示3种播放模式
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <View style={styles.topRowView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPlayVideoModal(0);
                        }}>
                        <View style={styles.rowView}>
                            <Text style={styles.rowLeftText}>自动播放视频</Text>
                            {this.state.selectedIndex == 0 ? <Image source = {require('./img/tick.png')} style = {styles.rowRightImg}/> : null}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPlayVideoModal(1);
                        }}>
                        <View style={styles.rowView}>
                            <Text style={styles.rowLeftText}>仅在WIFI下自动播放</Text>
                            {this.state.selectedIndex == 1 ? <Image source = {require('./img/tick.png')} style = {styles.rowRightImg}/> : null}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPlayVideoModal(2);
                        }}>
                        <View style={styles.rowView1}>
                            <Text style={styles.rowLeftText}>不自动播放</Text>
                            {this.state.selectedIndex == 2 ? <Image source = {require('./img/tick.png')} style = {styles.rowRightImg}/> : null}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop:SceneUtils.autoHeight(20),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(647),
        alignItems:'center',
        backgroundColor:'#ededed'
    },
    topView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    backImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginLeft:SceneUtils.autoWidth(12)
    },
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#333333'
    },
    centerView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(559),
        alignItems:'center'
    },
    topRowView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(122),
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        backgroundColor:'#f5f7fa'
    },
    rowView:{
        marginLeft:SceneUtils.autoWidth(12),
        width:SceneUtils.screenWidth - SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(40.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rowView1:{
        marginLeft:SceneUtils.autoWidth(12),
        width:SceneUtils.screenWidth - SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(40.5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rowLeftText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    rowRightImg:{
        marginRight:SceneUtils.autoWidth(12),
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
});