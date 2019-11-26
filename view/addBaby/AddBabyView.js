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

export default class AddBabyView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            sex:0,//0是男，1是女
            birthday:'2016-06-20',
            babyName:'',
            personName:'',
            relationship:0//0是爸爸，1是妈妈
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
    //性别选择点击事件
    onTouchSex(index){
        if(index != this.state.sex){
            this.setState({
                sex:index,
                babyName:''
            })
        }
    }
    //确认添加按钮点击事件
    onTouchSave(){
        console.log('onTouchSave');
    }
    //背景点击事件（让输入弹窗失去焦点以便键盘回收）
    onTouchBg(){
        this.refs.BabyNameInput.blur();
        this.refs.PersonNameInput.blur();
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
    //与宝宝的关系点击事件
    onTouchRelationship(index){
        if(index != this.state.relationship){
            this.setState({
                relationship:index
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
                <Text style={styles.titleText}>添加宝宝</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间信息内容
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
                <Text style={styles.babyInfoTitleText}>宝宝信息</Text>
                <View style={styles.babySexView}>
                    <Text style={styles.babySexTitleText}>宝宝性别</Text>
                    <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchSex(0);
                    }}>
                        <View style={[this.state.sex == 0 ? styles.babySexViewSelected : styles.babySexViewUnSelected,{marginLeft:SceneUtils.autoWidth(87.5)}]}>
                            <Image source = {require('./img/boy.png')} style = {this.state.sex == 0 ? styles.sexImgSelected : styles.sexImgUnSelected}/>
                            <Text style={this.state.sex == 0 ? styles.sexNameTextSelected : styles.sexNameTextUnSelected}>男孩</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchSex(1);
                    }}>
                        <View style={[this.state.sex == 1 ? styles.babySexViewSelected : styles.babySexViewUnSelected,{marginLeft:SceneUtils.autoWidth(20)}]}>
                            <Image source = {require('./img/girl.png')} style = {this.state.sex == 1 ? styles.sexImgSelected : styles.sexImgUnSelected}/>
                            <Text style={this.state.sex == 1 ? styles.sexNameTextSelected : styles.sexNameTextUnSelected}>女孩</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(12)}]}>
                    <Text style={styles.rowLeftText}>宝宝姓名</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'BabyNameInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入宝宝姓名"
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
                <Text style={styles.babyInfoTitleText}>家长信息</Text>
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(12)}]}>
                    <Text style={styles.rowLeftText}>家长姓名</Text>
                    <View style={styles.rowRightView}>
                        <TextInput ref={'PersonNameInput'} style={styles.inputText}
                            underlineColorAndroid='transparent'
                            placeholder="请输入家长姓名"
                            onChangeText={(text) => {
                                this.setState({
                                    personName: text
                                });
                            }}
                            value={this.state.personName}>
                        </TextInput>
                    </View>
                </View>
                <View style={[styles.rowView,{marginTop:SceneUtils.autoHeight(12)}]}>
                    <Text style={styles.rowLeftText}>您的关系</Text>
                    <View style={styles.rowRightView1}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchRelationship(0);
                            }}>
                            <View style={this.state.relationship == 0 ? styles.ballSelected : styles.ballUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.ballText}>爸爸</Text>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchRelationship(1);
                            }}>
                            <View style={[this.state.relationship == 1 ? styles.ballSelected : styles.ballUnSelected,{marginLeft:SceneUtils.autoWidth(24)}]}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.ballText}>妈妈</Text>
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
                        <Text style={styles.saveText}>确认添加</Text>
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
    babyInfoTitleText:{
        marginTop:SceneUtils.autoHeight(24),
        fontSize:SceneUtils.setSpText(13),
        color:'#333333',
    },
    babySexView:{
        marginTop:SceneUtils.autoHeight(24),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(104),
        flexDirection:'row'
    },
    babySexTitleText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2',
    },
    babySexViewSelected:{
        width:SceneUtils.autoWidth(78),
        height:SceneUtils.autoHeight(104),
        borderRadius:SceneUtils.autoWidth(10),
        backgroundColor:'#f0fcf8',
        borderWidth: SceneUtils.autoHeight(1),
        borderColor:'#5bdeb4',
        alignItems:'center'
    },
    babySexViewUnSelected:{
        width:SceneUtils.autoWidth(78),
        height:SceneUtils.autoHeight(104),
        borderRadius:SceneUtils.autoWidth(10),
        backgroundColor:'#f5f7fa',
        borderWidth: SceneUtils.autoHeight(1),
        borderColor:'#b2b2b2',
        alignItems:'center'
    },
    sexImgSelected:{
        marginTop:SceneUtils.autoHeight(7),
        width:SceneUtils.autoWidth(64),
        height:SceneUtils.autoWidth(64),
        opacity:1,
    },
    sexImgUnSelected:{
        marginTop:SceneUtils.autoHeight(7),
        width:SceneUtils.autoWidth(64),
        height:SceneUtils.autoWidth(64),
        opacity:0.3,
    },
    sexNameTextSelected:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        bottom:SceneUtils.autoHeight(9.5)
    },
    sexNameTextUnSelected:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(14),
        color:'#b2b2b2',
        bottom:SceneUtils.autoHeight(9.5)
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
    rowRightView1:{
        width:SceneUtils.autoWidth(269.5),
        height:SceneUtils.autoHeight(33.5),
        flexDirection:'row',
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
    ballSelected:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        backgroundColor:'#5bdeb4',
        borderRadius:SceneUtils.autoWidth(10),
    },
    ballUnSelected:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#b2b2b2',
    },
    ballText:{
        marginLeft:SceneUtils.autoWidth(4),
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