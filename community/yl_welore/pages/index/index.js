var app = getApp({ allowDefault: true }), http = require("../../util/http.js"), index_page = 1, index_my_page = 1, _require = require("../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        new_list: [],
        show: !0,
        inputShowed: !1,
        inputVal: "",
        current: "tab1",
        nvabarData: {
            showCapsule: 0,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        di_msg: !1,
        ad_info: {},
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: ""
    },
    get_aa_dd: function(t) {
        var e = t.detail;
        "home" == e.key && wx.redirectTo({
          url: "/community/yl_welore/pages/index/index"
        }), "plaza" == e.key && wx.redirectTo({
            url: "/community/yl_welore/pages/circle/index"
        }), "goods" == e.key && wx.redirectTo({
          url: "/community/yl_welore/pages/packageC/user_collection/index"
        }), "user" == e.key && wx.redirectTo({
          url: "/community/yl_welore/pages/user/index"
        }), "add" == e.key && this.plus();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
        });
    },
    hideModal: function() {
        this.setData({
            home_pl_check: !1
        });
    },
    home_pl_cai: function(t) {
        this.setData({
            home_pl_text: t.detail.value
        });
    },
    do_user_pl: function() {
        if ("" != this.data.home_pl_text) {
            wx.showLoading({
                title: "评论中...",
                mask: !0
            });
            var a = this, t = app.getCache("userinfo"), e = new Object();
            e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
            e.text = this.data.home_pl_text, e.id = this.data.pl_id, e.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: e,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), a.hideModal();
                        var e = a.data.new_list;
                        e[a.data.pl_key].study_repount = parseInt(e[a.data.pl_key].study_repount) + 1, a.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else $Toast({
                        content: t.data.msg
                    }), wx.hideLoading();
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
        } else $Toast({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
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
    get_ad: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_ad";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    ad_info: t.data.info,
                    sw_info: t.data.info_sw
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
    rotate3d: function(e) {
        var a = this, t = a.data.new_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (a.animation_zan = i).rotate3d(0, 1, 0, 180).step(), t[e].animationData_zan = i.export(), 
        a.setData({
            new_list: t
        }), setTimeout(function() {
            var t = a.data.new_list;
            i.rotate3d(0, 1, 0, 0).step(), t[e].animationData_zan = i.export(), a.setData({
                new_list: t
            });
        }, 100);
    },
    handleChange: function(t) {
        var e = t.detail;
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            new_list: []
        }), index_my_page = index_page = 1, "tab2" == e.key && this.get_my_index_list(), 
        "tab1" == e.key && this.get_index_list_one(), this.setData({
            current: e.key,
            di_msg: !1
        });
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height
        });
    },
    onShow: function() {
        app.setApiRoot(), app.check_user_login(), app.get_book();
        app.check_user_status(), this.get_diy(), this.setData({
            isPopping: !1
        }), this.takeback(), console.log(this.data.diy), 0 != this.data.show && ($Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && this.get_my_index_list(), 
        this.get_ad(), this.get_diy());
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, i.version = app.version, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version,
                    diy: t.data,
                    title: t.data.home_title
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
    add_zan: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.key, i = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = e, o.uid = n.uid, o.much_id = app.siteInfo.uniacid, 
        o.applaud_type = 0, o.zan_type = 1 == this.data.new_list[a].is_info_zan ? 1 : 0;
        var s = app.api_root + "User/add_user_zan";
        http.POST(s, {
            params: o,
            success: function(t) {
                var e = i.data.new_list;
                "success" == t.data.status ? (wx.vibrateShort(), e[a].is_info_zan = t.data.info_zan, 
                e[a].info_zan_count = t.data.info_zan_count, i.setData({
                    new_list: e
                }), i.rotate3d(a)) : $Toast({
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
    get_index_list_one: function() {
        var t = app.api_root + "User/get_index_list", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = a.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, i.index_page = 1, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (e.setData({
                    new_list: t.data.info
                }), $Toast.hide()) : $Toast({
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
    get_my_index_list: function() {
        var t = app.api_root + "User/get_my_index_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.index_page = index_my_page, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, i.uid = e.uid;
        var n = a.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        new_list: n
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
                }
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
    get_index_list: function() {
        var t = app.api_root + "User/get_index_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.index_page = index_page, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version;
        var n = a.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        new_list: n
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
                }
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
    previewImage: function(t) {
        var e = t.target.dataset.src, a = t.target.dataset.id;
        wx.previewImage({
            current: e,
            urls: this.data.new_list[a].image_part
        });
    },
    play: function(t) {
        for (var e = this, a = this.data.new_list, i = 0; i < a.length; i++) a[i].is_voice = !1;
        this.setData({
            new_list: a
        });
        var n = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), a[n].is_voice = !0, 
        this.setData({
            new_list: a,
            new_list_index: n
        }), innerAudioContext.onEnded(function(t) {
            a[n].is_voice = !1, e.setData({
                new_list: a
            });
        });
    },
    stop: function(t) {
        innerAudioContext.stop();
        var e = t.currentTarget.dataset.key, a = this.data.new_list;
        a[e].is_voice = !1, this.setData({
            new_list: a
        });
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && (index_my_page = 1, 
        this.get_my_index_list()), this.get_ad();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (index_page++, this.get_index_list()), "tab2" == this.data.current && (index_my_page++, 
        this.get_my_index_list()), $Toast.hide();
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