var app = getApp(), recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), WxParse = require("../../../util/wxParse/wxParse.js"), http = require("../../../util/http.js"), options = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 96e3,
    format: "mp3",
    frameSize: 50
}, recordTimeInterval = "", _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        is_open: !1,
        fa_type: 0,
        is_submit: !1,
        visible2: !1,
        text_color: !1,
        get_hidden: !0,
        actions4: [ {
            color: "#2ae0c8 "
        }, {
            color: "#a2e1d4"
        }, {
            color: "#acf6ef"
        }, {
            color: "#cbf5fb"
        }, {
            color: "#bdf3d4"
        }, {
            color: "#e6e2c3"
        }, {
            color: "#e3c887"
        }, {
            color: "#fad8be"
        }, {
            color: "#fbb8ac"
        }, {
            color: "#fe6673"
        }, {
            color: "#D24D57"
        }, {
            color: "#EB7347"
        }, {
            color: "#FC9D99"
        }, {
            color: "#26A65B"
        }, {
            color: "#AEDD81"
        }, {
            color: "#84AF9B"
        }, {
            color: "#00CCFF"
        }, {
            color: "#D0D0D0"
        }, {
            color: "#2C3E50"
        }, {
            color: "#000000"
        } ],
        isIpx: app.globalData.isIpx,
        nvabarData: {},
        file: "",
        file_ss: 0,
        scope_record: !0,
        text: "",
        is_title: !1,
        title_value: "",
        title_color: "#000000",
        img_arr: [],
        img_length: 9,
        img_botton: !0,
        is_vip: 0,
        check_fa_class: !1,
        showLeft: !1,
        navLeftItems: [],
        navRightItems: [],
        curNav: -1,
        di_msg: !0,
        page: 1,
        red_type: 1,
        zong_red_money: "0.00",
        xian_red_money: "",
        zong_red_count: "",
        version: 0
    },
    onLoad: function(t) {
        this.setData({
            copyright: app.globalData.copyright,
            design: app.globalData.design,
            height: app.globalData.height,
            fa_type: t.type,
            fa_class: t.fa_class,
            title: "发布到" + t.name,
            nvabarData: {
                showCapsule: !0,
                height: 2 * app.globalData.height + 20
            }
        }), this.get_user_info(), 2 == t.type && this.setData({
            is_title: !0
        }), 0 == t.fa_class && this.setData({
            check_fa_class: !0
        }), this.get_user_vip(), this.get_left_needle(), this.get_right_item(), this.get_diy();
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), o = new Object();
        o.token = a.token, o.openid = a.openid, o.much_id = app.siteInfo.uniacid, o.version = app.version, 
        http.POST(t, {
            params: o,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version
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
    set_red_type: function() {
        this.setData({
            red_type: 1 == this.data.red_type ? 0 : 1,
            zong_red_money: "0.00",
            xian_red_money: ""
        });
    },
    get_red_money_d: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g, o = ((e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00") * this.data.zong_red_count).toFixed(2);
            this.setData({
                xian_red_money: e,
                zong_red_money: o
            });
        }
    },
    get_red_money: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00", this.setData({
                zong_red_money: parseFloat(e).toFixed(2),
                xian_red_money: e
            });
            var o = this.data.zong_red_count;
            if ("" != o) {
                if (e / o < .01) return $Toast({
                    content: "单个红包不可低于0.01"
                }), void this.setData({
                    is_submit: !0
                });
                this.setData({
                    is_submit: !1
                });
            }
        }
    },
    get_red_count: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) if (0 != e) {
            if (/^[0-9]*$/g.test(e) || (e = "1"), this.setData({
                zong_red_count: e
            }), 1 == this.data.red_type) {
                if ("" != this.data.xian_red_money) {
                    if (this.data.xian_red_money / e < .01) return $Toast({
                        content: "单个红包不可低于0.01"
                    }), void this.setData({
                        is_submit: !0
                    });
                    this.setData({
                        is_submit: !1
                    });
                }
            } else {
                var a = (this.data.xian_red_money * e).toFixed(2);
                this.setData({
                    zong_red_money: a,
                    is_submit: !1
                });
            }
        } else this.setData({
            zong_red_count: 1
        });
    },
    select_qq_id: function(t) {
        this.setData({
            title: "发布到" + t.currentTarget.dataset.name,
            showLeft: !this.data.showLeft,
            fa_class: t.currentTarget.dataset.id,
            get_hidden: !this.data.get_hidden
        });
    },
    toggleLeft: function() {
        this.setData({
            showLeft: !this.data.showLeft,
            get_hidden: 1 != this.data.get_hidden
        });
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), 0 < this.data.curNav && this.get_right_item();
    },
    get_left_needle: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var o = app.api_root + "User/get_left_needle";
        http.POST(o, {
            params: a,
            success: function(t) {
                "success" == t.data.status ? e.setData({
                    navLeftItems: t.data.info
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
    get_right_item: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.get_id = a.data.curNav, e.page = a.data.page;
        var o = app.api_root + "User/get_right_needle", i = a.data.navRightItems;
        http.POST(o, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) i.push(t.data.info[e]);
                    a.setData({
                        navRightItems: i
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
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), o = new Object();
        o.token = a.token, o.openid = a.openid, http.POST(t, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info
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
    get_user_vip: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid;
        var o = app.api_root + "User/check_user_vip";
        http.POST(o, {
            params: a,
            success: function(t) {
                e.setData({
                    is_vip: t.data
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
    submit: function() {
        if (0 == this.data.fa_class) return $Toast({
            content: "请选择发布的" + this.data.design.landgrave
        }), void this.setData({
            showLeft: !0,
            get_hidden: !1
        });
        if (console.log(this.data.zong_red_money), console.log(this.data.user_info.fraction), 
        parseFloat(this.data.zong_red_money) > parseFloat(this.data.user_info.fraction)) $Toast({
            content: "所需余额不足"
        }); else {
            $Toast({
                content: "正在发布....",
                icon: "prompt",
                duration: 0,
                mask: !1
            });
            var a = this;
            a.setData({
                is_submit: !0
            });
            var t = app.getCache("userinfo"), o = new Object();
            if ("" == this.data.title_value) return $Toast({
                content: "标题不能为空"
            }), void a.setData({
                is_submit: !1
            });
            if (2 != this.data.fa_type && "" == this.data.text && 0 == this.data.img_arr.length) return $Toast({
                content: "内容不能为空"
            }), void a.setData({
                is_submit: !1
            });
            if (o.title = this.data.title_value, o.color = this.data.title_color, o.content = this.data.text, 
            o.img_arr = this.data.img_arr, o.uid = t.uid, o.token = t.token, o.openid = t.openid, 
            o.is_open = 0 == this.data.is_open ? 1 : 0, o.type = this.data.fa_type, o.fa_class = this.data.fa_class, 
            o.mch_id = app.siteInfo.uniacid, o.file_ss = this.data.file_ss, this.data.red_paper && (o.red_paper = 1 == this.data.red_paper ? 1 : 0, 
            o.red_type = this.data.red_type, o.zong_red_count = this.data.zong_red_count, o.zong_red_money = this.data.zong_red_money), 
            console.log(o), 2 == this.data.fa_type && "" == this.data.file) return $Toast({
                content: "请添加视频"
            }), void a.setData({
                is_submit: !1
            });
            1 == this.data.fa_type || 2 == this.data.fa_type ? wx.uploadFile({
                url: app.api_root + "User/img_upload",
                filePath: a.data.file,
                name: "sngpic",
                formData: {
                    token: t.token,
                    openid: t.openid,
                    much_id: app.siteInfo.uniacid
                },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function(t) {
                    var e = JSON.parse(t.data);
                    console.log(e), o.user_file = e.url, a.add_submit(o);
                },
                fail: function(t) {
                    $Toast({
                        content: "上传错误！",
                        type: "error"
                    }), a.setData({
                        is_submit: !1
                    });
                }
            }) : (o.user_file = "", a.add_submit(o), $Toast.hide());
        }
    },
    add_submit: function(t) {
        var e = this, a = app.api_root + "User/add_circle";
        http.POST(a, {
            params: t,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg,
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3)) : (e.setData({
                    is_submit: !1
                }), $Toast({
                    content: t.data.msg,
                    duration: 0
                })), setTimeout(function() {
                    $Toast.hide();
                }, 3e3);
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
    onChange: function(t) {
        var e = t.detail;
        this.setData({
            is_open: e.value
        });
    },
    onChange_red_paper: function(t) {
        var e = t.detail;
        this.setData({
            red_paper: e.value,
            is_submit: e.value
        });
    },
    hideModal: function() {
        this.setData({
            text_color: !1,
            get_hidden: !0
        });
    },
    color_select: function() {
        this.setData({
            text_color: !0,
            get_hidden: !1
        });
    },
    handleClick4: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index;
        this.setData({
            text_color: !1,
            get_hidden: !0,
            title_color: this.data.actions4[e].color
        });
    },
    set_title_value: function(t) {
        var e = t.detail.value;
        this.setData({
            title_value: e
        });
    },
    set_title: function() {
        this.data.is_title ? this.setData({
            is_title: !1
        }) : this.setData({
            is_title: !0
        });
    },
    add_video: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            duration: e.data.copyright.video_setting,
            compressed: !1,
            success: function(t) {
                console.log(t), wx.hideLoading(), e.data.copyright.video_setting < t.duration ? $Toast({
                    content: "视频最长为" + e.data.copyright.video_setting + "秒！请重新上传"
                }) : e.setData({
                    file: t.tempFilePath
                });
            }
        });
    },
    start: function() {
        var e = this;
        e.setData({
            file_ss: 0
        }), recorderManager.start(options), recorderManager.onStart(function() {
            recordTimeInterval = setInterval(function() {
                var t = e.data.file_ss + 1;
                60 <= t && e.touchEnd(), e.setData({
                    file_ss: t
                });
            }, 1e3);
        }), recorderManager.onError(function(t) {
            console.log(t);
        });
    },
    get_text_len: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    stop: function() {
        var e = this, a = this;
        recorderManager.stop(), recorderManager.onStop(function(t) {
            e.tempFilePath = t.tempFilePath, console.log("停止录音", t.tempFilePath), a.setData({
                file: t.tempFilePath
            }), clearInterval(recordTimeInterval), recordTimeInterval = "";
        });
    },
    play: function() {
        innerAudioContext.autoplay = !0, innerAudioContext.src = this.data.file, innerAudioContext.play(), 
        innerAudioContext.onPlay(function() {
            console.log("开始播放");
        }), innerAudioContext.onError(function(t) {
            console.log(t.errMsg), console.log(t.errCode);
        });
    },
    handleClose: function() {
        this.setData({
            visible2: !1
        });
    },
    handleOk: function() {
        wx.openSetting(), this.setData({
            visible2: !1
        });
    },
    touchStart: function() {
        var e = this;
        if (wx.getSetting({
            success: function(t) {
                0 == t.authSetting["scope.record"] ? wx.authorize({
                    scope: "scope.record",
                    fail: function() {
                        e.setData({
                            visible2: !0,
                            scope_record: !1
                        });
                    }
                }) : e.setData({
                    scope_record: !0
                });
            }
        }), 0 == e.data.scope_record) return !1;
        $Toast({
            duration: 0,
            content: "正在录音",
            image: "https://wq.inotnpc.com/addons/yl_welore/web/static/wechat/yuyin.gif",
            mask: !1
        }), this.start();
    },
    touchEnd: function() {
        $Toast.hide(), this.stop();
    },
    chooseImage: function() {
        var i = this, n = app.getCache("userinfo"), s = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: i.data.img_length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                $Toast({
                    content: "上传中...",
                    type: "loading"
                });
                var e = t.tempFilePaths;
                i.setData({
                    img_length: i.data.img_length - e.length
                }), i.data.img_length <= 0 && i.setData({
                    img_botton: !1
                });
                for (var a = 0, o = e.length; a < o; a++) wx.uploadFile({
                    url: s,
                    filePath: e[a],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid,
                        much_id: app.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var e = JSON.parse(t.data);
                        console.log(e), "error" == e.status ? $Toast({
                            content: e.msg
                        }) : (i.setData({
                            img_arr: i.data.img_arr.concat(e.url)
                        }), $Toast.hide());
                    },
                    fail: function(t) {
                        $Toast({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    previewOneImage: function() {
        var a = this, o = app.getCache("userinfo"), i = app.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showLoading({
                    title: "上传中...",
                    mask: !0
                });
                var e = t.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: e[0],
                    name: "sngpic",
                    formData: {
                        token: o.token,
                        openid: o.openid,
                        much_id: app.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var e = JSON.parse(t.data);
                        console.log(e), "error" == e.status ? $Toast({
                            content: e.msg
                        }) : (a.setData({
                            img_arr: a.data.img_arr.concat(e.url),
                            img_botton: !1
                        }), wx.hideLoading()), console.log(a.data.img_botton);
                    },
                    fail: function(t) {
                        $Toast({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    clearOneImage: function(t) {
        var e = t.target.dataset.index, a = this.data.img_arr;
        a.splice(e, 1), this.setData({
            img_arr: a
        }), this.setData({
            img_botton: !0
        });
    },
    clearImage: function(t) {
        var e = this, a = t.target.dataset.index, o = e.data.img_arr;
        o.splice(a, 1), e.setData({
            img_arr: o,
            img_length: e.data.img_length + 1
        }), 0 < e.data.img_length && e.setData({
            img_botton: !0
        });
    },
    previewImage: function(t) {
        console.log(t);
        for (var e = this.data.img_arr, a = [], o = 0; o < e.length; o++) a.push(e[o]);
        wx.previewImage({
            current: t.target.dataset.src,
            urls: a
        });
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
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});