//后台总控制JS

const url = 'http://cx.luxunmuseum.com.cn/'

function goSearch(text,go){
  chrome.storage.sync.set({search:{
    is:true,
    said:text
  }},go)
}

chrome.contextMenus.create({
  title: `鲁迅说过吗？搜索：%s`,
  contexts: ['selection'],
  onclick(params) {
    goSearch(params.selectionText,() => chrome.tabs.create({ url }))
  }
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  suggest([{content:text,description:`鲁迅说过吗？搜索：${text}`}])
})

function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    callback && callback(tabs.length ? tabs[0].id : '')
  })
}

function searchOnCurrentTab(val) {
  getCurrentTabId(tabId => {
    goSearch(val,() => chrome.tabs.update(tabId, { url }))
  })
}

chrome.omnibox.onInputEntered.addListener(val => searchOnCurrentTab(val))

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({search:{is:false}})
})
