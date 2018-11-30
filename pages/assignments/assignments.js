// pages/assignments/assignments.js
const { $Message } = require('../../components/iview/dist/base/index');
const { $Toast } = require('../../components/iview/dist/base/index');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //global
    https: app.globalData.https,
    //input
    disableInput: false,
    //drawer
    showRight1: false,
    //uploader
    isSubmit: false,
    warn: "",
    content: "",
    _picture_label_list: [],
    _picture_count: 0,
    _picture_height: 30,
    //choice subject
    subjectList: [],
    //class Name
    subjectCurrent: '',
    //choice class
    classList: [],
    classCurrent: [],
    assignmentsId:'',
    //
  },

  //选项
  handleSubjectChange({ detail = {} }) {
    this.setData({
      subjectCurrent: detail.value
    });
    this.toggleRight1()
  },
  handleClassChange({ detail = {} }) {
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
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this
    let subjectList = that.data.subjectList
    let classList = that.data.classList
    let subjectCurrent = that.data.subjectCurrent
    let classCurrent = that.data.classCurrent
    let subjectId = 0
    let classId = []
    for (let i = 0, len = subjectList.length; i < len; i++)
      if (subjectList[i]['name'] == subjectCurrent) {
        subjectId = subjectList[i]['id']
        break
      }

    for (let i = 0, len = classCurrent.length; i < len; i++) {
      for (let j = 0, len = classList.length; j < len; j++){
        if (classCurrent[i] == classList[j]['className']){
          classId.push(classList[i]['classId'])
          break
        }
      }
    }

      // console.log(classId);
    // console.log(subjectId, classId)
    // console.log(that.data.subjectList[0]['id'])


    let { content } = e.detail.value;
    var that = this;
    if (!content) {
      this.setData({
        warn: "作业内容不能为空！",
      })
      this.handleError()
      return;
    } else {
      var userId = app.globalData.userId;
      wx.request({
        url: app.globalData.httpsUrl + '/workstore',
        method: 'POST',
        data: { 
          'content': content,
          'assignments_type_id':subjectId,
          'group_id':classId,
          'user_id':userId
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          that.setData({
            assignmentsId:res.data
          })
          let id=that.data.assignmentsId;
          let image = that.data._picture_label_list;
          if (id&&image[0]) {
            for (var i = image.length - 1; i >= 0; i--) {
              wx.uploadFile({
                url: app.globalData.httpsUrl+'/upload',
                filePath: image[i],
                name: 'image',
                formData: {
                  "assignments_id": id
                }
              })
            }
            that.handleSuccess();
             that.handleSuccess();
            //提示上传成功
                that.handleSuccess()
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 3000);
          }else if(id&&!image[0]){
            that.handleSuccess();
            //提示上传成功
                that.handleSuccess()
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 3000);
          }
      } 
    })
      // wx.request({
      //   url: 'https://www.xs.314reader.cn//workstore',
      //   method: 'POST',
      //   data: {
      //     text: content,
      //     openid: openid
      //   },
      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      //   success: function (res) {
      //     let workinfoId = res.data;
      //     let image = that.data._picture_label_list;
      //     let imageLength = that.data._picture_label_list.length
      //     if (workinfoId != 0 && image['0']) {
      //       for (let i = 0; i < imageLength; i++) {
      //         wx.uploadFile({
      //           url: 'https://www.xs.314reader.cn/upload',
      //           filePath: image[i],
      //           name: 'image',
      //           formData: {
      //             workinfo_id: workinfoId
      //           }
      //         })
      //       }
      //       
      //     }
      //   }
      // })
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
      content: '作业发布成功',
      type: 'success',
      selector: '#pop_toast'
    });
  },

  handleError: function () {
    var that = this;
    var warning = that.data.warn;
    $Message({
      content: warning,
      type: 'error',
      selector: '#pop_message',
      duration: 3
    });
  },

  addpicture() {
    var that = this
    wx.chooseImage({
      count: 9 - that.data._picture_count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {
          var path = tempFilePaths[i]
          var index = that.data._picture_label_list.length
          var url = '_picture_label_list[' + index + ']'
          var count = that.data._picture_count
          var height = that.data._picture_count == 8 ? 90 : (Math.floor((count + 1) / 3) + 1) * 30
          count++
          that.setData({
            [url]: path,
            _picture_count: count,
            _picture_height: height,
          })
        }

      }
    })
  },

  PreviewImage(e) {
    var that = this
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data._picture_label_list // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    // var openid = getApp().globalData.openid;
    var userId = getApp().globalData.userId;
    // 获取作业类别
    wx.request({
      url: app.globalData.httpsUrl + '/type',
      method: 'POST',
      data: { 'type': 'assignments' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          subjectList: res.data
        })
      }
    })
    
    //获取班级
    wx.request({
      url: app.globalData.httpsUrl + '/group',
      method: 'POST',
      data: { user_id: userId, 'type': 'assignments' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          classList: res.data
        })
      }
    }) 
    setTimeout(function(){
      console.log(that.data.classList)
      
    },3000)
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

  }
})