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
import Picker from 'react-native-picker';

const relationData = ['爷爷','奶奶','外公','外婆','阿姨','姨夫','舅舅','舅妈','哥哥','姐姐','弟弟','妹妹','嫂嫂','妹夫','婶婶'];
export default class FamilyReviseView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            familys:[{relation:1,des:'爸爸',name:'家长姓名'},{relation:2,des:'妈妈',name:'家长姓名'},{relation:3,des:'奶奶',name:'家长姓名'},{relation:4,des:'爷爷',name:'家长姓名'},{relation:5,des:'外婆',name:'家长姓名'}]
        };
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
        this.props.navigation.goBack();
    }
    //修改按钮点击事件
    onTouchRevise(index){
        console.log('onTouchRevise' + index);
        var crtRelation = this.state.familys[index].des;
        Picker.init({
            pickerTitleText:'关系选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            selectedValue:[crtRelation],
            pickerBg:[255,255,255,1],
            pickerData: relationData,
            pickerFontColor: [33, 33 ,33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var _familys = this.state.familys;
                _familys[index].des = pickedValue[0];
                this.setState({
                    familys:_familys,
                })
            }
        });
        Picker.show();
    }
    //删除按钮点击事件
    onTouchDel(index){
        console.log('onTouchDel' + index);
        var _familys = this.state.familys;
        _familys.splice(index,1);
        this.setState({
            familys:_familys
        })
    }
    //保存按钮点击事件
    onTouchSave(){
        console.log('onTouchSave');
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
                <Text style={styles.titleText}>修改家庭圈</Text>
                <View style={styles.backImg}></View>
            </ImageBackground>
        )
    }
    //显示中间家庭圈面板
    showCenterView(){
        return(
            <View style={styles.centerView}>
                <ImageBackground source = {require('./img/rectangle1.png')} style={styles.centerPanelView}>
                    <View style={styles.centerPanelBgView}>
                        <View style={styles.centerTitleView}>
                            <Text style={styles.familyInfoTitleText}>家庭圈</Text>
                        </View>
                        <View style={styles.centerScrollView}>
                            <ScrollView showsVerticalScrollIndicator = {false}>
                                {this.renderScrollChildView()}
                            </ScrollView>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    //家庭圈关系列表
    renderScrollChildView(){
        var allChild = [];
        var length = this.state.familys.length;
        for(var i = 0;i < length;i++){
            var familyData = this.state.familys[i];
            allChild.push(
                <View key={i} style={[styles.scrollChildView,{marginTop:SceneUtils.autoHeight(i == 0 ? 24 : 20)}]}>
                    <View style={styles.scrollChildLeftView}>
                        <View style={styles.ballView}></View>
                        <Text style={styles.relationText}>{familyData.name}-{familyData.des}</Text>
                    </View>
                    <View style={styles.scrollChildRightView}>
                        {i == 0 ? <Text style={styles.noReviseText}>不可修改</Text>
                                : <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchRevise.bind(this, i)
                                }>
                                    <Text style={styles.reviseText}>修改</Text>
                                </TouchableWithoutFeedback>}
                        {i == 0 ? null : <TouchableWithoutFeedback
                                onPress={
                                    this.onTouchDel.bind(this, i)
                                }>
                                    <Text style={styles.delText}>删除</Text>
                                </TouchableWithoutFeedback>}
                    </View>
                </View>
            );
        }
        return allChild;
    }
    //显示下方保存按钮
    showDownView(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchSave();
                }}>
                <View style={styles.downView}>
                        <Text style={styles.saveText}>保存</Text>
                </View> 
           </TouchableWithoutFeedback>
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
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(647),
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
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#333333'
    },
    centerView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(559),
        alignItems:'center'
    },
    centerPanelView:{
        marginTop:SceneUtils.autoHeight(12.5),
        width:SceneUtils.autoWidth(358),
        height:SceneUtils.autoHeight(521),
        justifyContent:'center',
        alignItems:'center'
    },
    centerPanelBgView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(514),
        backgroundColor:'#f5f7fa',
        borderRadius:SceneUtils.autoWidth(10),
    },
    centerTitleView:{
        width:SceneUtils.autoWidth(351),
        height:SceneUtils.autoHeight(40),
        backgroundColor:'#f0fcf8',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:SceneUtils.autoWidth(10),
        borderTopRightRadius:SceneUtils.autoWidth(10),
    },
    centerScrollView:{
        height:SceneUtils.autoHeight(474),
        alignItems:'center',
    },
    scrollChildView:{
        width:SceneUtils.autoWidth(298),
        height:SceneUtils.autoHeight(18),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    scrollChildLeftView:{
        flexDirection:'row',
        alignItems:'center'
    },
    scrollChildRightView:{
        flexDirection:'row',
        alignItems:'center'
    },
    ballView:{
        width:SceneUtils.autoWidth(18),
        height:SceneUtils.autoWidth(18),
        borderRadius:SceneUtils.autoWidth(9),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#333333',
    },
    relationText:{
        fontSize:SceneUtils.setSpText(16),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#333333',
        marginLeft:SceneUtils.autoWidth(4)
    },
    reviseText:{
        fontSize:SceneUtils.setSpText(14),
        lineHeight:SceneUtils.autoHeight(15),
        color:'#59deb4',
    },
    delText:{
        fontSize:SceneUtils.setSpText(14),
        lineHeight:SceneUtils.autoHeight(15),
        color:'#dc1802',
        marginLeft:SceneUtils.autoWidth(10),
    },
    noReviseText:{
        fontSize:SceneUtils.setSpText(12),
        lineHeight:SceneUtils.autoHeight(13),
        color:'#333333',
    },
    downView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        backgroundColor:'#5bdeb4',
        justifyContent:'center',
        alignItems:'center',
    },
    saveText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa'
    }
});