<template>
    <div class="home">
      <el-col class="nav-content" :span="4">
        <h1>数据分析</h1>
        <el-col >
          <el-menu
            class="el-menu-vertical-demo"
            :router=router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <span >
                  {{nav[0].meta.title}}
                </span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(secNav,number) in nav[0].children"
                  :key="number" :index="secNav.name"
                  @click="toUrl(secNav)">
                    {{secNav.meta.title}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-col>
      <el-col class="info" :span="20" >
        <div class="head">
            <el-dropdown  @command="handleCommand" >
              <span class="el-dropdown-link">
                {{admin}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="out">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-col>
      <div class="modal" v-show="showModal">
      <!--  <div class="modal-header">
          <h2>更改密码</h2>
        </div>-->
        <div class="modal-content">
          <el-form :model="password" :rules="passwordRules" ref="password" label-width="100px">
            <el-form-item label="旧密码" prop="old_password">
              <el-input v-model="password.old_password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="password.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="password_confirmation">
              <el-input v-model="password.password_confirmation" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPassword('password')">提交</el-button>
              <el-button type="primary" @click="exit">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import {changePSW,loginOut} from '../api/api'
    export default {
      name: "home",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value == "") {
            callback(new Error("请输入密码"));
          } else {
            if (this.password.password_confirmation !== "") {
              this.$refs.password.validateField("password_confirmation");
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value == "") {
            callback(new Error("请再次输入密码"));
          } else if (value !== this.password.password) {
            callback(new Error("两次输入密码不一致!"));
          } else {
            callback();
          }
        };
        return {
          router:true,
          nav:[
            {
              path:'/home',
              name:'Home',
              meta: {
                title: "数据分析"
              },
              children:[
                {
                  path:'/barHai',
                  name:"BarHai",
                  meta:{
                    title:"海创柱形图分析"
                  }
                },
                {
                  path:'/pieHai',
                  name:"PieHai",
                  meta:{
                    title:"海创饼状图分析"
                  }
                },
                {
                  path:'/barHouse',
                  name:"BarHouse",
                  meta:{
                    title:"房多多柱形图分析"
                  }
                },
                {
                  path:'/pieHouse',
                  name:"PieHouse",
                  meta:{
                    title:"房多多饼状图分析"
                  }
                }
              ]
            }
          ],
          admin:localStorage.getItem('admin'),
          showModal: 0,
          password: {
            old_password: "",
            password: "",
            password_confirmation: ""
          },
          passwordRules: {
            old_password: [
              { required: true, message: "请输入旧密码", trigger: "blur" }
            ],
            password: [{ validator: validatePass, trigger: "blur" }],
            password_confirmation: [{ validator: validatePass2, trigger: "blur" }]
          },
        }
      },
      methods: {
        toUrl(){},
        handleCommand: function(command) {
          let _this = this;
          //改密码
          if (command == "changePwd") {
            this.showModal = !this.showModal;
            this.submitPassword()
          }
          //退出
          if (command == "out") {
            loginOut(_this).then(() => {
              this.$router.push({ name: "Login" });
            });
          }
        },
        exit: function() {
          this.showModal = !this.showModal;
        },
        submitPassword: function(formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              changePSW(this,this.password).then(res=>{
                console.log(res)
              })
              // this.$message("密码修改成功");
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      },
      mounted(){

      }
    }
</script>

<style scoped lang="stylus">
.home
  width 100%
  display flex
  .nav-content
    position fixed
    top 0
    bottom 0
    left 0
    background #545C64
    h1
      width 100%
      height 80px
      color #fff
      text-align: center
      line-height 80px
      font-size 16px
      background #646C71
  .info
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    .head
      padding-top 30px
      width 100%
      height 80px
      background #545c64
  .modal
    background-color: #fff;
    border: 1px #dcdcdc solid;
    box-shadow: 1px 1px 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    z-index: 99;
    padding: 20px;
</style>
