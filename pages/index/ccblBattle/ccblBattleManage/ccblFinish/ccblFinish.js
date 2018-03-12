// pages/index/ccblBattle/ccblBattleManage/ccblFinish/ccblFinish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skill:1,
    virtue:1,
    picUrl:'/assets/icon/addPic.png',
    enemyAvatar:'',
    battle:null,
    enemy:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '确认结束',
    })
    this.setData({
        battle: wx.getStorageSync('finishing')
    })
    wx.removeStorageSync('finishing')
    console.log(this.data.battle)
    if (wx.getStorageSync('openid') == this.data.battle.inviteOpenid){
        this.setData({
            enemyAvatar: this.data.battle.invitedWechatAvatar,
            enemy: this.data.battle.invitedClassInfo
        })
    }else{
        this.setData({
            enemyAvatar: this.data.battle.inviteWechatAvatar,
            enemy: this.data.battle.inviteClassInfo
        })
    }
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
  setScore:function(e){
    this.setData({
        skill: e.currentTarget.dataset.ctrlno
    })
  },
  setVirtue: function (e) {
      this.setData({
          virtue: e.currentTarget.dataset.ctrlno
      })
  },
  addPic:function(){

      let self =this
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            //   var tempFilePaths = res.tempFilePaths
            console.log(res)
            self.setData({
                picUrl: res.tempFilePaths[0],
            })
            //后面再接uploadFile
          }
      })
  },
//   submit: function () {
//       let self = this

//       if (wx.getStorageSync('openid') == this.data.battle.inviteOpenid) {
//           wx.request({
//               url: 'https://www.runhigh-ccbl.com/api/ccbl/invite/endMatch',
//               header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
//               data: {
//                   invitationId: self.data.battle.invitationId,
//                   virtuePoints: self.data.virtue,
//                   skillPoints: self.data.skill,
//                   recordImg: self.data.picUrl

//               },
//               method: 'POST',
//               success: function (res) {
//                   if (res.data.message == "ok") {
//                       wx.showModal({
//                           title: '已确认结束比赛',
//                           content: ' ',
//                           showCancel: false,
//                       })
//                   } else if (res.data.status_code != "200" || res.data.message != "ok") {
//                       console.log(res)
//                       wx.showModal({
//                           title: '请求异常',
//                           content: ' ',
//                           showCancel: false,
//                       })
//                   }
//               },
//               fail: function (res) {
//                   console.log(res)
//                   wx.showModal({
//                       title: '请求异常',
//                       content: ' ',
//                       showCancel: false,
//                   })
//               }
//           })
//       } else {
//           wx.request({
//               url: 'https://www.runhigh-ccbl.com/api/ccbl/invited/endMatch',
//               header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
//               data: {
//                   invitationId: self.data.battle.invitationId,
//                   virtuePoints: self.data.virtue,
//                   skillPoints: self.data.skill,
//                   recordImg:self.data.picUrl

//               },
//               method: 'POST',
//               success: function (res) {
//                   if (res.data.message == "ok") {
//                       wx.showModal({
//                           title: '已确认结束比赛',
//                           content: ' ',
//                           showCancel: false,
//                       })
//                   } else if (res.data.status_code != "200" || res.data.message != "ok") {
//                       console.log(res)
//                       wx.showModal({
//                           title: '请求异常',
//                           content: ' ',
//                           showCancel: false,
//                       })
//                   }
//               },
//               fail: function (res) {
//                   console.log(res)
//                   wx.showModal({
//                       title: '请求异常',
//                       content: ' ',
//                       showCancel: false,
//                   })
//               }
//           })
//       }
//   },
  submit: function () {
      let self = this
      console.log(self.data.picUrl)
      if (this.data.picUrl == '/assets/icon/addPic.png'){
                            
        wx.showModal({
            title: '请选择图片',
            content: ' ',
            showCancel: false,
        })
      }
      else{
      wx.showLoading({
        title: '提交中',
      })    
      if (wx.getStorageSync('openid') == this.data.battle.inviteOpenid){
        wx.uploadFile({
            url: 'https://www.runhigh-ccbl.com/api/ccbl/invite/endMatch',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            filePath: self.data.picUrl,
            name: 'pic',
            formData:{
                'invitationId': self.data.battle.invitationId+'',
                'virtuePoints': self.data.virtue+'',
                'skillPoints': self.data.skill+'',
            },
            success:function(res){
                console.log(JSON.parse(res.data))
                let resobj = JSON.parse(res.data)
                    if (resobj.data.message == "ok") {
                    wx.showModal({
                        title: '已确认结束比赛',
                        content: ' ',
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                    } else if (resobj.data.code != "200" || resobj.data.message != "ok") {
                    console.log(res)
                    wx.showModal({
                        title: '请求异常',
                        content: ' ',
                        showCancel: false,
                    })
                }
            },
            fail:function(){
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
      } else {
          wx.uploadFile({
              url: 'https://www.runhigh-ccbl.com/api/ccbl/invited/endMatch',
              header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
              filePath: self.data.picUrl,
              name: 'pic',
              formData: {
                  'invitationId': self.data.battle.invitationId + '',
                  'virtuePoints': self.data.virtue + '',
                  'skillPoints': self.data.skill + '',
              },
              success:function(res){
                console.log(JSON.parse(res.data))
                let resobj = JSON.parse(res.data)
                    if (resobj.data.message == "ok") {
                    wx.showModal({
                        title: '已确认结束比赛',
                        content: ' ',
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                    } else if (resobj.data.code != "200" || resobj.data.message != "ok") {
                    console.log(res)
                    wx.showModal({
                        title: '请求异常',
                        content: ' ',
                        showCancel: false,
                    })
                }
            },
            fail:function(){
                wx.showModal({
                    title: '请求异常',
                    content: ' ',
                    showCancel: false,
                })
            },
            complete: function () {
                wx.hideLoading()
            }
          })
      }
      }
  }
})