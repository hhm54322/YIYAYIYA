'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import SceneUtils from '../utils/SceneUtils';
import DateUtil from '../utils/DateUtil';


export default class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    //更多按钮点击事件
    onTouchMore(index){
        this.props.onTouchMore(index);
    }
    //文章点击事件
    onTouchArticle(index){
        this.props.onTouchArticle(index);
    }
    //分享按钮点击事件
    onTouchShare(index){
        this.props.onTouchShare(index);
    }
    //评论按钮点击事件
    onTouchComment(index){
        this.props.onTouchComment(index);
    }
    //点赞按钮点击事件
    onTouchLike(index){
        this.props.onTouchLike(index);
    }
    //显示文章图片滚动控件
    showImgScrollView(){
        return(
            <ScrollView
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                style={styles.imgScrollView}
                >
                {this.renderImgScrollViewChild()}
            </ScrollView>
        )
    }
    //文章图片滚动控件子元素
    renderImgScrollViewChild(){
        var allChild = [];
        var length = 10;
        for(var i = 0;i < length;i++){
            allChild.push(
                <Image key={i} source = {{uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'}} style = {i == 0 ? styles.imgScrollChildImg : [styles.imgScrollChildImg,{marginLeft:SceneUtils.autoWidth(8)}]}/>
            );
        }
        return allChild;
    }
    //滚动控件的子元素
    renderScrollViewChild(){
        var allChild = [];
        var length = 10;
        var styleOther = {};
        var styleCenter = {};
        for(var i = 0;i < length;i++){
            if(i == 0){
                styleOther = {height:SceneUtils.autoHeight(161.5)}
                styleCenter = {height:SceneUtils.autoHeight(92.5)}
            }else{
                styleOther = {height:SceneUtils.autoHeight(261.5)}
                styleCenter = {height:SceneUtils.autoHeight(192.5)}
            }
            allChild.push(
                <View key={i} style={[styles.scrollChildView,styleOther]}>
                    <View style={[styles.scrollChildSubView]}>
                        <View style={styles.scrollChildSubTopView}>
                            <View style={styles.scrollChildSubTopLeftView}>
                                <Image source = {{uri:'http://img1.3lian.com/2015/w7/85/d/101.jpg'}} style = {styles.headImg}/>
                                <View style={styles.userView}>
                                    <Text style={styles.text}>用户名</Text>
                                    <Text style={styles.loginTimeText}>2小时前</Text>
                                </View>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchMore.bind(this, i)
                                }>
                                <Image source = {require('../images/dots.png')} style = {styles.img}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.scrollChildSubCenterView,styleCenter]}>
                            <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchArticle.bind(this, i)
                                }>
                                <View>
                                    <Text style={styles.article}>{DateUtil.getArticleText('内容内容12内容ss内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',216)}</Text>
                                    <View style={styles.fullTextView}>
                                        <Image source = {require('./img/display.png')} style = {styles.img}/>
                                        <Text style={styles.fullText}>全文</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {i == 0 ? null : this.showImgScrollView()}
                        </View>
                        <View style={styles.scrollChildSubDownView}>
                            <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchShare.bind(this, i)
                                }>
                                <View style={styles.downSubView}>
                                    <Image source = {require('./img/share.png')} style = {styles.img}/>
                                    <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>分享</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchComment.bind(this, i)
                                }>
                                <View style={styles.downSubView}>
                                    <Image source = {require('./img/comment.png')} style = {styles.img}/>
                                    <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>123</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchLike.bind(this, i)
                                }>
                                <View style={styles.downSubView}>
                                    <Image source = {require('./img/like.png')} style = {styles.img}/>
                                    <Text style={[styles.text,{marginLeft:SceneUtils.autoWidth(4)}]}>567</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            );
        }
        return allChild;
    }
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator = {false}
                style={styles.scrollView}
                >
                {this.renderScrollViewChild()}
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    scrollView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(553),
    },
    scrollChildView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.screenWidth,
        alignItems:'center',
        backgroundColor:'white'
    },
    scrollChildSubView:{
        width:SceneUtils.autoWidth(351),
    },
    scrollChildSubTopView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:SceneUtils.autoHeight(40),
        borderBottomWidth: 1,
        borderColor:'#cccccc',
    },
    scrollChildSubCenterView:{
        
    },
    scrollChildSubDownView:{
        flexDirection:'row',
        height:SceneUtils.autoHeight(29),
        borderTopWidth: 1,
        borderColor:'#cccccc',
    },
    img:{
        width:SceneUtils.autoWidth(20),
        height:SceneUtils.autoWidth(20)
    },
    scrollChildSubTopLeftView:{
        flexDirection:'row',
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
    downSubView:{
        width:SceneUtils.autoWidth(117),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    article:{
        fontSize:SceneUtils.setSpText(14),
        // letterSpacing:SceneUtils.autoWidth(0.112),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#333333'
    },
    fullTextView:{
        position:'absolute',
        width:SceneUtils.autoWidth(52),
        height:SceneUtils.autoHeight(20),
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-end',
        marginTop:SceneUtils.autoHeight(72.5)
    },
    fullText:{
        fontSize:SceneUtils.setSpText(14),
        marginLeft:SceneUtils.autoWidth(4),
        color:'#333333'
    },
    imgScrollView:{
        marginTop:SceneUtils.autoHeight(8),
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(88),
    },
    imgScrollChildImg:{
        width:SceneUtils.autoWidth(88),
        height:SceneUtils.autoWidth(88),
    }
});