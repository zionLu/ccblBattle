Page({
    data: {
        left: '',
        top: '',
        allBattle: [],
        showTelBlock:false,
        wantToAcceptInvitationId:null,
        wantToAcceptIndex:null,
        tel:'',
        name:'',
        timeFlag: null,
    },
    onShow: function () {
        let self = this
        wx.setNavigationBarTitle({
            title: '自由约战',
        })

        // wx.request({
        //     url: 'https://www.runhigh-ccbl.com/api/common/display/allPublishing',
        //     header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
        //     data: {},
        //     method: 'POST',
        //     success: function (res) {
        //         self.setData({
        //             allBattle: res.data.data
        //         })
        //         if (res.statusCode != 200 && res.data.message != 'ok') {
        //             console.log(res)
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
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/common/display/allPublishing',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {},
            method: 'POST',
            success: function (res) {
                console.log(res)
                if (res.data.status_code == "200" || res.data.message == 'ok') {
                    let timeFlagNow = null
                    if (res.data.data.length != 0) {
                        timeFlagNow = res.data.data[res.data.data.length - 1].matchTime
                    }
                    self.setData({
                        allBattle: res.data.data,
                        timeFlag: timeFlagNow
                    })
                } else if (res.statusCode != 200 && res.data.message != 'ok') {
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
    },
    loadMore: function () {
        console.log('触发下拉')
        let self = this
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/common/display/allPublishing',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {
                timeFlag: self.data.timeFlag
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                if (res.data.status_code == "200" || res.data.message == 'ok') {
                    if (res.data.data&&res.data.data.length != 0 ) {
                        let allBattleNow = self.data.allBattle
                        allBattleNow.concat(res.data.data)
                        self.setData({
                            allBattle: allBattleNow.concat(res.data.data),
                            timeFlag: res.data.data[res.data.data.length - 1].matchTime
                        })
                    } else {
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
    newBattleButton: function () {
        wx.navigateTo({
            url: '/pages/index/normalBattle/newNormalBattle/newNormalBattle',
        })
    },
    battleManageButton: function () {
        wx.navigateTo({
            url: '/pages/index/normalBattle/normalBattleManage/normalBattleManage',
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

    accept: function (e) {
        this.setData({
            wantToAcceptInvitationId: e.currentTarget.dataset.ctrlno.invitationId,
            wantToAcceptIndex: e.currentTarget.dataset.ctrlidx,
            showTelBlock:true,
        })
        let self = this
        console.log(e)
        this.setData({
            
        })
        console.log(this.data.wantToAcceptInvitationId)
        
    },

    submit:function(){
        let self = this
        if (this.data.tel == '' || this.data.name == ''){
            wx.showModal({
                title: '请输入电话与姓名',
                content: ' ',
                showCancel: false,
            })
        }else{
        wx.showLoading({
            title: '提交中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/common/accept/CommonInvitation',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {
                invitationId: self.data.wantToAcceptInvitationId,
                phone:self.data.tel,
                name: self.data.name,
            },
            method: 'POST',
            success: function (res) {
                if (res.data.message == "Created successfully" || res.data.status_code == 200) {
                    wx.showModal({
                        title: '应战成功',
                        content: ' ',
                        showCancel: false,
                    })
                    let allBattleNow = self.data.allBattle
                    allBattleNow.splice(self.data.wantToAcceptIndex, 1)
                    self.setData({
                        wantToAcceptIndex: null,
                        wantToAcceptInvitationId: null,
                        showTelBlock: false,
                        allBattle: allBattleNow
                    })
                } else if (res.data.message == "can't accept your apply" || res.data.status_code == 5000) {
                    wx.showModal({
                        title: '这是您发布的约战',
                        content: ' ',
                        showCancel: false,
                    })
                } else if (res.data.message == "you have accepted" || res.data.status_code == 5001) {
                    wx.showModal({
                        title: '您已应战',
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
                else {
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
    },

    hideTelBlock:function(){
        this.setData({
            wantToAcceptIndex:null,
            wantToAcceptInvitationId: null,
            showTelBlock:false,
        })
    },

    telInput: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },
    nameInput: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
})