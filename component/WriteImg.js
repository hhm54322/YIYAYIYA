'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import SceneUtils from '../utils/SceneUtils';


export default class WriteImg extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.writeView}>
                <TouchableWithoutFeedback onPress={() =>{
                    this.props.onTouchWrite();
                }}>
                    <Image source = {require('./img/write.png')} style = {styles.writeImg}/>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    writeView:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:SceneUtils.autoHeight(454),
        width:SceneUtils.autoWidth(60),
        height:SceneUtils.autoWidth(48),
    },
    writeImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(48),
        height:SceneUtils.autoWidth(48),
    },
});