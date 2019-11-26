'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableWithoutFeedback,
    Image,
    TextInput
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils'
import NetService from '../../utils/NetService';
import DataUtil from '../../utils/DataUtil';
import StorageHelper from '../../utils/StorageHelper';
import FloatText from '../FloatText';

//退出家庭
export default class SwitchModeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue:'',
            stateType:this.props.password == null ? 0 : 1,//状态码，0:没有设置密码状态，1:已设置密码状态，2：忘记密码状态，3：确认验证码状态
            confirmAgain:false,
            counting:false,                 //是否正在倒计时
            timerCount:0,                   //倒计时时间
            timerCode:'获取验证码',           //获取验证码文字
            isShowError:false
        }
        this.textInput = null;
        this.password = this.props.password == null ? '' : this.props.password.password;
        this.firstPassword = '';
        this.code = '';
    }
    onClose(){
        this.textInput.blur();
        this.interval&&clearInterval(this.interval);
        this.props.destroy(0);
    }
    //问号按钮点击事件
    onTouchQuestion(){
        this.setState({
            stateType:2,
            inputValue:['','','','','',''],
        })
    }
    //返回按钮点击事件
    onTouchBack(){
        this.setState({
            stateType:1,
        })
    }
    //忘记密码按钮点击事件
    onTouchForgetPassword(){
        if(!this.state.counting && this.state.timerCode === '获取验证码'){
            this.countDownAction();
            this.setState({counting:true});
            NetService.sendBabyCode((responseJson)=>{
                this.code = responseJson;
                if(this.state.stateType != 3){
                    this.setState({
                        stateType:3,
                    })
                }
            });
        }
    }
    //处理手机号
    disposePhoneNum(){
        let phoneNum = DataUtil.getinstance().getInfo().cellPhone;
        let disPhone = phoneNum.substr(0, 3) + '*****' + phoneNum.substr(8);
        return disPhone;
    }
    //用户密码输入完毕
    inputComplete(){
        let password = this.state.inputValue;
        if(this.state.stateType == 0){
            if(!this.state.confirmAgain){//再次输入密码
                this.textInput.clear();
                this.firstPassword = password;
                this.setState({
                    inputValue:'',
                    confirmAgain:true
                })
            }else{
                if(this.firstPassword == password){
                    NetService.sendSwitchBabyMode(password,(responseJson)=>{
                        StorageHelper.save('babyPassword',{password:password});
                        this.props.destroy(1);
                    })
                }else{
                    this.setState({
                        confirmAgain:false,
                        isShowError:true,
                        inputValue:['','','','','',''],
                    })
                }
            }
        }else if(this.state.stateType == 1){
            if(password == this.password){
                if(this.props.showType == 3){
                    this.setState({
                        stateType:0,
                        isShowError:false,
                        inputValue:['','','','','',''],
                    })
                }else{
                    this.props.destroy(1);
                }
            }else{
                this.setState({
                    isShowError:true,
                    inputValue:'',
                })
            }
        }else if(this.state.stateType == 3){
            this.textInput.clear();
            if(password == this.code){
                this.setState({
                    isShowError:false,
                    stateType:0,
                    inputValue:'',
                })
            }else{
                this.setState({
                    isShowError:true,
                    inputValue:'',
                })
            }
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
                    timerCode: `重新发送(${timer}s)`,
                })
            }
        },1000)
    }
    //没有设置密码状态
    centerViewState0(){
        return(
            <View style={styles.modalBg}>
                <Text style={styles.titleText}>{this.state.confirmAgain ? '再一次确认密码' : '创建新密码'}</Text> 
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onClose();
                    }}>
                    <Image source = {require('../img/close.png')} style={styles.closeImg}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.passwordTextView}>
                    {this.showPasswordView()}
                </View>
                <View style={styles.inputView}>
                    {this.showInputView()}
                </View>
                {this.state.isShowError ? <Text style={styles.errorText}>密码错误，请重新输入</Text> : null}
                <View style={styles.desView}>
                    <Text style={styles.desText}>（仅用于宝宝模式切换至家长模式时使用）</Text>
                </View>
            </View>
        )
    }
    //已设置密码状态
    centerViewState1(){
        return(
            <View style={styles.modalBg}>
                <Text style={styles.titleText}>请输入当前密码</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchQuestion();
                    }}>
                    <Image source = {require('../img/question.png')} style={styles.questionImg}></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onClose();
                    }}>
                    <Image source = {require('../img/close.png')} style={styles.closeImg}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.passwordTextView}>
                    {this.showPasswordView()}
                </View>
                <View style={styles.inputView}>
                    {this.showInputView()}
                </View>
                {this.state.isShowError ? <Text style={styles.errorText}>密码错误，请重新输入</Text> : null}
                <View style={styles.desView}>
                    <Text style={styles.desText}>{this.props.showType == 1 ? '（输入密码后可继续观看视频，若忘记可点击' : this.props.showType == 3 ? '（输入密码后可设定新密码，若忘记可点击' : '（输入密码后可切换至家长模式，若忘记可点击'}</Text>
                    <Image source = {require('../img/question.png')} style={styles.desImg}></Image>
                    <Text style={styles.desText}>）</Text>
                </View>
            </View>
        )
    }
    //忘记密码状态
    centerViewState2(){
        return(
            <View style={styles.modalBg}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBack();
                    }}>
                    <Image source = {require('../../images/back.png')} style={styles.backImg}></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchForgetPassword();
                    }}>
                    <View style={styles.forgetPasswordView}>
                        <Text style={styles.forgetPasswordText}>忘记密码</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //确认验证码状态
    centerViewState3(){
        return(
            <View style={styles.modalBg}>
                <Text style={styles.titleText}>确认验证码</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onClose();
                    }}>
                    <Image source = {require('../img/close.png')} style={styles.closeImg}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.passwordTextView}>
                    {this.showPasswordView()}
                </View>
                <View style={styles.inputView}>
                    {this.showInputView()}
                </View>
                {this.state.isShowError ? <Text style={styles.errorText}>验证码错误，请重新输入</Text> : null}
                <View style={styles.desView1}>
                    <Text style={styles.desText}>（请输入{this.disposePhoneNum()}收到的短信验证码）</Text>
                </View>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchForgetPassword();
                    }}>
                    <View style={[styles.codeAgainView,this.state.counting ? {backgroundColor:'#969696'} : {backgroundColor:'#5bdeb4',}]}>
                        <Text style={styles.codeAgainText}>{this.state.timerCode}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //中间内容区域
    showCenterView(){
        let view = null;
        switch(this.state.stateType){
            case 0://没有设置密码状态
                view = this.centerViewState0();
                break;
            case 1://已设置密码状态
                view = this.centerViewState1();
                break;
            case 2://忘记密码状态
                view = this.centerViewState2();
                break;
            case 3://确认验证码状态
                view = this.centerViewState3();
                break;
        }
        return view;
    }
    //密码显示区域
    showPasswordView(){
        var allChild = [];
        var length = 6;
        var pass = this.state.inputValue;
        for(let i = 0;i < length;i++){
            allChild.push(
                <View key={i} style={styles.passwordChildView}>
                    <Text style={styles.passwordText}>{i<pass.length ? pass[i] : ''}</Text>
                </View>
            );
        }
        return allChild;
    }
    //密码输入区域
    showInputView(){
        return(
            <TextInput ref={ ref => this.textInput = ref}
                style={styles.inputText}
                underlineColorAndroid='transparent'
                placeholder=""
                keyboardType='numeric'
                maxLength={6}
                autoFocus={true}
                caretHidden={true}
                onChangeText={(text) => {
                    this.setState({
                        inputValue: text
                    });
                    if(text.length == 6){
                        setTimeout(() => {
                            this.inputComplete();
                        }, 10);
                    }
                }}
                value={this.state.inputValue}
                >
            </TextInput>
        )
    }
    render() {
        return (
            <Modal
                animationType='fade'            // 淡入淡出
                transparent={true}              // 透明
                visible={this.props.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {
                    this.onClose();
                }}  // android必须实现
            >
                <View style={styles.modalStyle}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            
                        }}>
                        {this.showCenterView()}
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.screenWidth,
        height: SceneUtils.screenHeight,
        backgroundColor: 'rgba(0,0,0,0.0)',
        justifyContent: 'center',
        alignItems:'center',
    },
    // modalStyle1:{
    //     position:'absolute',
    //     left:-(SceneUtils.screenHeight - SceneUtils.screenWidth) / 2,
    //     top:(SceneUtils.screenHeight - SceneUtils.screenWidth) / 2,
    //     width: SceneUtils.screenHeight,
    //     height: SceneUtils.screenWidth,
    //     backgroundColor: 'rgba(0,0,0,0.0)',
    //     justifyContent: 'center',
    //     alignItems:'center',
    //     transform: [{rotate:'-90deg'}],
    // },
    modalBg:{
        width: SceneUtils.autoWidth(320),
        height: SceneUtils.autoWidth(180),
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: SceneUtils.autoWidth(1),
        borderColor:'#333333',
        borderRadius:SceneUtils.autoWidth(11.5),
    },
    titleText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(22),
        color:'#333333',
        top:SceneUtils.autoHeight(10),
    },
    questionImg:{
        width:SceneUtils.autoWidth(30),
        height:SceneUtils.autoWidth(30),
        position:'absolute',
        top:SceneUtils.autoWidth(2),
        left:SceneUtils.autoWidth(2),
    },
    closeImg:{
        width:SceneUtils.autoWidth(30),
        height:SceneUtils.autoWidth(30),
        position:'absolute',
        top:SceneUtils.autoWidth(2),
        right:SceneUtils.autoWidth(2),
    },
    desView:{
        position:'absolute',
        flexDirection:'row',
        bottom:SceneUtils.autoHeight(4),
    },
    desView1:{
        position:'absolute',
        bottom:SceneUtils.autoHeight(30),
    },
    desText:{
        fontSize:SceneUtils.setSpText(14),
        lineHeight:SceneUtils.autoHeight(15),
        color:'#cccccc',
    },
    desImg:{
        width:SceneUtils.autoWidth(14),
        height:SceneUtils.autoWidth(14),
    },
    passwordTextView:{
        position:'absolute',
        top:SceneUtils.autoWidth(60),
        width:SceneUtils.autoWidth(310),
        height:SceneUtils.autoHeight(42),
        flexDirection:'row',
        justifyContent:'space-around',
    },
    passwordChildView:{
        width:SceneUtils.autoWidth(42),
        height:SceneUtils.autoHeight(42),
        borderBottomWidth: SceneUtils.autoWidth(1),
        borderColor:'#333333',
    },
    passwordText:{
        fontSize:SceneUtils.setSpText(38),
        textAlign:'center',
    },
    inputView:{
        position:'absolute',
        top:SceneUtils.autoWidth(60),
        width:SceneUtils.autoWidth(310),
        height:SceneUtils.autoHeight(42),
        flexDirection:'row',
        justifyContent:'space-around',
    },
    inputText:{
        width:SceneUtils.autoWidth(42 * 6),
        height:SceneUtils.autoHeight(42),
        fontSize:SceneUtils.setSpText(38),
        textAlign:'center',
        color:'rgba(0,0,0, 0.0)',
    },
    backImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        top:SceneUtils.autoWidth(4),
        left:SceneUtils.autoWidth(4)
    },
    forgetPasswordView:{
        position:'absolute',
        width:SceneUtils.autoWidth(100),
        height:SceneUtils.autoWidth(24),
        top:SceneUtils.autoWidth((180-24)/2),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center'
    },
    forgetPasswordText:{
        fontSize:SceneUtils.setSpText(20),
        color:'white'
    },
    codeAgainView:{
        position:'absolute',
        width:SceneUtils.autoWidth(120),
        height:SceneUtils.autoWidth(24),
        bottom:0,
        justifyContent:'center',
        alignItems:'center'
    },
    codeAgainText:{
        fontSize:SceneUtils.setSpText(14),
        color:'white'
    },
    errorText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(14),
        color:'red',
        bottom:SceneUtils.autoHeight(46),
    }
});