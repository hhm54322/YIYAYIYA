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

export default class AddressListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
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
    //邀请按钮按钮点击事件
    onTouchAddressList(index){
        console.log('onTouchAddressList' + index);
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
                <Text style={styles.titleText}>通讯录</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间通讯录列表
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <View style={styles.titleView}>
                    <Text style={styles.contactText}>联系人（{'999'}）</Text>
                </View>
                {this.showContactView('姓名','13601731716',false,'')}
                {this.showContactView('姓名','13601731717',true,'妈妈')}
            </View>
        )
    }
    //联系人信息
    showContactView(name,phone,isFamily,relation){
        return(
            <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchAddressList(0);
                    }}>
                <View style={styles.contactView}>
                    <Text style={styles.nameText}>{isFamily ? name + '-' + relation : name}</Text>
                    <Text style={styles.phoneText}>{phone}</Text>
                    {isFamily ? <Text style={styles.stateText}>已开通</Text>
                            :   <View style={styles.relationView}>
                                    <Text style={styles.relationText}>开通</Text>
                                </View>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
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
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(601),
    },
    titleView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(28.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        justifyContent:'center'
    },
    contactText:{
        marginLeft:SceneUtils.autoWidth(12),
        fontSize:SceneUtils.setSpText(11),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(12),
    },
    contactView:{
        marginLeft:SceneUtils.autoWidth(40),
        width:SceneUtils.autoWidth(335),
        height:SceneUtils.autoHeight(48),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    nameText:{
        position:'absolute',
        left:0,
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    phoneText:{
        width:SceneUtils.autoWidth(120),
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    stateText:{
        width:SceneUtils.autoWidth(52),
        position:'absolute',
        right:SceneUtils.autoWidth(12),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        textAlign:'center'
    },
    relationView:{
        position:'absolute',
        right:SceneUtils.autoWidth(12),
        width:SceneUtils.autoWidth(52),
        height:SceneUtils.autoHeight(26),
        backgroundColor:'#5bdeb4',
        borderRadius:SceneUtils.autoWidth(4),
        justifyContent:'center',
        alignItems:'center'
    },
    relationText:{
        fontSize:SceneUtils.setSpText(14),
        color:'#f5f7fa'
    }
});