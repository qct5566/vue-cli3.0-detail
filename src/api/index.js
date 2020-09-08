import { requireFolderObj } from '@/utils/files'
const api = requireFolderObj(
  require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/),
  ['./index.js']
)

export default api
console.log(api)
export const _api = key => {
  return api[key]
}
