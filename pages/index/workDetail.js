// pages/index/workDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTeacher: '',
    workSummaryList: '',
    workSummary: {},
    workPictrueList: {},
    //rate star
    starIndex: 0,//星星数量
    onScreen: false,
    // onScreen: true,
    studentList: [],
    studentListActive: [],
    workId:'',
  },

  queryPictures(num) {
    let that = this
     //获取图片列表
      wx.request({
        url: app.globalData.httpsUrl + '/picture',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {'workId':num},
      success: function (res) {
        that.setData({
          workPictrueList: res.data
        })
      }
    })
  },

  PreviewImage(e) {
    var that = this
    var current = e.target.dataset.src;
    var pictureList=that.data.workPictrueList;
    // 整理数据
    for (var i = pictureList.length - 1; i >= 0; i--) {
          pictureList[i]=app.globalData.httpsUrl+'/'+pictureList[i].name;
    }
      wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: pictureList // 需要预览的图片http链接列表
    })
  },

  onChange(e) {
     console.log(e);
    const index = e.detail.index;
    this.setData({
      'starIndex': index
    })
     
  },

  screenStudents(e) {
    let that = this
    that.setData({
      onScreen: !that.data.onScreen
    })
  },

  //请求学生列表
  queryStudentList(e) {
    var that=this;
      //获取学生列表
      wx.request({
        url: app.globalData.httpsUrl + '/studentlist',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {'workId':e},
      success: function (res) {
        that.setData({
          studentList: res.data,
        })
        // var studentList=that.data.studentList
        // let studentListActive = []
        // for (var i = 0; i < studentList.length; i++){
        //   if (studentList[i][1] == true)
        //     studentListActive.push(studentList[i])
        // }
        // that.setData({
        //   studentList: studentList,
        //   studentListActive: studentListActive
        // })
      }
    })
  },

  //请求星星数量
  queryStarIndex(num){
    let that = this
     //获取图片列表
      wx.request({
        url: app.globalData.httpsUrl + '/star',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {'workId':num},
      success: function (res) {
        that.setData({
          starIndex: res.data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      isTeacher: app.globalData.isTeacher,
    })
    var num = JSON.parse(options.current)
    that.data.workSummaryList = app.globalData.workSummaryList
    //get workId
    //get workSummaryList[workId]
    var workSummaryList = that.data.workSummaryList
    let i = 0
    for (; i < workSummaryList.length; i++)
      if (workSummaryList[i].workId == num)
        break
    that.setData({
      workSummary: workSummaryList[i]
    })
    that.queryPictures(num)
    let teacherName = that.data.workSummary.teacherName + '老师'
    //set title
    wx.setNavigationBarTitle({
      title: teacherName
    })
    if (that.data.isTeacher == true) {
      that.queryStudentList(num)
      that.queryStarIndex(num)
    }
    else{
      that.queryStarIndex(num)
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

  }
})