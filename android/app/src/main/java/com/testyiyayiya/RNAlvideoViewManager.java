package com.testyiyayiya;

import android.util.Log;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class RNAlvideoViewManager extends SimpleViewManager<AlvideoView>{

    @Override
    public String getName() {//组件名称
        return "RNAlvideoView";
    }

    @Override
    protected AlvideoView createViewInstance(ThemedReactContext reactContext) {
        Log.d("createViewInstance","createViewInstance");
        //初始化播放器
        return new AlvideoView(reactContext);

    }
    public void onDropViewInstance(AlvideoView view) {//对象销毁时
        Log.d("onDropViewInstance","onDropViewInstance");
        super.onDropViewInstance(view);
        view.stop();//停止播放
    }
}