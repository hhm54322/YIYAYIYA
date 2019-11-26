'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
    StatusBar
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import NetService from '../../utils/NetService';
import DateUtil from '../../utils/DateUtil';
import SwitchMode from '../../component/popup/SwitchMode';

export default class BabyMainView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            videoList:[],
        };
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendBabyMainVideoList((responseJson)=>{
            this.setState({
                videoList:responseJson
            })
        });
    }
    //生命周期函数，render之前被调用
    componentWillMount(){

    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){

    }
    //分类按钮点击事件
    onTouchType(){
        const { navigate } = this.props.navigation;
        navigate('SceneTypeView');
    }
    //儿歌按钮点击事件
    onTouchSong(){
        const { navigate } = this.props.navigation;
        navigate('SongView');
    }
    //播放记录按钮点击事件
    onTouchTime(){
        const { navigate } = this.props.navigation;
        navigate('PlaybackRecordView');
    }
    //家长中心按钮点击事件
    onTouchShield(){
        const { navigate } = this.props.navigation;
        SwitchMode.show(2,()=>{
            navigate('Main');
        })
    }
    //分类和集数选择
    onTouchEpisode(_type,_episode){
        let _data = this.state.videoList[_type];
        const { navigate } = this.props.navigation;
        navigate('ChooseEpisodeView',{data:_data,episode:_episode});
    }
    showTopView(){
        return(
            <ImageBackground source = {require('./img/rectangle2.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchType();
                    }}>
                    <View style={styles.titleTypeView}>
                        <Image source = {require('./img/type.png')} style = {styles.titleImg}/>
                        <Text style={styles.titleText}>分类</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchSong();
                    }}>
                    <View style={styles.titleSongView}>
                        <Image source = {require('./img/song.png')} style = {styles.titleImg}/>
                        <Text style={styles.titleText}>儿歌</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Image source = {require('./img/bubble.png')} style = {styles.img}/>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchTime();
                    }}>
                    <View style={styles.titleTimeView1}>
                        <Image source = {require('./img/time.png')} style = {styles.titleImg}/>
                        <Text style={styles.titleText}>播放记录</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchShield();
                    }}>
                    <View style={styles.titleShieldView}>
                        <Image source = {require('./img/shield.png')} style = {styles.titleImg}/>
                        <Text style={styles.titleText}>家长中心</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示视屏分类列表
    showOtherView(){
        return(
            <View style={styles.otherView}>
                <ScrollView showsHorizontalScrollIndicator = {false}
                    horizontal={true}>
                    {this.renderScrollChildView()}
                </ScrollView>
            </View>
        )
    }
    //视频分类列表子元素
    renderScrollChildView(){
        var allChild = [];
        var length = this.state.videoList.length;
        for(var i = 0;i < length;i++){
            let videoData = this.state.videoList[i];
            allChild.push(
                <ImageBackground key={i} source = {require('./img/rectangle1.png')} style={styles.bgPanelView}>
                    <View style={styles.panelView}>
                        <ImageBackground source = {require('./img/rectangle3.png')} style={styles.bgTitleView}>
                            <Text style={styles.bgTitleText}>{videoData.title}</Text>
                        </ImageBackground>
                        <TouchableWithoutFeedback
                            onPress={
                                this.onTouchEpisode.bind(this, i, 0)
                            }>
                            <Image source = {{uri:videoData.cover}} style = {styles.bgCenterImg}/>
                        </TouchableWithoutFeedback>  
                        <View style={styles.bgDownView}>
                            <ScrollView showsHorizontalScrollIndicator = {false}
                                horizontal={true}>
                                {this.renderBgScrollChildView(i)}
                            </ScrollView>
                        </View>
                    </View>
                </ImageBackground>
            )
        }
        return allChild;
    }
    //视屏选集列表子元素
    renderBgScrollChildView(type){
        let videoList = this.state.videoList[type].infoVos;
        var allChild = [];
        var length = videoList.length;
        for(var i = 0;i < length;i++){
            let videoData = videoList[i];
            allChild.push(
                <TouchableWithoutFeedback
                    key={i} 
                    onPress={
                        this.onTouchEpisode.bind(this, type, i)
                    }>
                    <View style={styles.bgScrollChildView}>
                        <Text style={styles.episodeNumText}>第{DateUtil.toChinesNum(i+1)}集</Text>
                        <Text style={styles.episodeTitleText}>{videoData.title}</Text>
                        {videoData.onlyVip == 0 ? null : <ImageBackground source = {require('../../images/graph2.png')} style = {styles.episodeVipIcon}>
                                            <Text style={styles.episodeVipText}>VIP</Text>
                                        </ImageBackground>
                        }
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return allChild;
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                {this.showTopView()}
                {this.showOtherView()}
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
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(54)) / 2,
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(54)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(54),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        transform: [{rotate:'-90deg'}]
    },
    titleTypeView:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        left:SceneUtils.autoHeight(20),
        width:SceneUtils.autoHeight(53),
        height:SceneUtils.autoWidth(62),
        alignItems:'center',
    },
    titleSongView:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        left:SceneUtils.autoHeight(114),
        width:SceneUtils.autoHeight(42),
        height:SceneUtils.autoWidth(62),
        alignItems:'center',
    },
    img:{
        width:SceneUtils.autoHeight(119.5),
        height:SceneUtils.autoWidth(17),
    },
    titleTimeView:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        right:SceneUtils.autoHeight(122),
        width:SceneUtils.autoHeight(42),
        height:SceneUtils.autoWidth(62),
        alignItems:'center',
    },
    titleTimeView1:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        right:SceneUtils.autoHeight(122),
        width:SceneUtils.autoHeight(84),
        height:SceneUtils.autoWidth(62),
        alignItems:'center',
    },
    titleShieldView:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        right:SceneUtils.autoHeight(24),
        width:SceneUtils.autoHeight(84),
        height:SceneUtils.autoWidth(62),
        alignItems:'center',
    },
    titleImg:{
        width:SceneUtils.autoWidth(42),
        height:SceneUtils.autoWidth(42),
    },
    titleText:{
        marginTop:SceneUtils.autoHeight(5),
        fontFamily: 'HYZhengYuan',
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
    },
    otherView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(277.5)) / 2 + SceneUtils.autoWidth(83.75),
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(277.5)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(277.5),
        justifyContent:'center',
        transform: [{rotate:'-90deg'}],
    },
    bgPanelView:{
        width:SceneUtils.autoWidth(322),
        height:SceneUtils.autoWidth(277.5),
        marginLeft:SceneUtils.autoHeight(20.5),
        marginRight:SceneUtils.autoHeight(20.5),
        justifyContent:'center',
        alignItems:'center'
    },
    panelView:{
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoWidth(270.5),
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(28),
        overflow:'hidden'
    },
    bgTitleView:{
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoWidth(31.5),
        justifyContent:'center',
        alignItems:'center',
    },
    bgTitleText:{
        fontSize:SceneUtils.setSpText(18),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    },
    bgCenterImg:{
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoWidth(177)
    },
    bgDownView:{
        marginTop:SceneUtils.autoWidth(8),
        width:SceneUtils.autoWidth(315),
        height:SceneUtils.autoWidth(46),
    },
    bgScrollChildView:{
        width:SceneUtils.autoWidth(113.5),
        height:SceneUtils.autoWidth(45),
        borderBottomLeftRadius:SceneUtils.autoWidth(22),
        borderBottomRightRadius:SceneUtils.autoWidth(22),
        backgroundColor:'#ebebeb',
        marginLeft:SceneUtils.autoWidth(8),
        marginRight:SceneUtils.autoWidth(4),
    },
    episodeNumText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(15),
        fontFamily: 'HYZhengYuan',
        color:'#45e6b3',
        top:SceneUtils.autoWidth(4),
        left:SceneUtils.autoWidth(8)
    },
    episodeTitleText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(12),
        fontFamily: 'HYZhengYuan',
        color:'#666666',
        top:SceneUtils.autoWidth(23),
        left:SceneUtils.autoWidth(8)
    },
    episodeVipIcon:{
        position:'absolute',
        width:SceneUtils.autoWidth(47.5),
        height:SceneUtils.autoWidth(19),
        top:0,
        right:SceneUtils.autoWidth(8),
        justifyContent:'center',
        alignItems:'center'
    },
    episodeVipText:{
        fontSize:SceneUtils.setSpText(13),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    }
});