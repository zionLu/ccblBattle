const app = getApp();
Page({
    data: {
        haveRegist:false,
        showDetail:false,
        classInfo:null,
        ourTel:'13588888888',
        ourWechat:'weixinID',
    },
    onLoad: function (options) {
        console.log('打开accountInfo页')
        wx.setNavigationBarTitle({
            title:'CCBL账号信息'
        })
        if(wx.getStorageSync('classInfo')){
            this.setData({
                haveRegist: true,
                classInfo: wx.getStorageSync('classInfo')
            })
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

    accountInfoButton: function () {
        wx.navigateTo({
            url: '/pages/my/accountInfo/accountInfo'
        })
    },
    changeRegistDetailShowStage:function(){
        if(this.data.showDetail==true){
            this.setData({
                showDetail:false
            })
        }else{
            this.setData({
                showDetail:true
            })
        }
    },
    changePassword:function(){
        if (!wx.getStorageSync('classInfo')) {
            wx.showModal({
                title: '请先注册参赛',
                content: ' ',
                showCancel: false,
            })
        }else{
        wx.navigateTo({
            url: '/pages/my/accountInfo/changePassword/changePassword'
        })
        }
    },
    ccblBind: function () {
        wx.navigateTo({
            url: '/pages/my/accountInfo/ccblBind/ccblBind'
        })
    },
    copyWechat:function(){
        // console.log(this.data.ourWechat)
        wx.setClipboardData({
            data: this.data.ourWechat,
            success:function(){
                wx.showToast({
                    title:'复制成功'
                })
            }
        })
    },
    callTel:function(){
        // console.log(this.data.ourTel)
        wx.makePhoneCall({
            phoneNumber: this.data.ourTel 
        })
    }
})