'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import NetService from '../../utils/NetService';

export default class SceneTypeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeIndex:0,
            videoList:[],
        };
        this.videoTypeList = [];
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendBabyVideoTypeList((responseJson)=>{
            this.videoTypeList = responseJson;
            this.sendVideoList(this.state.selectedTypeIndex);
        });
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
    //分类按钮点击事件
    onTouchType(index){
        if(this.state.selectedTypeIndex != index){
            this.setState({
                selectedTypeIndex:index
            })
            this.sendVideoList(index);
        }
    }
    //视频点击事件
    onTouchPlayVideo(index){
        let _data = this.videoTypeList[this.state.selectedTypeIndex];
        const { navigate } = this.props.navigation;
        navigate('ChooseEpisodeView',{data:_data,episode:0});
    }
    //获取视频列表
    sendVideoList(index){
        NetService.sendBabyVideoList(this.videoTypeList[index].id,0,20,(responseJson)=>{
            this.videoTypeList[index].infoVos = responseJson;
            this.setState({
                videoList:responseJson
            })
        });
    }
    //显示顶部状态栏
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/rectangle3.png')} style={styles.topView}>
                <View style={styles.topLeftView}>
                    <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBack();
                    }}>
                        <Image source = {require('../../images/back2.png')} style = {styles.backImg}/>
                    </TouchableWithoutFeedback>
                     <View style={styles.topTabbarView}>
                        <ScrollView
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                            >
                            {this.renderTabbarScrollViewChild()}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    //显示分类列表子容器
    renderTabbarScrollViewChild(){
        var allChild = [];
        var length = this.videoTypeList.length;
        for(var i = 0;i < length;i++){
            let typeData = this.videoTypeList[i];
            allChild.push(
                <TouchableWithoutFeedback
                    key={i} 
                    onPress={
                        this.onTouchType.bind(this, i)
                    }>
                    <View style={styles.tabbarScrollChildView}>
                        <Text style={this.state.selectedTypeIndex == i ? styles.topTabbarTextSelected : styles.topTabbarTextUnSelected}>{typeData.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return allChild;
    }
    //显示视频列表
    showPlayVideoListView(){
        return(
            <View style={styles.playVideoListView}>
                <ScrollView showsHorizontalScrollIndicator = {false}
                    horizontal={true}>
                    {this.renderScrollChildView()}
                </ScrollView>
            </View>
        )
    }
    //视频列表子元素
    renderScrollChildView(){
        var allChild = [];
        var length = this.state.videoList.length;
        var index = 0;
        for(var i = 0;i < length;i+=2){
            allChild.push(
                <View key={index} style={styles.columnView}>
                    {this.showPlayVideoView(i)}
                    {i+1 < length ? this.showPlayVideoView(i+1) : null}
                </View>
            )
            index++;
        }
        return allChild;
    }
    //视频具体内容
    showPlayVideoView(index){
        let videoData = this.state.videoList[index];
        return(
            <TouchableWithoutFeedback 
                onPress={
                    this.onTouchPlayVideo.bind(this, index)
                }>
                <View style={styles.playVideoView}>
                    <ImageBackground source = {require('./img/rectangle1.png')} style={styles.playVideoBgImg}>
                        <Image source = {{uri:videoData.cover}} style = {styles.playVideoImg}/>
                        <Text style={styles.playVideoText}>{videoData.title}</Text>
                        {videoData.onlyVip == 0 ? null : <ImageBackground source = {require('../../images/graph2.png')} style = {styles.videoVipIcon}>
                                                <Text style={styles.videoVipText}>VIP</Text>
                                            </ImageBackground>}
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showPlayVideoListView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width:SceneUtils.screenWidth,
        height:SceneUtils.screenHeight,
        backgroundColor:'#f5f7fa'
    },
    topView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(50)) / 2,
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(50)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(50),
        flexDirection:'row',
        alignItems:'center',
        transform: [{rotate:'-90deg'}]
    },
    topLeftView:{
        flexDirection:'row',
        marginLeft:SceneUtils.autoHeight(15),
        height:SceneUtils.autoWidth(38),
        alignItems:'center',
    },
    topTabbarView:{
        marginLeft:SceneUtils.autoHeight(34),
        width:SceneUtils.screenHeight - SceneUtils.autoHeight(99),
    },
    tabbarScrollChildView:{
        width:SceneUtils.autoWidth(88),
        justifyContent:'center',
        alignItems:'center',
    },
    topTabbarTextSelected:{
        fontSize:SceneUtils.setSpText(15),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    },
    topTabbarTextUnSelected:{
        fontSize:SceneUtils.setSpText(15),
        fontFamily: 'HYZhengYuan',
        color:'#333333'
    },
    backImg:{
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    playVideoListView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(292)) / 2 + SceneUtils.autoWidth(68.5),
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(292)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(292),
        transform: [{rotate:'-90deg'}],
    },
    columnView:{
        marginLeft:SceneUtils.autoWidth(11.5),
        marginRight:SceneUtils.autoWidth(11.5),
        width:SceneUtils.autoWidth(214.5),
        height:SceneUtils.autoWidth(292),
        justifyContent:'space-between',
    },
    playVideoView:{
        width:SceneUtils.autoWidth(214.5),
        height:SceneUtils.autoWidth(138.5)
    },
    playVideoBgImg:{
        width:SceneUtils.autoWidth(214.5),
        height:SceneUtils.autoWidth(138.5),
        alignItems:'center'
    },
    playVideoImg:{
        width:SceneUtils.autoWidth(186.5),
        height:SceneUtils.autoWidth(105),
        marginTop:SceneUtils.autoWidth(8.5),
        borderRadius:SceneUtils.autoWidth(11.5),
    },
    playVideoText:{
        fontSize:SceneUtils.setSpText(11),
        fontFamily: 'HYZhengYuan',
        color:'#333333',
        width:SceneUtils.autoWidth(186.5),
        marginTop:SceneUtils.autoWidth(5),
    },
    videoVipIcon:{
        position:'absolute',
        width:SceneUtils.autoWidth(47.5),
        height:SceneUtils.autoWidth(19),
        top:SceneUtils.autoWidth(3.5),
        left:SceneUtils.autoWidth(107.25 + 93.25 - 47.5),
        justifyContent:'center',
        alignItems:'center'
    },
    videoVipText:{
        fontSize:SceneUtils.setSpText(13),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    }
});