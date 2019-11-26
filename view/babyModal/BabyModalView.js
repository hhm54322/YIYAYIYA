'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    Switch
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import Picker from 'react-native-picker';
import StorageHelper from '../../utils/StorageHelper';
import SwitchMode from '../../component/popup/SwitchMode';

//为了方便计算，把时间拆分成pieceTimeValue为一个单位(即30分钟为一个单位)
//如totalTime[4,4,4,4,4,4,4],即为4个单位的pieceTimeValue值，即120分钟
//又如banTime[[44,12]],换算成单位时间为22:00到06:00
const totalPieceTimeValue = 10;
const banPieceTimeValue = 30;
export default class BabyModalView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSetPassword:false,
            switchIsOn:false,
            totalTime:4,
            onceTime:1,
            banTime:[44,12],
        };
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        
    }
    //生命周期函数，render之前被调用
    componentWillMount(){
        StorageHelper.get('videoTime',(mod)=>{
            if(mod != null){
                this.setState({
                    totalTime:mod.totalTime,
                    onceTime:mod.onceTime,
                    banTime:mod.banTime,
                    switchIsOn:mod.switchOn
                })
            }else{
                StorageHelper.save('videoTime',{totalTime:4,onceTime:1,banTime:[44,12],switchOn:false})
            }
        });
        StorageHelper.get('babyPassword',(mod)=>{
            if(mod != null && mod.password != ''){
                this.setState({
                    isSetPassword:true
                })
            }
        })
    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){
        StorageHelper.save('videoTime',{totalTime:this.state.totalTime,onceTime:this.state.onceTime,banTime:this.state.banTime,switchOn:this.state.switchIsOn})
    }
    //返回按钮点击事件
    onTouchBack(){
        this.props.navigation.goBack();
    }
    //切换密码按钮点击事件
    onTouchTogglePassword(){
        if(this.state.isSetPassword){
            SwitchMode.show(3,()=>{
                this.setState({
                    isSetPassword:true
                })
            })
        }else{
            SwitchMode.show(0,()=>{
                this.setState({
                    isSetPassword:true
                })
            })
        }
    }
    //单次观看时间按钮点击事件
    onOnceTimePress(){
        var timeData = [];
        var length = 360 / totalPieceTimeValue;
        for(var i = 0;i<=length;i++){
            timeData.push(i == 0 ? '无限制' : (totalPieceTimeValue * i) + '分钟');
        }
        var crtTime = totalPieceTimeValue * this.state.onceTime + '分钟';
        Picker.init({
            pickerTitleText:'单次观看时间选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtTime],
            pickerBg:[255,255,255,1],
            pickerData: timeData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _onceTime = this.state.onceTime;
                if(pickedIndex == 0){
                    _onceTime = 0;
                }else{
                    var min = pickedValue[0].substring(0,pickedValue[0].length-2);
                    _onceTime = min / totalPieceTimeValue;
                }

                this.setState({
                    onceTime:_onceTime,
                })
            }
        });
        Picker.show();
    }
    //累计观看时间按钮点击事件
    onTotalTimePress(){
        var timeData = [];
        var length = 360 / totalPieceTimeValue;
        for(var i = 0;i<=length;i++){
            timeData.push(i == 0 ? '无限制' : (totalPieceTimeValue * i) + '分钟');
        }
        var crtTime = totalPieceTimeValue * this.state.totalTime + '分钟';
        Picker.init({
            pickerTitleText:'累计观看时间选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtTime],
            pickerBg:[255,255,255,1],
            pickerData: timeData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _totalTime = this.state.totalTime;
                if(pickedIndex == 0){
                    _totalTime = 0;
                }else{
                    var min = pickedValue[0].substring(0,pickedValue[0].length-2);
                    _totalTime = min / totalPieceTimeValue;
                }
                this.setState({
                    totalTime:_totalTime,
                })
            }
        });
        Picker.show();
    }
    //禁止观看开始时间按钮点击事件
    onBanStartTimePress(){
        var timeData = [];
        var length = 1440 / banPieceTimeValue;
        for(var i = 0;i<length;i++){
            timeData.push(this.formatTime(i));
        }
        var crtTime = this.formatTime(this.state.banTime[0]);
        Picker.init({
            pickerTitleText:'禁止观看开始时间选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtTime],
            pickerBg:[255,255,255,1],
            pickerData: timeData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _banTime = this.state.banTime;
                _banTime[0] = this.formatTimeBack(pickedValue[0]);
                this.setState({
                    banTime:_banTime,
                })
            }
        });
        Picker.show();
    }
    //禁止观看结束时间按钮点击事件
    onBanEndTimePress(){
        var timeData = [];
        var length = 1440 / banPieceTimeValue;
        for(var i = 0;i<length;i++){
            timeData.push(this.formatTime(i));
        }
        var crtTime = this.formatTime(this.state.banTime[1]);
        Picker.init({
            pickerTitleText:'禁止观看开始时间选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtTime],
            pickerBg:[255,255,255,1],
            pickerData: timeData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _banTime = this.state.banTime;
                _banTime[1] = this.formatTimeBack(pickedValue[0]);
                this.setState({
                    banTime:_banTime,
                })
            }
        });
        Picker.show();
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
                <Text style={styles.titleText}>宝宝模式管理</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示模式切换密码
    showTogglePasswordView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchTogglePassword();
                }}>
                <View style={styles.togglePasswordView}>
                    <View>
                        <Text style={styles.togglePasswordText}>模式切换密码</Text>
                        <Text style={styles.togglePasswordDesText}>(仅限于宝宝模式切换至家长模式时使用)</Text>
                    </View>
                    <View style={styles.togglePasswordRightView}>
                        <Text style={styles.togglePasswordStateText}>{this.state.isSetPassword ? '已设置' : '去设置'}</Text>
                        <Image source = {require('../../images/arrow.png')} style = {styles.arrowImg}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示限制观看时长切换
    showSwitchView(){
        return(
            <View style={styles.switchView}>
                <Text style={styles.switchText}>限制观看时长</Text>
                <Switch
                    onValueChange={(value) => {
                        this.setState({switchIsOn: value})
                    }}
                    onTintColor='#5bdeb4'
                    value={this.state.switchIsOn} />
            </View>
        )
    }
    //显示时长设置面板
    showDuratioSettingView(){
        if(!this.state.switchIsOn) return;
        return(
            <ImageBackground source = {require('./img/rectangle1.png')} style={styles.duratioSettingView}>
                <View style={styles.duratioSettingBgView}>
                    <View style={styles.duratioSettingTitleView}>
                        <View style={[styles.duratioSettingTitleTextView,{marginLeft:SceneUtils.autoWidth(40)}]}>
                            <Text style={styles.duratioSettingTitleText}>单次观看</Text>
                        </View>
                        <View style={styles.duratioSettingTitleTextView}>
                            <Text style={styles.duratioSettingTitleText}>累计观看</Text>
                        </View>
                        <View style={styles.duratioSettingTitleTextView1}>
                            <Text style={styles.duratioSettingTitleText}>禁止观看时间</Text>
                        </View>
                    </View>
                    {this.showDuratioSettingChildView()}
                </View>
            </ImageBackground>
        )
    }
    //显示每天时长设置面板
    showDuratioSettingChildView(){
        return(
            <View style={styles.daySettingView}>
                <View style={styles.daySettingLeftView}>
                    <Text style={styles.daySettingText}>每天</Text>
                </View>
                <View style={styles.daySettingCenterView}>
                    <Text style={styles.daySettingText}>{this.state.onceTime == 0 ? '无限制' : totalPieceTimeValue * this.state.onceTime + '分钟'}</Text>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onOnceTimePress();
                        }}>
                        <Image source = {require('./img/arrow_downPink.png')} style = {styles.arrowDownImg}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.daySettingCenterView}>
                    <Text style={styles.daySettingText}>{this.state.totalTime == 0 ? '无限制' : totalPieceTimeValue * this.state.totalTime + '分钟'}</Text>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTotalTimePress();
                        }}>
                        <Image source = {require('./img/arrow_downPink.png')} style = {styles.arrowDownImg}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.daySettingRightView}>
                    <Text style={styles.daySettingText}>{this.formatTime(this.state.banTime[0])}</Text>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onBanStartTimePress();
                        }}>
                        <Image source = {require('./img/arrow_downPink.png')} style = {styles.arrowDownImg}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.daySettingText}>{this.formatTime(this.state.banTime[1])}</Text>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onBanEndTimePress();
                        }}>
                        <Image source = {require('./img/arrow_downPink.png')} style = {styles.arrowDownImg}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    //显示描述面板
    showDesView(){
        if(!this.state.switchIsOn) return;
        return(
            <View style={styles.desView}>
                <Image source = {require('./img/icon1.png')} style = {styles.desImg}/>
                <View style={styles.desTextView}>
                    <Text style={styles.desText}>单次观看：一次连续观看的时间长度</Text>
                    <Text style={styles.desText}>累计观看：每天观看的总时间长度</Text>
                    <Text style={styles.desText}>禁止观看时间：所选时间段内不能观看视频</Text>
                </View>
            </View>
        )
    }
    //时间转换函数
    formatTime(time){
        let totalTime = banPieceTimeValue * time;
        let hour = parseInt(totalTime / 60).toString();
        hour = hour.padStart(2,'0');
        let min = parseInt(totalTime % 60).toString();
        min = min.padStart(2,'0');
        let strTime = hour + ':' + min;
        return strTime;
    }
    //时间转换函数（反向）
    formatTimeBack(time){
        let arr = time.split(':');
        let min = parseInt(arr[0] * 60) + parseInt(arr[1]);
        return parseInt(min / banPieceTimeValue);
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showTogglePasswordView()}
                <View style={styles.lineView}></View>
                {this.showSwitchView()}
                {this.showDuratioSettingView()}
                {this.showDesView()}
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
    togglePasswordView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(351),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    togglePasswordText:{
        fontSize:SceneUtils.setSpText(15),
        color:'#333333'
    },
    togglePasswordDesText:{
        marginTop:SceneUtils.autoHeight(2),
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2'
    },
    togglePasswordRightView:{
        flexDirection:'row',
        alignItems:'center'
    },
    togglePasswordStateText:{
        fontSize:SceneUtils.setSpText(12),
        color:'#b2b2b2'
    },
    arrowImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    lineView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(10),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    switchView:{
        marginTop:SceneUtils.autoHeight(12),
        width:SceneUtils.autoWidth(351),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    swtichText:{
        fontSize:SceneUtils.setSpText(15),
        color:'#333333',
    },
    duratioSettingView:{
        marginTop:SceneUtils.autoHeight(3.5),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(87.5),
        alignItems:'center'
    },
    duratioSettingBgView:{
        marginTop:SceneUtils.autoHeight(3.5),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(80.5),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
    },
    duratioSettingTitleView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(40),
        backgroundColor:'#f0fcf8',
        flexDirection:'row',
        borderTopLeftRadius:SceneUtils.autoWidth(10),
        borderTopRightRadius:SceneUtils.autoWidth(10),
    },
    duratioSettingTitleTextView:{
        width:SceneUtils.autoWidth(87.5),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center'
    },
    duratioSettingTitleTextView1:{
        width:SceneUtils.autoWidth(136),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center'
    },
    duratioSettingTitleText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    daySettingView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(40.5),
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        flexDirection:'row',
    },
    daySettingLeftView:{
        width:SceneUtils.autoWidth(40),
        justifyContent:'center',
        alignItems:'flex-end'
    },
    daySettingCenterView:{
        width:SceneUtils.autoWidth(87.5),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    daySettingRightView:{
        width:SceneUtils.autoWidth(136),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    daySettingText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333'
    },
    arrowDownImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    desView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(309),
        flexDirection:'row',
    },
    desImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    desTextView:{
        marginLeft:SceneUtils.autoWidth(11.5)
    },
    desText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#666666',
        lineHeight:SceneUtils.autoHeight(12),
        marginBottom:SceneUtils.autoHeight(4)
    }
});