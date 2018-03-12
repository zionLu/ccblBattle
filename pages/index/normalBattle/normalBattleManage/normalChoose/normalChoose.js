// pages/index/normalBattle/normalBattleManage/normalChoose/normalChoose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    battle:null,
    enemyList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let self = this
      wx.setNavigationBarTitle({
          title: '应战信息',
      })
      this.setData({
          battle: wx.getStorageSync('choosing')
      })
      wx.removeStorageSync('choosing')
      console.log(this.data.battle)
      wx.showLoading({
          title: '加载中',
      })
      wx.request({
          url: 'https://www.runhigh-ccbl.com/api/common/acceptList',
          header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
          data: {
              invitationId:self.data.battle.invitationId
          },
          method: 'POST',
          success: function (res) {
              if (res.data.message == 'ok' || res.data.status_code == "200"){
                  self.setData({
                      enemyList: res.data.data
                  })
                  console.log(self.data.enemyList)
              }else if (res.data.message != 'ok' || res.data.status_code!="200") {
                  wx.showModal({
                      title: '请求异常',
                      content: ' ',
                      showCancel: false,
                  })
              }
          },
          fail: function (res) {
              console.log(res)
              wx.showModal({
                  title: '请求异常',
                  content: ' ',
                  showCancel: false,
              })
          },
          complete:function(){
              wx.hideLoading()
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  checkInMap: function (e) {
      wx.openLocation({
          latitude: Number(e.currentTarget.dataset.ctrlno.latitude),
          longitude: Number(e.currentTarget.dataset.ctrlno.longitude),
          fail: function () {
              wx.showModal({
                  title: '请授权，可以在小程序设置界面中控制授权状态',
                  content: '',
                  showCancel: false,
                  success: function () {
                      wx.openSetting({
                          success: function (res) {
                              wx.openLocation({
                                  latitude: Number(e.currentTarget.dataset.ctrlno.latitude),
                                  longitude: Number(e.currentTarget.dataset.ctrlno.longitude),
                                  fail: function () {
                                      wx.showModal({
                                          title: '请授权',
                                          content: '',
                                          showCancel: false,
                                      })
                                  }
                              })
                          }
                      })
                  }
              })
          }
      })
  },
  revoke:function(e){
      wx.setStorageSync('revoking', e.currentTarget.dataset.ctrlno)
      wx.redirectTo({
          url: '/pages/index/normalBattle/normalBattleManage/normalRevoke/normalRevoke',
      })
  },
  choose:function(e){
      wx.showLoading({
          title: '请求中',
      })
      wx.request({
          url: 'https://www.runhigh-ccbl.com/api/common/choose/challenge',
          header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
          data: {
              acceptId: e.currentTarget.dataset.ctrlno.acceptId
          },
          method: 'POST',
          success: function (res) {
              console.log(res)
              if (res.data.message == 'ok' || res.data.status_code == "200") {
                  wx.showModal({
                      title: '选择应战成功',
                      content: ' ',
                      showCancel: false,
                      success:function(){
                          wx.navigateBack({
                              delta:1,
                          })
                      }
                  })
              } else if (res.data.message != 'ok' || res.data.status_code != "200") {
                  wx.showModal({
                      title: '请求异常',
                      content: ' ',
                      showCancel: false,
                  })
              }
          },
          fail: function (res) {
              console.log(res)
              wx.showModal({
                  title: '请求异常',
                  content: ' ',
                  showCancel: false,
              })
          },
          complete:function(){
              wx.hideLoading()
          }
      })
  },
})