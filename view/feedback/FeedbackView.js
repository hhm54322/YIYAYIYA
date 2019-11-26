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
import NetService from '../../utils/NetService';
import FloatText from '../../component/FloatText';

export default class FeedbackView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNum:'',
            text:'',
            feedbackTypeData:-1
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
    //背景点击事件（让输入弹窗失去焦点以便键盘回收）
    onTouchBg(){
        this.refs.InputPhoneText.blur();
        this.refs.InputText.blur();
    }
    //反馈类型选择点击事件
    onTouchFeedback(index){
        if(index != this.state.feedbackTypeData){
            this.setState({
                feedbackTypeData : index
            })
        }
    }
    //提交建议按钮点击事件
    onTouchSubmit(){
        if(this.state.text != ''){
            let params = {'cellPhone':this.state.phoneNum,'type':this.state.feedbackTypeData,'content':this.state.text};
            NetService.sendFeedback(params,(responseJson)=>{
                FloatText.show('提交建议成功');
                this.props.navigation.goBack();
            });
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
                <Text style={styles.titleText}>反馈</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间信息内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <Text style={styles.informationTitleText}>您的联系方式（选填）</Text>
                <View style={styles.phoneView}>
                    <TextInput ref={'InputPhoneText'} style={styles.inputPhone}
                        underlineColorAndroid='transparent'
                        placeholder="请输入您的手机号"
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
                <Text style={styles.informationTitleText}>反馈类型（选填）</Text>
                <View style={styles.feedbackTypeView}>
                    <View style={styles.feedbackTypeLeftView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(0);
                            }}>
                            <View style={this.state.feedbackTypeData == 0 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>视频播放不流畅</Text>
                    </View>
                    <View style={styles.feedbackTypeRightView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(1);
                            }}>
                            <View style={this.state.feedbackTypeData == 1 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>改进建议</Text>
                    </View>
                </View>
                <View style={styles.feedbackTypeView}>
                    <View style={styles.feedbackTypeLeftView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(2);
                            }}>
                            <View style={this.state.feedbackTypeData == 2 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>画面质量太差</Text>
                    </View>
                    <View style={styles.feedbackTypeRightView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(3);
                            }}>
                            <View style={this.state.feedbackTypeData == 3 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>会员相关</Text>
                    </View>
                </View>
                <View style={styles.feedbackTypeView}>
                    <View style={styles.feedbackTypeLeftView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(4);
                            }}>
                            <View style={this.state.feedbackTypeData == 4 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>播放问题</Text>
                    </View>
                    <View style={styles.feedbackTypeRightView}>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchFeedback(5);
                            }}>
                            <View style={this.state.feedbackTypeData == 5 ? styles.feedbackTypeSelected : styles.feedbackTypeUnSelected}></View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.feedbackTypeText}>其他</Text>
                    </View>
                </View>
                <Text style={styles.informationTitleText}>您的问题和想说的话（必填）</Text>
                <View style={styles.inputView}>
                    <TextInput ref={'InputText'} style={styles.inputText}
                        underlineColorAndroid='transparent'
                        placeholder='最多可输入3000字'
                        multiline={true}
                        maxLength={3000}
                        onChangeText={(text) => {
                            this.setState({
                                text: text
                            });
                        }}
                        value={this.state.text}>
                    </TextInput>
                </View>
            </View>
        )
    }
    //显示下方提交建议按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchSubmit();
                }}>
                <View style={styles.downView}>
                    <Text style={styles.submitText}>提交建议</Text>
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
        height:SceneUtils.autoHeight(559),
        alignItems:'center'
    },
    informationTitleText:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(351),
        fontSize:SceneUtils.setSpText(15),
        lineHeight:SceneUtils.autoHeight(16),
        color:'#333333',
    },
    phoneView:{
        marginTop:SceneUtils.autoHeight(4),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(32),
        backgroundColor:'#fcedf4',
        justifyContent:'center'
    },
    inputPhone:{
        width:SceneUtils.autoWidth(351),
        fontSize:SceneUtils.setSpText(13),
        color:'#333333'
    },
    feedbackTypeView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(20),
        flexDirection:'row',
    },
    feedbackTypeLeftView:{
        marginLeft:SceneUtils.autoWidth(23),
        width:SceneUtils.autoWidth(187.5),
        height:SceneUtils.autoHeight(20),
        flexDirection:'row',
        alignItems:'center'
    },
    feedbackTypeRightView:{
        width:SceneUtils.autoWidth(140.5),
        height:SceneUtils.autoHeight(20),
        flexDirection:'row',
        alignItems:'center'
    },
    feedbackTypeSelected:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        borderRadius:SceneUtils.autoWidth(10),
        backgroundColor:'#5bdeb4'
    },
    feedbackTypeUnSelected:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
        borderRadius:SceneUtils.autoWidth(10),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#b2b2b2',
    },
    feedbackTypeText:{
        marginLeft:SceneUtils.autoWidth(4),
        fontSize:SceneUtils.setSpText(15),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(16)
    },
    inputView:{
        marginTop:SceneUtils.autoHeight(8),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(160),
        backgroundColor:'#fcedf4',
    },
    inputText:{
        width:SceneUtils.autoWidth(351),
        fontSize:SceneUtils.setSpText(15),
        color:'#333333'
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    submitText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});