import axios from './httpConfig';
import qs from 'qs';
import {
  Message
} from 'element-ui'
// 登陆
export const getAdmin=(_this,params)=>{
  return axios.post('/authorizations',params).then(res=>{
    localStorage.setItem('user_name',params.email)
    localStorage.setItem('user_token',res.data.data.token)
    return true
  }).catch(err=>{
    _this.$message({
      message:"登录失败",
      type:"warming"
    })
  })
}

// 获取当前用户
export const getUser=(_this)=>{
  return axios.get("/user").then(res=>{
    return res.data.data
  }).catch(err=>{

  })
}
// 修改密码
export const changePSW = (_this, params) => {
  axios.put('user/password', params, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.user_token
    }
  }).then((res) => {
    _this.$message({
      message: '密码修改成功',
      type: 'success'
    })
  }).catch((error) => {

  })
};
// 退出登录
export const loginOut = (_this) => {
  return axios.delete('/authorizations/current', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.user_token
    }
  }).then(function (res) {
    localStorage.clear();
    _this.$message('退出成功');
    _this.$router.push({
      name: 'Login'
    });
  }).catch((error) => {
    localStorage.clear();
    _this.$router.push({
      name: 'Login'
    });
  })
};



// 海创饼状图数据
export const getHaiData=(_this,type)=>{
  return axios.get('/OA/riskAnalysis?key='+type+'->value').then(res=>{
    return res.data
  }).catch(err=>{
    console.log(err)
  })
}
