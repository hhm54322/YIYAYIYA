'use strict';
import React, {Component} from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Text
} from 'react-native';

import WriteImg from '../../component/WriteImg';
import Article from '../../component/Article';

export default class CommunityView extends Component{
    constructor(props) {
        super(props);
    }
    //更多按钮点击事件
    onTouchMore(index){
        console.log('onTouchMoreCommunity' + index);
    }
    //文章点击事件
    onTouchArticle(index){
        console.log('onTouchArticleCommunity' + index);
        const { navigate } = this.props.navigation;
        navigate('TextBodyView');
    }
    //分享按钮点击事件
    onTouchShare(index){
        console.log('onTouchShareCommunity' + index);
    }
    //评论按钮点击事件
    onTouchComment(index){
        console.log('onTouchCommentCommunity' + index);
    }
    //点赞按钮点击事件
    onTouchLike(index){
        console.log('onTouchLikeCommunity' + index);
    }
    //写文章按钮点击事件
    onTouchWrite(){
        console.log('onTouchWriteCommunity');
        const { navigate } = this.props.navigation;
        navigate('ReleaseView',{title:'社区'});
    }
    //显示滚动控件内容
    showCommunityScrollView(){
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
            <View style={this.props.style}>
                {this.showCommunityScrollView()}
                {this.showWriteImg()}
                
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        
                    }}>
                    <View style={{position:'absolute',
    width:375,
    height:700,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.8)',}}>
                        <Text style={{fontSize:40,
    color:'white'}}>后期阶段调试内容</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}