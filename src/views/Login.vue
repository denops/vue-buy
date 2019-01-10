<template>
    <div>
        <div class="logo">
            <img src="https://img.kaikeba.com/logo-new.png" alt="">
        </div>
        <!-- <cube-button>登录</cube-button> -->
        <cube-form v-if="!$store.state.token" :model="model" :schema='schema' @submit="handleLogin" @validate='handleValidate' ></cube-form>
        <div v-else>
            <p>已登录{{model.username}}</p>
            <i class="cubeic-person"></i><cube-button @click="logout">注销</cube-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { resolve } from 'bluebird';
export default {
    data() {
        return {
            model: {
                username:"",
                password:""
            },
            schema:{
                fields:[
                    {
                        type:'input',
                        modelKey:'username',
                        label:'用户名',
                        props:{
                            placeholder:'请输入用户名',
                        },
                        rules:{
                            required:true,
                           type:'string',
                           min:3,
                           max:5,
                           usercheck:(val)=>{
                               return (resolve)=>{
                                   this.$axios.get('/api/check?username='+val).then(res=>{
                                       resolve(res.code==0)
                                   })
                               }
                           }
                        },
                       
                        trigger:'blur',
                        messages:{
                            required:'用户名必须输入',
                            min:'用户名不能少于3个字符',
                            max:'用户名不能多于15个字符',
                            usercheck:'用户名不存在'
                        }
                    },
                    {
                        type: 'input',
                        modelKey: 'password',
                        label: '密码',
                        props: {
                            type: 'password',
                            placeholder: '请输入密码',
                            eye:{open:true}
                        },
                        rules:{
                            required:true
                        },
                        trigger:'blur'
                    },
                    {
                        type: 'submit',
                        label: '登录'
                    }
                ]
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$store.commit('setToken','')
        },
        handleValidate(result){
            console.log(result)
        },
         validatingHandler() {
            console.log('validating')
            },
            validatedHandler() {
            console.log('validated')
            },
        async handleLogin(e) {
            //阻止表单登录
            e.preventDefault();
            const obj = {
                username:this.model.username,
                password:this.model.password
            }
            const res = await axios.get('/api/login',{params:obj})
            console.log(res);
            if (res.code) {
                localStorage.setItem('token',res.token);
                this.$store.commit('setToken',res.token)
            } else {
                console.log(res.message)
                // const toast = this.$createToast({
                //     time:2000,
                //     txt:res.message || '未知错误',
                //     type: 'error'
                // })
                // toast.show()
               this.$notice.info({
                duration:3,
                content:res.message||'未知错误'
               })
            }
        }
    },
}
</script>

<style scoped>
    img{margin: 20px auto}
</style>


