//popup Page
document.getElementsByTagName('img')[0]
  .addEventListener('click', () => {
    chrome.tabs.create({ url:'http://cx.luxunmuseum.com.cn/' })
  })
