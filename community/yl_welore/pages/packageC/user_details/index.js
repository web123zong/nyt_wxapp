var app = getApp(), http = require("../../../util/http.js"), md5 = require("../../../util/md5.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        current: "tab1",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "零钱明细",
            height: 2 * app.globalData.height + 20
        },
        pay_list: [],
        pay_index: 0,
        pay_info: {},
        pay: !1,
        animationPay: {},
        pay_money: [ {
            money: 6
        }, {
            money: 30
        }, {
            money: 68
        }, {
            money: 168
        }, {
            money: 328
        }, {
            money: 648
        }, {
            money: 1
        } ],
        money_index: 0,
        amount_list: [],
        page: 1,
        di_msg: !1,
        yes_mod: !1,
        withdraw: !1,
        withdraw_number: ""
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            page: 1,
            design: app.globalData.design
        }), this.get_user_info(), this.get_user_amount();
    },
    onShow: function() {},
    set_this_money: function(t) {
        var a = t.detail.value, e = this.data.pay_money;
        e[6].money = a, this.setData({
            pay_money: e
        });
    },
    hideModal: function() {
        this.setData({
            yes_mod: !1,
            withdraw: !1,
            withdraw_card: !1
        });
    },
    yes_mod: function() {
        this.setData({
            yes_mod: !0
        });
    },
    withdraw: function() {
        this.setData({
            withdraw: !0
        });
    },
    withdraw_card: function() {
        this.setData({
            withdraw_card: !0
        });
    },
    get_withdraw_card: function(t) {
        this.setData({
            withdraw_number: t.detail.value
        });
    },
    withdraw_do: function() {
        if (1 == this.data.setting.open_offline_payment && "" == this.data.withdraw_number) return $Toast({
            content: "银行卡号不能为空"
        }), !1;
        var t = app.api_root + "User/withdraw", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.uid = e.uid, n.much_id = app.siteInfo.uniacid, 
        n.withdraw_number = this.data.withdraw_number, http.POST(t, {
            params: n,
            success: function(t) {
                a.hideModal(), t.data.status, $Toast({
                    content: t.data.msg
                }), a.setData({
                    withdraw_number: ""
                }), a.get_user_info(), a.get_user_amount();
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
    get_ji_bei: function() {
        var t = app.api_root + "User/get_ji_bei", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, n.uid = e.uid, n.much_id = app.siteInfo.uniacid, 
        http.POST(t, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a.setData({
                    yes_mod: !1,
                    page: 1
                }), $Toast({
                    content: t.data.msg
                }), a.get_user_info(), a.get_user_amount()) : (a.setData({
                    yes_mod: !1
                }), $Toast({
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
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            amount_list: [],
            page: 1
        }), this.setData({
            current: a.key
        }), this.get_user_amount();
    },
    get_pay: function() {
        var t = this, a = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        (t.animation = a).translateY(230).step(), t.setData({
            animationPay: a.export(),
            pay: !0
        }), setTimeout(function() {
            a.translateY(0).step(), t.setData({
                animationPay: a.export()
            });
        }, 100);
    },
    no_pay: function() {
        this.setData({
            pay: !1
        });
    },
    get_user_amount: function() {
        var t = app.api_root + "User/get_user_amount", e = this, a = app.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.uid = a.uid, n.much_id = app.siteInfo.uniacid, 
        n.page = this.data.page, n.evaluate = this.data.current;
        var i = e.data.amount_list;
        http.POST(t, {
            params: n,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        di_msg: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) i.push(t.data.info[a]);
                    e.setData({
                        amount_list: i,
                        setting: t.data.setting
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
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), n = new Object();
        n.token = e.token, n.openid = e.openid, http.POST(t, {
            params: n,
            success: function(t) {
                "success" == t.data.status ? a.setData({
                    user_info: t.data.info,
                    dd_fraction: (t.data.info.fraction / 10).toFixed(2)
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
    get_pay_money: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            money_index: a
        });
    },
    pay_submit: function() {
        var t = this.data.pay_money[this.data.money_index].money;
        if (console.log(t), t) {
            var o = this, a = app.getCache("userinfo"), e = new Object();
            e.token = a.token, e.openid = a.openid, e.uid = a.uid, e.much_id = app.siteInfo.uniacid, 
            e.money = t;
            var n = app.api_root + "Pay/do_pay";
            http.POST(n, {
                params: e,
                success: function(t) {
                    if (console.log(t), "OK" == t.data.return_msg) {
                        var a = (Date.parse(new Date()) / 1e3).toString(), e = "prepay_id=" + t.data.prepay_id, n = t.data.nonce_str, i = md5.hexMD5("appId=" + t.data.appid + "&nonceStr=" + n + "&package=" + e + "&signType=MD5&timeStamp=" + a + "&key=" + t.data.app_info.app_key).toUpperCase();
                        wx.requestPayment({
                            timeStamp: a,
                            nonceStr: n,
                            package: e,
                            signType: "MD5",
                            paySign: i,
                            success: function(t) {
                                $Toast({
                                    content: "充值成功！"
                                }), o.setData({
                                    page: 1,
                                    amount_list: []
                                }), o.get_user_info(), o.no_pay(), o.get_user_amount();
                            },
                            complete: function() {
                                o.setData({
                                    page: 1,
                                    amount_list: []
                                }), o.get_user_info(), o.no_pay(), o.get_user_amount();
                            }
                        });
                    } else $Toast({
                        content: "参数错误！"
                    }), o.get_pay();
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
            content: "充值金额错误！"
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
        }, 1500), this.get_user_info(), this.get_user_amount(), $Toast.hide();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_amount(), $Toast.hide();
    },
    _navback: function() {
        wx.navigateBack();
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