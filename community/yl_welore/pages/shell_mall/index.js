var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        current_scroll: "0",
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        page: 1,
        type_list: [],
        type_id: "",
        shop_list: [],
        di_msg: !1,
        show: !0,
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
    get_aa_dd: function(t) {
        var e = t.detail;
        "home" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/index/index"
        }), "plaza" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/circle/index"
        }), "goods" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/shell_mall/index"
        }), "user" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/user/index"
        }), "add" == e.key && (console.log(1), this.plus());
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
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
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
        t.rotateZ(225).step(), e.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        a.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), i.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect1: a.export(),
            animCollect: e.export(),
            animTranspond: i.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(0).step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: e.export(),
            animTranspond: a.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, i.version = app.version, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), e.setData({
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
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            title: app.globalData.design.currency + "商城"
        });
    },
    handleChangeScroll: function(t) {
        var e = t.detail;
        this.setData({
            current_scroll: e.key,
            type_id: this.data.type_list[e.key].id
        }), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list();
    },
    onShow: function() {
        this.get_diy(), this.setData({
            isPopping: !1
        }), this.takeback(), 0 != this.data.show && (this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_type());
    },
    get_shop_type: function() {
        var t = app.api_root + "User/get_shop_type", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = a.uid, i.much_id = app.siteInfo.uniacid, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (0 < t.data.info.length && (e.setData({
                    type_id: t.data.info[0].id
                }), e.get_shop_list()), e.setData({
                    type_list: t.data.info,
                    user: t.data.user
                })) : $Toast({
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
    get_shop_list: function() {
        var t = app.api_root + "User/get_shop_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, i.type_id = this.data.type_id, 
        i.page = this.data.page;
        var n = a.data.shop_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        shop_list: n
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
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_shop_list(), $Toast.hide();
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list(), $Toast.hide();
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