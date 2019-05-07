//注入页面用于控制DOM

chrome.storage.sync.get('search', data => {
    let { search } = data
    if (!search.is) {
        console.log('not search', search)
        return
    }
    chrome.storage.sync.set({ search: { is: false } }, () => {
        console.log(`search = ${search.said}`)
        let bm = document.getElementsByName('bottom')[0].contentWindow.document
        let lm = bm.getElementsByName('left')[0].contentWindow.document
        let loop = num => {
            if(num > 30) {
                console.log('search failed：time out!')
                return
            }
            if (!lm.getElementById('TextBox1')) {
                console.log('try to search...')
                setTimeout(() => {
                    loop(++num)
                }, 1000)
            }else{
                lm.getElementById('TextBox1').value = search.said
                lm.getElementById('Button1').click()
                console.log('search successed')
            }
        }
        loop(0)
    })
})