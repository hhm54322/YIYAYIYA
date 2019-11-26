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

export default class BabyInfoReviseView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            sex:'男',
            birthday:'2016-06-20',
            babyName:'幽幽',
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
    //删除按钮点击事件
    onTouchDel(){
        console.log('onTouchDel');
    }
    //保存按钮点击事件
    onTouchSave(){
        console.log('onTouchSave');
    }
    //背景点击事件（让输入弹窗失去焦点以便键盘回收）
    onTouchBg(){
        this.refs.BabyNameInput.blur();
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
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
        });
    }
    //生日箭头点击事件
    onTouchBirthday(){
        var year = ''
        var month = ''
        var day = ''
        var dateStr = this.state.birthday;
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
                <Text style={styles.titleText}>修改信息</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchDel();
                    }}>
                    <Text style={styles.delText}>删除</Text>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示中间宝宝信息内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchHead();
                    }}>
                    <View style={styles.headView}>
                        <Image source = {this.state.image == null ? require('../../images/userIcon.png') : {uri:this.state.image.uri}} style={styles.headImg}/>
                        <Image source = {require('../../images/camera.png')} style = {styles.cameraImg}/>
                    </View>
                </TouchableWithoutFeedback> 
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(45.5)}]}>
                    <Text style={styles.rowLeftText}>宝宝姓名</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'BabyNameInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入宝宝姓名"
                            defaultValue={this.state.babyName}
                            onChangeText={(text) => {
                                this.setState({
                                    babyName: text
                                });
                            }}
                            value={this.state.babyName}>
                        </TextInput>
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
                    <Text style={styles.rowLeftText}>宝宝生日</Text>
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
    delText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#dc1802',
        marginRight:SceneUtils.autoWidth(12)
    },
    centerView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(559),
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
    rowView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(36),
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
        height:SceneUtils.autoHeight(36),
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