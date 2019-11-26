package com.testyiyayiya;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;
import android.view.SurfaceView;
import android.view.SurfaceHolder;

import com.aliyun.vodplayer.media.AliyunVodPlayer;
import com.aliyun.vodplayer.media.IAliyunVodPlayer;
import com.aliyun.vodplayer.media.AliyunLocalSource;

public class AlvideoView extends RelativeLayout{

    //播放器
    private AliyunVodPlayer mAliyunVodPlayer;
    //视频画面
    private SurfaceView mSurfaceView;

    public AlvideoView(Context context){
        super(context);
        initSurfaceView();
        initVideo(context);
    }
    private void initSurfaceView(){
        mSurfaceView = new SurfaceView(getContext().getApplicationContext());
        addSubView(mSurfaceView);
        SurfaceHolder holder = mSurfaceView.getHolder();
        holder.addCallback(new SurfaceHolder.Callback() {
            @Override
            public void surfaceCreated(SurfaceHolder holder) {
                mAliyunVodPlayer.setDisplay(holder);
            }

            @Override
            public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
                mAliyunVodPlayer.surfaceChanged();
            }

            @Override
            public void surfaceDestroyed(SurfaceHolder holder) {

            }
        });
    }
    private void initVideo(Context context){
        mAliyunVodPlayer = new AliyunVodPlayer(context);
        mAliyunVodPlayer.setAutoPlay(true);

        mAliyunVodPlayer.setOnPreparedListener(new IAliyunVodPlayer.OnPreparedListener() {
            @Override
            public void onPrepared() {
                //准备完成触发
            }
        });
        mAliyunVodPlayer.setOnFirstFrameStartListener(new IAliyunVodPlayer.OnFirstFrameStartListener() {
            @Override
            public void onFirstFrameStart() {
                //首帧显示触发
            }
        });
        mAliyunVodPlayer.setOnErrorListener(new IAliyunVodPlayer.OnErrorListener() {
            @Override
            public void onError(int arg0, int arg1, String msg) {
                //出错时处理，查看接口文档中的错误码和错误消息
            }
        });
        mAliyunVodPlayer.setOnCompletionListener(new IAliyunVodPlayer.OnCompletionListener() {
            @Override
            public void onCompletion() {
                //播放正常完成时触发
            }
        });
        mAliyunVodPlayer.setOnSeekCompleteListener(new IAliyunVodPlayer.OnSeekCompleteListener() {
            @Override
            public void onSeekComplete() {
                //seek完成时触发
            }
        });
        mAliyunVodPlayer.setOnStoppedListner(new IAliyunVodPlayer.OnStoppedListener() {
            @Override
            public void onStopped() {
                //使用stop功能时触发
            }
        });
        mAliyunVodPlayer.setOnChangeQualityListener(new IAliyunVodPlayer.OnChangeQualityListener() {
            @Override
            public void onChangeQualitySuccess(String finalQuality) {
                //视频清晰度切换成功后触发
            }
            @Override
            public void onChangeQualityFail(int code, String msg) {
                //视频清晰度切换失败时触发
            }
        });
        mAliyunVodPlayer.setDisplay(mSurfaceView.getHolder());
        String url = "http://qiniu.xiguangtech.com/201812/54572776cb254be2aa5115d25465861e.mp4?from=app";
        AliyunLocalSource.AliyunLocalSourceBuilder asb = new AliyunLocalSource.AliyunLocalSourceBuilder();
        asb.setSource(url);
        //aliyunVodPlayer.setLocalSource(asb.build());
        AliyunLocalSource mLocalSource = asb.build();
        mAliyunVodPlayer.prepareAsync(mLocalSource);
    }
    private void addSubView(View view){
        LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
        addView(view,params);
    }
    public void stop(){
        mAliyunVodPlayer.stop();
    }
}