// pages/index/normalBattle/normalBattleManage/normalRevoke/normalRevoke.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reason: '',
        battle: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '撤销比赛',
        })
        this.setData({
            battle: wx.getStorageSync('revoking')
        })
        wx.removeStorageSync('revoking')
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

    reasonInput: function (e) {
        this.setData({
            reason: e.detail.value
        })
    },

    submit: function () {
        let self = this
        wx.showLoading({
            title: '提交中',
        })
        wx.request({
            url: 'https://www.runhigh-ccbl.com/api/common/drawback',
            header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
            data: {
                invitationId: self.data.battle.invitationId,
                reason: self.data.reason,
            },
            method: 'POST',
            success: function (res) {

                console.log(res)
                if (res.data.message != 'ok') {
                    console.log(res)
                    wx.showModal({
                        title: '请求异常',
                        content: ' ',
                        showCancel: false,
                    })
                } else {
                    wx.showModal({
                        title: '撤销成功',
                        content: ' ',
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta:1,
                            })
                        }
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
            },complete:function(){
                wx.hideLoading()
            }
        })

    }
})