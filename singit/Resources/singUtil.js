exports.recordSound = {
    set: function() {
        var recording = Ti.Media.createAudioRecorder();
        recording.compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
        recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
        Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
        return recording;
    },
    getRecordTime: function() {
        return 2;
    },
    start: function(recording) {
        recording.start();
        Ti.Media.startMicrophoneMonitor();
    },
    stop: function(recording) {
        file = recording.stop();
        Ti.Media.stopMicrophoneMonitor();
        return file;
    },
    putFile: function(f, file) {
        f.exists() || f.createFile();
        f.write(file);
    }
};

exports.createSound = {
    set: function() {
        var sound = Titanium.Media.createSound();
        return sound;
    },
    start: function() {}
};

exports.countDown = {
    countDownImageViewSet: function() {
        var cntFrames = [ "./campFire12.gif", "./campFire11.gif", "./campFire10.gif", "./campFire09.gif" ], cntView = Titanium.UI.createImageView({
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            images: cntFrames,
            duration: 250,
            opacity: 0.8,
            repeatCount: 1
        });
        return cntView;
    },
    doneSet: function() {}
};

exports.setProgressBar = function(maxTime, startTime) {
    var ind = Titanium.UI.createProgressBar({
        width: 200,
        min: 0,
        max: maxTime,
        value: startTime,
        height: 70,
        color: "#999",
        message: "recording",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        style: Titanium.UI.iPhone.ProgressBarStyle.BAR,
        top: 20
    });
    return ind;
};