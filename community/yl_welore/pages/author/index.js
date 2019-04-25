var app = getApp(), http = require("../../util/http.js");

Page({
    data: {},
    onGotUserInfo: function(e) {
        app.getCachecommu("userinfo") || app.getUserInfo(e.detail.userInfo, function(e) {
          console.log(e);
            1e3 != app && wx.navigateBack();
        });
    },
    onLoad: function(e) {
        wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu();
    }
});