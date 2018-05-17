<template>
  <div class="login">
    <div class="wrapper">
      <el-form :model="loginForm" status-icon :rules="rulesLogin" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAdmin,getUser} from '../api/api'
  export default {
    data() {
      let checkPhone = (rule, value, callback) => {
        let regPhone = /^1[3|4|5|7}8][0-9]\d{4,8}$/;
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (!regPhone.test(value) || value.length != 11) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          email: '13554118271',
          password: '123456',
        },
        rulesLogin: {
          email:  [{ validator: checkPhone, trigger: "blur" }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getAdmin(this,this.loginForm).then(res=>{
              getUser(this).then(res=>{
                localStorage.setItem('admin',res.name)
                this.$router.push({
                  path:'/home'
                })
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .login
    width 100%
    height 100%
    .wrapper
      width 40%
      height 50%
      border 1px solid #409EFF
      margin-left: 30%;
      margin-top: 15%;
      .el-form
        width 50%
        margin-top 10px
        margin-left 10%
</style>
