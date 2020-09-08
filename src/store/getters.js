const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  type: state => state.user.type,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  message: state => state.socket.message,
  messageCount: state => state.socket.messageCount,
  planSpeed: state => state.socket.planSpeed,
  subMenu: state => state.socket.subMenu,
  curNavIdx: state => state.socket.curNavIdx,
  detailTab: state => state.member.detailTab,
  activeNameTab: state => state.sendManage.activeNameTab,
  programmObj: state => state.channelPorgram.programmObj
}
export default getters
