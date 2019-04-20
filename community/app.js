var http = require("/yl_welore/util/http.js");

App({
    globalData: {
				appid: "wx6cd9255b1f403f58",
        userInfo: null,
        share: !1,
        height: 0,
        isIpx: !1,
        copyright: {},
        forward: {},
        design: {}
    },
    version: "1.0.22",
    api_root: "",
    http_root: "",
    siteInfo: require("siteinfo.js"),
    onLaunch: function(t) {
        var e = this;
        this.setApiRoot(), this.check_user_login(), this.get_book(), wx.getSystemInfo({
            success: function(t) {
                -1 < t.model.indexOf("iPhone X") && (e.globalData.isIpx = !0), e.globalData.height = t.statusBarHeight;
            }
        });
    },
    check_user_status: function() {
        var t = this.api_root + "User/get_user_status", e = this.getCache("userinfo");
        if (!e) return !1;
        var o = new Object();
        o.token = e.token, o.openid = e.openid, o.much_id = this.siteInfo.uniacid, o.uid = e.uid, 
        http.POST(t, {
            params: o,
            success: function(t) {
                0 == t.data && wx.navigateTo({
                    url: "/yl_welore/pages/black_house/index"
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
    get_forward: function() {
        var t = this.api_root + "User/get_forward", e = this, o = this.getCache("userinfo"), n = new Object();
        n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                1 == t.data.whether_open ? e.globalData.forward = t.data : e.globalData.forward = "";
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
    authority: function() {
        var t = this.api_root + "User/get_authority", e = this, o = this.getCache("userinfo"), n = new Object();
        n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), e.globalData.copyright = t.data;
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
    check_user_login: function() {
        this.getCache("userinfo") ? (this.authority(), this.get_forward(), this.check_user_status(), 
        this.get_design()) : wx.navigateTo({
            url: "/yl_welore/pages/author/index"
        });
    },
    get_design: function() {
        var t = this.api_root + "User/get_diy", e = this, o = e.getCache("userinfo"), n = new Object();
        n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), e.globalData.design = t.data;
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
    get_book: function() {
        var t = this.api_root + "User/book", e = new Object();
        http.POST(t, {
            params: e,
            success: function(t) {
                "error" == t.data && wx.navigateTo({
                    url: "/yl_welore/pages/inspect/index"
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
    setApiRoot: function() {
        var t = this.siteInfo.siteroot.split("app/index.php");
        this.api_root = t[0] + "addons/yl_welore/web/index.php?s=/api/", this.http_root = t[0];
    },
    setCache: function(t, e, o) {
        var n = +new Date() / 1e3, i = !0, a = {
            expire: o ? n + parseInt(o) : 0,
            value: e
        };
        try {
            wx.setStorageSync(t + this.globalData.appid, a);
        } catch (t) {
            i = !1;
        }
        return i;
    },
    getCache: function(t, e) {
        var o = +new Date() / 1e3, n = "";
        o = parseInt(o);
        try {
            (n = wx.getStorageSync(t + this.globalData.appid)).expire > o || 0 == n.expire ? n = n.value : (n = "", 
            this.removeCache(t));
        } catch (t) {
            n = void 0 === e ? "" : e;
        }
        return n || "";
    },
    removeCache: function(t) {
        var e = !0;
        try {
            wx.removeStorageSync(t + this.globalData.appid);
        } catch (t) {
            e = !1;
        }
        return e;
    },
    getUserInfo: function(i, a) {
        var s = this, c = "", r = "", t = s.getCache("userinfo");
        t ? a && "function" == typeof a && a(t) : wx.login({
            success: function(t) {
                if (t.code) {
                    var o = s.api_root + "Login/index", n = new Object();
                    n.code = t.code, n.much_id = s.siteInfo.uniacid, http.POST(o, {
                        params: n,
                        success: function(t) {
                            if (console.log(t), 0 != t.data.code) return wx.showModal({
                                title: "授权提示",
                                content: "授权失败，请稍候重试！",
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "skyblue",
                                success: function(t) {
                                    t.cancel;
                                },
                                fail: function(t) {}
                            }), "function" == typeof a && a(1e3), !1;
                            if (t.data.info.errcode) return wx.showModal({
                                title: "提示",
                                content: "errcode:" + t.data.info.errcode + ";errmsg:" + t.data.info.errmsg,
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "skyblue",
                                success: function(t) {
                                    t.cancel;
                                },
                                fail: function(t) {}
                            }), !1;
                            c = t.data.info.openid, r = t.data.info.session_key;
                            var e = new Object();
                            e.wx_openid = c, e.userInfo = i, e.uniacid = s.siteInfo.uniacid, http.POST(s.api_root + "Login/do_login", {
                                params: e,
                                success: function(t) {
                                    i.openid = c, i.token = t.data.token, i.uid = t.data.id, i.sessionKey = r, s.setCache("userinfo", i), 
                                    s.check_user_login(), a && "function" == typeof a && a(s.getCache("userinfo"));
                                },
                                fail: function() {}
                            });
                        },
                        fail: function() {}
                    });
                } else e.alert("获取用户登录态失败2");
            },
            fail: function() {
                "function" == typeof a && a(1e3), this.alert("获取用户信息失败");
            }
        });
    },
    alert: function(e, o) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof o && o();
            }
        });
    }
});