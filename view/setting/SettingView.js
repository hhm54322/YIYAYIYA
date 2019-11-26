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
import DataUtil from '../../utils/DataUtil';
import StorageHelper from '../../utils/StorageHelper';

export default class SettingView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
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
    //绑定微信按钮点击事件
    onTouchBindWx(){
        console.log('onTouchBindWx');
    }
    //自动播放视频按钮点击事件
    onTouchPlayVideoModal(){
        console.log('onTouchPlayVideoModal');
        const { navigate } = this.props.navigation;
        navigate('SettingPlayVideoModalView');
    }
    //关于我们按钮点击事件
    onTouchAboutUs(){
        console.log('onTouchAboutUs');
        const { navigate } = this.props.navigation;
        navigate('AboutUsView');
    }
    //推出账号按钮点击事件
    onTouchQuit(){
        StorageHelper.delete('pStruct');
        const { navigate } = this.props.navigation;
        navigate('Login');
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
                <Text style={styles.titleText}>通用设置</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间设置内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <View style={styles.topRowView}>
                    <View style={styles.rowView}>
                        <Text style={styles.rowLeftText}>当前登录账号</Text>
                        <View style={styles.rowRightView}>
                            <Text style={styles.rowRightText}>{DataUtil.getinstance().getInfo().cellPhone},ID:{DataUtil.getinstance().getInfo().id}</Text>
                            <View style={styles.rowRightArrow}></View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchBindWx();
                        }}>
                        <View style={styles.rowView1}>
                            <Text style={styles.rowLeftText}>绑定微信</Text>
                            <View style={styles.rowRightView}>
                                <Image source = {require('./img/wechatIcon.png')} style = {styles.rowRightWx}/>
                                <Image source = {require('../../images/arrow.png')} style = {styles.rowRightArrow}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.bottomRowView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPlayVideoModal();
                        }}>
                        <View style={styles.rowView}>
                            <Text style={styles.rowLeftText}>自动播放视频</Text>
                            <View style={styles.rowRightView}>
                                <Text style={styles.rowRightText}>仅在WIFI下</Text>
                                <Image source = {require('../../images/arrow.png')} style = {styles.rowRightArrow}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.rowView}>
                        <Text style={styles.rowLeftText}>清理缓存</Text>
                        <View style={styles.rowRightView}>
                            <Text style={styles.rowRightText}>218.23MB</Text>
                            <View style={styles.rowRightArrow}></View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchAboutUs();
                        }}>
                        <View style={styles.rowView1}>
                            <Text style={styles.rowLeftText}>关于我们</Text>
                            <View style={styles.rowRightView}>
                                <Image source = {require('../../images/arrow.png')} style = {styles.rowRightArrow}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    //显示下方退出账号按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchQuit();
                }}>
                <View style={styles.downView}>
                    <Text style={styles.quitText}>退出账号</Text>
                </View> 
           </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
                {this.showDownView()}
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
        height:SceneUtils.autoHeight(81.5),
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        backgroundColor:'#f5f7fa'
    },
    bottomRowView:{
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
    rowRightView:{
        marginRight:SceneUtils.autoWidth(12),
        flexDirection:'row',
        alignItems:'center',
    },
    rowRightText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2',
    },
    rowRightWx:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    rowRightArrow:{
        marginLeft:SceneUtils.autoWidth(16),
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#dc1802',
        justifyContent:'center',
        alignItems:'center',
    },
    quitText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});