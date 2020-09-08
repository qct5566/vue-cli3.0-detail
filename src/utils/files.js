import { Loading } from 'element-ui'

export function funDownload(contentUrl) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a')
    eleLink.style.display = 'none'
    eleLink.href = contentUrl
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
}

// 通用导出数据
export async function exportData(fun, query, pageSize = 5000, reCall = false) {
    const loading = Loading.service({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading'
    })
    if (!reCall) {
        query = Object.assign({}, query)
        query.page = 1
        query.requestType = 'export'
        query.pageSize = pageSize
    }
    try {
        const result = await fun(query)
        loading.close()
        funDownload(result.url)
    } catch (error) {
        if (error.status === 30001) {
            query.page += 1
            exportData(fun, query, pageSize, true)
        } else if (error.status === 1) {
            loading.close()
        }
    }
}

// export const lazyComponent = name => () => import(`@/views/${name}`)

// export const lazyComponentNew = name => ()=> import(`@/views/${name}`)

// export const lazyComponent = name => resolve =>
//   require([`@/views/${name}`], resolve)

// export const lazyComponentNew = name => resolve =>
//   require([`@/views/${name}`], resolve)

// api 扁平化按文件／文件夹生成对象
export const requireFolderObj = (r, exinclude) => {
    const contents = {}
    const paths = r.keys().filter(p => {
        return exinclude.indexOf(p) === -1
    })
    for (const path of paths) {
        const pArray = path.split('/').slice(1)
        const l = pArray.length
        const fn = r(path).default || r(path)
        let utilObj = contents
        pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1]

        for (let i = 0; i < l; i++) {
            const p = pArray[i]
            if (i < l - 1) {
                if (!contents[p]) {
                    contents[p] = {}
                }
                utilObj = contents[p]
            } else if (i === l - 1) {
                utilObj[p] = fn
            }
        }
    }
    return contents
}
