exports.recordSound = {
    set:function() {
        var recording = Ti.Media.createAudioRecorder();

        // フォーマット作成
        //recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
        recording.compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
        recording.format      = Ti.Media.AUDIO_FILEFORMAT_WAVE;
        Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;

        return recording;
    },
    getRecordTime:function() {
        return 2; 
    },
    start:function(recording) {
        recording.start();
        Ti.Media.startMicrophoneMonitor();
    },
    stop:function(recording) {
        file = recording.stop();
        Ti.Media.stopMicrophoneMonitor();
        return file;
    },
    putFile:function(f, file) {
        if (!f.exists()) {
            f.createFile();
        }
        f.write(file);
    },
};

exports.createSound = {
    set:function() {
        var sound = Titanium.Media.createSound();
        return sound;
    },
    start:function() {
    }
};

exports.countDown = {
    countDownImageViewSet:function() {
        var cntFrames = [
            './campFire12.gif',
            './campFire11.gif',
            './campFire10.gif',
            './campFire09.gif',
        //    './campFire08.gif',
        //    './campFire07.gif',
        //    './campFire06.gif',
        //    './campFire05.gif',
        //    './campFire04.gif',
        //    './campFire03.gif',
        //    './campFire02.gif',
        //    './campFire01.gif'
        ];

        var cntView = Titanium.UI.createImageView({
            height:Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            images: cntFrames,
            duration:250,
            opacity : 0.8, 
            repeatCount:1
        });
        
        return cntView;
    },
    doneSet:function() {
        // 何かあれば
    },

};


exports.setProgressBar = function(maxTime, startTime) {
   var ind=Titanium.UI.createProgressBar({
       width:200,
       min:0,
       max:maxTime,
       value:startTime,
       height:70,
       color:'#999',
       message:'recording',
       font:{fontSize:14, fontWeight:'bold'},
       style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
       top:20
   });
   return ind;
}

