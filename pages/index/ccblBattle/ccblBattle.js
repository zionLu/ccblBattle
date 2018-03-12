Page({
    data:{
        left: '',
        top: '',
        screen: {
            width: null,
            height: null
        },
        allBattle:[],
        timeFlag:null,
    },
    onLoad:function(){
        
        wx.setNavigationBarTitle({
            title: 'CCBL约战',
        })
        // if (!wx.getStorageSync('classInfo')){
        //     wx.showModal({
        //         title: '请先注册参赛',
        //         content: ' ',
        //         showCancel: false,
        //         success:function(){
        //             wx.redirectTo({
        //                 url: '/pages/my/accountInfo/accountInfo',
        //             })
        //         }
        //     })
        // }
        // wx.request({
        //     url: 'https://www.runhigh-ccbl.com/api/ccbl/display/allPublishing',
        //     header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        //     data: {},
        //     method: 'POST',
        //     success: function (res) {
        //         console.log(res)
        //         self.setData({
        //             allBattle:res.data.data
        //         })
        //         console.log(self.data.allBattle)
        //         if (res.statusCode != 200 && res.data.message !='ok'){
        //             wx.showModal({
        //                 title: '请求异常',
        //                 content: ' ',
        //                 showCancel: false,
        //             })
        //         }
        //     },
        //     fail: function (res) {
        //         console.log(res)
        //         wx.showModal({
        //             title: '请求异常',
        //             content: ' ',
        //             showCancel: false,
        //         })
        //     }
        // })
    },
    onShow:function(){
        let self = this
        if (!wx.getStorageSync('classInfo')) {
            wx.showModal({
                title: '请先注册参赛',
                content: ' ',
                showCancel: false,
                success: function () {
                    wx.redirectTo({
                        url: '/pages/my/accountInfo/accountInfo',
                    })
                }
            })
        }else{
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/ccbl/display/allPublishing',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {},
            method: 'POST',
            success: function (res) {
                if (res.data.status_code == "200" || res.data.message == 'ok') {
                    let timeFlagNow = null
                    if(res.data.data.length!=0){
                        timeFlagNow = res.data.data[res.data.data.length - 1].matchTime
                    }
                    self.setData({
                        allBattle: res.data.data,
                        timeFlag: timeFlagNow
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
                wx.hideLoading()
            }
        })
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    loadMore: function () {
        console.log(this.data.timeFlag)
        let self = this
        console.log(self.data.timeFlag)
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/ccbl/display/allPublishing',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {
                timeFlag:self.data.timeFlag
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                if (res.data.status_code == "200" || res.data.message == 'ok') {
                    if (res.data.data && res.data.data.length != 0){
                        let allBattleNow = self.data.allBattle
                        allBattleNow.concat(res.data.data)
                        self.setData({
                            allBattle: allBattleNow.concat(res.data.data),
                            timeFlag: res.data.data[res.data.data.length - 1].matchTime
                        })
                    }else{
                        wx.showModal({
                            title: '已是最后一条',
                            content: ' ',
                            showCancel: false,
                        })
                    }
                    
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
                wx.hideLoading()
            }
        })
    },
    newBattleButton:function(){
        wx.navigateTo({
            url: '/pages/index/ccblBattle/newCcblBattle/newCcblBattle',
        })
    },
    battleManageButton:function(){
        wx.navigateTo({
            url: '/pages/index/ccblBattle/ccblBattleManage/ccblBattleManage',
        })
    },
    buttonClick:function(){
        wx.navigateTo({
            url: '/pages/index/ccblBattle/ccblBattleManage/ccblFinish/ccblFinish',
        })
    },
    checkInMap:function(e){
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.ctrlno.latitude),
            longitude: Number(e.currentTarget.dataset.ctrlno.longitude),
            fail:function(){
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

    accept:function(e){
        let self = this
        wx.showLoading({
            title: '请求中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/ccbl/accept/ccblInvitation',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {
                invitationId: self.data.allBattle[e.currentTarget.dataset.ctrlno].invitationId
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                if(res.data.message=="accept"||res.data.status_code==200){
                    wx.showModal({
                        title: '应战成功',
                        content: ' ',
                        showCancel: false,
                    })
                    let allBattleNow = self.data.allBattle
                    allBattleNow.splice(e.currentTarget.dataset.ctrlno, 1)
                    self.setData({
                        allBattle: allBattleNow
                    })
                } else if (res.data.message == "can't accept your apply" || res.data.status_code == 5000){
                    wx.showModal({
                        title: '这是您发布的约战',
                        content: ' ',
                        showCancel: false,
                    })
                } else if (res.data.message == "'you have accept this team before" || res.data.status_code == 5001) {
                    wx.showModal({
                        title: '您之前已应战过该班',
                        content: ' ',
                        showCancel: false,
                    })
                } else if (res.data.message == "someone has accepted" || res.data.status_code == 5002) {
                    wx.showModal({
                        title: '该约战已被他人应战',
                        content: ' ',
                        showCancel: false,
                    })
                } else if (res.data.message == "this item is overdue" || res.data.status_code == 5003) {
                    wx.showModal({
                        title: '该约战已过期',
                        content: ' ',
                        showCancel: false,
                    })
                }
                else{
                    console.log(res)
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
    }
})