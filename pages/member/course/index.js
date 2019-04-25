var t = getApp(),
  e = t.requirejs("core");

Page({
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    t.url(e);
  },
  onShow: function() {
    this.getList();

  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  getList: function() {
    var t = this;
    e.get("shop/get_my_course", {}, function(e) {

      t.setData({
        list: e.list,
        show: !0
      });

    });
  },
  // 计算两点之间的距离
  calculateDistance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378137; //地球半径
    s = Math.round(s * 10000) / 10000;
    // if (s > 1000) {
    //   s = (s / 1000).toFixed(2) + "km"
    // } else {
    //   s = s.toFixed(2) + "m"
    // }
    return s
  },
  // 点击打卡
  clockin: function(es) {
    var t = this; 
    var mark = es.currentTarget.dataset.mark,
      lat = parseFloat(es.currentTarget.dataset.lnl.lat),
      lng = parseFloat(es.currentTarget.dataset.lnl.lng),
      latitude, longitude,distance;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        distance = t.calculateDistance(26,116,26,116);
        // distance = t.calculateDistance(lat, lng, latitude, longitude);
        if(distance < 100){
          e.get("shop/clock_in", { type: 1, mark: mark}, function (e) {
            wx.showModal({
              title: '提示',
              content: '打卡成功',
              showCancel: false,
              success(res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          }); 
        }else{
          wx.showModal({
            title: '提示',
            content: '未进入打卡区域',
            showCancel: false,
            success(res) {
              if (res.confirm) {

              } else if (res.cancel) {
                
              }
            }
          })
        }
      },
      fail(){
        wx.showModal({
          title: '提示',
          content: '获取位置信息失败，无法完成打卡',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting)
                }
              })
            }
          }
        })
      }
    })
    
  }
});