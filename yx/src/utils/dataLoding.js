export function loadingData () {
  wx.showLoading({
    title: '加载中'
  })
}
export function hideLoadingData () {
  setTimeout(() => {
    wx.hideLoading()
  }, 1200)
}

export function showErrorModel (msg) {
  wx.showModal({
    'title': '出错',
    'content': msg,
    'showCancel': false
  })
}
export function handleUnauthorized (err) {
  if (err.status === 401) {
    wx.navigateTo({
      url: '../login/main'
    })
  }
}
export default {
  loadingData,
  hideLoadingData,
  showErrorModel,
  handleUnauthorized
}
