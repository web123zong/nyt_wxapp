var e = getApp(),
  t = require("./../../../utils/core.js");
var http = require("./../../../utils/http.js");
Page({
  data: {
    close: 0,
    text: ""
  },
  onLoad: function(t) {
    this.setData({
      imgUrl: e.globalData.approot
    }), this.setData({
      close: t.close,
      text: t.text
    });
  },
  onShow: function() {
    var t = e.getCache("sysset").shopname;
    wx.setNavigationBarTitle({
      title: t || "提示"
    });
  },
  bind: function() {
    var e = this,
      t = setInterval(function() {
        wx.getSetting({
          success: function(n) {
            var a = n.authSetting["scope.userInfo"];
            a && (wx.reLaunch({
              url: "/pages/index/index"
            }), clearInterval(t), console.log(a), e.setData({
              userInfo: a
            }));
          }
        });
      }, 1e3);
  },
  bindGetUserInfo: function(n) {
    var a = e.getCache("routeData"),
      o = a.url,
      s = a.params,
      i = "";
    Object.keys(s).forEach(function(e) {
      i += e + "=" + s[e] + "&";
    });
    var c = "/" + o + "?" + (s = i.substring(0, i.length - 1));
    console.log(c), wx.login({
      success: function(a) {
        t.post("wxapp/login", {
          code: a.code
        }, function(a) {
          a.error ? t.alert("获取用户登录态失败:" + a.message) : t.get("wxapp/auth", {
            data: n.detail.encryptedData,
            iv: n.detail.iv,
            sessionKey: a.session_key
          }, function(t) {
            1 == t.isblack && wx.showModal({
              title: "无法访问",
              content: "您在商城的黑名单中，无权访问！",
              success: function(t) {
                t.confirm && e.close(), t.cancel && e.close();
              }
            });
            var lie = {};
            lie.avatarUrl = t.avatarUrl, lie.city = t.city, lie.country = t.country, lie.gender = t.gender,
              lie.language = t.language, lie.nickName = t.nickName, lie.province = t.province;
            var ee = {};
            ee.userInfo = lie, ee.wx_openid = t.openId, ee.uniacid = t.uniacid;
            http.POST(e.api_root + "Login/do_login", {
              params: ee,
              success: function(lit) {
                n.detail.userInfo.uid = lit.data.id, n.detail.userInfo.token = lit.data.token,
                  n.detail.userInfo.openid = t.openId, n.detail.userInfo.id = t.id, n.detail.userInfo.uniacid = t.uniacid,

                  e.setCache("userinfo", n.detail.userInfo), e.setCache("userinfo_openid", n.detail.userInfo.openid),
                  e.setCache("userinfo_id", t.id), e.getSet(), wx.reLaunch({
                    url: c
                  });
              },
              fail: function() {}
            });
          });
        });
      },
      fail: function() {
        t.alert("获取用户信息失败!");
      }
    });
  }
});