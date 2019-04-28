var e = require("utils/core.js");
var http = require("utils/http.js");
App({
  onShow: function() {
    this.onLaunch();
  },
  onLaunch: function() {
    var e = this;
    wx.getSystemInfo({
      success: function(t) {
        "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", ""),        e.globalData.height = t.statusBarHeight; 
      }
    });
    var t = this;
    wx.getSystemInfo({
      success: function(e) {
        wx.setStorageSync("systemInfo", e);
        var a = e.windowWidth,
          i = e.windowHeight;
        t.globalData.ww = a, t.globalData.hh = i;
      }
    });
  },
  checkAuth: function() {
    var t = "/pages/message/auth/index",
      a = getCurrentPages(),
      i = a[a.length - 1],
      n = {
        params: i.options || null,
        url: i.route
      };
    if (n.params.hasOwnProperty("scene")) {
      var o = {},
        s = decodeURIComponent(n.params.scene).split("&").shift().split("=");
      o.id = s[1], n.params = o;
    }
    this.setCache("routeData", n), console.log(n);
    var r = this.getCache("userinfo");
    wx.getSetting({
      success: function(a) {
        a.authSetting["scope.userInfo"] && r ? e.get("member", {}, function(e) {
          e.error && wx.redirectTo({
            url: t
          });
        }) : wx.redirectTo({
          url: t
        });
      }
    });
  },
  requirejs: function(e) {
    return require("utils/" + e + ".js");
  },
  getConfig: function() {
    if (null !== this.globalData.api) return {
      api: this.globalData.api,
      approot: this.globalData.approot,
      appid: this.globalData.appid
    };
    var e = wx.getExtConfigSync();
    return console.log(e), this.globalData.api = e.config.api, this.globalData.approot = e.config.approot,
      this.globalData.appid = e.config.appid, e.config;
  },
  getCache: function(e, t) {
    var a = +new Date() / 1e3,
      i = "";
    a = parseInt(a);
    try {
      (i = wx.getStorageSync(e + this.globalData.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "",
        this.removeCache(e));
    } catch (e) {
      i = void 0 === t ? "" : t;
    }
    return i = i || "";
  },
  setCache: function(e, t, a) {
    var i = +new Date() / 1e3,
      n = !0,
      o = {
        expire: a ? i + parseInt(a) : 0,
        value: t
      };
    try {
      wx.setStorageSync(e + this.globalData.appid, o);
    } catch (e) {
      n = !1;
    }
    return n;
  },
  removeCache: function(e) {
    var t = !0;
    try {
      wx.removeStorageSync(e + this.globalData.appid);
    } catch (e) {
      t = !1;
    }
    return t;
  },
  close: function() {
    this.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  getSet: function() {
    var t = this;
    "" == t.getCache("cacheset") && setTimeout(function() {
      var a = t.getCache("cacheset");
      e.get("cacheset", {
        version: a.version
      }, function(e) {
        e.update && t.setCache("cacheset", e.data);
      });
    }, 10);
  },
  url: function(e) {
    e = e || {};
    var t = {},
      a = "",
      i = "",
      n = this.getCache("usermid");
    a = e.mid || "", i = e.merchid || "", "" != n ? ("" != n.mid && void 0 !== n.mid || (t.mid = a),
        "" != n.merchid && void 0 !== n.merchid || (t.merchid = i)) : (t.mid = a, t.merchid = i),
      this.setCache("usermid", t);
  },
  impower: function(e, t, a) {
    wx.getSetting({
      success: function(i) {
        i.authSetting["scope." + e] || wx.showModal({
          title: "用户未授权",
          content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
          confirmText: "去设置",
          success: function(e) {
            e.confirm ? wx.openSetting({
              success: function(e) {}
            }) : "route" == a ? wx.switchTab({
              url: "/pages/index/index"
            }) : "details" == a || wx.navigateTo({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
  },
  globalDataClose: {
    flag: !1
  },
  globalData: {
    appid: "wx6cd9255b1f403f58",
    api: "https://nyt.gzchujiao.com/app/ewei_shopv2_api.php?i=1",
    approot: "https://nyt.gzchujiao.com/addons/ewei_shopv2/",
    userInfo: null,
		share: !1,
		height: 0,
		isIpx: !1,
		copyright: {},
		forward: {},
		design: {}
  },


  // 社区的声明的函数
  check_user_status: function() {
    var t = this.api_root + "User/get_user_status",
      e = this.getCache("userinfo");
    if (!e) return !1;
    var o = new Object();
    o.token = e.token, o.openid = e.openid, o.much_id = this.siteInfo.uniacid, o.uid = e.uid,
      http.POST(t, {
        params: o,
        success: function(t) {
          0 == t.data && wx.navigateTo({
            url: "/community/yl_welore/pages/black_house/index"
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
	siteInfo: require("siteinfo.js"),
	api_root: "https://nyt.gzchujiao.com/addons/yl_welore/web/index.php?s=/api/",
	setApiRoot: function () {
		// var t = this.siteInfo.siteroot.split("app/index.php");
		// this.api_root = t[0] + "addons/yl_welore/web/index.php?s=/api/", this.http_root = t[0];
    this.api_root = "https://nyt.gzchujiao.com/addons/yl_welore/web/index.php?s=/api/";
	},
  setCachecommu: function (t, e, o) {
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
  getCachecommu: function (t, e) {
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
  check_user_status: function () {
    var t = this.api_root + "User/get_user_status", e = this.getCachecommu("userinfo");
    if (!e) return !1;
    var o = new Object();
    o.token = e.token, o.openid = e.openid, o.much_id = this.siteInfo.uniacid, o.uid = e.uid,
      http.POST(t, {
        params: o,
        success: function (t) {
          0 == t.data && wx.navigateTo({
            url: "/community/yl_welore/pages/black_house/index"
          });
        },
        fail: function () {
          wx.showModal({
            title: "提示",
            content: "网络繁忙，请稍候重试！",
            showCancel: !1,
            success: function (t) { }
          });
        }
      });
  },
  check_user_login: function () {
    this.getCachecommu("userinfo") ? (this.authority(), this.get_forward(), this.check_user_status(),
      this.get_design()) : wx.navigateTo({
        url: "/community/yl_welore/pages/author/index"
      });
  },
  get_design: function () {
    var t = this.api_root + "User/get_diy", e = this, o = e.getCachecommu("userinfo"), n = new Object();
    n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
      params: n,
      success: function (t) {
        console.log(t), e.globalData.design = t.data;
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "网络繁忙，请稍候重试！",
          showCancel: !1,
          success: function (t) { }
        });
      }
    });
  },
  get_forward: function () {
    var t = this.api_root + "User/get_forward", e = this, o = this.getCachecommu("userinfo"), n = new Object();
    n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
      params: n,
      success: function (t) {
        1 == t.data.whether_open ? e.globalData.forward = t.data : e.globalData.forward = "";
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "网络繁忙，请稍候重试！",
          showCancel: !1,
          success: function (t) { }
        });
      }
    });
  },
  get_book: function () {
    var t = this.api_root + "User/book", e = new Object();
    http.POST(t, {
      params: e,
      success: function (t) {
        "error" == t.data && wx.navigateTo({
          url: "/community/community/yl_welore/pages/inspect/index"
        });
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "网络繁忙，请稍候重试！",
          showCancel: !1,
          success: function (t) { }
        });
      }
    });
  },
  authority: function () {
    var t = this.api_root + "User/get_authority", e = this, o = this.getCachecommu("userinfo"), n = new Object();
    n.token = o.token, n.openid = o.openid, n.much_id = this.siteInfo.uniacid, http.POST(t, {
      params: n,
      success: function (t) {
        console.log(t), e.globalData.copyright = t.data;
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "网络繁忙，请稍候重试！",
          showCancel: !1,
          success: function (t) { }
        });
      }
    });
  },
  getUserInfo: function (i, a) {
    var s = this, c = "", r = "", t = s.getCachecommu("userinfo");
    t ? a && "function" == typeof a && a(t) : wx.login({
      success: function (t) {
        if (t.code) {
          var o = s.api_root + "Login/index", n = new Object();
          n.code = t.code, n.much_id = s.siteInfo.uniacid, http.POST(o, {
            params: n,
            success: function (t) {
              if (console.log(t), 0 != t.data.code) return wx.showModal({
                title: "授权提示",
                content: "授权失败，请稍候重试！",
                showCancel: !1,
                confirmText: "确定",
                confirmColor: "skyblue",
                success: function (t) {
                  t.cancel;
                },
                fail: function (t) { }
              }), "function" == typeof a && a(1e3), !1;
              if (t.data.info.errcode) return wx.showModal({
                title: "提示",
                content: "errcode:" + t.data.info.errcode + ";errmsg:" + t.data.info.errmsg,
                showCancel: !1,
                confirmText: "确定",
                confirmColor: "skyblue",
                success: function (t) {
                  t.cancel;
                },
                fail: function (t) { }
              }), !1;
              c = t.data.info.openid, r = t.data.info.session_key;
              var e = new Object();
              e.wx_openid = c, e.userInfo = i, e.uniacid = s.siteInfo.uniacid, console.log(e,6363), http.POST(s.api_root + "Login/do_login", {
                params: e,
                success: function (t) {
                  
                  i.openid = c, i.token = t.data.token, i.uid = t.data.id, i.sessionKey = r, s.setCachecommu("userinfo", i),
                    s.check_user_login(), a && "function" == typeof a && a(s.getCache("userinfo"));
                },
                fail: function () { }
              });
            },
            fail: function () { }
          });
        } else e.alert("获取用户登录态失败2");
      },
      fail: function () {
        "function" == typeof a && a(1e3), this.alert("获取用户信息失败");
      }
    });
  },
});