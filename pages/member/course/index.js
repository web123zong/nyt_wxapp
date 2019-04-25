var t = getApp(), e = t.requirejs("core");

Page({
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    e.get("shop/get_my_course", {}, function (e) {

      t.setData({
        list: e.list,
        show: !0
      });
      
    });
  },
});