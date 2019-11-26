'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';

export default class JoinFamilyNextView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage:0,
            relationData:[-1,-1,-1]
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
    //确认加入按钮点击事件
    onTouchConfirm(){
        console.log('onTouchConfirm');
    }
    //手动滑动分页
    onAnimationEnd(e) {
        let offsetX = e.nativeEvent.contentOffset.x;
        let pageIndex = Math.floor(offsetX / SceneUtils.screenWidth);
        //更改状态机
        this.setState({ currentPage: pageIndex });
    }
    //关系选择按钮点击事件
    onTouchInvites(page,relation){
        var _relationData = this.state.relationData;
        if(_relationData[page] != relation){
            _relationData[page] = relation;
            this.setState({
                relationData : _relationData
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
                <Text style={styles.titleText}>加入家庭</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间信息内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <Text style={styles.invitationCodeText}>您输入的宝宝邀请码：{this.props.navigation.state.params.code}</Text>
                <View style={styles.scrollView}>
                    <ScrollView showsHorizontalScrollIndicator = {false}
                        horizontal = {true}
                        pagingEnabled = {true}
                        onMomentumScrollEnd={(e)=>{this.onAnimationEnd(e)}}>
                        {this.renderScrollChildView()}
                    </ScrollView>
                </View>
                <View style={styles.indicatorView}>
                    {this.renderAllIndicator()}
                </View>
            </View>
        )
    }
    //宝宝信息横向滚动列表页面指针
    renderAllIndicator() {
        let indicatorArr = [];
        let length = 3;
        for (let i = 0; i < length; i++) {
            indicatorArr.push(
                <View key={i} style={styles.indicatorBallView}>
                    <View style={i == this.state.currentPage ? styles.indicatorBallCur : styles.indicatorBall}/>
                </View>
            );
        }
        return indicatorArr;
    }
    //宝宝信息横向滚动列表
    renderScrollChildView(){
        var allChild = [];
        var length = 3;
        for(var i = 0;i < length;i++){
            allChild.push(
                <View key={i} style={styles.scrollChildView}>
                    {this.showBabyInfoView()}
                    {this.showRelationInfoView(i)}
                </View>
            );
        }
        return allChild;
    }
    //显示宝宝信息面板
    showBabyInfoView(){
        return(
            <ImageBackground source = {require('../../images/rectangle2.png')} style={styles.babyInfoView}>
                <View style={styles.bgbyInfoBgView}>
                    <Image source = {require('../../images/babyIcon.png')} style = {styles.babyHeadImg}/>
                    <Image source = {require('../../images/babyIcon2.png')} style = {styles.babyIcon}/>
                    <Text style={styles.babySexText}>儿子</Text>
                    <Text style={styles.babyNameText}>宝宝姓名 : {'汪汪'}</Text>
                    <Text style={styles.babyAgeText}>宝宝年龄 : {'4'}岁</Text>
                    <Text style={styles.babyBirthdayText}>出生日期 : {'2015-01-08'}</Text>
                </View>
            </ImageBackground>
        )
    }
    //显示与您的关系信息面板
    showRelationInfoView(index){
        return(
            <ImageBackground source = {require('../../images/rectangle1.png')} style={styles.relationInfoView}>
                <View style={styles.relationInfoBgView}>
                    <View style={styles.relationInfoTitleView}>
                        <Text style={styles.relationTitleText}>与您的关系</Text>
                    </View>
                    <View style={styles.relationScrollView}>
                        <ScrollView showsVerticalScrollIndicator = {false}>
                            {this.showInviteMember(index)}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    //显示可选择的关系列表
    showInviteMember(page){
        var allChild = [];
        var invites = [{relation:6,des:'外公'},{relation:7,des:'叔叔'},{relation:8,des:'阿姨'},{relation:9,des:'舅妈'},{relation:10,des:'舅舅'},{relation:11,des:'大伯'},{relation:12,des:'哥哥'},{relation:13,des:'姐姐'},{relation:14,des:'弟弟'}]
        var length = invites.length;
        var index = 0;
        for(var i = 0;i < length;i+=2){
            allChild.push(
                <View key={index} style={[styles.invitesScrollChildView,{marginTop:index == 0 ? SceneUtils.autoHeight(24) : SceneUtils.autoHeight(16)}]}>
                    {this.invitesInfo(page,invites[i].des)}
                    {i+1 < length ? this.invitesInfo(page,invites[i+1].des) : null}
                </View>
            );
            index++;
        }
        return allChild;
    }
    //可邀请成员信息
    invitesInfo(page,relation){
        return(
            <TouchableWithoutFeedback
                onPress={
                    this.onTouchInvites.bind(this,page,relation)
                }>
                <View style={this.state.relationData[page] == relation ? styles.invitesSelectedView : styles.invitesView}>
                    <Text style={this.state.relationData[page] == relation ? styles.relationSelectedText : styles.relationText}>{relation}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示下方下一步按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchConfirm();
                }}>
                <View style={styles.downView}>
                    <Text style={styles.confirmText}>确认加入</Text>
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
        height:SceneUtils.autoHeight(559),
        alignItems:'center'
    },
    invitationCodeText:{
        marginTop:SceneUtils.autoHeight(16),
        fontSize:SceneUtils.setSpText(15),
        lineHeight:SceneUtils.autoHeight(16),
        color:'#333333'
    },
    scrollView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(499),
    },
    scrollChildView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(499),
        alignItems:'center',
    },
    babyInfoView:{
        marginTop:SceneUtils.autoHeight(32),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(93),
        justifyContent:'center',
        alignItems:'center'
    },
    bgbyInfoBgView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(86),
    },
    babyHeadImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(82.5),
        height:SceneUtils.autoWidth(82.5),
        left:SceneUtils.autoWidth(28),
        bottom:SceneUtils.autoHeight(25)
    },
    babyIcon:{
        position:'absolute',
        width:SceneUtils.autoWidth(110.5),
        height:SceneUtils.autoWidth(28),
        right:0,
        top:-SceneUtils.autoWidth(28)
    },
    babySexText:{
        position:'absolute',
        width:SceneUtils.autoWidth(82.5),
        top:SceneUtils.autoHeight(63 + 2),
        left:SceneUtils.autoWidth(28),
        fontSize:SceneUtils.setSpText(12),
        lineHeight:SceneUtils.autoHeight(13),
        textAlign:'center',
        color:'#f5f7fa'
    },
    babyNameText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(13),
        color:'#f5f7fa',
        lineHeight:SceneUtils.autoHeight(14),
        top:SceneUtils.autoHeight(10),
        left:SceneUtils.autoWidth(150.5)
    },
    babyAgeText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(13),
        color:'#f5f7fa',
        lineHeight:SceneUtils.autoHeight(14),
        top:SceneUtils.autoHeight(36.5),
        left:SceneUtils.autoWidth(150.5)
    },
    babyBirthdayText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(13),
        color:'#f5f7fa',
        lineHeight:SceneUtils.autoHeight(14),
        top:SceneUtils.autoHeight(63),
        left:SceneUtils.autoWidth(150.5)
    },
    relationInfoView:{
        marginTop:SceneUtils.autoHeight(10),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(364),
        justifyContent:'center',
        alignItems:'center'
    },
    relationInfoBgView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(357),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
    },
    relationInfoTitleView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(40),
        backgroundColor:'#f0fcf8',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:SceneUtils.autoWidth(10),
        borderTopRightRadius:SceneUtils.autoWidth(10),
    },
    relationTitleText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333',
    },
    relationScrollView:{
        height:SceneUtils.autoHeight(317),
    },
    invitesScrollChildView:{
        width:SceneUtils.autoWidth(298),
        height:SceneUtils.autoHeight(32),
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center'
    },
    invitesView:{
        width:SceneUtils.autoWidth(125.5),
        height:SceneUtils.autoHeight(32),
        borderRadius:SceneUtils.autoWidth(9),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#b2b2b2',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    invitesSelectedView:{
        width:SceneUtils.autoWidth(125.5),
        height:SceneUtils.autoHeight(32),
        borderRadius:SceneUtils.autoWidth(9),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#5bdeb4',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f0fcf8'
    },
    relationText:{
        fontSize:SceneUtils.setSpText(16),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#b2b2b2',
        marginLeft:SceneUtils.autoWidth(4)
    },
    relationSelectedText:{
        fontSize:SceneUtils.setSpText(16),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#333333',
        marginLeft:SceneUtils.autoWidth(4)
    },
    indicatorView:{
        marginTop:SceneUtils.autoHeight(8.5),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(10),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    indicatorBallView:{
        width:SceneUtils.autoWidth(16),
        height:SceneUtils.autoWidth(8),
    },
    indicatorBallCur:{
        width:SceneUtils.autoWidth(8),
        height:SceneUtils.autoWidth(8),
        borderRadius:SceneUtils.autoWidth(4),
        backgroundColor:'#5bdeb4'
    },
    indicatorBall:{
        width:SceneUtils.autoWidth(8),
        height:SceneUtils.autoWidth(8),
        borderRadius:SceneUtils.autoWidth(4),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#b2b2b2',
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    confirmText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});