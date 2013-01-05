function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.song = A$(Ti.UI.createButton({
        title: "歌う",
        width: 200,
        height: Ti.UI.SIZE,
        top: 300,
        color: "#000",
        id: "song"
    }), "Button", $.__views.win);
    $.__views.win.add($.__views.song);
    $.__views.stop = A$(Ti.UI.createButton({
        backgroundImage: "b2.png",
        width: 128,
        height: 128,
        top: 100,
        color: "#000",
        id: "stop"
    }), "Button", $.__views.win);
    $.__views.win.add($.__views.stop);
    $.__views.soundCheck = A$(Ti.UI.createButton({
        backgroundImage: "b1.jpg",
        width: 141,
        height: 138,
        top: 100,
        color: "#000",
        id: "soundCheck"
    }), "Button", $.__views.win);
    $.__views.win.add($.__views.soundCheck);
    $.__views.done = A$(Ti.UI.createButton({
        title: "これでOK",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 380,
        color: "#000",
        id: "done"
    }), "Button", $.__views.win);
    $.__views.win.add($.__views.done);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var recording = require("singUtil").recordSound.set(), f = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory + "/" + "recording_file.wav"), recordTime = require("singUtil").recordSound.getRecordTime(), sound = null, startRecordTime = recordTime, startSoundTime = 0, soundDuration = 0, file = null, ind = null, interval = null, cntDownWin = null, cntDownImageView = null, soundStartFlag = !1;
    $.stop.hide();
    $.soundCheck.hide();
    $.done.hide();
    $.song.on("click", function() {
        if (!recording.recording) {
            cntDownImageView = require("singUtil").countDown.countDownImageViewSet();
            $.win.add(cntDownImageView);
            cntDownImageView.start();
            cntDownImageView.stop();
            cntDownImageView.addEventListener("stop", function() {
                $.recordStart();
                interval = setInterval(function() {
                    if (!recording.stopd) {
                        if (0.1 > ind.value) {
                            $.recordStop();
                            return;
                        }
                        ind.message = Math.floor(ind.value) + " / " + recordTime;
                        ind.value -= 0.2;
                    }
                }, 200);
            });
        }
    });
    $.stop.on("click", function() {
        recording.recording && $.recordStop();
    });
    $.soundCheck.on("click", function() {
        if (soundStartFlag === !0) if (sound.paused) {
            sound.play();
            $.soundCheck.backgroundImage = "b3.png";
        } else {
            sound.pause();
            $.soundCheck.backgroundImage = "b1.jpg";
        }
        if (!recording.recording && soundStartFlag === !1) {
            $.startSound();
            $.soundCheck.backgroundImage = "b3.png";
            interval = setInterval(function() {
                if (sound.isPlaying()) {
                    ind.message = Math.floor(ind.value) + " / " + soundDuration;
                    ind.value += 0.1;
                }
            }, 100);
            sound.addEventListener("complete", function() {
                $.stopSound();
            });
        }
    });
    $.done.on("click", function() {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "プロフィール設定しますか？",
            buttonNames: [ "登録する", "後で" ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            var userInfo = require("user_info");
            e.index != 0;
            if (e.cancel) {
                var uniqVal = userInfo.get("id") + "_" + userInfo.get("uid"), fileName = Titanium.Utils.md5HexDigest(uniqVal + "_" + parseInt(new Date / 1000)) + ".wav", filePath = "singit-" + Titanium.Utils.md5HexDigest(uniqVal).slice(0, 3) + "/" + Titanium.Utils.md5HexDigest(uniqVal).slice(4, 7) + "/" + userInfo.get("id") + "/" + fileName, navActInd = require("activityIndicator").make("start");
                $.win.add(navActInd);
                navActInd.show();
                require("amazonS3").AWS.uploadFile(f, filePath, recordTime);
                navActInd.hide();
            }
        });
        alertDialog.show();
    });
    exports.startSound = function() {
        sound = require("singUtil").createSound.set();
        soundStartFlag = !0;
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
    };
    exports.recordStart = function() {
        sound && sound.isPlaying() && $.stopSoundProcess();
        ind = require("singUtil").setProgressBar(recordTime, startRecordTime);
        $.win.add(ind);
        require("singUtil").recordSound.start(recording);
        $.win.remove(cntDownImageView);
        $.song.hide();
        $.done.hide();
        $.soundCheck.hide();
        $.stop.show();
        ind.show();
    };
    exports.stopSoundProcess = function() {
        sound.stop();
        sound.release();
        soundStartFlag = !1;
        clearInterval(interval);
        ind.animate({
            opacity: 0,
            duration: 500
        }, function() {
            ind.hide();
            ind.value = 0;
        });
    };
    exports.stopSound = function() {
        $.stopSoundProcess();
        $.song.show();
        $.soundCheck.show();
        $.soundCheck.backgroundImage = "b1.jpg";
    };
    exports.recordStop = function() {
        file = require("singUtil").recordSound.stop(recording);
        require("singUtil").recordSound.putFile(f, file);
        clearInterval(interval);
        $.song.title = "録り直し";
        ind.animate({
            opacity: 0,
            duration: 500
        }, function() {
            ind.hide();
            ind.value = 0;
        });
        $.stop.hide();
        $.song.show();
        $.done.show();
        $.soundCheck.show();
        $.soundCheck.backgroundImage = "b1.jpg";
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;