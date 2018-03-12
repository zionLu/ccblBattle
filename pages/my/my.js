const app = getApp();
Page({
    data: {
        userInfo:null,
        haveLogin:false,
    },
    onLoad: function () {
        console.log('打开my页')
        wx.setNavigationBarTitle({
            title:'CCBL个人中心',
        })
        if (app.globalData.userInfo || wx.getStorageSync('userInfo')){
            if (app.globalData.userInfo){
                this.setData({
                    userInfo: app.globalData.userInfo,
                    haveLogin:true,
                })
            } else if (wx.getStorageSync('userInfo')){
                this.setData({
                    userInfo: wx.getStorageSync('userInfo'),
                    haveLogin: true,
                })
            }
        }
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

    accountInfoButton:function(){
        wx.navigateTo({
            url:'/pages/my/accountInfo/accountInfo'
        })
    },
    aboutCcblButton: function () {
        wx.navigateTo({
            url: '/pages/my/aboutCcbl/aboutCcbl'
        })
    },
    businessCooButton: function () {
        wx.navigateTo({
            url: '/pages/my/businessCoo/businessCoo'
        })
    },
    
    wxLogin:function(){
        let self = this
        wx.getUserInfo({
            success: function (res) {

                app.globalData.userInfo = res.userInfo
                wx.setStorageSync('userInfo', res.userInfo)
                self.setData({
                    userInfo: res.userInfo,
                    haveLogin:true,
                })
            },
            fail: function (res) {
                //作拒绝授权处理
                wx.showToast({
                    title: '请授权，可以在小程序设置界面中控制授权状态',
                })
                wx.openSetting({
                    success: function (res) {
                        wx.getUserInfo({
                            success: function (res) {

                                app.globalData.userInfo = res.userInfo
                                wx.setStorageSync('userInfo', res.userInfo)
                                self.setData({
                                    userInfo: res.userInfo,
                                    haveLogin: true,
                                })
                            },
                            fail:function(){
                                wx.showToast({
                                    title: '授权失败',
                                })
                            }
                        })
                    }
                })
            },
        })
    }
})