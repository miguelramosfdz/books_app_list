var exports = {
    make: function(navActHashType) {
        if (navActHashType == "start") {
            var navActHash;
            navActHash = {
                top: 100,
                height: 55,
                width: 60,
                opacity: 0.9,
                color: "#ffffff",
                backgroundColor: "#000000",
                borderRadius: 5,
                borderColor: "#000000",
                style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
            };
        } else navActHash = {
            bottom: 10,
            height: 60,
            color: "#000",
            font: {
                fontFamily: "Helvetica Neue",
                fontSize: 16
            },
            message: " 読み込み中...",
            style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
        };
        var navActInd = Titanium.UI.createActivityIndicator(navActHash);
        return navActInd;
    }
};