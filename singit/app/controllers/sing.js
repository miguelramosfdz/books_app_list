var recording = require("singUtil").recordSound.set();
var f = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory + '/' + 'recording_file.wav');
var recordTime   = require("singUtil").recordSound.getRecordTime();

var sound      = null;
var startRecordTime = recordTime;
var startSoundTime  = 0;
var soundDuration = 0;
var file       = null;
var ind        = null;
var interval   = null;
var cntDownWin = null;
var cntDownImageView = null;
var soundStartFlag   = false;

/*
 *  ボタン隠し
 */
$.stop.hide();
$.soundCheck.hide();
$.done.hide();


/*
 * 歌う-> カウントダウン -> 停止ボタン表示
 *
 *
 */
$.song.on('click',function() {
    if (!recording.recording) {

        cntDownImageView = require("singUtil").countDown.countDownImageViewSet();
        $.win.add(cntDownImageView);
        cntDownImageView.start();
        cntDownImageView.stop();

        cntDownImageView.addEventListener('stop', function() {
            $.recordStart();
            interval = setInterval(function() {
                if (!recording.stopd) {
                    if (0.1 > ind.value) {
                        $.recordStop();
                        return;
                    }
                    ind.message = Math.floor(ind.value) + ' / ' + recordTime; 
                    ind.value -= 0.2;
                }
            }, 200);
        });
    }
});

$.stop.on('click', function() {
    if (recording.recording) {
        $.recordStop();
    } 
});

$.soundCheck.on('click', function() {


    if (soundStartFlag === true) {
        if (sound.paused) {
            sound.play();
            $.soundCheck.backgroundImage='b3.png';
        } else {
            sound.pause();
            $.soundCheck.backgroundImage='b1.jpg';
        }
    }

    if (!recording.recording && soundStartFlag === false) {
        $.startSound();
        $.soundCheck.backgroundImage='b3.png';
        interval = setInterval(function(){
            if (sound.isPlaying()) {
                ind.message = Math.floor(ind.value) + ' / ' + soundDuration;
                ind.value += 0.1;
            }
        }, 100);
        sound.addEventListener('complete', function(){
            $.stopSound(); 
        });
    }

});

$.done.on('click', function() {
    var alertDialog = Titanium.UI.createAlertDialog({
        title: 'プロフィール設定しますか？',
        buttonNames: ['登録する','後で'],
        cancel: 1
    });

    alertDialog.addEventListener('click',function(e){
        var userInfo = require('user_info');
        // OK
        // プロフィール設定画面へ
        if(e.index == 0){
        }
        // 後で
        // 歌データ登録
        if(e.cancel){
            var uniqVal  = userInfo.get('id') + '_' + userInfo.get('uid');
            var fileName = Titanium.Utils.md5HexDigest(uniqVal + '_' + parseInt( new Date() /1000 )) + '.wav';
            var filePath = 'singit-' + Titanium.Utils.md5HexDigest(uniqVal).slice(0, 3)
                        + '/' + Titanium.Utils.md5HexDigest(uniqVal).slice(4, 7)
                        + '/' + userInfo.get('id')
                        + '/' + fileName;
           var navActInd = require('activityIndicator').make('start');
           $.win.add(navActInd);
           navActInd.show();
           require("amazonS3").AWS.uploadFile(f, filePath, recordTime);
           navActInd.hide();
        }
    });
    alertDialog.show();

});


/*
 * 再生スタート
 *
 *
 */
exports.startSound = function() {

    sound = require("singUtil").createSound.set();
    soundStartFlag = true;
    sound.url = f; 
    sound.play();
    soundDuration = Math.floor(sound.duration);

    ind = require("singUtil").setProgressBar(soundDuration, startSoundTime);
    $.win.add(ind);
    require("singUtil").createSound.start(sound);

    ind.show();
    $.soundCheck.show();
    $.song.show();
    $.done.show();
}


/*
 * 録音実施
 *
 *
 */
exports.recordStart = function() {

    if (sound && sound.isPlaying()) {
        $.stopSoundProcess();
    }

    ind = require("singUtil").setProgressBar(recordTime, startRecordTime);
    $.win.add(ind);

    require("singUtil").recordSound.start(recording);
    $.win.remove(cntDownImageView);

    $.song.hide();
    $.done.hide();
    $.soundCheck.hide();
    $.stop.show();
    ind.show();

}

/*
 * 再生停止処理
 *
 *
 */
exports.stopSoundProcess = function() {
    sound.stop();
    sound.release();
    soundStartFlag = false;
    clearInterval(interval);
    ind.animate({opacity:0,duration:500},function() {
        ind.hide();
        ind.value = 0;
    });
}

/*
 * 再生停止
 *
 *
 */
exports.stopSound = function() {

    $.stopSoundProcess();
    $.song.show();
    $.soundCheck.show();
    $.soundCheck.backgroundImage='b1.jpg';

}

/*
 * 録音停止
 *
 *
 */
exports.recordStop = function() {
    file = require("singUtil").recordSound.stop(recording);
    require("singUtil").recordSound.putFile(f, file);
    clearInterval(interval);

    $.song.title = '録り直し';
    ind.animate({opacity:0,duration:500},function() {
        ind.hide();
        ind.value = 0;
    });

    $.stop.hide();
    $.song.show();
    $.done.show();
    $.soundCheck.show();
    $.soundCheck.backgroundImage='b1.jpg';
}
