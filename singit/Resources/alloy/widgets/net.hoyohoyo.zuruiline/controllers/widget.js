function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "net.hoyohoyo.zuruiline/" + s : s.substring(0, index) + "/net.hoyohoyo.zuruiline/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.container = A$(Ti.UI.createView({
        height: "2dp",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.black = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1dp",
        top: 0,
        id: "black"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.black);
    $.__views.white = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1dp",
        top: "1dp",
        id: "white"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.white);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    _.defaults(args, {
        alphaBlack: 0.5,
        alphaWhite: 0.5,
        gradientEnabled: !0,
        gradientPosition: 0.25
    });
    var b = ("0" + (~~(255 * args.alphaBlack)).toString(16)).slice(-2), w = ("0" + (~~(255 * args.alphaWhite)).toString(16)).slice(-2);
    if (args.gradientEnabled) {
        var gradientParams = {
            type: "linear",
            startPoint: {
                x: 0,
                y: 0
            },
            endPoint: {
                x: "100%",
                y: 0
            }
        };
        $.black.setBackgroundGradient(_.extend(gradientParams, {
            colors: [ {
                color: "#0000",
                offset: 0
            }, {
                color: "#" + b + "000000",
                offset: args.gradientPosition
            }, {
                color: "#" + b + "000000",
                offset: 1 - args.gradientPosition
            }, {
                color: "#0000",
                offset: 1
            } ]
        }));
        $.white.setBackgroundGradient(_.extend(gradientParams, {
            colors: [ {
                color: "#0fff",
                offset: 0
            }, {
                color: "#" + w + "ffffff",
                offset: args.gradientPosition
            }, {
                color: "#" + w + "ffffff",
                offset: 1 - args.gradientPosition
            }, {
                color: "#0fff",
                offset: 1
            } ]
        }));
    } else {
        $.black.setBackgroundColor("#" + b + "000000");
        $.white.setBackgroundColor("#" + w + "ffffff");
    }
    _.each(args, function(value, key) {
        switch (key) {
          case "id":
          case "alphaBlack":
          case "alphaWhite":
          case "gradientEnabled":
          case "gradientPosition":
            break;
          case "top":
          case "left":
          case "right":
          case "bottom":
          case "width":
            $.container[key] = value;
            break;
          default:
            Ti.API.info("[ZuruiLine] parameter \"" + key + "\" is ignored.");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;