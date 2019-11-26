'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';

export default class TextBodyView extends Component{
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
    //返回按钮点击事件
    onTouchBack(){
        console.log('onTouchBack');
        this.props.navigation.goBack();
    }
    //更多按钮点击事件
    onTouchMore(){
        console.log('onTouchMore');
    }
    //分享按钮点击事件
    onTouchShare(){
        console.log('onTouchShareTextBody');
    }
    //评论按钮点击事件
    onTouchComment(){
        console.log('onTouchCommentTextBody');
    }
    //点赞按钮点击事件
    onTouchLike(){
        console.log('onTouchLikeTextBody');
    }
    //回复按钮点击事件
    onTouchReply(index){
        console.log('onTouchReply' + index);
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
                <Text style={styles.titleText}>正文</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMore();
                    }}>
                    <Image source = {require('../../images/dots.png')} style = {styles.moreImg}/>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示中间文章部分
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    >
                    {this.showPersonInfoView()}
                    {this.showArticleTextView()}
                    {this.showArticleImgView()}
                    {this.showCommentTitleView()}
                    {this.showCommentAreaList()}
                </ScrollView>
            </View>
        )
    }
    //显示个人信息栏
    showPersonInfoView(){
        return(
            <View style={styles.personInfoView}>
                <Image source = {{uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'}} style = {styles.headImg}/>
                <View style={styles.userView}>
                    <Text style={styles.text}>用户名</Text>
                    <Text style={styles.loginTimeText}>2小时前</Text>
                </View>
            </View>
        )
    }
    //显示文章内容
    showArticleTextView(){
        return(
            <View style={styles.articleTextView}>
                <Text style={styles.articleText}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
            </View>
        )
    }
    //显示文章图片
    showArticleImgView(){
        return(
            <View style={styles.articleImgView}>
                {this.showArticleImgChild()}
            </View>
        )
    }
    //显示文张图片数组
    showArticleImgChild(){
        var allChild = [];
        var imgLength = 8;
        for(var i = 0;i < imgLength;i++){
            allChild.push(
                <Image key={i} source = {{uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'}} style = {i == 0 || i == 3 || i == 6 ? styles.articleImg : [styles.articleImg,{marginLeft:SceneUtils.autoWidth(8)}]}/>
            );
        }
        return allChild;
    }
    //显示评论抬头
    showCommentTitleView(){
        return(
            <View style={styles.commentTitleView}>
                <View style={styles.commentTitleIconView}></View>
                <View style={styles.commentTitleTextView}>
                    <Text style={styles.commentTitleText}>所有评论</Text>
                </View>
            </View>
        )
    }
    //显示评论区内容
    showCommentAreaList(){
        var allChild = [];
        var length = 3;
        for(var i = 0;i < length;i++){
            allChild.push(
                <View key={i} style={styles.commentAreaView}>
                    <View style={styles.commentAreaTopView}>
                        <View style={styles.commentAreaPersonInfoView}>
                            <Image source = {{uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'}} style = {styles.commentAreaHeadImg}/>
                            <View style={styles.commentAreaUserView}>
                                <Text style={styles.commentAreaUserNameText}>用户名</Text>
                                <Text style={styles.commentAreaLoginTimeText}>2小时前</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            onPress ={
                                this.onTouchReply.bind(this, i)
                            }>
                            <View style={styles.commentAreaReplyView}>
                                <Image source = {require('./img/reply.png')} style = {styles.replyImg}/>
                                <Text style={styles.replyText}>回复</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.commentAreaDownView}>
                        <Text style={styles.commentAreaText}>评论内容</Text>
                        {this.showReplyView(i == 0 ? ['回复内容'] : [])}
                    </View>
                </View>
            );
        }
        return allChild;
    }
    //显示回复内容
    showReplyView(replyArr){
        var length = replyArr.length;
        if(length > 0){
            var allChild = [];
            for(var i = 0;i < length;i++){
                allChild.push(
                    <View key={i} style={styles.replyChildView}>
                        <Text style={styles.replyChildText}>用户用户 回复:{replyArr[i]}</Text>
                    </View>
                )
                if(i == length - 1){
                    allChild.push(
                        <View key={i+1} style={styles.replyBottomView}></View>
                    )
                }
            }
            return allChild;
        }else{
            return(
                <View style={styles.commentBottomView}></View>
            )
        }
    }
    //显示底部按钮
    showDownView(){
        return(
            <View style={styles.downView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchShare();
                    }}>
                    <View style={styles.downSubView}>
                        <Image source = {require('../../component/img/share.png')} style = {styles.img}/>
                        <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>分享</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchComment();
                    }}>
                    <View style={styles.downSubView}>
                        <Image source = {require('../../component/img/comment.png')} style = {styles.img}/>
                        <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>123</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchLike();
                    }}>
                    <View style={styles.downSubView}>
                        <Image source = {require('../../component/img/like.png')} style = {styles.img}/>
                        <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>567</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
                {this.showDownView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop:SceneUtils.autoHeight(20),
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
    moreImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoWidth(28),
        marginRight:SceneUtils.autoWidth(12)
    },
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#333333'
    },
    centerView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(574),
    },
    personInfoView:{
        height:SceneUtils.autoHeight(56),
        flexDirection:'row',
        alignItems:'center',
        marginTop:SceneUtils.autoHeight(4),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    headImg:{
        width:SceneUtils.autoWidth(32),
        height:SceneUtils.autoWidth(32),
        borderRadius:SceneUtils.autoWidth(16)
    },
    userView:{
        justifyContent:'center',
        marginLeft:SceneUtils.autoWidth(4),
    },
    text:{
        fontSize:SceneUtils.setSpText(14),
        color:'#333333'
    },
    loginTimeText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2',
    },
    articleTextView:{
        marginTop:SceneUtils.autoHeight(8),
    },
    articleText:{
        width:SceneUtils.autoWidth(351),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(18),
    },
    articleImgView:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:SceneUtils.autoHeight(8),
    },
    articleImg:{
        width:SceneUtils.autoWidth(88),
        height:SceneUtils.autoWidth(88),
    },
    commentTitleView:{
        flexDirection:'row',
        marginTop:SceneUtils.autoHeight(12),
        height:SceneUtils.autoHeight(21),
        alignItems:'center',
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    commentTitleIconView:{
        width:SceneUtils.autoWidth(6),
        height:SceneUtils.autoHeight(13),
        backgroundColor:'#59deb4',
    },
    commentTitleTextView:{
        justifyContent:'center',
        marginLeft:SceneUtils.autoWidth(4),
        width:SceneUtils.autoWidth(341),
        height:SceneUtils.autoHeight(21),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    commentTitleText:{
        fontSize:SceneUtils.setSpText(14),
        color:'#59deb4'
    },
    commentAreaView:{
        marginTop:SceneUtils.autoHeight(12),
    },
    commentAreaTopView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    commentAreaPersonInfoView:{
        height:SceneUtils.autoWidth(32),
        flexDirection:'row',
        marginLeft:SceneUtils.autoHeight(9.5),
    },
    commentAreaHeadImg:{
        width:SceneUtils.autoWidth(32),
        height:SceneUtils.autoWidth(32),
        borderRadius:SceneUtils.autoWidth(16)
    },
    commentAreaUserView:{
        justifyContent:'center',
        marginLeft:SceneUtils.autoWidth(4),
    },
    commentAreaUserNameText:{
        fontSize:SceneUtils.setSpText(12),
        color:'#333333'
    },
    commentAreaLoginTimeText:{
        fontSize:SceneUtils.setSpText(11),
        color:'#b2b2b2',
    },
    commentAreaReplyView:{
        flexDirection:'row',
        alignItems:'center',
        height:SceneUtils.autoHeight(20),
    },
    replyImg:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20),
    },
    replyText:{
        marginLeft:SceneUtils.autoWidth(4),
        fontSize:SceneUtils.setSpText(12),
        color:'#333333'
    },
    commentAreaDownView:{
        marginLeft:SceneUtils.autoWidth(45.5),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    commentAreaText:{
        marginTop:SceneUtils.autoHeight(8),
        width:SceneUtils.autoWidth(305.5),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(18),
    },
    replyChildView:{
        width:SceneUtils.autoWidth(305.5),
        backgroundColor:'#ebebeb',
    },
    replyChildText:{
        marginLeft:SceneUtils.autoHeight(4),
        marginTop:SceneUtils.autoHeight(2),
        width:SceneUtils.autoWidth(301.5),
        fontSize:SceneUtils.setSpText(12),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(14),
    },
    replyBottomView:{
        height:SceneUtils.autoHeight(4),
    },
    commentBottomView:{
        height:SceneUtils.autoHeight(8),
    },
    downView:{
        flexDirection:'row',
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(29),
        borderTopWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    downSubView:{
        width:SceneUtils.autoWidth(117),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    text:{
        fontSize:SceneUtils.setSpText(14),
        color:'#333333'
    },
});