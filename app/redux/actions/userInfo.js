export const GET_USER_INFO_REQUEST = "userinfo/GET_USER_INFO_REQUEST"
export const GET_USER_INFO_SUCCESS = "userinfo/GET_USER_INFO_SUCCESS"
export const GET_USER_INFO_FAIL = "userinfo/GET_USER_INFO_FAIL"

const getUserInfoRequest = () => {
  return {
    type: GET_USER_INFO_REQUEST
  }
}

const getUserInfoSuccess = (userInfo) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    userInfo: userInfo
  }
}

const getUserInfoFail = () => {
  return {
    type: GET_USER_INFO_FAIL
  }
}

//为了让action不仅可以返回action对象，还可以返回函数，需要引用react-thunk
const getUserInfo = () => {
  return (dispatch) => {
    return fetch('http://localhost:8080/api/user.json', {
      mode: 'no-cors',
      // method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
    .then((response => {
      return response.json()
    }))
    .then((json) => {
      dispatch(getUserInfoSuccess(json))
    })
    .catch(() => {
      dispatch(getUserInfoFail())
    })
  }
}

export {getUserInfoRequest, getUserInfoSuccess, getUserInfoFail, getUserInfo}