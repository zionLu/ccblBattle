// pages/index/normalBattle/newNormalBattle/newNormalBattle.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        tel:'',
        addressName: "请点击选择地址",
        addressPosition: '地图选择后显示的具体位置',
        addressDescription: '',
        latitude: null,
        longitude: null,
        date: '请点击选择日期',
        time: '请点击选择具体时间',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '发布约战',
        })
        //   let cod=null
        let today = new Date()
        if (today.getHours() >= 19) {//惊了，picker写9.31居然会跳到10.1
            this.setData({
                startDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1),
                endDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 3),
            })
        } else {
            this.setData({
                startDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                endDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 2),
            })
        }
        this.setData({
            startTime: '06:00',
            endTime: '21:00',
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

    map: function () {
        let self = this
        wx.chooseLocation({
            success: function (res) {
                console.log(res)
                self.setData({
                    addressName: res.name,
                    addressPosition: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude,
                })
            },
            fail: function (res) {
                if (res.errMsg == "chooseLocation:fail auth deny") {
                    wx.showModal({
                        title: '请授权，可以在小程序设置界面中控制授权状态',
                        content: '',
                        showCancel: false,
                        success: function () {
                            wx.openSetting({
                                success: function (res) {
                                    wx.chooseLocation({
                                        success: function (res) {
                                            self.setData({
                                                addressName: res.name,
                                                addressPosition: res.address,
                                            })
                                        },
                                        fail: function (res) {
                                            if (res.errMsg == "chooseLocation:fail auth deny") {
                                                wx.showModal({
                                                    title: '请授权',
                                                    content: '',
                                                    showCancel: false,
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
        let today = new Date()
        if (this.data.date == today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() || this.data.date == today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '0' + today.getDate()) {
            this.setData({
                startTime: (today.getHours() + 2) + ':' + today.getMinutes(),
                time: '请点击选择具体时间',
            })
        } else {
            this.setData({
                startTime: '06:00',
            })
        }
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },

    nameInput:function(e){
        this.setData({
            name: e.detail.value
        })
    },

    telInput:function(e){
        this.setData({
            tel: e.detail.value
        })
    },

    addressDescriptionInput: function (e) {
        this.setData({
            addressDescription: e.detail.value
        })
        console.log(this.data.addressDescription)
    },

    reset: function () {
        this.setData({
            name:'',
            tel:'',
            addressName: "请点击选择地址",
            addressPosition: '地图选择后显示的具体位置',
            addressDescription: '',
            date: '请点击选择日期',
            time: '请点击选择具体时间',
        })
    },

    submit: function () {
        let self = this
        if (this.data.name==''||this.data.tel==''||this.data.addressName == "请点击选择地址" || this.data.addressDescription == '' || this.data.date == '请点击选择日期' || this.data.time == '请点击选择具体时间') {
            wx.showModal({
                title: '请正确填写信息',
                content: '',
                showCancel: false,
            })
        } else {
            wx.showLoading({
                title: '提交中',
            })
            wx.request({
                url: 'https://www.runhigh-ccbl.com/api/common/post/CommonInvitation',
                header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
                data: {
                    inviteName:self.data.name,
                    phone:self.data.tel,
                    time: self.data.date + ' ' + self.data.time,
                    name: self.data.addressName,
                    address: self.data.addressPosition,
                    latitude: self.data.latitude,
                    longitude: self.data.longitude,
                    addressDes: self.data.addressDescription,


                },
                method: 'POST',
                success: function (res) {
                    console.log(res)
                    if (res.data.message == "Created successfully" || res.data.status_code=="200") {
                        wx.showModal({
                            title: '发布成功',
                            content: '',
                            showCancel: false,
                            success: function () {
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }
                        })
                    } else {
                        console.log(res)
                        wx.showModal({

                            title: '请求异常',
                            content: '',
                            showCancel: false,
                        })
                    }

                },
                fail: function (res) {
                    console.log(res)
                    wx.showModal({
                        title: '请求异常',
                        content: '',
                        showCancel: false,
                    })
                },
                complete:function(){
                    wx.hideLoading()
                }
            })
        }
    }
})
