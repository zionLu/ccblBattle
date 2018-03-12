const app = getApp()


Page({
    data: {
        name:null,
        avatar:null,
    },

    onShow: function (options) {
        let self = this
        wx.removeStorageSync('classInfo')
        console.log('打开index页')
        // wx.getUserInfo({
        //     success: function (res) {
        //         app.globalData.userInfo = res.userInfo
        //         wx.setStorageSync('userInfo', res.userInfo)
        //         name=res.userInfo.nickName
        //         avatar = res.userInfo.avatarUrl
        //         wx.login({
        //             success: function (res) {
        //                 if(!res.code){
        //                     wx.showModal({
        //                         title: '没拿到code,登录异常',
        //                         content: '',
        //                         showCancel: false
        //                     })
        //                 }else{
        //                     console.log(res.code)
        //                 }                     
        //                 wx.request({
        //                     url: 'https://www.runhigh-ccbl.com/api/commonLogin',
        //                     data: {
        //                         code: res.code,
        //                     },
        //                     method: 'POST',
        //                     success: function (res) {
        //                         console.log(res)
        //                         if (!res.data.data.token){
        //                             wx.showModal({
        //                                 title: '没拿到token，请求异常',
        //                                 content: '',
        //                                 showCancel: false
        //                             })
        //                         }else{
        //                             console.log(res.data.data.token)
        //                         }
        //                         let token=res.data.data.token
        //                         let openid=res.data.data.openid
        //                         wx.setStorageSync('token', token)
        //                         wx.setStorageSync('openid', openid)
        //                         if (res.data.data.classInfo){
        //                             wx.setStorageSync('classInfo', res.data.data.classInfo)
        //                         }
        //                         //此处应储存openid和token
        //                         wx.request({
        //                             url: 'https://www.runhigh-ccbl.com/api/updateInfo',
        //                             header: { 'Authorization': 'Bearer ' + token },
        //                             data:{
                                        
        //                                 wechatName:name,
        //                                 wechatAvatar:avatar,
        //                             },
        //                             method:'POST',
        //                             success:function(res){

        //                             },
        //                             fail:function(){
        //                                 wx.showModal({
        //                                     title: '请求异常',
        //                                     content: '',
        //                                     showCancel:false
        //                                 })
        //                             }
        //                         })                             

        //                     },
        //                     fail: function (res) {
        //                         wx.showModal({
        //                             title: '请求异常',
        //                             content: '',
        //                             showCancel: false
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     },
        //     fail: function (res) {
        //         //作拒绝授权处理
                
        //         wx.showModal({
        //             title: '请授权，可以在小程序设置界面中控制授权状态',
        //             content: ' ',
        //             showCancel: false,
        //             success:function(){
        //         wx.openSetting({
        //             success:function(res){
        //                 wx.getUserInfo({
        //                     success: function (res) {

        //                         console.log('授权成功')
        //                         console.log(res)
        //                         app.globalData.userInfo = res.userInfo
        //                         wx.setStorageSync('userInfo', res.userInfo)
        //                         name = res.userInfo.nickName
        //                         avatar = res.userInfo.avatarUrl
        //                         wx.login({
        //                             success: function (res) {
        //                                 console.log('登陆成功')
        //                                 console.log(res)
        //                                 wx.request({
        //                                     url: 'https://www.runhigh-ccbl.com/api/commonLogin',
        //                                     data: {
        //                                         code: res.code,
        //                                     },
        //                                     method: 'POST',
        //                                     success: function (res) {
        //                                         console.log('取得openID和token')
        //                                         console.log(res)
        //                                         let token = res.data.data.token
        //                                         //此处应储存openid和token
        //                                         wx.setStorageSync('openid', res.data.data.openid)
        //                                         wx.setStorageSync('token', res.data.data.token)
        //                                         console.log(wx.getStorageSync('token'))
        //                                         if(res.data.data.classInfo){
        //                                             wx.setStorageSync('classInfo', res.data.data.classInfo)
        //                                         }
        //                                         wx.request({
        //                                             url: 'https://www.runhigh-ccbl.com/api/updateInfo',
        //                                             header: { 'Authorization': 'Bearer ' + token },
        //                                             data: {

        //                                                 wechatName: name,
        //                                                 wechatAvatar: avatar,
        //                                             },
        //                                             method: 'POST',
        //                                             success: function (res) {
        //                                                 console.log('更新成功')
        //                                                 console.log(res)
        //                                             },
        //                                             fail:function(){
        //                                                 wx.showModal({
        //                                                     title: '请求异常',
        //                                                     content: '',
        //                                                     showCancel: false
        //                                                 })
        //                                             }
        //                                         })

        //                                     },
        //                                     fail: function (res) {
        //                                         wx.showModal({
        //                                             title: '请求异常',
        //                                             content: '',
        //                                             showCancel: false
        //                                         })
        //                                     }
        //                                 })
        //                             }
        //                         })
        //                     },
        //                     fail:function(){
        //                         wx.showModal({
        //                             title: '请授权',
        //                             content: '',
        //                             showCancel: false
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //             }
        //         })
        //     },
        // })
        wx.getUserInfo({
            success: function (res) {
                app.globalData.userInfo = res.userInfo
                wx.setStorageSync('userInfo', res.userInfo)
                self.data.name = res.userInfo.nickName
                self.data.avatar = res.userInfo.avatarUrl
                self.loginOperation()
            },
            fail: function (res) {
                wx.showModal({
                    title: '请授权，可以在小程序设置界面中控制授权状态',
                    content: ' ',
                    showCancel: false,
                    success: function () {
                        wx.openSetting({
                            success: function (res) {
                                wx.getUserInfo({
                                    success: self.loginOperation(),
                                    fail: function () {
                                        wx.showModal({
                                            title: '请授权',
                                            content: '',
                                            showCancel: false
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

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
    
//   }
    ccblBattleButton:function(){
        wx.navigateTo({
            url: '/pages/index/ccblBattle/ccblBattle',
        })
    },
    normalBattleButton: function () {
        wx.navigateTo({
            url: '/pages/index/normalBattle/normalBattle',
        })
    },
    loginOperation:function() {
        let self = this
        new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    if (!res.code) {
                        wx.showModal({
                            title: '没拿到code,登录异常',
                            content: '',
                            showCancel: false
                        })
                    } else {
                        console.log(res.code)
                    }
                    resolve(res)
                },
                fail: function (res) {
                    // wx.showModal({
                    //     title: '请求异常',
                    //     content: '',
                    //     showCancel: false
                    // })
                    reject(res)
                }
            })
        }).then(function (res) {

            return new Promise(function (resolve, reject) {
                wx.request({
                    url: 'https://www.runhigh-ccbl.com/api/commonLogin',
                    data: {
                        code: res.code
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res)
                        if (!res.data.data.token) {
                            wx.showModal({
                                title: '没拿到token，请求异常',
                                content: '',
                                showCancel: false
                            })
                        } else {
                            console.log(res.data.data.token)
                        }
                        let token = res.data.data.token
                        let openid = res.data.data.openid
                        wx.setStorageSync('token', token)
                        wx.setStorageSync('openid', openid)
                        if (res.data.data.classInfo) {
                            wx.setStorageSync('classInfo', res.data.data.classInfo)
                        }
                        resolve(res)
                        // 此处应储存openid和token
                    },
                    fail: function () {
                        wx.showModal({
                            title: '请求异常',
                            content: '',
                            showCancel: false
                        })
                        reject()
                    }
                })
            })
        }, function (res) {
            wx.showModal({
                title: '请求异常',
                content: '',
                showCancel: false
            })
        }).then(function (res) {
            return new Promise(function (resolve, reject) {
                console.log(res)
                wx.request({
                    url: 'https://www.runhigh-ccbl.com/api/updateInfo',
                    header: { 'Authorization': 'Bearer ' + res.data.datatoken },
                    data: {
                        wechatName: self.data.name,
                        wechatAvatar: self.data.avatar
                    },
                    method: 'POST',
                    success: function (res) {
                        resolve()
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: '请求异常',
                            content: '',
                            showCancel: false
                        })
                        reject()
                    }
                })
            })
        })
    }
    
})