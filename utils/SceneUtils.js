import Dimensions from 'Dimensions';
import {
    PixelRatio,
  } from 'react-native';


  //屏幕大小自适应等帮助类
const SceneUtils = {
    uiWidth: 375,//iphone6宽
    uiHeight: 667,//iphone6高
    pixel: 1 / PixelRatio.get(),
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    pixelRatio: PixelRatio.get(),
    fontScale: PixelRatio.getFontScale(),
    scale: Math.min(Dimensions.get('window').height / 667, Dimensions.get('window').width / 375),

    /*宽度适配，例如某个样式宽度是50pt，那么使用就是：SceneUtils.autoWidth(50)*/
    autoWidth: function (value) {
        return Dimensions.get('window').width * value / this.uiWidth;
    },
    /*高度适配，例如某个样式高度是50pt，那么使用就是：SceneUtils.autoheight(50)*/
    autoHeight: function (value) {
        return Dimensions.get('window').height * value / this.uiHeight;
    },
    /*字体大小适配，例如字体大小是17pt，那么使用就是：SceneUtils.setSpText(17)*/
    setSpText: function (number) {
        number = Math.round((number * this.scale + 0.5) * this.pixelRatio / this.fontScale);
        return number / PixelRatio.get();
    }
};


export default SceneUtils;