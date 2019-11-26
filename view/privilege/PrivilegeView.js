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

export default class PrivilegeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:0,
            vipLv:1
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
        console.log('onTouchBack');
        this.props.navigation.goBack();
    }
    //套餐点击事件
    onTouchPackage(index){
        if(index != this.state.selectedIndex){
            this.setState({
                selectedIndex:index
            })
        }
    }
    //充值按钮点击事件
    onTouchCharge(){
        console.log('onTouchCharge');
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
                <Text style={styles.titleText}>特权查看</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示可购买的套餐内容
    showPackageView(){
        return(
            <View style={styles.packageView}>
                {this.showPackage(0,'元旦特惠','6个月','99','16.5元/月','300成长值')}
                {this.showPackage(1,'推荐','12个月','188','15.7元/月','1200成长值')}
                {this.showPackage(2,'元旦特惠','24个月','298','12.4元/月','4800成长值')}
            </View>
        )
    }
    //具体套餐内容
    showPackage(index,title,time,money,moneyDes,upValue){
        return(
            <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchPackage(index);
                    }}>
                <View style={styles.package}>
                    <View style={index == this.state.selectedIndex ? [styles.packageOtherView,styles.packageOtherViewSelected] : [styles.packageOtherView,styles.packageOtherViewUnSelected]}>
                        <Text style={styles.timeText}>{time}</Text>
                        <View style={styles.coinView}>
                            <Text style={styles.coinSymbolText}>¥</Text>
                            <Text style={styles.coinText}>{money}</Text>
                        </View>
                        <Text style={styles.coinDesText}>{moneyDes}</Text>
                        <Text style={styles.upValueText}>{upValue}</Text>
                    </View>
                    <View style={styles.packageTitleView}>
                        <Text style={styles.packageTitleText}>{title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示特权描述列表
    showPrivilegeDesView(){
        return(
            <ImageBackground source = {require('./img/rectangle1.png')} style={styles.privilegeDesView}>
                {this.showPrivilegeDesRowView(0,'等级特权',[])}
                {this.showPrivilegeDesRowView(1,'入会礼品',[1,1,1,1,1,1])}
                {this.showPrivilegeDesRowView(2,'特价商品',[0,1,1,1,1,1])}
                {this.showPrivilegeDesRowView(3,'海选报名',[0,0,1,1,1,1])}
                {this.showPrivilegeDesRowView(4,'专属\n优惠券',[0,0,0,1,1,1])}
                {this.showPrivilegeDesRowView(5,'专属\n营销活动',[0,0,0,0,1,1])}
                {this.showPrivilegeDesRowView(6,'外景模特海选选拔',[0,0,0,0,0,1])}
            </ImageBackground>
        )
    }
    //显示特权描述列表横向
    showPrivilegeDesRowView(index,title,privilege){
        return(
            <View style={index == 0 ? styles.privilegeDesRowView : styles.privilegeDesRowView1}>
                <View style={styles.rowDesView}>
                    <Text style={index == 0 ? styles.rowDesText : styles.rowDesText1}>{title}</Text> 
                    {index == 0 ? null : <Image source = {require('./img/question2.png')} style = {styles.rowDesImg}/>}
                </View>
                {this.vipPrivilege(index,0,privilege[0])}
                {this.vipPrivilege(index,1,privilege[1])}
                {this.vipPrivilege(index,2,privilege[2])}
                {this.vipPrivilege(index,3,privilege[3])}
                {this.vipPrivilege(index,4,privilege[4])}
                {this.vipPrivilege(index,5,privilege[5])}
            </View>
        )
    }
    //显示对应的vip特权状态
    vipPrivilege(index,lv,privilege){
        return(
            <View style={lv == this.state.vipLv ? [styles.vipLvView,{backgroundColor:'#f0fcf8'}] : [styles.vipLvView,{backgroundColor:'#f5f7fa'}]}>
                {index == 0 ? <Text style={lv == this.state.vipLv ? styles.vipLvCurText : styles.vipLvText}>Lv{lv}</Text> 
                            : privilege == 1 ? <Image source = {lv == this.state.vipLv ? require('./img/tick.png') : require('./img/tick2.png')} style = {styles.img}/> : null}
            </View>
        )
    }
    //显示升级宝典
    showLvBookView(){
        return(
            <ImageBackground source = {require('./img/rectangle2.png')} style={styles.lvBookView}>
                <View style={styles.lvBookBg}>
                    <Text style={styles.lvBookTitleText}>升级宝典</Text>
                    {this.showLvBookChildView(0,'商城任意消费可获得成长值')}
                    {this.showLvBookChildView(1,'商城任意消费可获得成长值')}
                    {this.showLvBookChildView(2,'商城任意消费可获得成长值')}
                </View>
            </ImageBackground>
        )
    }
    //显示升级宝典单项内容
    showLvBookChildView(index,des){
        return(
            <View style={styles.lvBookChildView}>
                <Image source = {require('./img/coins.png')} style = {styles.img}/>
                <View style={index == 0 ? styles.childRightView : styles.childRightView1}>
                    <Text style={styles.lvBookChildDesText}>{des}</Text>
                    <View style={styles.lvBookChildBtnView}>
                        <Text style={styles.lvBookChildBtnText}>开通</Text>
                    </View>
                </View>
            </View>
        )
    }
    //显示下方充值按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchCharge();
                }}>
                <View style={styles.chargeView}>
                        <Text style={styles.chargeText}>立即开通/续费</Text>
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
                        {this.showPackageView()}
                        {this.showPrivilegeDesView()}
                        {/* {this.showLvBookView()} */}
                    </ScrollView>
                </View>
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
        backgroundColor:'#f5f7fa'
    },
    topView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    scrollView:{
        height:SceneUtils.autoHeight(559)
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
    packageView:{
        marginTop:SceneUtils.autoHeight(8),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(141),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    package:{
        width:SceneUtils.autoWidth(92),
        height:SceneUtils.autoHeight(125),
    },
    packageTitleView:{
        width:SceneUtils.autoWidth(52),
        height:SceneUtils.autoHeight(16),
        position:'absolute',
        top:0,
        left:SceneUtils.autoWidth(40),
        borderRadius:SceneUtils.autoWidth(8),
        backgroundColor:'#dc1802',
        justifyContent:'center',
        alignItems:'center',
    },
    packageTitleText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#f5f7fa'
    },
    packageOtherView:{
        width:SceneUtils.autoWidth(92),
        height:SceneUtils.autoHeight(117),
        position:'absolute',
        top:SceneUtils.autoHeight(8),
        left:0,
        borderRadius:SceneUtils.autoWidth(10),
        alignItems:'center',
    },
    packageOtherViewSelected:{
        backgroundColor:'#f0fcf8',
        borderWidth: SceneUtils.autoHeight(1),
        borderColor:'#5bdeb4',
    },
    packageOtherViewUnSelected:{
        borderWidth: SceneUtils.autoHeight(1),
        borderColor:'#cccccc',
    },
    timeText:{
        marginTop:SceneUtils.autoHeight(20),
        fontSize:SceneUtils.setSpText(15),
        lineHeight:SceneUtils.autoHeight(16),
        color:'#333333',
    },
    coinView:{
        height:SceneUtils.autoHeight(34),
        flexDirection:'row',
    },
    coinSymbolText:{
        fontSize:SceneUtils.setSpText(24),
        lineHeight:SceneUtils.autoHeight(34),
        color:'#e03879',
        alignSelf:'flex-end',
    },
    coinText:{
        fontSize:SceneUtils.setSpText(34),
        lineHeight:SceneUtils.autoHeight(34),
        color:'#e03879'
    },
    coinDesText:{
        marginTop:SceneUtils.autoHeight(-4),
        fontSize:SceneUtils.setSpText(11),
        lineHeight:SceneUtils.autoHeight(12),
        color:'#b2b2b2'
    },
    upValueText:{
        fontSize:SceneUtils.setSpText(11),
        lineHeight:SceneUtils.autoHeight(12),
        color:'#dc1802',
        position:'absolute',
        bottom:SceneUtils.autoHeight(12),
    },
    privilegeDesView:{
        marginTop:SceneUtils.autoHeight(12.5),
        width:SceneUtils.autoWidth(357),
        height:SceneUtils.autoHeight(283),
        alignItems:'center'
    },
    privilegeDesRowView:{
        marginTop:SceneUtils.autoHeight(3.5),
        width:SceneUtils.autoWidth(350),
        height:SceneUtils.autoHeight(39),
        backgroundColor:'#f5f7fa',
        flexDirection:'row'
    },
    privilegeDesRowView1:{
        width:SceneUtils.autoWidth(350),
        height:SceneUtils.autoHeight(39.5),
        backgroundColor:'#f5f7fa',
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        flexDirection:'row'
    },
    rowDesView:{
        width:SceneUtils.autoWidth(92),
        height:SceneUtils.autoHeight(39),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    rowDesText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    rowDesText1:{
        fontSize:SceneUtils.setSpText(11),
        color:'#808080',
        textAlign:'center',
        width:SceneUtils.autoWidth(50)
    },
    rowDesImg:{
        marginLeft:SceneUtils.autoWidth(8),
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    vipLvView:{
        width:SceneUtils.autoWidth(43),
        borderLeftWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        justifyContent:'center',
        alignItems:'center',
    },
    vipLvText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#b2b2b2',
    },
    vipLvCurText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#5bdeb4',
    },
    img:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        alignSelf:'center'
    },
    lvBookView:{
        marginTop:SceneUtils.autoHeight(9),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(167),
        alignItems:'center'
    },
    lvBookBg:{
        marginTop:SceneUtils.autoHeight(3.5),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(160),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
    },
    lvBookTitleText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333',
        marginLeft:SceneUtils.autoWidth(9),
        marginTop:SceneUtils.autoHeight(12),
        marginBottom:SceneUtils.autoHeight(10),
    },
    lvBookChildView:{
        marginLeft:SceneUtils.autoWidth(24),
        width:SceneUtils.autoWidth(303),
        height:SceneUtils.autoHeight(40.5),
        flexDirection:'row',
    },
    childRightView:{
        marginLeft:SceneUtils.autoWidth(8),
        width:SceneUtils.autoWidth(275),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    childRightView1:{
        marginLeft:SceneUtils.autoWidth(8),
        width:SceneUtils.autoWidth(275),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    lvBookChildDesText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    lvBookChildBtnView:{
        width:SceneUtils.autoWidth(47.5),
        height:SceneUtils.autoHeight(24),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(4),
    },
    lvBookChildBtnText:{
        fontSize:SceneUtils.setSpText(12),
        color:'#f5f7fa',
    },
    chargeView:{
        position:'absolute',
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        bottom:0,
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    chargeText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});