'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Tabbar from './Tabber';

export default class Page3 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:0,
            isFullScreen:false,
        };
    }
    _onTabbarPress(index){
        if(this.state.selectedIndex !== index){
            this.setState({
                selectedIndex:index,
            })
        }
    }
    setSubView(){
        if(this.state.selectedIndex === 0){
            return(
                <Page4 navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 1){
            return(
                <Page5 navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 2){
            return(
                <Page6 navigation={this.props.navigation}/>
            )
        }
    }
    setTabbar(){
        return(
            <View style={styles.tabbarView}>
                <Tabbar 
                    onTabbarPress={(index) => this._onTabbarPress(index)}
                    select={this.state.selectedIndex}
                    isShow={!this.state.isFullScreen}
                />
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subView}>
                    {this.setSubView()}
                </View>
                {this.setTabbar()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
    },
    subView:{
        flex:14,
    },
    tabbarView:{
        flex:1,
        backgroundColor:'rgb(51,51,51)'
    }
});