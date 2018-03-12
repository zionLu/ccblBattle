// pages/index/normalBattle/normalBattleManage/normalFinish/normalFinish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        skill: 1,
        virtue: 1,
        picUrl: '/assets/icon/addPic.png',
        enemyAvatar: '',
        battle: null,
        enemy: null,
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
        if (wx.getStorageSync('openid') == this.data.battle.inviteOpenid) {
            this.setData({
                enemyAvatar: this.data.battle.invitedWechatAvatar,
                enemy: this.data.battle.invitedWechatName
            })
        } else {
            this.setData({
                enemyAvatar: this.data.battle.inviteWechatAvatar,
                enemy: this.data.battle.inviteWechatName
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
    setScore: function (e) {
        this.setData({
            skill: e.currentTarget.dataset.ctrlno
        })
    },
    setVirtue: function (e) {
        this.setData({
            virtue: e.currentTarget.dataset.ctrlno
        })
    },

    submit:function(){
        let self = this
        wx.showLoading({
            title: '提交中',
        })
        if (wx.getStorageSync('openid') == this.data.battle.inviteOpenid) {
            wx.request({
                url: 'https://www.runhigh-ccbl.com/api/common/invite/endMatch',
                header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
                data: {
                    invitationId: self.data.battle.invitationId,
                    virtuePoints: self.data.virtue,
                    skillPoints: self.data.skill,


                },
                method: 'POST',
                success: function (res) {
                    if (res.data.message == 'ended match') {
                        wx.showModal({
                            title: '已确认结束比赛',
                            content: ' ',
                            showCancel: false,
                            success:function(){
                                wx.navigateBack({
                                    delta:1,
                                })
                            }
                        })
                    } else if (res.data.status_code != "200" || res.data.message != 'ended match') {
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
        } else {
            wx.request({
                url: 'https://www.runhigh-ccbl.com/api/common/invited/endMatch',
                header: { 'Authorization': 'Bearer ' + wx.getStorageSync('token') },
                data: {
                    invitationId: self.data.battle.invitationId,
                    virtuePoints: self.data.virtue,
                    skillPoints: self.data.skill,


                },
                method: 'POST',
                success: function (res) {
                    if (res.data.message == 'ended match') {
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
                    } else if (res.data.status_code != "200" || res.data.message != 'ended match') {
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
    }
})