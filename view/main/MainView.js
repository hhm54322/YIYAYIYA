'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import Tabbar from '../../component/Tabbar';
import CollectionView from '../collection/CollectionView';
import FamilyView from '../family/FamilyView';
import NewsView from '../news/NewsView';
import LifeView from '../life/LifeView';
import MineView from '../mine/MineView';




//main界面  包括底部的tabelbtn
export default class MainView extends Component{
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
    _onFullScreen(b){
        this.setState({
            isFullScreen:b,
        })
    }

    //底部tabBtn  根据点击显示不同的界面
    setSubView(){
        if(this.state.selectedIndex === 0){
            return(
                <CollectionView navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 1){
            return(
                <FamilyView navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 2){
            return(
                <NewsView navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 3){
            return(
                <LifeView navigation={this.props.navigation}/>
            )
        }else{
            return(
                <MineView navigation={this.props.navigation}/>
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
                <StatusBar hidden={false}/>
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
        justifyContent:'space-between',
    },
    subView:{
    },
    tabbarView:{
        backgroundColor:'rgb(51,51,51)'
    }
});