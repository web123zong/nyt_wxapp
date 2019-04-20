var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        show: !0,
        isIpx: app.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * app.globalData.height + 20
        },
        title: "",
        getInfo: [],
        tory_list: [],
        huifu: !1,
        animationData: {},
        current: "tab1",
        set_guanzhu: "tab1",
        isPopping: !1,
        animPlus: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        page: 1,
        top_list: [],
        load: !1,
        guanzhu: !1,
        get_gz_text: "",
        get_gz_input: "",
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            design: app.globalData.design,
            id: t.id,
            page: 1
        });
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
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
            var e = this, t = app.getCache("userinfo"), a = new Object();
            a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
            a.text = this.data.home_pl_text, a.id = this.data.pl_id, a.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: a,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), e.hideModal();
                        var a = e.data.tory_list;
                        a[e.data.pl_key].study_repount = parseInt(a[e.data.pl_key].study_repount) + 1, e.setData({
                            tory_list: a
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
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            current: a.key
        });
    },
    handleChange_gz: function(t) {
        var a = t.detail;
        this.setData({
            set_guanzhu: a.key
        });
    },
    onShow: function() {
        this.setData({
            isPopping: !1
        }), this.takeback(), this.get_tory_info(), this.get_placement_top(), 0 != this.data.show && (this.setData({
            page: 1,
            tory_list: []
        }), this.add_trailing_list());
    },
    get_placement_top: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.tory_id = this.data.id;
        var i = app.api_root + "User/get_placement_top";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    top_list: t.data.info
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
    add_trailing_list: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        e.data.getInfo;
        a.token = t.token, a.openid = t.openid, a.uid = t.uid, a.much_id = app.siteInfo.uniacid, 
        a.tory_id = this.data.id, a.index_page = this.data.page, a.version = app.version;
        var i = app.api_root + "User/get_index_list", n = e.data.tory_list;
        http.POST(i, {
            params: a,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        load: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) n.push(t.data.info[a]);
                    e.setData({
                        tory_list: n,
                        version: t.data.version
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
    set_trailing: function() {
        this.setData({
            guanzhu: !0
        });
    },
    hideModal: function() {
        this.setData({
            guanzhu: !1,
            home_pl_check: !1
        });
    },
    get_gz_text: function(t) {
        this.setData({
            get_gz_text: t.detail.value
        });
    },
    get_gz_input: function(t) {
        this.setData({
            get_gz_input: t.detail.value
        });
    },
    add_trailing: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object(), i = a.data.getInfo;
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.tory_id = this.data.id, e.is_trailing = 1 == i.is_trailing ? 1 : 0, e.trailing_type = "tab1" == this.data.set_guanzhu ? 0 : 1, 
        e.trailing_text = "tab1" == this.data.set_guanzhu ? this.data.get_gz_text : this.data.get_gz_input;
        var n = app.api_root + "User/set_user_trailing";
        http.POST(n, {
            params: e,
            success: function(t) {
                a.hideModal(), "success" == t.data.status && (i.is_trailing = 1 != i.is_trailing, 
                a.setData({
                    getInfo: i
                })), $Toast({
                    content: t.data.msg
                }), a.setData({
                    get_gz_text: "",
                    get_gz_input: ""
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
    get_tory_info: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.id = this.data.id, e.uid = t.uid, e.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_tory_info";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    getInfo: t.data.info,
                    title: t.data.info.realm_name
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
        }), e = wx.createAnimation({
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
        t.rotateZ(225).step(), a.translate(90, -105).rotateZ(360).opacity(1).height("70px").width("70px").step(), 
        e.translate(-8, -110).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        i.translate(-90, -100).rotateZ(360).opacity(1).height("150rpx").width("150rpx").step(), 
        0 == this.data.version && o.translate(180, -100).rotateZ(360).opacity(1).height("145rpx").width("145rpx").step(), 
        n.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
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
        t.rotateZ(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    play: function(t) {
        for (var a = this, e = this.data.tory_list, i = 0; i < e.length; i++) e[i].is_voice = !1;
        this.setData({
            tory_list: e
        });
        var n = t.currentTarget.dataset.key;
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), e[n].is_voice = !0, 
        this.setData({
            tory_list: e,
            tory_list_index: n
        }), innerAudioContext.onEnded(function(t) {
            e[n].is_voice = !1, a.setData({
                tory_list: e
            });
        });
    },
    add_zan: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.key, i = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = a, o.uid = n.uid, o.much_id = app.siteInfo.uniacid, 
        o.zan_type = 1 == this.data.tory_list[e].is_info_zan ? 1 : 0, o.applaud_type = 0;
        var s = app.api_root + "User/add_user_zan";
        http.POST(s, {
            params: o,
            success: function(t) {
                var a = i.data.tory_list;
                "success" == t.data.status ? (a[e].is_info_zan = t.data.info_zan, a[e].info_zan_count = t.data.info_zan_count, 
                i.setData({
                    tory_list: a
                }), i.rotate3d(e)) : $Toast({
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
    stop: function(t) {
        innerAudioContext.stop();
        var a = t.currentTarget.dataset.key, e = this.data.tory_list;
        e[a].is_voice = !1, this.setData({
            tory_list: e
        });
    },
    previewImage: function(t) {
        var a = t.target.dataset.src, e = t.target.dataset.id;
        wx.previewImage({
            current: a,
            urls: this.data.tory_list[e].image_part
        });
    },
    onPullDownRefresh: function() {
        setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            tory_list: []
        }), this.add_trailing_list();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.add_trailing_list(), $Toast.hide();
    },
    rotate3d: function(a) {
        var e = this, t = e.data.tory_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (e.animation_zan = i).rotate3d(0, 1, 0, 180).step(), t[a].animationData_zan = i.export(), 
        e.setData({
            tory_list: t
        }), setTimeout(function() {
            var t = e.data.tory_list;
            i.rotate3d(0, 1, 0, 0).step(), t[a].animationData_zan = i.export(), e.setData({
                tory_list: t
            });
        }, 100);
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
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
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
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
    },
    _navback: function() {
        wx.navigateBack();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});