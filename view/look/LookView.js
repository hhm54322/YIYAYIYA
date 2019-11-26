'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import NetService from '../../utils/NetService';
import MyVideoImage from '../../component/MyVideoImage';
import MyVideo from '../../component/MyVideo';

export default class LookView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeIndex:0,
            selectedVideoIndex:-1,
            videoList:[],
            isFullScreen:false
        };
        this.isScrollTo = false;   //跳转位置
        this.positionY = 0;             //设置y的高度
        this.scrollView = null;
        this.myVideo = null;
        this.videoTypeList = [];
        this.videoLayout = null;
    }
    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendContentVideoTypeList((responseJson)=>{
            this.videoTypeList = responseJson;
            this.sendVideoList();
        });
    }
    //生命周期函数，render之前被调用
    componentWillMount(){
        
    }
    //播放的视频滑动到最上方
    componentDidUpdate(){
        if(this.isScrollTo){
            this.isScrollTo = false;
            if(!this.state.isFullScreen){
                setTimeout(() => {
                    this.scrollView.scrollTo({y:this.positionY});
                }, 10);
            }
        }
    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){
        
    }
    //分类标签点击事件
    onTouchTabbar(index){
        if(this.state.selectedTypeIndex != index){
            this.setState({
                selectedTypeIndex:index,
                selectedVideoIndex:-1
            });
            this.scrollView.scrollTo({y:0});
            this.sendVideoList();
        }
    }
    //视频封面点击回调
    onTouchVideoImage(index,layout){
        this.setState({
            selectedVideoIndex:index
        })
        this.setVideoToShow(index,layout);
    }
    //是否视频最大化
    onFullScreen(b){
        this.props.onFullScreen(b);
        this.setState({
            isFullScreen:b,
        })
        this.isScrollTo = true;
    }
    setVideoToShow = (index,layout)=>{
        if(this.myVideo){
            let videoData = this.state.videoList[index];
            var uri = videoData.link;
            var title = videoData.title;
            var totalTime = videoData.duration;
            this.myVideo.setVideoData(false,totalTime,title,uri,index);
        }
        if(this.videoLayout == null){
            this.videoLayout = layout;
        }
        if(this.scrollView){
            var scrollHeight = SceneUtils.autoHeight(227);
            var scrollTo = index * scrollHeight;
            if(this.scrollViewHeight > 0 && scrollTo > this.scrollViewHeight){
                scrollTo = this.scrollViewHeight;
            }
            setTimeout(() => {
                this.positionY = scrollTo;
                this.scrollView.scrollTo({y:scrollTo});
            }, 10);
        }
    }
    //滑动回调
    _onMomentumScrollEnd(event){
        if(this.state.isFullScreen){
            return;
        }
        this.checkVideoIsOutWindow(event.nativeEvent.contentOffset.y);

        var endposition=event.nativeEvent.contentOffset.y;//取得拖拉后的位置
        this.positionY = endposition;
        var _scrollViewHeight = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
        if(_scrollViewHeight != this.scrollViewHeight){
            this.scrollViewHeight = _scrollViewHeight;
        }
        if(endposition > _scrollViewHeight){
            this.positionY = _scrollViewHeight;
            this.scrollView.scrollTo({y:this.positionY});
        }
    }
     //判断他是否超出界面
    checkVideoIsOutWindow(scrollY){
        if(this.state.selectedVideoIndex < 0 || this.myVideo == null) return;
        
        var videoY = this.state.selectedVideoIndex * SceneUtils.autoHeight(227);
        if(videoY < scrollY - SceneUtils.autoHeight(200) || videoY > scrollY + SceneUtils.autoHeight(513)){
            this.myVideo.pauseVideo();
        }
    }
    //获取视频列表
    sendVideoList(){
        NetService.sendContentVideoList(this.videoTypeList[this.state.selectedTypeIndex].id,(responseJson)=>{
            this.setState({
                videoList:responseJson
            })
        });
    }
    //显示上方分类列表
    showTabbarView(){
        if(this.state.isFullScreen){
            return null;
        }
        return(
            <View style={styles.tabbarView}>
                <ScrollView
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    style={styles.tabbarScrollView}
                    >
                    {this.renderTabbarScrollViewChild()}
                </ScrollView>
            </View>
        )
    }
    //显示分类列表子容器
    renderTabbarScrollViewChild(){
        var allChild = [];
        var length = this.videoTypeList.length;
        for(var i = 0;i < length;i++){
            let typeData = this.videoTypeList[i];
            allChild.push(
                <View key={i} style={styles.tabbarScrollChildView}>
                    <TouchableWithoutFeedback
                        onPress={
                            this.onTouchTabbar.bind(this, i)
                        }>
                        <Text style={i == this.state.selectedTypeIndex ? styles.selectedText : styles.unselectedText}>{typeData.name}</Text>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        return allChild;
    }
    //显示下方滚动播放列表
    showVideoScrollView(){
        return(
            <ScrollView
                ref={ref=>{this.scrollView = ref}}
                showsVerticalScrollIndicator = {false}
                onMomentumScrollEnd={(event)=> {
                    this._onMomentumScrollEnd(event);
                }}
                onScrollEndDrag={(event)=> {
                    this._onMomentumScrollEnd(event);
                }}
                // style={styles.videoScrollView}
                >
                {this.renderVideoScrollViewChild()}
                {this.showVideo()}
            </ScrollView>
        )
    }
    //显示播放列表子容器
    renderVideoScrollViewChild(){
        if(this.state.isFullScreen){
            return;
        }
        var allChild = [];
        var length = this.state.videoList.length;
        for(var i = 0;i < length;i++){
            let videoData = this.state.videoList[i];
            allChild.push(
                <View key={i} style={i == 0 ? styles.videoScrollChildView : styles.videoScrollChildView1}>
                    <MyVideoImage
                        source = {videoData.images}
                        style={styles.videoScrollChildView}
                        // resizeMode='contain'
                        resizeMode='cover'
                        title={videoData.title}
                        totalTime={videoData.duration}
                        index={i}
                        onPress={(index,layout) => this.onTouchVideoImage(index,layout)}
                    />
                </View>
            );
        }
        return allChild;
    }
    //显示播放器
    showVideo(){
        if(this.state.selectedVideoIndex == -1){
            return;
        }
        let videoData = this.state.videoList[this.state.selectedVideoIndex];
        return(
            <MyVideo ref= {ref=>{this.myVideo = ref}}
                source={videoData.link}
                sWidth={this.videoLayout.width} 
                sHeight={this.videoLayout.height}
                index={this.state.selectedVideoIndex}
                title={videoData.title}
                totalTime={videoData.duration}
                onFullScreen={(b) => this.onFullScreen(b)}
            />
        )
    }
    render() {
        return (
            <View style={this.props.style}>
                {this.showTabbarView()}
                {this.showVideoScrollView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    tabbarView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(40),
    },
    tabbarScrollView:{
        width:SceneUtils.screenWidth,
    },
    tabbarScrollChildView:{
        width:SceneUtils.autoWidth(62.5),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center',
    },
    selectedText:{
        fontSize:SceneUtils.setSpText(14),
        color:'#5bdeb4',
    },
    unselectedText:{
        fontSize:SceneUtils.setSpText(14),
        color:'#b2b2b2',
    },
    videoScrollView:{
        width:SceneUtils.screenWidth
    },
    videoScrollChildView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(211),
    },
    videoScrollChildView1:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(211),
    },
});