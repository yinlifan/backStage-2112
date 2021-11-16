//  默认数据源
const defaultState = {
  isAdmin : null,
  userInfo: {
    username: "",
  }
}


// reducer
// 要求：必须是一个纯函数（返回值只受到其形参的影响），两个形参：state， action
const admin =  (state = defaultState, action) => {

}