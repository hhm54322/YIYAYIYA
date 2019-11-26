'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    StatusBar
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import CommunityView from '../community/CommunityView';
import LookView from '../look/LookView';
import ShoppingView from '../shopping/ShoppingView';
import SwitchMode from '../../component/popup/SwitchMode';

export default class LifeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:0
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
    //信息按钮点击事件
    onTouchMessage(){
        const { navigate } = this.props.navigation;
        navigate('InformationView');
    }
    //宝宝按钮点击事件
    onTouchBaby(){
        const { navigate } = this.props.navigation;
        SwitchMode.show(0,()=>{
            navigate('BabyMain');
        })
    }
    //标题按钮点击事件
    onTouchTitle(index){
        if(this.state.selectedIndex != index){
            this.setState({
                selectedIndex:index,
                isFullScreen:false
            })
        }
    }
    //子控件点击事件
    onScrollViewChildPress(index){
        console.log('onScrollViewChildPress' + index);
    }
    //是否全屏
    onFullScreen(b){
        this.setState({
            isFullScreen:b,
        })
    }
    //显示顶层按钮和标题
    showTopView(){
        if(this.state.isFullScreen){
            return null;
        }
        return(
            <ImageBackground source = {require('../../images/navigation.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMessage();
                    }}>
                    <Image source = {require('../../images/message.png')} style = {styles.messageImg}/>
                </TouchableWithoutFeedback>
                <View style={styles.titleTabbarView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchTitle(0);
                        }}>
                        <View style={styles.titleView}>
                            <View style={styles.selectedLine}/>
                            <Text style={this.state.selectedIndex == 0 ? styles.titleTextSelected : styles.titleText}>社区</Text>
                            {this.state.selectedIndex == 0 ? <View style={[styles.selectedLine/**,{backgroundColor:'#de9bb0'} */]}/> : <View style={styles.selectedLine}/>}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchTitle(1);
                        }}>
                        <View style={styles.titleView}>
                            <View style={styles.selectedLine}/>
                            <Text style={this.state.selectedIndex == 1 ? styles.titleTextSelected : styles.titleText}>爱看</Text>
                            {this.state.selectedIndex == 1 ? <View style={[styles.selectedLine/**,{backgroundColor:'#de9bb0'} */]}/> : <View style={styles.selectedLine}/>}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchTitle(2);
                        }}>
                        <View style={styles.titleView}>
                            <View style={styles.selectedLine}/>
                            <Text style={this.state.selectedIndex == 2 ? styles.titleTextSelected : styles.titleText}>商城</Text>
                            {this.state.selectedIndex == 2 ? <View style={[styles.selectedLine/**,{backgroundColor:'#de9bb0'} */]}/> : <View style={styles.selectedLine}/>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBaby();
                    }}>
                    <Image source = {require('../../images/baby.png')} style = {styles.babyImg}/>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //根据选择的tabbar显示view
    showTabbarView(){
        if(this.state.selectedIndex == 0){
            return(
                <CommunityView style={styles.communityStyle} navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex == 1){
            return(
                <LookView style={this.state.isFullScreen ? styles.fullScreen : styles.lookStyle} navigation={this.props.navigation}
                onFullScreen={(b) => this.onFullScreen(b)}/>
            )
        }else if(this.state.selectedIndex == 2){
            return(
                <ShoppingView style={styles.shoppingStyle} navigation={this.props.navigation}/>
            )
        }
    }
    render() {
        return (
            <View style={this.state.isFullScreen ? styles.containerFull : styles.container}>
                <StatusBar hidden={this.state.isFullScreen}/>
                {this.showTopView()}
                {this.showTabbarView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop:SceneUtils.autoHeight(20),
        alignItems:'center',
        backgroundColor:'#ededed'
    },
    containerFull: {
        alignItems:'center',
        backgroundColor:'#ededed'
    },
    topView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    messageImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginLeft:SceneUtils.autoWidth(12)
    },
    babyImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginRight:SceneUtils.autoWidth(12)
    },
    titleTabbarView:{
        width:SceneUtils.autoWidth(240),
        height:SceneUtils.autoWidth(44),
        flexDirection:'row',
    },
    titleView:{
        width:SceneUtils.autoHeight(80),
        height:SceneUtils.autoWidth(44),
        justifyContent:'space-between',
        alignItems:'center'
    },
    titleText:{
        marginTop:SceneUtils.autoHeight(3),
        fontSize:SceneUtils.setSpText(16),
        color:'#69bfa4'
    },
    titleTextSelected:{
        marginTop:SceneUtils.autoHeight(3),
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    },
    selectedLine:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoHeight(3),
    },
    communityStyle:{
        height:SceneUtils.autoHeight(553),
    },
    lookStyle:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(553),
    },
    fullScreen:{
        width:SceneUtils.screenHeight,
        height:SceneUtils.screenWidth,
    },
    shoppingStyle:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(553),
    }
});