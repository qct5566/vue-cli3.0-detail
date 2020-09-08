// import { addEventListener, removeEventListener } from '@/utils/event'
// import qs from 'qs'
// export default {
//     data() {
//         return {
//             elementId: ''
//         }
//     },
//     methods: {
//         createIframe({ elementId, url, query }) {
//             this.elementId = elementId
//             const iframe = document.getElementById(elementId)
//             if (iframe) {
//                 const templateIframe = this.getNewIframe()
//                 const _url =
//                     url + `0?${qs.stringify(query)}`
//                 iframe.parentNode.replaceChild(templateIframe, iframe)
//                 iframe.id = ''
//                 templateIframe.id = elementId
//                 this.onIframeLoaded(templateIframe, _url)
//             }
//         },
//         onIframeLoaded(templateIframe, src, loadedFn, errFn) {
//             templateIframe.src = ''
//             const onIframeLoad = () => {
//                 removeEventListener(templateIframe, 'load', onIframeLoad)
//                 removeEventListener(templateIframe, 'error', onIframeError)
//                 if (typeof loadedFn === 'function') {
//                     loadedFn(templateIframe)
//                 }
//                 this.loading = false
//             }
//             const onIframeError = () => {
//                 removeEventListener(templateIframe, 'load', onIframeLoad)
//                 removeEventListener(templateIframe, 'error', onIframeError)
//                 if (typeof errFn === 'function') {
//                     errFn(templateIframe)
//                 }
//                 this.loading = false
//             }
//             addEventListener(templateIframe, 'load', onIframeLoad)
//             addEventListener(templateIframe, 'error', onIframeError)
//             window.addEventListener('resize', this.resizeIframe, false)

//             this.loading = true
//             templateIframe.src = src
//         },
//         resizeIframe() {
//             const iframe = document.getElementById(this.elementId)
//             iframe.height = this.$parent.$el.clientHeight - 5
//             iframe.width = this.$parent.$el.clientWidth - 5
//         },
//         getNewIframe() {
//             const templateIframe = document.createElement('iframe')
//             templateIframe.setAttribute('marginheight', '0')
//             templateIframe.setAttribute('marginwidth', '0')
//             templateIframe.setAttribute('frameborder', '0')
//             templateIframe.setAttribute('display', 'block')
//             templateIframe.setAttribute('posi', 'block')
//             templateIframe.scrolling = 'no'
//             console.log(this)
//             templateIframe.height = this.$parent.$el.clientHeight - 5
//             templateIframe.width = this.$parent.$el.clientWidth - 5
//             return templateIframe
//         },
//         iframeMail() { }
//     }
// }
