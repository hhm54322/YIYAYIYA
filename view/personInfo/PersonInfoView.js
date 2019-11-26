'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    TextInput
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import DateUtil from '../../utils/DateUtil';
import ImagePicker from 'react-native-image-crop-picker';
import Picker from 'react-native-picker';
import UploadView from '../../utils/UploadView';
import NetService from '../../utils/NetService';
import FloatText from '../../component/FloatText';
import DataUtil from '../../utils/DataUtil';

export default class PersonInfoView extends Component{
    constructor(props) {
        super(props);
        let data = DataUtil.getinstance().getInfo();
        this.state = {
            image: data.headshot,
            nickName:data.nickname,
            phoneNum:data.cellPhone,
            personName:data.receiverName,
            addressPhoneNum:data.receiverCellPhone,
            address:data.receiverAddress,
            birthday:data.birthdate,
            sex:data.gender == 0 ? '男' : '女',
            country:'中国',
        };
        this.source = null;
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
    //背景点击事件（让输入弹窗失去焦点以便键盘回收）
    onTouchBg(){
        this.refs.NickNameInput.blur();
        this.refs.PhoneNumInput.blur();
        this.refs.PersonNameInput.blur();
        this.refs.AddressPhoneNumInput.blur();
        this.refs.AddressInput.blur();
    }
    //保存按钮点击事件
    onTouchSave(){
        let params = {'headshot':this.source == null ? '' : this.source,
                        'nickname':this.state.nickName,'birthdate':this.state.birthday == null ? '' : this.state.birthday + ' 00:00:00',
                        'gender':this.state.sex == '男' ? 0 : 1,'nationality':this.state.country,
                        'receiverCellPhone':this.state.addressPhoneNum,'receiverName':this.state.personName,
                        'receiverAddress':this.state.address};
        NetService.sendReviseInfo(params,(responseJson)=>{
            FloatText.show('用户信息保存成功');
            this.props.navigation.state.params.refreshFun();
            this.props.navigation.goBack();
        });
    }
    //头像点击事件
    onTouchHead(){
        ImagePicker.openPicker({  
            width:SceneUtils.autoWidth(100),
            height:SceneUtils.autoWidth(100),
            cropping: true,
            cropperCircleOverlay: true,
        }).then(image => { 
            this.setState({
                image: image.path,
            });
            this.updateHead(image);
        });
    }
    //生日箭头点击事件
    onTouchBirthday(){
        console.log('onTouchBirthday');
        var year = ''
        var month = ''
        var day = ''
        var dateStr = this.state.birthday == null || this.state.birthday == '' ? '2019-01-01' : this.state.birthday;
        year = dateStr.substring(0,4);
        month = parseInt(dateStr.substring(5,7));
        day = parseInt(dateStr.substring(8,10));
        Picker.init({
            pickerTitleText:'时间选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[year+'年',month+'月',day+'日'],
            pickerBg:[255,255,255,1],
            pickerData: DateUtil.createDateData(),
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0,pickedValue[0].length-1);
                var month = pickedValue[1].substring(0,pickedValue[1].length-1);
                month = month.padStart(2,'0');
                var day = pickedValue[2].substring(0,pickedValue[2].length-1);
                day = day.padStart(2,'0');
                let str = year+'-'+month+'-'+day;
                this.setState({
                    birthday:str,
                })
            }
        });
        Picker.show();
    }
    //性别箭头点击事件
    onTouchSex(){
        console.log('onTouchSex');
        var sexStr = this.state.sex;
        Picker.init({
            pickerTitleText:'性别选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[sexStr],
            pickerBg:[255,255,255,1],
            pickerData: ['男','女'],
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log(pickedValue[0]);
                this.setState({
                    sex:pickedValue[0],
                })
            }
        });
        Picker.show();
    }
    //上传头像
    updateHead(source){
        UploadView.showUploadView(source,(uriStruct)=>{
            this.source = uriStruct.tmpFileName;
        })
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
                <Text style={styles.titleText}>编辑资料</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间个人信息内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchHead();
                    }}>
                    <View style={styles.headView}>
                        <Image source = {this.state.image == null ? require('../../images/userIcon.png') : {uri:this.state.image}} style={styles.headImg}/>
                        <Image source = {require('../../images/camera.png')} style = {styles.cameraImg}/>
                    </View>
                </TouchableWithoutFeedback> 
                <Text style={styles.personInfoTitleText}>个人信息</Text>
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(12)}]}>
                    <Text style={styles.rowLeftText}>昵称</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'NickNameInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入昵称"
                            onChangeText={(text) => {
                                this.setState({
                                    nickName: text
                                });
                            }}
                            value={this.state.nickName}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>手机号</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'PhoneNumInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入手机号"
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({
                                    phoneNum: text
                                });
                            }}
                            value={this.state.phoneNum}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>生日</Text>
                    <View style={styles.rowRightView}>
                        <Text style={styles.rowRightText}>{this.state.birthday}</Text>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchBirthday();
                            }}>
                            <Image source = {require('../../images/arrow_down.png')} style = {styles.arrowImg}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>性别</Text>
                    <View style={styles.rowRightView}>
                        <Text style={styles.rowRightText}>{this.state.sex}</Text>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchSex();
                            }}>
                            <Image source = {require('../../images/arrow_down.png')} style = {styles.arrowImg}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>国家/地区</Text>
                    <View style={styles.rowRightView}>
                        <Text style={styles.rowRightText}>{this.state.country}</Text>
                    </View>
                </View>
                <Text style={styles.personInfoTitleText}>收件信息</Text>
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(12)}]}>
                    <Text style={styles.rowLeftText}>姓名</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'PersonNameInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入姓名"
                            onChangeText={(text) => {
                                this.setState({
                                    personName: text
                                });
                            }}
                            value={this.state.personName}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>手机号</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'AddressPhoneNumInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入手机号"
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({
                                    addressPhoneNum: text
                                });
                            }}
                            value={this.state.addressPhoneNum}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowLeftText}>地址</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'AddressInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入地址"
                            onChangeText={(text) => {
                                this.setState({
                                    address: text
                                });
                            }}
                            value={this.state.address}>
                        </TextInput>
                    </View>
                </View>
            </View>
        )
    }
    //显示下方保存按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchSave();
                }}>
                <View style={styles.downView}>
                        <Text style={styles.saveText}>保存</Text>
                </View> 
           </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchBg();
                }}>
                <View style={styles.container}>
                    {this.showTopView()}
                    {this.showCenterView()}
                    {this.showDownView()}
                </View>
            </TouchableWithoutFeedback>
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
        height:SceneUtils.autoHeight(559)
    },
    headView:{
        marginTop:SceneUtils.autoHeight(24),
        width:SceneUtils.autoWidth(100),
        height:SceneUtils.autoWidth(100),
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    headImg:{
        width:SceneUtils.autoWidth(100),
        height:SceneUtils.autoWidth(100),
        borderRadius:SceneUtils.autoWidth(50),
    },
    cameraImg:{
        width:SceneUtils.autoWidth(100),
        height:SceneUtils.autoWidth(100),
        position:'absolute',
    },
    personInfoTitleText:{
        marginTop:SceneUtils.autoHeight(24),
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    rowView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(33.5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rowLeftText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2'
    },
    rowRightView:{
        width:SceneUtils.autoWidth(269.5),
        height:SceneUtils.autoHeight(33.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rowRightText:{
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    arrowImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    inputText:{
        width:SceneUtils.autoWidth(225),
        fontSize:SceneUtils.setSpText(13),
        color:'#333333'
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    saveText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});