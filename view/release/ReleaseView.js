'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    TextInput,
    Switch
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import SceneUtils from '../../utils/SceneUtils';

//存放数组

export default class ReleaseView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            article:'',         //文章内容
            images: [],
            switchIsOn:false,
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
    //取消按钮点击事件
    onTouchCancel(){
        console.log('onTouchCancel');
        this.props.navigation.goBack();
    }
    //发布按钮点击事件
    onTouchRelease(){
        console.log('onTouchRelease');
    }
    //背景点击事件（让输入弹窗失去焦点以便键盘回收）
    onTouchBg(){
        this.refs.InputText.blur();
    }
    //点击添加图片按钮
    onTouchAddImg(){
        console.log('onTouchAddImg');
        ImagePicker.openPicker({  
            multiple: true  ,
            maxFiles:9 - this.state.images.length
        }).then(images => { 
            var _images = this.state.images;
            for(var i = 0;i<images.length;i++){
                _images.push({uri: images[i].path, width: images[i].width, height: images[i].height, mime: images[i].mime});
            }
            this.setState({
                images: _images
            });
        });

    }
    //显示顶层按钮和标题
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/navigation2.png')} style={styles.topView}>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchCancel();
                    }}>
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.titleText}>{this.props.navigation.state.params.title}</Text>
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchRelease();
                    }}>
                    <Text style={styles.releaseText}>发布</Text>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
    //显示输入文本
    showInputTextView(){
        return(
            <View style={styles.inputTextView}>
                <TextInput ref={'InputText'} style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="分享育儿新鲜事"
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            article: text
                        });
                    }}
                    value={this.state.article}>
                </TextInput>
            </View>
        )
    }
    //显示选择相册和图片
    showImgView(){
        return(
            <View style={styles.imgView}>
                {this.showImgChildren()}
                {this.showAddImgView()}
            </View>
        )
    }
    //显示单张图片数组
    showImgChildren(){
        var length = this.state.images.length;
        var allChild = [];
        for(var i = 0;i < length;i++){
            allChild.push(
                <Image key={i} source = {{uri:this.state.images[i].uri}} style={i == 0 || i == 3 || i == 6 ? styles.img : [styles.img,{marginLeft:SceneUtils.autoWidth(23.5)}]}/>
            )
        }
        return allChild;
    }
    //显示添加图片容器
    showAddImgView(){
        var imagesLength = this.state.images.length;
        if(imagesLength < 9){
            return(
                <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchAddImg();
                    }}>
                    <View style={imagesLength == 0 || imagesLength == 3 || imagesLength == 6 ? styles.addView : [styles.addView,{marginLeft:SceneUtils.autoWidth(23.5)}]}>
                        <Text style={styles.addImg}>+</Text>
                        <Text style={styles.addText}>选择相册</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    //显示分割线
    showLineView(){
        return(
            <View style={styles.lineView}></View>
        )
    }
    //显示下方同步控件
    showDownView(){
        return(
            <View style={styles.downView}>
                <View style={styles.downLeftView}>
                    <Image source = {require('./img/link.png')} style = {styles.linkImg}/>
                    <Text style={styles.linkText}>{this.props.navigation.state.params.title == '家庭圈' ? '同步发布至家庭圈' : '同步发布至社区'}</Text>
                </View>
                <Switch
                    onValueChange={(value) => {
                        this.setState({switchIsOn: value})
                    }}
                    onTintColor='#5bdeb4'
                    value={this.state.switchIsOn} />
            </View>
        )
    }
    render() {
        return (
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchBg();
                }}>
                <View style={styles.container}>
                    {this.showTopView()}
                    {this.showInputTextView()}
                    {this.showImgView()}
                    {this.showLineView()}
                    {this.showDownView()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop:SceneUtils.autoHeight(20),
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(647),
        alignItems:'center',
        backgroundColor:'#f5f7fa',
    },
    topView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(44),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    cancelText:{
        marginLeft:SceneUtils.autoWidth(12),
        fontSize:SceneUtils.setSpText(16),
        color:'#333333'
    },
    titleText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#333333'
    },
    releaseText:{
        marginRight:SceneUtils.autoWidth(12),
        fontSize:SceneUtils.setSpText(16),
        color:'#5bdeb4'
    },
    inputTextView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(311),
    },
    input:{
        width:SceneUtils.autoWidth(311),
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        lineHeight:SceneUtils.autoHeight(16),
    },
    imgView:{
        marginTop:SceneUtils.autoHeight(10.5),
        width:SceneUtils.autoWidth(311),
        flexDirection:'row',
        flexWrap:'wrap',
    },
    img:{
        width:SceneUtils.autoWidth(88),
        height:SceneUtils.autoWidth(88),
        marginTop:SceneUtils.autoHeight(23.5),
    },
    addView:{
        width:SceneUtils.autoWidth(88),
        height:SceneUtils.autoWidth(88),
        marginTop:SceneUtils.autoHeight(23.5),
        borderWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
        justifyContent:'center',
        alignItems:'center',
    },
    addImg:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(40),
        color:'#333333',
        top:SceneUtils.autoWidth(14),
    },
    addText:{
        position:'absolute',
        fontSize:SceneUtils.setSpText(14),
        color:'#333333',
        bottom:SceneUtils.autoWidth(16),
    },
    lineView:{
        width:SceneUtils.autoWidth(311),
        height:SceneUtils.autoHeight(16),
        borderBottomWidth: SceneUtils.autoHeight(0.5),
        borderColor:'#cccccc',
    },
    downView:{
        marginTop:SceneUtils.autoHeight(16),
        width:SceneUtils.autoWidth(311),
        height:SceneUtils.autoHeight(28),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    downLeftView:{
        flexDirection:'row',
        alignItems:'center'
    },
    linkImg:{
        width:SceneUtils.autoWidth(28),
        height:SceneUtils.autoHeight(28),
    },
    linkText:{
        marginLeft:SceneUtils.autoWidth(16),
        fontSize:SceneUtils.setSpText(16),
        color:'#333333',
    }
});