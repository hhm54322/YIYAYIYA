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

export default class InformationView extends Component{
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
    //通讯录按钮点击事件
    onTouchAddressList(){
        const { navigate } = this.props.navigation;
        navigate('AddressListView');
    }
    //反馈按钮点击事件
    onTouchFeedback(){
        const { navigate } = this.props.navigation;
        navigate('FeedbackView');
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
                <Text style={styles.titleText}>消息</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间通讯录和反馈
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchAddressList();
                    }}>
                    <View style={styles.tabbarIconView}>
                        <Image source = {require('./img/contacts.png')} style = {styles.tabbarIcon}/>
                        <Text style={styles.tabbarText}>通讯录</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchFeedback();
                    }}>
                    <View style={styles.tabbarIconView}>
                        <Image source = {require('./img/feedback.png')} style = {styles.tabbarIcon}/>
                        <Text style={styles.tabbarText}>反馈</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //显示下方各种消息
    showDownView(){
        return(
            <View style={styles.downView}>
                <View style={styles.marginTopView}></View>
                {this.showInfomationView(1,'活动标题','内容内容内容内容内容内容内容内容','18/02/09')}
                {this.showInfomationView(2,'家庭圈消息','内容内容内容内容内容内容内容内容','18/02/09')}
                {this.showInfomationView(3,'系统消息','内容内容内容内容内容内容内容内容','18/02/09')}
            </View>
        )
    }
    //具体消息内容
    showInfomationView(type,title,des,time){
        return(
            <ImageBackground source = {require('./img/rectangle1.png')} style={styles.informationView}>
                <View style={styles.informationBgView}>
                    <View style={styles.informationLeftView}>
                        <Image source = {type == 1 ? require('./img/activity.png') : type == 2 ? require('./img/family.png') : require('./img/system.png')} style = {styles.icon}/>
                        <View style={styles.textView}>
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.desText}>{des}</Text>
                        </View>
                    </View>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
            </ImageBackground>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
                {this.showDownView()}

                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBack();
                    }}>
                    <View style={styles.bg}>
                        <Text style={styles.bgText}>后期阶段调试内容</Text>
                    </View>
                </TouchableWithoutFeedback>
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
        backgroundColor:'#f5f7fa'
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
        height:SceneUtils.autoHeight(122),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    tabbarIconView:{
        width:SceneUtils.autoWidth(64),
        height:SceneUtils.autoHeight(86),
        alignItems:'center'
    },
    tabbarIcon:{
        width:SceneUtils.autoWidth(64),
        height:SceneUtils.autoWidth(64),
    },
    tabbarText:{
        fontSize:SceneUtils.setSpText(17),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(18),
        marginTop:SceneUtils.autoHeight(6),
    },
    downView:{
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(481),
    },
    marginTopView:{
        width:SceneUtils.autoWidth(385),
        height:SceneUtils.autoHeight(13)
    },
    informationView:{
        marginTop:SceneUtils.autoHeight(1),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(54.5),
        justifyContent:'center',
        alignItems:'center'
    },
    informationBgView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(47.5),
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f5f7fa'
    },
    informationLeftView:{
        marginLeft:SceneUtils.autoWidth(4.5),
        flexDirection:'row',
    },
    icon:{
        width:SceneUtils.autoWidth(30.5),
        height:SceneUtils.autoWidth(30.5),
    },
    textView:{
        justifyContent:'center',
        marginLeft:SceneUtils.autoWidth(4),
    },
    titleText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    desText:{
        marginTop:SceneUtils.autoHeight(4),
        fontSize:SceneUtils.setSpText(12),
        color:'#808080',
    },
    timeText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(12),
        color:'#333333',
        top:SceneUtils.autoHeight(10),
        right:SceneUtils.autoWidth(4.5),
    },



    bg:{
        position:'absolute',
        width:SceneUtils.screenWidth,
        height:SceneUtils.screenHeight,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.8)',
    },
    bgText:{
        fontSize:40,
        color:'white'
    }
});