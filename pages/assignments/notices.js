// pages/assignments/notices.js
const {
  $Message
} = require('../../components/iview/dist/base/index');
const {
  $Toast
} = require('../../components/iview/dist/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherLevel: 0,
    allClassList: [{
      id: 1,
      name: '全校通知'
    }],
    allClassCurrent: [],
    //input
    disableInput: false,
    //drawer
    showRight1: false,
    //uploader
    isSubmit: false,
    warn: "",
    content: "",
    //choice subject
    subjectList: [],
    // subjectList: [{
    //   id: 1,
    //   name: '通知',
    // }, {
    //   id: 2,
    //   name: '任务'
    // }, {
    //   id: 3,
    //   name: '调查'
    // }],
    subjectCurrent: '',
    //choice class
    classList: [],
    // classList: [{
    //   id: 1,
    //   name: '三年级二班',
    // }, {
    //   id: 2,
    //   name: '三年级三班'
    // }, {
    //   id: 3,
    //   name: '三年级四班'
    // }, {
    //   id: 4,
    //   name: '三年级五班',
    // }],
    classCurrent: [],
    //
  },

  //选项
  handleSubjectChange({
    detail = {}
  }) {
    this.setData({
      subjectCurrent: detail.value
    });
    this.toggleRight1()
  },
  handleClassChange({
    detail = {}
  }) {
    const index = this.data.classCurrent.indexOf(detail.value);
    index === -1 ? this.data.classCurrent.push(detail.value) : this.data.classCurrent.splice(index, 1);
    this.setData({
      classCurrent: this.data.classCurrent
    });
  },
  toggleRight1() {
    this.setData({
      disableInput: !this.data.disableInput,
      showRight1: !this.data.showRight1
    });
  },

  //上传
  formSubmit: function(e) {
    let self = this
    let classList = self.data.classList
    let classList2 = self.data.classCurrent
    let classId = []
    console.log(self.data.classList)
    for (let i = 0, len = classList.length; i < len; i++) {
      for (let j = 0, leng = classList2.length; j < leng; j++) {
        if (classList[i]['name'] == classList2[j]) {
          classId.push(classList[i]['id'])
          break
        }
      }
    }
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {
      content
    } = e.detail.value;
    var that = this;

    if (!content) {
      this.setData({
        warn: "通知内容不能为空！",
      })
      this.handleError()
      return;
    } else {
      // //提示上传成功
      wx.request({
        url: app.globalData.httpsUrl + '/notice',
        method: 'POST',
        data: {
          'text': content,
          'group_id': classId,
          'notices_type_id': 1,
          'red': that.data.allClassCurrent.length,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          that.setData({
            subjectList: res.data
          })
        }
      })
      that.handleSuccess()
    }

    this.setData({
      isSubmit: true,
      warn: "",
      content: content
    })
  },

  // 提示成功
  handleSuccess() {
    $Toast({
      content: '通知发布成功',
      type: 'success',
      selector: '#pop_toast'
    });
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 3000);
  },

  handleError: function() {
    var that = this;
    var warning = that.data.warn;
    $Message({
      content: warning,
      type: 'error',
      selector: '#pop_message',
      duration: 3
    });
  },
  handleClassChange2({
    detail = {}
  }) {
    let that = this
    const index = this.data.allClassCurrent.indexOf(detail.value);
    index === -1 ? this.data.allClassCurrent.push(detail.value) : this.data.allClassCurrent.splice(index, 1);
    this.setData({
      allClassCurrent: this.data.allClassCurrent
    });
    if (that.data.allClassCurrent.length) {
      let classList = that.data.classList
      let teacherLevel = that.data.teacherLevel
      let gradeName = ['一', '二', '三', '四', '五', '六']
      let gradeList = []
      for (var i in classList)
        for (var j = 0, len = gradeName.length; j < len; j++)
          if (teacherLevel === j + 1 && classList[i].name[0] === gradeName[j])
            gradeList.push(classList[i].name)
      that.setData({
        classCurrent: gradeList,
      })
      console.log(that.data.teacherLevel)
      console.log(gradeList)
    }
    console.log(that.data.allClassCurrent.length)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var userId = getApp().globalData.userId;

    that.setData({
      teacherLevel: app.globalData.teacherLevel
    })
    //获取班级
    wx.request({
      url: app.globalData.httpsUrl + '/group',
      method: 'POST',
      data: {
        user_id: userId,
        'type': 'notices'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          classList: res.data
        })
      }
    })
    // 获取通知类别
    wx.request({
      url: app.globalData.httpsUrl + '/type',
      method: 'POST',
      data: {
        'type': 'notices'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        that.setData({
          subjectList: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})