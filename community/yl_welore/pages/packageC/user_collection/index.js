var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        show: !0,
        nvabarData: {
            showCapsule: 1,
            title: "我的收藏",
            height: 2 * app.globalData.height + 20
        },
        delBtnWidth: 180,
        list: [],
        page: 1,
        di_msg: !1
    },
    onLoad: function(t) {
        var e = app.getCache("userinfo");
        this.setData({
            height: app.globalData.height,
            uid: e.uid,
            page: 1
        }), this.initEleWidth(), this.get_user_collection();
    },
    onShow: function() {},
    cancel: function(t) {
        var a = t.currentTarget.dataset.key, e = app.api_root + "User/get_user_cancel", i = this, s = app.getCache("userinfo"), n = new Object();
        n.token = s.token, n.openid = s.openid, n.much_id = app.siteInfo.uniacid, n.uid = this.data.list[a].user_id, 
        n.this_uid = this.data.uid, n.is_user = this.data.list[a].is_user, http.POST(e, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    $Toast({
                        content: t.data.msg
                    });
                    var e = i.data.list;
                    e[a].is_user = 1 == e[a].is_user ? 0 : 1, i.setData({
                        list: e
                    });
                } else $Toast({
                    content: t.data.msg
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    get_user_collection: function() {
        var t = app.api_root + "User/get_user_collection", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, i.uid = e.uid, 
        i.page = this.data.page;
        var s = a.data.list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) s.push(t.data.info[e]);
                    a.setData({
                        list: s
                    });
                } else $Toast({
                    content: t.data.msg
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX
        });
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var e = t.touches[0].clientX, a = this.data.startX - e, i = this.data.delBtnWidth, s = "";
            0 == a || a < 0 ? s = "left:0px" : 0 < a && (s = "left:-" + a + "px", i <= a && (s = "left:-" + i + "px"));
            var n = t.currentTarget.dataset.index, o = this.data.list;
            o[n].txtStyle = s, this.setData({
                list: o
            });
        }
    },
    touchE: function(t) {
        var e = this;
        if (1 == t.changedTouches.length) {
            var a = t.changedTouches[0].clientX, i = e.data.startX - a, s = e.data.delBtnWidth, n = s / 2 < i ? "left:-" + s + "px" : "left:0px", o = t.currentTarget.dataset.index, c = e.data.list;
            c[o].txtStyle = n, this.setData({
                list: c
            });
        }
    },
    getEleWidth: function(t) {
        try {
            var e = wx.getSystemInfoSync().windowWidth, a = 375 / (t / 2);
            return Math.floor(e / a);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_collection(), $Toast.hide();
    },
    delItem: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.list;
        a.splice(e, 1), this.setData({
            list: a
        });
    },
    _navback: function() {
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            show: !1
        }), wx.navigateBack();
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});