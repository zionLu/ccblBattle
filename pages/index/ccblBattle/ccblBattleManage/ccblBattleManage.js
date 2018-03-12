// pages/index/ccblBattle/ccblBattleManage/ccblBattleManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showBox:{
          showAnnouncingBattleBox: false,
          showProcessingBattleBox: true,
          showCheckingBattleBox: false,
          showRevokingBattleBox: false,
          showFinishedBattleBox: false,
          showRevokedBattleBox: false,
      },
      announcingBattle:[],
      processingBattle:[],
      checkingBattle:[],
      revokingBattle:[],
      finishedBattle:[],
      revokedBattle:[],

      announcingComplete: false,
      processingComplete: false,
      checkingComplete: false,
      revokingComplete: false,
      finishedComplete: false,
      revokedComplete: false,

      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.setNavigationBarTitle({
        title: 'CCBL管理',
    })
    wx.getSystemInfo({
        success: (res) => {
            this.setData({
                screen: {
                    width: res.screenWidth,
                    height: res.screenHeight
                }
            })
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
      console.log('ccbl管理刷新')
    let self =this
    
    this.setData({
        announcingComplete: false,
        processingComplete: false,
        checkingComplete: false,
        revokingComplete: false,
        finishedComplete: false,
        revokedComplete: false,
    })
    wx.showLoading({
        title: '加载中',
    })
    //发布中
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/publishing',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    announcingBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
            self.setData({
                announcingComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete==true){
                wx.hideLoading()
            }
        }
    })

    //进行中
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/ongoing',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            console.log(res)
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    processingBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
        complete: function () {
            self.setData({
                processingComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete == true) {
                wx.hideLoading()
            }
        }
    })

    //审核中
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/checking',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    checkingBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
        complete: function () {
            self.setData({
                checkingComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete == true) {
                wx.hideLoading()
            }
        }
        
    })

    //撤销中
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/drawbacking',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    revokingBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
        complete: function () {
            self.setData({
                revokingComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete == true) {
                wx.hideLoading()
            }
        }
    })

    //已完成
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/accomplished',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    finishedBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
        complete: function () {
            self.setData({
                finishedComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete == true) {
                wx.hideLoading()
            }
        }
    })

    //已撤销
    wx.request({
        url: 'https://www.runhigh-ccbl.com/api/ccbl/display/drawbacked',
        header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        data: {},
        method: 'POST',
        success: function (res) {
            if (res.data.status_code == "200" || res.data.message == 'ok') {
                self.setData({
                    revokedBattle: res.data.data
                })
            } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
        complete: function () {
            self.setData({
                revokedComplete: true,
            })
            if (self.data.announcingComplete == true && self.data.processingComplete == true && self.data.checkingComplete == true && self.data.revokingComplete == true && self.data.finishedComplete == true && self.data.revokedComplete == true) {
                wx.hideLoading()
            }
        }
    })
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


  newBattleButtonMove: function (e) {
      if (e.touches[0].clientX < 25) {
          e.touches[0].clientX = 25
      } else if (e.touches[0].clientX > this.data.screen.width - 25) {
          e.touches[0].clientX = this.data.screen.width - 25
      }
      if (e.touches[0].clientY < 25) {
          e.touches[0].clientY = 25
      } else if (e.touches[0].clientY > this.data.screen.height - 88) {
          e.touches[0].clientY = this.data.screen.height - 88
      }
      this.setData({
          left: e.touches[0].clientX - 25,
          top: e.touches[0].clientY - 25
      })

  },
  newBattleButton: function () {
      wx.navigateTo({
          url: '/pages/index/ccblBattle/newCcblBattle/newCcblBattle',
      })
  },

  showAnnouncingBattle:function(){
        this.setData({
            showBox: {
                showAnnouncingBattleBox: true,
                showProcessingBattleBox: false,
                showCheckingBattleBox: false,
                showRevokingBattleBox: false,
                showFinishedBattleBox: false,
                showRevokedBattleBox: false,
            },
        })
  },
  showProcessingBattle:function(){
      this.setData({
          showBox: {
              showAnnouncingBattleBox: false,
              showProcessingBattleBox: true,
              showCheckingBattleBox: false,
              showRevokingBattleBox: false,
              showFinishedBattleBox: false,
              showRevokedBattleBox: false,
          },
      })
  },
  showCheckingBattle:function(){
      this.setData({
          showBox: {
              showAnnouncingBattleBox: false,
              showProcessingBattleBox: false,
              showCheckingBattleBox: true,
              showRevokingBattleBox: false,
              showFinishedBattleBox: false,
              showRevokedBattleBox: false,
          },
      })
  },
  showRevokingBattle:function(){
      this.setData({
          showBox: {
              showAnnouncingBattleBox: false,
              showProcessingBattleBox: false,
              showCheckingBattleBox: false,
              showRevokingBattleBox: true,
              showFinishedBattleBox: false,
              showRevokedBattleBox: false,
          },
      })
  },
  showFinishedBattle:function(){
      this.setData({
          showBox: {
              showAnnouncingBattleBox: false,
              showProcessingBattleBox: false,
              showCheckingBattleBox: false,
              showRevokingBattleBox: false,
              showFinishedBattleBox: true,
              showRevokedBattleBox: false,
          },
      })
  },
  showRevokedBattle:function(){
      this.setData({
          showBox: {
              showAnnouncingBattleBox: false,
              showProcessingBattleBox: false,
              showCheckingBattleBox: false,
              showRevokingBattleBox: false,
              showFinishedBattleBox: false,
              showRevokedBattleBox: true,
          },
      })
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
        wx.navigateTo({
            url: '/pages/index/ccblBattle/ccblBattleManage/ccblRevoke/ccblRevoke',
        })
        
    },
    finish: function (e) {
        console.log(e)
        if ((wx.getStorageSync('openid') == e.currentTarget.dataset.ctrlno.inviteOpenid && e.currentTarget.dataset.ctrlno.invitedSkillPoint != 0) || (wx.getStorageSync('openid') == e.currentTarget.dataset.ctrlno.invitedOpenid && e.currentTarget.dataset.ctrlno.inviteSkillPoint != 0)) {
            wx.showModal({
                title: '您已确认结束比赛',
                content: '',
                showCancel: false,
            })
        }else{
        wx.setStorageSync('finishing', e.currentTarget.dataset.ctrlno)
        wx.navigateTo({
            url: '/pages/index/ccblBattle/ccblBattleManage/ccblFinish/ccblFinish',
        })
        }
    }
})