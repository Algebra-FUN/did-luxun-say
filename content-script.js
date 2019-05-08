//注入页面用于控制DOM

chrome.storage.sync.get('search', data => {
    let { search } = data
    if (!search.is) {
        console.log('not search', search)
        return
    }
    chrome.storage.sync.set({ search: { is: false } }, () => {
        console.log(`search = ${search.said}`)
        let loop = num => {
            if(num > 60){
                console.log('search failed:wait time out!')
                return
            }
            try{
                let bm = document.getElementsByName('bottom')[0].contentWindow.document
                let lm = bm.getElementsByName('left')[0].contentWindow.document
                lm.getElementById('TextBox1').value = search.said
                lm.getElementById('Button1').click()
                console.log('search successed')
            }catch(error){
                setTimeout(() => {
                    console.log(`wait for server...${num}`)
                    loop(++num)
                },500)
            }
        }
        loop(1)
    })
})