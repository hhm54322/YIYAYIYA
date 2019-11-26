'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import SwitchMode from '../../component/popup/SwitchMode';
import DataUtil from '../../utils/DataUtil';

export default class MineView extends Component{
    constructor(props) {
        super(props);
        this.state={
            refresh:false
        }
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
    //信息按钮点击事件
    onTouchMessage(){
        const { navigate } = this.props.navigation;
        navigate('InformationView');
    }
    //宝宝按钮点击事件
    onTouchBaby(){
        const { navigate } = this.props.navigation;
        SwitchMode.show(0,()=>{
            navigate('BabyMain');
        })
    }
    //问题按钮点击事件
    onTouchQuestion(){
        console.log('onTouchQuestion');
    }
    //查看特权按钮点击事件
    onTouchPrivileges(){
        const { navigate } = this.props.navigation;
        navigate('PrivilegeView');
    }
    //个人信息点击事件
    onTouchPersonInfo(){
        const { navigate } = this.props.navigation;
        navigate('PersonInfoView',{ refreshFun: ()=>{
            this.refresh();
        }});
    }
    refresh(){
        this.setState({
            refresh:!this.state.refresh
        })
    }
    //宝宝管理模式点击事件
    onTouchBabyModal(){
        const { navigate } = this.props.navigation;
        navigate('BabyModalView');
    }
    //宝宝信息点击事件
    onTouchBabyInfo(){
        const { navigate } = this.props.navigation;
        navigate('BabyInfoView');
    }
    //购物车点击事件
    onTouchShoppingCar(){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:'http://www.baidu.com'});
    }
    //我的订单点击事件
    onTouchMyOrder(){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:'http://www.baidu.com'});
    }
    //优惠券点击事件
    onTouchCoupon(){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:'http://www.baidu.com'});
    }
    //通用设置点击事件
    onTouchSetup(){
        console.log('onTouchSetup');
        const { navigate } = this.props.navigation;
        navigate('SettingView');
    }
    //显示顶层按钮和标题
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/navigation.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMessage();
                    }}>
                    <Image source = {require('../../images/message.png')} style = {styles.messageImg}/>
                </TouchableWithoutFeedback>
                <Text style={styles.titleText}>我的</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBaby();
                    }}>
                    <Image source = {require('../../images/baby.png')} style = {styles.babyImg}/>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示我的个人面板
    showMinePanel(){
        let infoData = DataUtil.getinstance().getInfo();
        let vipCredit = [0,100,600,1800,3600,6000];
        let currentLvVipCredit = vipCredit[infoData.memberLevelId];
        let nextLvVipCredit = infoData.memberLevelId < 5 ? vipCredit[infoData.memberLevelId + 1] : currentLvVipCredit;
        let vipStateStr = infoData.memberState == 0 ? '未激活' : '已激活';
        //vip当前红点位置计算公式：a方+b方=c方，即先计算两条边的长度，最后求得高的值
        //left：起始点位（36.5）+ 底边长 - 红点半径
        //top：起始点位（199） - 高度（Math.sqrt(Math.pow(斜边长,2) - Math.pow(底边,2))）- 红点半径
        //底边长度
        let bottomLine = 278 / 5 * /*vip等级*/infoData.memberLevelId + (/*当前vip积分*/infoData.memberGrowRate / (/*下一级vip所需积分*/nextLvVipCredit - /*当前等级vip所需积分*/currentLvVipCredit) * (278 / 5));
        //斜边长度
        let hypotenuse = 283.5 / 5 * /*vip等级*/infoData.memberLevelId + (/*当前vip积分*/infoData.memberGrowRate / (/*下一级vip所需积分*/nextLvVipCredit - /*当前等级vip所需积分*/currentLvVipCredit) * (283.5 / 5));
        let pointTop = SceneUtils.autoHeight(199 - Math.sqrt(Math.pow(hypotenuse,2) - Math.pow(bottomLine,2)) - 3);
        let pointLeft = SceneUtils.autoWidth(36.5 + bottomLine - 3);
        let headIconSmallTop = pointTop - SceneUtils.autoHeight(24 + 8.5 - 3);
        let headIconSmallLeft = pointLeft - SceneUtils.autoWidth(12 - 3);
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchPrivileges();
                }}>
                <ImageBackground source = {require('./img/rectangle1.png')} style={styles.panelBg}>
                    <Image source = {infoData.headshot == null || infoData.headshot == '' ? {uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'} : {uri:infoData.headshot}} style={styles.headIcon}></Image>
                    {/* <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchQuestion();
                        }}>
                        <Image source = {require('../../images/question.png')} style={styles.questionImg}></Image>
                    </TouchableWithoutFeedback> */}
                    <Text style={styles.userNameText}>{infoData.nickname}</Text>
                    <Text style={styles.vipEndTimeText}>{infoData.memberDeadline == null ? '' : 'VIP有效期限：' + infoData.memberDeadline}</Text>
                    <Text style={styles.growthValueText}>{infoData.memberGrowRate}</Text>
                    <Text style={styles.growthText}>成长值</Text>
                    <View style={styles.greyLineShort}></View>
                    <Text style={styles.couponValueText}>0</Text>
                    <Text style={styles.couponText}>优惠券</Text>
                    <View style={styles.greyLineLong}></View>
                    {/* <Image source = {require('../../images/question.png')} style={styles.vipIcon}></Image> */}
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPrivileges();
                        }}>
                        <View style={styles.privilegesView}>
                            <Text style={styles.privilegesText}>查看特权</Text>
                            <Image source = {require('../../images/arrow.png')} style={styles.privilegesImg}></Image>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.vipValueText0}>{vipCredit[0]}</Text>
                    <Text style={styles.vipValueText1}>{vipCredit[1]}</Text>
                    <Text style={styles.vipValueText2}>{vipCredit[2]}</Text>
                    <Text style={styles.vipValueText3}>{vipCredit[3]}</Text>
                    <Text style={styles.vipValueText4}>{vipCredit[4]}</Text>
                    <Text style={styles.vipValueText5}>{vipCredit[5]}</Text>
                    <View style={[styles.cylinder1,infoData.memberLevelId == 1 ? {backgroundColor:'#5bdeb4'} : {backgroundColor:'#b2b2b2'}]}></View>
                    <View style={[styles.cylinder2,infoData.memberLevelId == 2 ? {backgroundColor:'#5bdeb4'} : {backgroundColor:'#b2b2b2'}]}></View>
                    <View style={[styles.cylinder3,infoData.memberLevelId == 3 ? {backgroundColor:'#5bdeb4'} : {backgroundColor:'#b2b2b2'}]}></View>
                    <View style={[styles.cylinder4,infoData.memberLevelId == 4 ? {backgroundColor:'#5bdeb4'} : {backgroundColor:'#b2b2b2'}]}></View>
                    <View style={[styles.cylinder5,infoData.memberLevelId == 5 ? {backgroundColor:'#5bdeb4'} : {backgroundColor:'#b2b2b2'}]}></View>
                    <Text style={[styles.vipLvText0,infoData.memberLevelId == 0 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 0</Text>
                    <Text style={[styles.vipLvText1,infoData.memberLevelId == 1 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 1</Text>
                    <Text style={[styles.vipLvText2,infoData.memberLevelId == 2 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 2</Text>
                    <Text style={[styles.vipLvText3,infoData.memberLevelId == 3 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 3</Text>
                    <Text style={[styles.vipLvText4,infoData.memberLevelId == 4 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 4</Text>
                    <Text style={[styles.vipLvText5,infoData.memberLevelId == 5 ? {color:'#5bdeb4'} : {color:'#b2b2b2'}]}>VIP 5</Text>
                    
                    <View style={[styles.vipPoint,{top:pointTop,left:pointLeft}]}></View>
                    <Image source = {infoData.headshot == null || infoData.headshot == '' ? {uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'} : {uri:infoData.headshot}}
                         style={[styles.headIconSmall,{top:headIconSmallTop,left:headIconSmallLeft}]}></Image>

                    <View style={styles.nextLvUpView}>
                        <Text style={styles.nextLvUpDesText}>{infoData.memberLevelId < 5 ? vipStateStr + '，距离下一级VIP' + (infoData.memberLevelId + 1) + '还差': vipStateStr}</Text>
                        <Text style={styles.nextLvUpValueText}>{infoData.memberLevelId < 5 ? (nextLvVipCredit - infoData.memberGrowRate) : ''}</Text>
                        <Text style={styles.nextLvUpDesText}>{infoData.memberLevelId < 5 ? '成长值' : ''}</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchPrivileges();
                        }}>
                        <View style={styles.activatedView}>
                            <Text style={styles.activatedText}>激活/续费特权</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
    //显示个人信息
    showPersonInfoView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchPersonInfo();
                }}>
                <View style={[styles.otherView,{marginTop:SceneUtils.autoHeight(24),borderTopWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/myinfromation.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView1}>
                        <Text style={styles.otherText}>个人信息</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示宝宝管理模式
    showBabyModalView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchBabyModal();
                }}>
                <View style={[styles.otherView,{borderBottomWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/babysister.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView2}>
                        <Text style={styles.otherText}>宝宝管理模式</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示宝宝信息
    showBabyInfoView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchBabyInfo();
                }}>
                <View style={[styles.otherView,{marginTop:SceneUtils.autoHeight(16),borderTopWidth: SceneUtils.autoHeight(0.5),borderBottomWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/thinline.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView1}>
                        <Text style={styles.otherText}>宝宝信息</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示购物车
    showShoppingCarView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchShoppingCar();
                }}>
                <View style={[styles.otherView,{marginTop:SceneUtils.autoHeight(16),borderTopWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/shoppingcart.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView1}>
                        <Text style={styles.otherText}>购物车</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示我的订单
    showMyOrderView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchMyOrder();
                }}>
                <View style={styles.otherView}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/list.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView2}>
                        <Text style={styles.otherText}>我的订单</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示优惠券
    showCouponView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchCoupon();
                }}>
                <View style={[styles.otherView,{borderBottomWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/coupon.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView2}>
                        <Text style={styles.otherText}>优惠券</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示设置
    showSetupView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchSetup();
                }}>
                <View style={[styles.otherView,{marginTop:SceneUtils.autoHeight(16),borderTopWidth: SceneUtils.autoHeight(0.5),borderBottomWidth: SceneUtils.autoHeight(0.5)}]}>
                    <View style={styles.leftView}>
                        <Image source = {require('./img/setting.png')} style={styles.otherImg}></Image>
                    </View>
                    <View style={styles.rightView1}>
                        <Text style={styles.otherText}>通用设置</Text>
                        <Image source = {require('../../images/arrow.png')} style={styles.arrowImg}></Image>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                <View style={styles.scrollView}>
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                    >
                        {this.showMinePanel()}
                        {this.showPersonInfoView()}
                        {this.showBabyModalView()}
                        {this.showBabyInfoView()}
                        {this.showShoppingCarView()}
                        {this.showMyOrderView()}
                        {this.showCouponView()}
                        {this.showSetupView()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop:SceneUtils.autoHeight(20),
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
    scrollView:{
        height:SceneUtils.autoHeight(553)
    },
    messageImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginLeft:SceneUtils.autoWidth(12)
    },
    babyImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginRight:SceneUtils.autoWidth(12)
    },
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    },
    panelBg:{
        alignSelf:'center',
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(291),
    },
    headIcon:{
        width:SceneUtils.autoWidth(70),
        height:SceneUtils.autoWidth(70),
        position:'absolute',
        top:SceneUtils.autoHeight(12),
        left:SceneUtils.autoWidth(15),
        borderRadius:SceneUtils.autoWidth(35)
    },
    questionImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        position:'absolute',
        top:SceneUtils.autoWidth(4),
        right:SceneUtils.autoWidth(4),
    },
    userNameText:{
        position:'absolute',
        top:SceneUtils.autoHeight(25),
        left:SceneUtils.autoWidth(97),
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    vipEndTimeText:{
        position:'absolute',
        top:SceneUtils.autoHeight(53),
        left:SceneUtils.autoWidth(97),
        fontSize:SceneUtils.setSpText(11),
        color:'#4c4c4c',
    },
    growthValueText:{
        position:'absolute',
        width:SceneUtils.autoWidth(36),
        top:SceneUtils.autoHeight(18),
        right:SceneUtils.autoWidth(42),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        textAlign:'center'
    },
    growthText:{
        position:'absolute',
        width:SceneUtils.autoWidth(36),
        top:SceneUtils.autoHeight(34),
        right:SceneUtils.autoWidth(42),
        fontSize:SceneUtils.setSpText(10),
        color:'#4c4c4c',
        textAlign:'center'
    },
    greyLineShort:{
        position:'absolute',
        width:SceneUtils.autoWidth(30),
        height:SceneUtils.autoHeight(0.5),
        backgroundColor:'#cccccc',
        top:SceneUtils.autoHeight(48),
        right:SceneUtils.autoWidth(45)
    },
    couponValueText:{
        position:'absolute',
        width:SceneUtils.autoWidth(36),
        top:SceneUtils.autoHeight(50),
        right:SceneUtils.autoWidth(42),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        textAlign:'center'
    },
    couponText:{
        position:'absolute',
        width:SceneUtils.autoWidth(36),
        top:SceneUtils.autoHeight(66),
        right:SceneUtils.autoWidth(42),
        fontSize:SceneUtils.setSpText(10),
        color:'#4c4c4c',
        textAlign:'center'
    },
    greyLineLong:{
        position:'absolute',
        width:SceneUtils.autoWidth(321),
        height:SceneUtils.autoHeight(0.5),
        backgroundColor:'#cccccc',
        top:SceneUtils.autoHeight(94),
        left:SceneUtils.autoWidth(15)
    },
    vipIcon:{
        position:'absolute',
        width:SceneUtils.autoWidth(50),
        height:SceneUtils.autoWidth(50),
        top:SceneUtils.autoHeight(106.5),
        left:SceneUtils.autoWidth(15)   
    },
    privilegesView:{
        position:'absolute',
        top:SceneUtils.autoHeight(106.5),
        left:SceneUtils.autoWidth(265),
        flexDirection:'row',
        alignItems:'center',
    },
    privilegesText:{
        fontSize:SceneUtils.setSpText(12),
        color:'#333333',
    },
    privilegesImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        marginLeft:SceneUtils.autoWidth(4)
    },
    nextLvUpView:{
        position:'absolute',
        height:SceneUtils.autoHeight(16),
        bottom:SceneUtils.autoHeight(38),
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
    },
    nextLvUpDesText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#333333',
        marginTop:SceneUtils.autoHeight(3)
    },
    nextLvUpValueText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#f2245f',
    },
    activatedView:{
        position:'absolute',
        width:SceneUtils.autoWidth(346),
        height:SceneUtils.autoHeight(29),
        left:SceneUtils.autoWidth(2.5),
        bottom:2,
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
    },
    activatedText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa',
    },
    vipValueText0:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4),
        left:SceneUtils.autoWidth(36.5),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    vipValueText1:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5,2) - Math.pow(278 / 5,2))),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 - 12),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    vipValueText2:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 2,2) - Math.pow(278 / 5 * 2,2))),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 2 - 12),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    vipValueText3:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 3,2) - Math.pow(278 / 5 * 3,2))),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 3 - 15),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    vipValueText4:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 4,2) - Math.pow(278 / 5 * 4,2))),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 4 - 15),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    vipValueText5:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5,2) - Math.pow(278,2))),
        left:SceneUtils.autoWidth(36.5 + 278 - 15),
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2',
    },
    cylinder1:{
        position:'absolute',
        width:SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(4 + Math.sqrt(Math.pow(283.5 / 5,2) - Math.pow(278 / 5,2))),
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5,2) - Math.pow(278 / 5,2)) + 12 + 4),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 - 6),
        borderRadius:SceneUtils.autoWidth(5),
    },
    cylinder2:{
        position:'absolute',
        width:SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(4 + Math.sqrt(Math.pow(283.5 / 5 * 2,2) - Math.pow(278 / 5 * 2,2))),
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 2,2) - Math.pow(278 / 5 * 2,2)) + 12 + 4),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 2 - 6),
        borderRadius:SceneUtils.autoWidth(5),
    },
    cylinder3:{
        position:'absolute',
        width:SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(4 + Math.sqrt(Math.pow(283.5 / 5 * 3,2) - Math.pow(278 / 5 * 3,2))),
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 3,2) - Math.pow(278 / 5 * 3,2)) + 12 + 4),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 3 - 6),
        borderRadius:SceneUtils.autoWidth(5),
    },
    cylinder4:{
        position:'absolute',
        width:SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(4 + Math.sqrt(Math.pow(283.5 / 5 * 4,2) - Math.pow(278 / 5 * 4,2))),
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5 / 5 * 4,2) - Math.pow(278 / 5 * 4,2)) + 12 + 4),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 4 - 6),
        borderRadius:SceneUtils.autoWidth(5),
    },
    cylinder5:{
        position:'absolute',
        width:SceneUtils.autoWidth(12),
        height:SceneUtils.autoHeight(4 + Math.sqrt(Math.pow(283.5,2) - Math.pow(278,2))),
        top:SceneUtils.autoHeight(199 + 4 - Math.sqrt(Math.pow(283.5,2) - Math.pow(278,2)) + 12 + 4),
        left:SceneUtils.autoWidth(36.5 + 278 - 6),
        borderRadius:SceneUtils.autoWidth(5),
    },
    vipLvText0:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 - 12),
        fontSize:SceneUtils.setSpText(10),
    },
    vipLvText1:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 - 13),
        fontSize:SceneUtils.setSpText(10),
    },
    vipLvText2:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 2 - 13),
        fontSize:SceneUtils.setSpText(10),
    },
    vipLvText3:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 3 - 13),
        fontSize:SceneUtils.setSpText(10),
    },
    vipLvText4:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 + 278 / 5 * 4 - 13),
        fontSize:SceneUtils.setSpText(10),
    },
    vipLvText5:{
        position:'absolute',
        top:SceneUtils.autoHeight(199 + 4 + 12 + 9),
        left:SceneUtils.autoWidth(36.5 + 278 - 13),
        fontSize:SceneUtils.setSpText(10),
    },
    vipPoint:{
        position:'absolute',
        width:SceneUtils.autoWidth(6),
        height:SceneUtils.autoWidth(6),
        backgroundColor:'#5bdeb4',
        borderRadius:SceneUtils.autoWidth(3)
    },
    headIconSmall:{
        position:'absolute',
        width:SceneUtils.autoWidth(24),
        height:SceneUtils.autoWidth(24),
        borderRadius:SceneUtils.autoWidth(12)
    },
    scrollChildImg:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(40),
        resizeMode:'stretch',
        backgroundColor:'#ff0000'
    },
    otherView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(40),
        borderColor:'#cccccc',
        flexDirection:'row',
        backgroundColor:'#f5f7fa'
    },
    leftView:{
        width:SceneUtils.autoWidth(44),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center'
    },
    rightView1:{
        width:SceneUtils.screenWidth - SceneUtils.autoWidth(44),
        height:SceneUtils.autoHeight(40),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rightView2:{
        width:SceneUtils.screenWidth - SceneUtils.autoWidth(44),
        height:SceneUtils.autoHeight(40),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    otherImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    otherText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333'
    },
    arrowImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        marginRight:SceneUtils.autoWidth(12)
    },

});