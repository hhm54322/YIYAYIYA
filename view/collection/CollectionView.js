'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import SwitchMode from '../../component/popup/SwitchMode';
import NetService from '../../utils/NetService';

export default class CollectionView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collectionList:[]
        }
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendCollectionList((responseJson)=>{
            this.setState({
                collectionList:responseJson
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
    //子控件点击事件
    onScrollViewChildPress(index){
        const { navigate } = this.props.navigation;
        navigate('LinkView',{url:this.state.collectionList[index].referenceUrl});
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
                <Text style={styles.titleText}>集合</Text>
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
        var length = this.state.collectionList.length;
        for(var i = 0;i < length;i++){
            let data = this.state.collectionList[i];
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
                {this.showCollectionScrollView()}
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
    scrollView:{
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(553),
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
        borderRadius:SceneUtils.autoWidth(10),
    }
});