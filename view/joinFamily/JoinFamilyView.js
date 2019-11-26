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

export default class JoinFamilyView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code:''
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
        this.refs.InputText.blur();
    }
    //下一步按钮点击事件
    onTouchNext(){
        console.log('onTouchNext');
        if(this.state.code != ''){
            const { navigate } = this.props.navigation;
            navigate('JoinFamilyNextView',{code:this.state.code});
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
                <Text style={styles.titleText}>宝宝信息</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间信息内容
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <Text style={styles.centerText}>请输入宝宝的邀请码</Text>
                <View style={styles.inputView}>
                    <TextInput ref={'InputText'}  style={styles.inputCode}
                        underlineColorAndroid='transparent'
                        placeholder="请输入邀请码"
                        onChangeText={(text) => {
                            this.setState({
                                code: text
                            });
                        }}
                        value={this.state.code}>
                    </TextInput>
                </View>
            </View>
        )
    }
    //显示下方下一步按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchNext();
                }}>
                <View style={styles.downView}>
                    <Text style={styles.nextText}>下一步</Text>
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
    centerText:{
        marginTop:SceneUtils.autoHeight(152),
        fontSize:SceneUtils.setSpText(18),
        color:'#b2b2b2'
    },
    inputView:{
        marginTop:SceneUtils.autoHeight(4),
        width:SceneUtils.autoWidth(166),
        height:SceneUtils.autoHeight(41),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#b2b2b2',
        justifyContent:'center',
        alignItems:'center'
    },
    inputText:{
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    nextText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});