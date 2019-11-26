'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  
} from 'react-native';

import RootSibling from 'react-native-root-siblings';
import SceneUtils from '../../utils/SceneUtils';


let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

//协议 纯显示界面
export default class Agreement extends Component {

    //调用此方法显示
    static showAgreement(){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <Agreement/>);
        }
        return rootSibling;
    }

    constructor(props) {
      super(props);
    }
    componentDidMount(){
    }
    onTouchConfirm(){
        destroy();
    }

    render (){
        return (
            <Modal
                animationType='none'
                visible={true}
                transparent = {true}
                onRequestClose  = {
                    ()=>{
                        Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
                    }
                }> 
                <View style={styles.modalStyle}>
                    <View style={styles.modalBg}>
                        <Text style={styles.titleText}>{'用户协议'}</Text>
                        <View style={styles.contentView}>
                            <ScrollView
                                horizontal = {false}
                                showsVerticalScrollIndicator = {false}>
                                <Text style={styles.contentText}>一、用户须知</Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(15)}]}>
                                    {'作为影视软件，《成长星球》拥有完善的软件机制和强大的运行能力。为了各位用户能够更好的享受《成长星球》中的每个精彩时刻，您应该遵守以下守则：'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'一、 用户之间人人平等，这是我们对您进行服务的准则。我们努力使每个用户获得同等质量的服务，您也 应该做到尊重其他用户的权利，不进行任何可能会侵害其他用户软件质量的活动。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'二、 影视软件基于人人互动才能精彩，为了使你在软件世界中拥有更多的朋友，请在软件中注意言行举止，礼貌用语。对于语言污秽的用户，《成长星球》的管理员在获得举报后将会采取禁言等措施进行管理。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'三、 公平是享受软件的前提，正如每一个人都知道的，任何程序都存在BUG，虽然我们已经解决了所有已知的BUG，但是不能排除其他BUG存在的可能性。作为软件用户，应该能够在发现BUG时主动向《成长星球》的管理员汇报。任何用户无论在任何状态下都严禁利用任何《成长星球》可能出现的BUG进行非正常性的获利，这些获利包括但不限于获得额外的虚拟货币，道具物品等。一经发现，《成长星球》的管理者将用户信息等相关内容上报公安机关，因此给《成长星球》带来的任何损失将有用户承担责任；情节严重的，《成长星球》有权通过正当的法律途径对此类用户按照相关法律法规追究其民事/刑事责任。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'四、用户应该自觉不参与以真实货币或者物品换取虚拟物品或软件账号的交易行为，我们将不对这一类交易中产生的任何问题进行支持或者保障。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'五、为了保证软件公平性，《成长星球》的管理员将不会介入到任何用户之间纠纷中去。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'六、 每个用户均有请求软件管理人员帮助的权利，但是，为了能够让更多的人获得帮助，每个用户应该自觉不与软件管理人员闲聊。软件管理人员有权利不回答与工作无关的闲聊话题。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'七、 每个用户均有监督软件管理人员的权利，如果您发现软件管理人员任何违规行为，均可以采用软件提供的截图方式（保障图片真实性）获取现场，并将投诉内容通过客服提交，我们的纪律检查部门将会对该名软件管理员进行检查。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'八、 理解并且遵守《成长星球》颁布的用户守则和服务承诺以及其他规定。'}
                                </Text>
                                <Text style={[styles.contentText,{marginTop:SceneUtils.autoHeight(15)}]}>二、特别提示</Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(15)}]}>
                                    {'“成长星球”同意按照本协议的规定提供基于互联网的相关服务(以下称"网络服务")，为获得网络服务，服务使用人(以下称"用户")应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序和软件过程。用户在进行注册后及软件过程中即表示用户完全接受本协议项下的全部条款。这些条款可由“成长星球”随时更新，《成长星球》服务协议一旦发生变动，“成长星球”将会在相关的页面上提示修改内容。修改后的服务协议一旦在页面上公布即有效代替原来的服务协议。用户在使用《成长星球》提供的各项服务之前，应仔细阅读本服务协议，如用户不同意本服务协议及“成长星球”随时对其内容的修改，用户可以主动取消《成长星球》提供的服务。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'1.释义:'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'本用户服务条款是由用户与“成长星球”所订立的相关权利义务规范。因此，请于注册成为《成长星球》用户前，确实详细阅读本用户服务条款的所有内容，当您注册账户或执行《成长星球》线上软件即视为同意接受本用户服务条款的所有规范并愿受其拘束。本用户服务条款所指线上软件是指用户需要通过计算机等电子设备与服务器联机才可以执行的，由《成长星球》全权运营的多人互动软件软件《成长星球》，《成长星球》包括但不限于：一个单独的计算机程序，其名称或标题为：《成长星球》以及相关的书面文档、图片文件、影片、用户手册（载明软件程序的安装与应用方法）以及与《成长星球》相关的说明书、商标、标识以及任何其他的美术品；以上统称为《成长星球》。用户是指：愿意通过“成长星球”提供的软件途径获得许可（账号和密码）执行线上软件的个人。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'2.著作权声明：'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'《成长星球》的所有相关著作权、专利权、商标、营业秘密及其它任何所有权或权利，均属“《成长星球》”或其原始授权人所有。非经《成长星球》或原始授权人的同意，任何人或用户均不得擅自下载、重制、传输、改作、编辑于任何为线上软件目的以外的使用或任何以获利为目的的使用，否则应负所有法律责任。《成长星球》影视软件运营过程中产生并储存于《成长星球》数据库的任何数据信息（包括但不限于账号数据信息、角色数据信息、等级物品数据信息等，但用户的姓名、身份证号、电话号码等个人身份数据信息除外）的所有权均属于《成长星球》，用户在按照本用户服务条款正常使用《成长星球》影视软件的过程中对属于其用户账号的数据信息享有有限使用权。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'3.用户的基本义务：'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'用户需自行配备联机执行线上软件所需的各项计算机及网络设备，并自行负担上网所需的各项费用。 “《成长星球》”向用户提供影视软件《成长星球》本身属于商业行为，用户有义务根据《成长星球》的相关规定而支付相应的费用。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'4.忠实登录个人资料并更新'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'用户同意在注册时提供完整、详尽、真实的个人资料，若所提供的资料于日后有变更者，应随时在线上进行更新。若用户所提供的资料与事实不符或所提供的资料页已变更而未更新或有任何误导之嫌疑，导致《成长星球》无法为用户提供或进一步提供服务，《成长星球》不会因此承担任何责任。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'5.用户保管账号及密码的义务'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'5.1用户有义务妥善保管在注册并使用《成长星球》时获得的账号及密码，并为此组账号及密码登入系统后所开始的一连串的行为或活动负责。任何以用户账号所进行的网上操作均视同为用户的有效操作行为，由此完成的网上操作指令的结果、网上在线的结果或由此造成的损失，由用户承担全部责任。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'5.2为维护自身权益，用户不应将账号及密码泄漏或提供第三人知悉或出借或软让与他人使用。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'5.3若用户发现账号或密码遭他人非法使用或有异常使用的情形，应当立即通知《成长星球》客户中心进行处理。'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'6.隐私权保护'}
                                </Text>
                                <Text style = {[styles.contentText,{marginTop:SceneUtils.autoHeight(8)}]}>
                                    {'6.1保护用户（特别是未成年人）的隐私是《成长星球》的一项基本政策，因此，若父母（监护人）希望未成年人（尤其是十岁以下子女）得以使用本服务，必须以父母（监护人）名义申请注册，在接受本服务时，应以法定监护人身份加以判断本服务是否符合未成年人。《成长星球》保证不对外公开或向第三方（本条所列情况除外）提供用户注册资料及用户在使用网络服务时存储在《成长星球》的非公开内容，但下列情况除外:'}
                                </Text>
                            </ScrollView>
                        </View>
                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                this.onTouchConfirm();
                            }}>
                            <View style={styles.confirmView}>
                                <Text style={styles.confirmText}>确定</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
}


var styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.screenWidth,
        height: SceneUtils.screenHeight,
        backgroundColor: 'rgba(51,51,51,0.6)',
        justifyContent: 'center',
        alignItems:'center',
    },
    modalBg:{
        width: SceneUtils.autoWidth(290),
        height: SceneUtils.autoHeight(555),
        backgroundColor: '#f5f7fa',
        alignItems: 'center',
        borderRadius:SceneUtils.autoWidth(10),
    },
    titleText:{
        marginTop:SceneUtils.autoHeight(25),
        fontSize:SceneUtils.setSpText(18),
        lineHeight:SceneUtils.autoHeight(19),
        color:'#333333'
    },
    contentView:{
        marginTop:SceneUtils.autoHeight(25),
        width:SceneUtils.autoWidth(230),
        height:SceneUtils.autoHeight(425),
    },
    contentText:{
        fontSize:SceneUtils.setSpText(14),
        lineHeight:SceneUtils.autoHeight(18),
        color:'#333333'
    },
    confirmView:{
        marginTop:SceneUtils.autoHeight(1),
        backgroundColor:'#5bdeb4',
        width:SceneUtils.autoWidth(230),
        height:SceneUtils.autoHeight(40),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(10),
    },
    confirmText:{
        fontSize:SceneUtils.setSpText(18),
        color:'#f5f7fa',
    },


    centerText:{
        alignSelf:'center',
        color:'rgb(230,230,230)'
    },
    leftMargin:{
        marginLeft:SceneUtils.autoWidth(7),
        color:'rgb(230,230,230)'
    },
});