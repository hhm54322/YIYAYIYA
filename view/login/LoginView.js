'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import DateUtil from '../../utils/DateUtil';
import FloatText from '../../component/FloatText';
import NetService from '../../utils/NetService';
import Agreement from './Agreement'

export default class LoginView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',         //usaername
            code:'',                  //验证码
            counting:false,                 //是否正在倒计时
            timerCount:0,                   //倒计时时间
            timerCode:'获取验证码',           //获取验证码文字
        };
        this.interval = null;
        this.version = 'V1.0.0';
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        
    }
    //生命周期函数，render之前被调用
    componentWillMount(){

    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){
        this.interval&&clearInterval(this.interval);
    }
    //登陆按钮点击事件
    onTouchLoginBtn(){
        if(DateUtil.phoneNumCheck(this.state.username) && this.state.code.length === 6){
            this.sendRegister();
        }else{
            FloatText.show('手机号码格式错误')
        }
    }
    //获取验证码按钮点击事件
    onToutchCodeBtnBack(){
        if(DateUtil.phoneNumCheck(this.state.username)){
            if(!this.state.counting && this.state.timerCode === '获取验证码'){
                this.countDownAction();
                this.setState({counting:true});
                this.sendMsmCode();
            }
        }else{
            //手机号码格式错误
            FloatText.show('手机号码格式错误')
        }
    }
    //获取验证码后等到cd
    countDownAction(){
        if(this.state.counting) {return;}
        this.state.timerCount = 60;
        this.interval = setInterval(() =>{
            const timer = this.state.timerCount - 1;
            if(timer==0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: 0,
                    timerCode: '获取验证码',
                    counting:false,
                })
            }else{
                this.setState({
                    timerCount:timer,
                    timerCode: `重新获取(${timer}s)`,
                })
            }
        },1000)
    }
    //发送请求验证码
    sendMsmCode(){
        NetService.sendCode(this.state.username,(responseJson)=>{
            
        })
    }
    //发送注册
    sendRegister(){
        NetService.sendRegister(this.state.username,this.state.code,(responseJson)=>{
            this.sendToken();
        })
    }
    //获取token
    sendToken(){
        NetService.sendToken(this.state.username,this.state.code,(responseJson)=>{
            this.sendInfo();
        })
    }
    //获取用户资料
    sendInfo(){
        const { navigate } = this.props.navigation;
        NetService.sendInfo((responseJson)=>{
            navigate('Main');
        })
    }

    //显示Logo
    showLogoView(){
        return(
            <Image source = {require('./img/logo.png')} style = {styles.logoIcon}/>
        )
    }
    //显示输入手机号
    showMobileView(){
        return(
            <View style={styles.textInputView}>
                <Text style={styles.text86}>CN+86</Text>
                <TextInput style={styles.inputMobile}
                    underlineColorAndroid='transparent'
                    placeholder="请输入手机号"
                    keyboardType='numeric'
                    maxLength={11}
                    onChangeText={(text) => {
                        this.setState({
                            username: text
                        });
                    }}
                    value={this.state.username}>
                </TextInput>
            </View>
        )
    }
    //显示输入验证码
    showCodeView(){
        return(
            <View style={styles.textInputView}>
                <Text style={styles.textCodeDes}>验证码</Text>
                <TextInput style={styles.inputCode}
                    underlineColorAndroid='transparent'
                    placeholder="请输入验证码"
                    keyboardType='numeric'
                    maxLength={6}
                    onChangeText={(text) => {
                        this.setState({
                            code: text
                        });
                    }}
                    value={this.state.code}>
                </TextInput>
                <TouchableWithoutFeedback onPress={() =>{
                    this.onToutchCodeBtnBack()
                }}>
                    <View style = {[styles.codeBtnView,this.state.counting ? {backgroundColor:'#969696'} : {backgroundColor:'#5bdeb4',}]}>
                        <Text style={styles.textCode}>{this.state.timerCode}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //显示登陆按钮
    showLoginBtnView(){
        return (
            <TouchableWithoutFeedback
                onPress = {() => {
                    this.onTouchLoginBtn();
                }}
            >
                <View style = {styles.btnView}>
                    <Text style = {styles.logintext}>{'登陆/注册'}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示用户协议描述
    showAgreementView(){
        return(
            <View style = {styles.agreementView}>
                <Text style = {styles.xieyiTextDes}>{'点击按钮，即代表您同意'}</Text>
                <Text 
                    onPress = {()=>{
                        Agreement.showAgreement();
                    }}
                style = {styles.xieyiText}>{'《用户协议》'}</Text>
            </View>
        )
    }
    //显示其他登陆方式
    showOtherLoginView(){
        return (
            <View style={styles.otherLoginView}>
                <Text style={styles.otherLoginText}>——— 其他登陆 ———</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                            // wechat.isWXAppInstalled().then((is)=>{
                            //     if(is){
                            //         this.wxLogin()
                            //     }else{
                            //         Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                            //             {text: '确定'}
                            //         ])
                            //     }
                            // })
                        }
                    }>
                    <Image source = {require('./img/wechat.png')} style = {styles.wxImg}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //显示版本号
    showVersion(){
        return(
            <Text style={styles.versionText}>{this.version}</Text>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false}/>
                <View style={styles.topView}>
                    {this.showLogoView()}
                    {this.showMobileView()}
                    {this.showCodeView()}
                    {this.showLoginBtnView()}
                    {this.showAgreementView()}
                </View>
                <View style={styles.downView}>
                    {/* {this.showOtherLoginView()} */}
                    {this.showVersion()}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        backgroundColor:'#f5f7fa'
    },
    topView:{
        marginTop:SceneUtils.autoHeight(20),
        alignItems:'center',
    },
    downView:{
        alignItems:'center',
        marginBottom:SceneUtils.autoHeight(33),
    },
    logoIcon:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(186),
        resizeMode:'stretch'
    },
    textInputView:{
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoHeight(53),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        flexDirection: 'row',
        alignItems:'center'
    },
    text86:{
        width:SceneUtils.autoWidth(60),
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    inputMobile:{
        marginLeft:SceneUtils.autoWidth(30),
        width:SceneUtils.autoWidth(225),
        fontSize:SceneUtils.setSpText(14),
    },
    textCodeDes:{
        width:SceneUtils.autoWidth(60),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333'
    },
    inputCode:{
        marginLeft:SceneUtils.autoWidth(30),
        width:SceneUtils.autoWidth(133),
        fontSize:SceneUtils.setSpText(14),
    },
    codeBtnView:{
        width:SceneUtils.autoWidth(92),
        height:SceneUtils.autoHeight(28),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(10),
    },
    textCode:{
        fontSize:SceneUtils.setSpText(14),
        color:'#f5f7fa'
    },
    btnView:{
        marginTop:SceneUtils.autoHeight(20),
        backgroundColor:'#5bdeb4',
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(12),
    },
    logintext:{
        fontSize:SceneUtils.setSpText(20),
        color:'#f5f7fa',
    },
    agreementView:{
        flexDirection: 'row',
        marginTop:SceneUtils.autoHeight(15),
    },
    xieyiTextDes:{
        fontSize:SceneUtils.setSpText(11),
        color:'#333333'
    },
    xieyiText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#5bdeb4'
    },
    otherLoginView:{
        alignItems:'center',
    },
    otherLoginText:{
        fontSize:SceneUtils.setSpText(12),
        color:'#cccccc',
    },
    wxImg:{
        marginTop:SceneUtils.autoHeight(15),
        width:SceneUtils.autoWidth(40),
        height:SceneUtils.autoWidth(40),
        justifyContent:'center',
        alignItems:'center',
    },
    versionText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333',
        marginTop:SceneUtils.autoHeight(16)
    }
});