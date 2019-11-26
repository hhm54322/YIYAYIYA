'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    StatusBar,
    ImageBackground
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import SwitchMode from '../../component/popup/SwitchMode';
import NetService from '../../utils/NetService';

export default class NewsView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newsList:null
        }
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendNewsList((responseJson)=>{
            this.setState({
                newsList:responseJson
            })
        });
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
    //置顶图片点击事件
    onTouchSticks(){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.newsList.sticks[0].referenceUrl});
    }
    //已报名按钮点击事件
    onTouchCircle1(){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.newsList.sticks[0].url1});
    }
    //海选须知按钮点击事件
    onTouchCircle2(){
        console.log('onTouchCircle2');
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.newsList.sticks[0].url2});
    }
    //报名流程按钮点击事件
    onTouchCircle3(){
        console.log('onTouchCircle3');
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.newsList.sticks[0].url3});
    }
    //子控件点击事件
    onScrollViewChildPress(index){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.newsList.activities[index].referenceUrl});
    }
    //显示顶层按钮和标题
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/navigation.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMessage();
                    }}>
                    <Image source = {require('../../images/message.png')} style = {styles.messageImg}/>
                </TouchableWithoutFeedback>
                <Text style={styles.titleText}>资讯</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchBaby();
                    }}>
                    <Image source = {require('../../images/baby.png')} style = {styles.babyImg}/>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示中间报名内容
    showCenterView(){
        if(this.state.newsList == null) return;
        return(
            <View style={styles.centerView}>
                <ImageBackground source = {require('./img/rectangle1.png')} style={styles.activityBgImg}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchSticks();
                        }}>
                        <Image source = {{uri:this.state.newsList.sticks[0].referenceImg}} style = {styles.activityImg}/>
                    </TouchableWithoutFeedback>
                </ImageBackground>
                <View style={styles.centerSubView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchCircle1();
                        }}>
                        <View style={styles.btnView}>
                            <Image source = {require('./img/circle1.png')} style = {styles.btnImg}/>
                            <Text style={styles.btnText}>已报名</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchCircle2();
                        }}>
                        <View style={styles.btnView}>
                            <Image source = {require('./img/circle2.png')} style = {styles.btnImg}/>
                            <Text style={styles.btnText}>海选须知</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchCircle3();
                        }}>
                        <View style={styles.btnView}>
                            <Image source = {require('./img/circle3.png')} style = {styles.btnImg}/>
                            <Text style={styles.btnText}>报名流程</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </View>
            </View>
        )
    }
    //显示集合内容滚动控件
    showNewsScrollView(){
        if(this.state.newsList == null) return;
        return(
            <ScrollView
                showsVerticalScrollIndicator = {false}
                style={styles.scrollView}
                >
                {this.renderScrollViewChild()}
            </ScrollView>
        )
    }
    //滚动控件的子元素
    renderScrollViewChild(){
        var allChild = [];
        var length = this.state.newsList.activities.length;
        for(var i = 0;i < length;i++){
            let data = this.state.newsList.activities[i];
            allChild.push(
                <ImageBackground key={i} source = {require('./img/rectangle1.png')} style={styles.scrollChildBgImg}>
                    <TouchableWithoutFeedback
                        onPress={this.onScrollViewChildPress.bind(this, i)}>
                        <Image source = {{uri:data.referenceImg}} style = {styles.scrollChildImg}/>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            );
        }
        return allChild;
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showCenterView()}
                {this.showNewsScrollView()}
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
    centerView:{
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(266),
        borderBottomWidth: 1,
        borderColor:'#cccccc',
        marginTop:SceneUtils.autoHeight(16),
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
    activityBgImg:{
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(182.5),
        justifyContent:'center',
        alignItems:'center'
    },
    activityImg:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(175.5),
        resizeMode:'stretch',
        borderRadius:SceneUtils.autoWidth(10)
    },
    centerSubView:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:SceneUtils.autoWidth(345),
        height:SceneUtils.autoHeight(66),
        marginTop:SceneUtils.autoHeight(8.5),
    },
    btnView:{
        alignItems:'center',
        width:SceneUtils.autoWidth(52),
        height:SceneUtils.autoHeight(66),
    },
    btnImg:{
        width:SceneUtils.autoWidth(50),
        height:SceneUtils.autoWidth(50),
    },
    btnText:{
        marginTop:SceneUtils.autoHeight(4),
        fontSize:SceneUtils.setSpText(12),
        color:'#333333'
    },
    scrollView:{
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(271)
    },
    scrollChildBgImg:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(182.5),
        justifyContent:'center',
        alignItems:'center'
    },
    scrollChildImg:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(175.5),
        resizeMode:'stretch',
        borderRadius:SceneUtils.autoWidth(10)
    }
});