exports.AWS = {
    getAWSKey: function() {
        var s3uploader = require("com.ci.s3uploader"), proxy = s3uploader.create({
            ACCESS_KEY_ID: "AKIAITHJZ75RQ4TKJPKQ",
            SECRET_KEY: "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"
        });
        return proxy;
    },
    userInfo: function() {
        var userInfo = require("user_info");
        return userInfo;
    },
    uploadFile: function(file, path, recordTime) {
        var self = this, proxy = this.getAWSKey();
        proxy.uploadToAS3(file.read(), {
            PATH: path,
            BUCKET_NAME: "singit-development"
        }, function(_data) {
            _data.type === "success" ? self.done(path, recordTime) : self.failed(path);
        });
    },
    done: function(path, recordTime) {
        var userInfo = this.userInfo(), song = Alloy.createModel("song", {
            path: path,
            user_id: userInfo.get("id"),
            title_id: 1,
            length: recordTime
        });
        song.save(null, {
            success: function(model, data) {
                Ti.API.info(data);
                alert("upload done!!");
            },
            error: function(model, data) {
                Ti.API.info(JSON.stringify(model));
                Ti.API.info(JSON.stringify(data));
                alert("song data save error");
            }
        });
    },
    failed: function(path) {
        alert("upload error " + path);
    }
};