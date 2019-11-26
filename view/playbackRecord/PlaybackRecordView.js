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

export default class PlaybackRecordView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            playbackRecordList:[],
            isDelState:false
        };
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendPlaybackRecord(0,20,(responseJson)=>{
            this.setState({
                playbackRecordList:responseJson
            })
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
    //清空按钮点击事件
    onTouchClean(){
        NetService.sendDelAllPlaybackRecord((responseJson)=>{
            let _playbackRecordList = this.state.playbackRecordList;
            _playbackRecordList.splice(0,_playbackRecordList.length);
            this.setState({
                playbackRecordList:_playbackRecordList
            })
        })
    }
    //确认按钮点击事件
    onTouchTrue(){
        this.setState({
            isDelState:false
        })
    }
    //删除按钮点击事件
    onTouchDel(){
        this.setState({
            isDelState:true
        })
    }
    //播放记录点击事件
    onTouchPlaybackRecord(index){
        console.log('onTouchPlaybackRecord' + index);
    }
    //播放记录关闭按钮点击事件
    onTouchPlaybackRecordClose(index){
        let id = this.state.playbackRecordList[index].id;
        NetService.sendDelPlaybackRecord(id,(responseJson)=>{
            let _playbackRecordList = this.state.playbackRecordList;
            _playbackRecordList.splice(index,1);
            this.setState({
                playbackRecordList:_playbackRecordList
            })
        })
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
                    <Text style={styles.titleLeftText}>播放记录</Text>
                </View>
                {this.showCleanBtn()}
                {this.showTickBtn()}
                {this.showDelBtn()}
            </ImageBackground>
        )
    }
    //显示清空按钮
    showCleanBtn(){
        if(!this.state.isDelState) return;
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchClean();
                }}>
                    <Image source = {require('./img/clean.png')} style = {styles.cleanImg}/>
            </TouchableWithoutFeedback>
        )
    }
    //显示返回按钮
    showTickBtn(){
        if(!this.state.isDelState) return;
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchTrue();
                }}>
                    <Image source = {require('./img/tick.png')} style = {styles.tureImg}/>
            </TouchableWithoutFeedback>
        )
    }
    //显示删除按钮
    showDelBtn(){
        if(this.state.isDelState) return;
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchDel();
                }}>
                    <Image source = {require('./img/trash.png')} style = {styles.delImg}/>
            </TouchableWithoutFeedback>
        )
    }
    //显示播放记录列表
    showPlaybackRecordListView(){
        return(
            <View style={styles.playbackRecordListView}>
                <ScrollView showsHorizontalScrollIndicator = {false}
                    horizontal={true}>
                    {this.renderScrollChildView()}
                </ScrollView>
            </View>
        )
    }
    //播放记录列表子元素
    renderScrollChildView(){
        var allChild = [];
        var length = this.state.playbackRecordList.length;
        var index = 0;
        for(var i = 0;i < length;i+=2){
            allChild.push(
                <View key={index} style={styles.columnView}>
                    {this.showPlaybackRecordView(i)}
                    {i+1 < length ? this.showPlaybackRecordView(i+1) : null}
                </View>
            )
            index++;
        }
        return allChild;
    }
    //播放记录具体内容
    showPlaybackRecordView(index){
        let data = this.state.playbackRecordList[index];
        return(
            <TouchableWithoutFeedback 
                onPress={
                    this.onTouchPlaybackRecord.bind(this, index)
                }>
                <View style={styles.playbackRecordView}>
                    <ImageBackground source = {require('./img/rectangle1.png')} style={styles.playbackRecordBgImg}>
                        <Image source = {{uri:data.coverURL}} style = {styles.playbackRecordImg}/>
                        <Text style={styles.playbackRecordText}>{data.title}</Text>
                        {this.showPlaybackRecordCloseBtn(index)}
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    //显示播放记录关闭删除按钮
    showPlaybackRecordCloseBtn(index){
        if(!this.state.isDelState) return;
        return(
            <TouchableWithoutFeedback
                onPress={
                    this.onTouchPlaybackRecordClose.bind(this, index)
                }>
                <Image source = {require('./img/cross.png')} style = {styles.closeBtnImg}/>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showPlaybackRecordListView()}
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
    backImg:{
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    titleLeftText:{
        marginLeft:SceneUtils.autoWidth(4),
        fontSize:SceneUtils.setSpText(16),
        fontFamily: 'HYZhengYuan',
        color:'#333333',
    },
    cleanImg:{
        position:'absolute',
        top:SceneUtils.autoWidth(10),
        right:SceneUtils.autoHeight(73),
        width:SceneUtils.autoWidth(94.5),
        height:SceneUtils.autoWidth(34),
    },
    tureImg:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        right:SceneUtils.autoHeight(15),
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    delImg:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        right:SceneUtils.autoHeight(15),
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    playbackRecordListView:{
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
    playbackRecordView:{
        width:SceneUtils.autoWidth(214.5),
        height:SceneUtils.autoWidth(138.5)
    },
    playbackRecordBgImg:{
        width:SceneUtils.autoWidth(214.5),
        height:SceneUtils.autoWidth(138.5),
        alignItems:'center'
    },
    playbackRecordImg:{
        width:SceneUtils.autoWidth(186.5),
        height:SceneUtils.autoWidth(105),
        marginTop:SceneUtils.autoWidth(8.5),
        borderRadius:SceneUtils.autoWidth(11.5),
    },
    playbackRecordText:{
        fontSize:SceneUtils.setSpText(11),
        fontFamily: 'HYZhengYuan',
        color:'#333333',
        width:SceneUtils.autoWidth(186.5),
        marginTop:SceneUtils.autoWidth(5),
    },
    closeBtnImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
        top:0,
        right:0
    }
});