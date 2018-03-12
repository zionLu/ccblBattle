// pages/my/accountInfo/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // warnShow:true,
    // tel:'',
    verify:'',
    password:'',
    pswAgain:'',
    realVerify:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '修改密码',
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
      if (!wx.getStorageSync('classInfo')) {
          wx.showModal({
              title: '请先注册参赛',
              content: ' ',
              showCancel: false,
              success: function () {
                  wx.navigateBack({
                      delta:1
                  })
              }
          })
      }
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

    // telInput:function(e){
    //     this.setData({
    //         tel: e.detail.value
    //     })
    //     //   console.log(e)
    //     //   console.log(this.data.id)
    //     if (e.detail.cursor == 11) {
    //         this.setData({
    //             warnShow: false
    //         })
    //     } else {
    //         this.setData({
    //             warnShow: true
    //         })
    //     }
    // },

    verifyInput:function(e){
        this.setData({
            verify: e.detail.value
        })
    },

    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    pswAgainInput: function (e) {
        this.setData({
            pswAgain: e.detail.value
        })
    },

    sendMsg:function(){
        wx.showLoading({
            title: '请求中',
        })
        let self=this
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/ccbl/sendChangePasswordMes',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: { },
            method: 'GET',
            success: function (res) {
                if (res.statusCode==200||res.data.message == "ok"){
                    wx.showModal({
                        title: '验证码短信已发送',
                        content: ' ',
                        showCancel: false,
                    })
                    self.setData({
                        realVerify: res.data.data.captcha
                    })
                }else{
                    wx.showModal({
                        title: '验证码发送出现异常',
                        content: ' ',
                        showCancel: false,
                    })
                }
                
            },
            fail: function (res) {
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

    submit:function(){
        let self = this
        if ( this.data.verify == '' || !this.data.verify || this.data.password == '' || !this.data.password||this.data.password.length<6||this.data.password.length>12||this.data.password!=this.data.pswAgain){
            wx.showModal({
                title: '表单填写错误',
                content: ' ',
                showCancel: false,
            })
        }else if(this.data.verify!=this.data.realVerify){
            wx.showModal({
                title: '验证码错误',
                content: ' ',
                showCancel: false,
            })
        }else{
            wx.showLoading({
                title: '提交中',
            })
            wx.request({
                url: 'https://www.runhigh-ccbl.com/api/ccbl/changePassword',
                header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
                data: {
                    password:self.data.password
                },
                method: 'POST',
                success: function (res) {
                    console.log(res)
                    if (res.statusCode == 200 || res.data.message == "changed password") {
                        wx.showModal({
                            title: '修改密码成功',
                            content: ' ',
                            showCancel: false,
                        })
                    } else {
                        wx.showModal({
                            title: '请求出现异常',
                            content: ' ',
                            showCancel: false,
                        })
                    }

                },
                fail: function (res) {
                    wx.showModal({
                        title: '请求出现异常',
                        content: ' ',
                        showCancel: false,
                    })
                },complete:function(){
                    wx.hideLoading()
                }
            })
        }
    }
})