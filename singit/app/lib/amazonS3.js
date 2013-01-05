exports.AWS = {
    getAWSKey: function() {
        var s3uploader = require('com.ci.s3uploader');
        var proxy = s3uploader.create({
            "ACCESS_KEY_ID": "AKIAITHJZ75RQ4TKJPKQ",
            "SECRET_KEY": "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"
        });
        return proxy;
    },

    userInfo : function() {
        var userInfo = require('user_info');
        return userInfo;
     },

    uploadFile: function(file, path, recordTime) {
        var self = this;
        var proxy = this.getAWSKey();
        proxy.uploadToAS3(file.read(), {
            "PATH": path,
            "BUCKET_NAME": "singit-development",
        },
        function(_data) {
            if (_data.type === 'success') {
                self.done(path, recordTime);
            } else {
                self.failed(path);
            }
        });
    },

    done : function(path, recordTime) {
        var userInfo   = this.userInfo();
        var song = Alloy.createModel('song', {
            // todo 固定値を入れてます
            path : path,
            user_id : userInfo.get('id'),
            title_id : 1,
            length : recordTime,
        });
        song.save(null, {
            success : function(model, data) {
                alert('upload done!!')
            },
            error : function(model, data) {
                alert("song data save error")
            }
        });
    },

    failed: function(path) {
        // retryはする？
        alert('upload error ' + path )
    }

}
