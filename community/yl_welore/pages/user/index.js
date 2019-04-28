var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "会员中心",
            height: 2 * app.globalData.height + 20
        },
        animationData: null,
        animationDataD: null,
        flag: !1,
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 0
    },
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1
        }));
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), s = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(225).step(), a.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        i.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), e.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect1: i.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: i.export(),
            animInput: e.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    get_aa_dd: function(t) {
        var a = t.detail;
        "home" == a.key && wx.redirectTo({
            url: "/community/yl_welore/pages/index/index"
        }), "plaza" == a.key && wx.redirectTo({
            url: "/community/yl_welore/pages/circle/index"
        }), "goods" == a.key && wx.redirectTo({
          url: "/community/yl_welore/pages/packageC/user_collection/index"
        }), "user" == a.key && wx.redirectTo({
            url: "/community/yl_welore/pages/user/index"
        }), "add" == a.key && this.plus();
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", a = this, i = app.getCache("userinfo"), e = new Object();
        e.token = i.token, e.openid = i.openid, e.much_id = app.siteInfo.uniacid, e.version = app.version, 
        http.POST(t, {
            params: e,
            success: function(t) {
                console.log(t), a.setData({
                    version: t.data.version,
                    diy: t.data
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
    show_qian: function() {
        console.log("animate");
        var t = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = t).opacity(1).step(), this.setData({
            animationData: t.export()
        });
    },
    bid_qiandao: function() {
        wx.vibrateShort();
        var t = this;
        console.log("animate");
        var a = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = a).opacity(0).step(), t.setData({
            animationData: a.export()
        }), setTimeout(function() {
            t.user_punch();
        }, 400);
    },
    bid_qiandao_d: function() {
        var t = this, a = t.data.user_info;
        a.is_sign = 1, t.setData({
            user_info: a
        });
        var i = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        (this.animation = i).opacity(1).step(), t.setData({
            animationDataD: i.export()
        }), setTimeout(function() {
            i.opacity(1).scale(.4).step(), t.setData({
                animationDataD: i.export()
            });
        }, 200);
    },
    user_punch: function() {
        var t = app.api_root + "User/add_user_punch", a = this, i = app.getCache("userinfo"), e = new Object();
        e.token = i.token, e.openid = i.openid, e.much_id = app.siteInfo.uniacid, e.uid = i.uid, 
        http.POST(t, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.bid_qiandao_d()) : (a.show_qian(), $Toast({
                    content: t.data.msg
                }));
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
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            copyright: app.globalData.copyright,
            design: app.globalData.design
        });
    },
    onShow: function() {
        app.check_user_status(), this.get_user_info(), this.get_diy(), this.setData({
            isPopping: !1
        }), this.takeback();
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, i = app.getCache("userinfo"), e = new Object();
        e.token = i.token, e.openid = i.openid, http.POST(t, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info,
                    flag: 1 == t.data.info.is_sign
                }) : $Toast({
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
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/community/yl_welore/pages/index/index",
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
            path: "/community/yl_welore/pages/index/index",
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