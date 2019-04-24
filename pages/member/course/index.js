var t = getApp(), e = t.requirejs("core");

Page({
  data: {
    list: []
  },
  onLoad: function (e) {
    t.url(e);
  },
  onShow: function () {
    this.getList();
   
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  getList: function () {
    var t = this;
    e.get("member/address/get_list", {}, function (e) {

      t.setData({
        list: e.list,
        show: !0
      });
      
    });
  },
});