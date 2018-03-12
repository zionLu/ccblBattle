// pages/my/accountInfo/ccblBind/ccblBind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    password:'',
    warnShow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: 'CCBL绑定',
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

  idInput:function(e) {
      this.setData({
          id: e.detail.value
      })
    //   console.log(e)
    //   console.log(this.data.id)
      if (e.detail.cursor == 12) {
          this.setData({
              warnShow: false
          })
      }else{
          this.setData({
              warnShow: true
          })
      }
  },

  passwordInput: function (e) {
      this.setData({
          password: e.detail.value
      })
  },

  submit:function(){
      if (wx.getStorageSync('classInfo')){
          wx.showModal({
              title: '您已绑定了一个账号',
              content: ' ',
              showCancel: false,
          })
      }else{
      let token = wx.getStorageSync('token')
      let id=this.data.id
      let password = this.data.password
      if(id==''||password==''){
          wx.showModal({
              title: '请正确填写表单',
              content: ' ',
              showCancel: false,
          })
      }else{
      wx.showLoading({
          title: '提交中',
      })
      wx.request({
          url: 'https://www.runhigh-ccbl.com/api/bindCcblAccount',
          header: { 'Authorization': 'Bearer ' + token },
          data: {
                classNumber: id,
                password: password,
          },
          method: 'POST',
          success: function (res) {
              console.log(res)
              if (res.data.message == "bind successfully"){
                  wx.setStorageSync('classInfo', res.data.data)
                  wx.showModal({
                      title: '绑定成功',
                      content: ' ',
                      showCancel: false,
                      success:function(){
                          wx.switchTab({
                              url: "/pages/index/index",
                          })
                      }
                  })
                 
              } else if (res.data.message =="classNumber or password errors"){
                  wx.showModal({
                      title: '账号或密码错误',
                      content:' ',
                      showCancel:false,
                  })
              } else if (res.data.message == "another account has bound"){
                  wx.showModal({
                      title: '该账号已被绑定',
                      content: ' ',
                      showCancel: false,
                  })
              }
          },
          fail:function(res){
              console.log(res)
          },
          complete:function(){
              wx.hideLoading()
          }
      })
      }
      }
  }
})