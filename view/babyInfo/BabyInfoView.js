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
import Picker from 'react-native-picker';

const relationData = ['爷爷','奶奶','外公','外婆','阿姨','姨夫','舅舅','舅妈','哥哥','姐姐','弟弟','妹妹','嫂嫂','妹夫','婶婶'];
export default class BabyInfoView extends Component{
    constructor(props) {
        super(props);
        this.state = {
             currentPage: 0,
             familys : [{relation:1,des:'爸爸',name:'家长姓名'},{relation:2,des:'妈妈',name:'家长姓名'},{relation:3,des:'奶奶',name:'家长姓名'},{relation:4,des:'爷爷',name:'家长姓名'},{relation:5,des:'外婆',name:'家长姓名'}]
        };
        this.isMaster = false;
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
    //更多按钮点击事件
    onTouchMore(){
        console.log('onTouchMore');
        // const { navigate } = this.props.navigation;
        // navigate('AddBabyView');
        const { navigate } = this.props.navigation;
        navigate('JoinFamilyView');
    }
    //添加宝宝按钮点击事件
    onTouchAddBaby(){
        console.log('onTouchAddBaby');
        const { navigate } = this.props.navigation;
        navigate('AddBabyView');
    }
    //加入家庭按钮点击事件
    onTouchJoinFamily(){
        console.log('onTouchJoinFamily');
    }
    //宝宝面板设置按钮点击事件
    onTouchBabySetting(){
        console.log('onTouchBabySetting');
        const { navigate } = this.props.navigation;
        navigate('BabyInfoReviseView');
    }
    //家庭圈面板设置按钮点击事件
    onTouchFamilySetting(){
        console.log('onTouchFamilySetting');
        const { navigate } = this.props.navigation;
        navigate('FamilyReviseView');
    }
    //家庭圈面板设置按钮点击事件(不是宝宝创建者，只可更改自己与宝宝的关系)
    onTouchFamilySetting1(){
        var crtRelation = this.state.familys[0].des;
        Picker.init({
            pickerTitleText:'关系选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtRelation],
            pickerBg:[255,255,255,1],
            pickerData: relationData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _familys = this.state.familys;
                _familys[0].des = pickedValue; 
                this.setState({
                    familys:_familys
                })
                //更改关系，等后续消息链条后实现
            }
        });
        Picker.show();
    }
    //邀请其他家庭成员点击事件
    onTouchInvites(){
        console.log('onTouchInvites');
    }
    //手动滑动分页
    onAnimationEnd(e) {
        let offsetX = e.nativeEvent.contentOffset.x;
        let pageIndex = Math.floor(offsetX / SceneUtils.screenWidth);
        //更改状态机
        this.setState({ currentPage: pageIndex });
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
                <Text style={styles.titleText}>宝宝信息</Text>
                {true ? 
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMore();
                    }}>
                    <Image source = {require('../../images/dots.png')} style = {styles.moreImg}/>
                </TouchableWithoutFeedback>
                : <View style={styles.backImg}></View>}
            </ImageBackground>
        )
    }
    //根据是否有宝宝，显示不同界面
    showOtherView(){
        if(true){
            return(
                <View style={styles.otherView}>
                    <Text style={styles.invitationCodeText}>宝宝邀请码：abc123</Text>
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
        }else{
            return(
                <View style={styles.otherView}>
                    {this.showAddBabyView()}
                    {this.showJoinFamilyView()}
                </View>
            )
        }   
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
                    {this.showFamilyInfoView()}
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
                    {this.isMaster ? <TouchableWithoutFeedback
                                        onPress ={()=>{
                                            this.onTouchBabySetting();
                                        }}>
                                            <Image source = {require('./img/setting2.png')} style = {styles.babyTopSettingImg}/>
                                        </TouchableWithoutFeedback>
                                    : null}
                    
                </View>
            </ImageBackground>
        )
    }
    //显示家庭圈信息面板
    showFamilyInfoView(){
        return(
            <ImageBackground source = {require('../../images/rectangle1.png')} style={styles.familyInfoView}>
                <View style={styles.familyInfoBgView}>
                    <View style={styles.familyInfoTitleView}>
                        <Text style={styles.familyInfoTitleText}>家庭圈</Text>
                        {this.isMaster  ?   <TouchableWithoutFeedback
                                                onPress ={()=>{
                                                    this.onTouchFamilySetting();
                                                }}>
                                                <Image source = {require('./img/setting1.png')} style = {styles.familyInfoTitleImg}/>
                                            </TouchableWithoutFeedback>
                                        :   
                                            <TouchableWithoutFeedback
                                                onPress ={()=>{
                                                    this.onTouchFamilySetting1();
                                                }}>
                                                <View style={styles.familyInfoTitleRightView}>
                                                    <Image source = {require('./img/setting1.png')} style = {styles.familyInfoTitleRightImg}/>
                                                    <Text style={styles.familyInfoTitleRightText}>修改关系</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                        }
                        
                    </View>
                    <View style={styles.familyScrollView}>
                        <ScrollView showsVerticalScrollIndicator = {false}>
                            {this.showFamilyMember()}
                            {this.showInviteMember()}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    //显示已经加入家庭圈的成员信息列表
    showFamilyMember(){
        var allChild = [];
        var familys = this.state.familys;
        var length = familys.length;
        var index = 0;
        for(var i = 0;i < length;i+=2){
            allChild.push(
                <View key={index} style={styles.familyScrollChildView}>
                    {this.familyInfo(0,familys[i].name,familys[i].des,true)}
                    {i+1 < length ? this.familyInfo(0,familys[i+1].name,familys[i+1].des,false) : null}
                </View>
            );
            index++;
        }
        return allChild;
    }
    //家庭圈成员信息
    familyInfo(id,name,relation,isLeft){
        return(
            <View style={isLeft ? styles.familyScrollChildLeftView : styles.familyScrollChildRightView}>
                <View style={styles.ballView}></View>
                <Text style={styles.relationText}>{name}-{relation}</Text>
            </View>
        )
    }
    //显示可邀请的成员信息列表
    showInviteMember(){
        var allChild = [];
        var invites = [{relation:6,des:'外公'},{relation:7,des:'叔叔'},{relation:8,des:'阿姨'},{relation:9,des:'舅妈'},{relation:10,des:'舅舅'},{relation:11,des:'大伯'},{relation:12,des:'哥哥'},{relation:13,des:'姐姐'},{relation:14,des:'弟弟'}]
        var length = invites.length;
        var index = 0;
        for(var i = 0;i < length;i+=2){
            allChild.push(
                <View key={index} style={[styles.invitesScrollChildView,{marginTop:index == 0 ? SceneUtils.autoHeight(24) : SceneUtils.autoHeight(16)}]}>
                    {this.invitesInfo(invites[i].des)}
                    {i+1 < length ? this.invitesInfo(invites[i+1].des) : null}
                </View>
            );
            index++;
        }
        return allChild;
    }
    //可邀请成员信息
    invitesInfo(relation){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchInvites();
                }}>
                <View style={styles.invitesView}>
                    <Text style={styles.relationText}>{relation}</Text>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示添加宝宝按钮
    showAddBabyView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchAddBaby();
                }}>
                <View style={styles.addBabyView}>
                    <Text style={styles.text}>添加宝宝</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示加入家庭按钮
    showJoinFamilyView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchJoinFamily();
                }}>
                <View style={styles.joinFamilyView}>
                    <Text style={styles.text}>加入家庭</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showOtherView()}
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
    moreImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginRight:SceneUtils.autoWidth(12)
    },
    otherView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(603),
        alignItems:'center',
    },
    addBabyView:{
        marginTop:SceneUtils.autoHeight(209.5),
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        borderRadius:SceneUtils.autoWidth(10),
        justifyContent:'center',
        alignItems:'center',
    },
    joinFamilyView:{
        marginTop:SceneUtils.autoHeight(32),
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        borderRadius:SceneUtils.autoWidth(10),
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:SceneUtils.setSpText(16),
        color:'#f5f7fa',
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
    babyTopSettingImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        top:SceneUtils.autoHeight(5),
        right:SceneUtils.autoWidth(5)
    },
    familyInfoView:{
        marginTop:SceneUtils.autoHeight(10),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(364),
        justifyContent:'center',
        alignItems:'center'
    },
    familyInfoBgView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(357),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
    },
    familyInfoTitleView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(40),
        backgroundColor:'#f0fcf8',
        flexDirection:'row',
        justifyContent:'center',
        borderTopLeftRadius:SceneUtils.autoWidth(10),
        borderTopRightRadius:SceneUtils.autoWidth(10),
    },
    familyInfoTitleImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        top:SceneUtils.autoHeight(5),
        right:SceneUtils.autoWidth(5)
    },
    familyInfoTitleRightView:{
        position:'absolute',
        height:SceneUtils.autoHeight(40),
        right:SceneUtils.autoWidth(5),
        flexDirection:'row',
        alignItems:'center'
    },
    familyInfoTitleRightImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    familyInfoTitleRightText:{
        marginLeft:SceneUtils.autoWidth(2),
        fontSize:SceneUtils.setSpText(11),
        color:'#808080',
        lineHeight:SceneUtils.autoHeight(12),
    },
    familyInfoTitleText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333',
        alignSelf:'center',
    },
    familyScrollView:{
        height:SceneUtils.autoHeight(317),
    },
    familyScrollChildView:{
        marginTop:SceneUtils.autoHeight(24),
        height:SceneUtils.autoHeight(18),
        flexDirection:'row',
    },
    familyScrollChildLeftView:{
        marginLeft:SceneUtils.autoWidth(26.5),
        width:SceneUtils.autoWidth(172.5),
        height:SceneUtils.autoHeight(18),
        flexDirection:'row',
        alignItems:'center',
    },
    familyScrollChildRightView:{
        width:SceneUtils.autoWidth(152),
        height:SceneUtils.autoHeight(18),
        flexDirection:'row',
        alignItems:'center',
    },
    ballView:{
        width:SceneUtils.autoWidth(18),
        height:SceneUtils.autoWidth(18),
        borderRadius:SceneUtils.autoWidth(9),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#333333',
    },
    relationText:{
        fontSize:SceneUtils.setSpText(16),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#333333',
        marginLeft:SceneUtils.autoWidth(4)
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
        borderColor:'#333333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    addText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(23),
        lineHeight:SceneUtils.autoHeight(24),
        color:'#5bdeb4',
        left:SceneUtils.autoWidth(12),
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