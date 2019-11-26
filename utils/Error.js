import FloatText from '../component/FloatText';

//显示异常时候的浮动文字
export class Error {
    static errorfloat = (res)=>{
        FloatText.show(JSON.parse(res._bodyText).message);
    }
}