'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import WriteImg from '../../component/WriteImg';
import Article from '../../component/Article';
import SwitchMode from '../../component/popup/SwitchMode';

export default class FamilyView extends Component{
    constructor(props) {
        super(props);
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
    //更多按钮点击事件
    onTouchMore(index){
        console.log('onTouchMoreFamily' + index);
    }
    //文章点击事件
    onTouchArticle(index){
        console.log('onTouchArticleFamily' + index);
        const { navigate } = this.props.navigation;
        navigate('TextBodyView');
    }
    //分享按钮点击事件
    onTouchShare(index){
        console.log('onTouchShareFamily' + index);
    }
    //评论按钮点击事件
    onTouchComment(index){
        console.log('onTouchCommentFamily' + index);
    }
    //点赞按钮点击事件
    onTouchLike(index){
        console.log('onTouchLikeFamily' + index);
    }
    //写文章按钮点击事件
    onTouchWrite(){
        console.log('onTouchWriteFamily');
        const { navigate } = this.props.navigation;
        navigate('ReleaseView',{title:'家庭圈'});
    }
    //显示顶层按钮和标题
    showTopView(){
        return(
            <ImageBackground ImageBackground source = {require('../../images/navigation.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMessage();
                    }}>
                    <Image source = {require('../../images/message.png')} style = {styles.messageImg}/>
                </TouchableWithoutFeedback>
                <Text style={styles.titleText}>家庭圈</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBaby();
                    }}>
                    <Image source = {require('../../images/baby.png')} style = {styles.babyImg}/>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示集合内容滚动控件
    showCollectionScrollView(){
        return(
            <Article 
                onTouchMore={(index) => this.onTouchMore(index)}
                onTouchArticle={(index) => this.onTouchArticle(index)}
                onTouchShare={(index) => this.onTouchShare(index)}
                onTouchComment={(index) => this.onTouchComment(index)}
                onTouchLike={(index) => this.onTouchLike(index)}
            />
        )
    }
    //显示写文章图标
    showWriteImg(){
        return(
            <WriteImg onTouchWrite={() => this.onTouchWrite()}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCollectionScrollView()}
                {this.showWriteImg()}

                <TouchableWithoutFeedback
                    onPress ={()=>{
                        
                    }}>
                    <View style={styles.bg}>
                        <Text style={styles.bgText}>后期阶段调试内容</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    },



    bg:{
        position:'absolute',
        width:SceneUtils.screenWidth,
        height:SceneUtils.screenHeight,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.8)',
    },
    bgText:{
        fontSize:40,
        color:'white'
    }
});