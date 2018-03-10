<template>
    <div class="me">
        <h4>个人信息</h4>
        <el-form :label-position="position" label-width="80px" :model="form">
            <el-form-item label="缩略图" prop="face">
                <el-upload class="avatar-uploader" action="" :http-request="uploadImg" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="form.g_img" :src="form.face" class="avatar" style="max-width:300px;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="名字">
               
                    {{form.name}}
               
            </el-form-item>
            <el-form-item label="手机账号">
                
               
                    {{form.phone}}
               
            </el-form-item>
            <el-form-item label="密码">
                
                <div v-if="passwordChangeState">
                    <el-input v-model="form.password" style="width:200px;" size="small"></el-input>
                    <span class="change" @click="savePassword">保存</span>
                    <span class="change" @click="cancelPassword">取消</span>
                </div>
                <div v-else>
                    {{form.password}}
                    <span class="change" @click="changePassword">修改</span>
                </div>
              
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            position:'left',
            form: {
                name: '',
                phone: '',
                password: '',
                face:'',
                g_img:false,
                userType:''
            },
            info:{
                username:'',
                userType:''
            },
            nameChangeState:false,
            phoneChangeState:false,
            passwordChangeState:false,
        };
    },
    mounted() {
        //初始化
        this.init()
    },
    methods:{
        //图片上传
        uploadImg(file) {
            var fd = new FormData();
            var qs = require('qs');
            
            fd.append ("avatar" , file.file);   //avatar为name，要和后端保持一致
            this.$post('http://127.0.0.1:4000/upload',fd).then(res => {
                console.log(res.filePath)
                this.form.face = res.filePath;
                this.form.g_img = true;

                this.$post('http://127.0.0.1:4000/updateFace',qs.stringify(this.form)).then(res => {
                    if(res.message == 'OK') {
                        this.$message({
                            message:  "修改头像成功！",
                            type:'success'
                        });
                    } else {
                        this.$message({
                            message:  "网络开小差了哦！",
                            type:'error'
                        });
                    
                    }
                            

                });
            });
            
        },
        //图片上传之前
        beforeAvatarUpload(file) {
            const isIMGType = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isIMGType) {
            this.$message.error('上传头像图片只能是 JPG，png，gif，bmp 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isIMGType && isLt2M;
        },
        init(){
            var qs = require('qs');
            let user = this.getCookie('username');
            let userType = this.getCookie('userType');
            this.info.username = user
            this.info.userType = userType
            this.form.userType = userType
            this.$post('http://127.0.0.1:4000/getUserInfo',qs.stringify(this.info)).then(res => {
                console.log(res[0])
                this.form.name = res[0].name;
                this.form.phone = res[0].tel;
                this.form.password = res[0].password;
                console.log(res[0].face)
                if(res[0].p_face !== ''){
                    this.form.face = res[0].face;
                    this.form.g_img = true;
                }
                

            });
        },
        changeName(){
            this.nameChangeState = true;
        },
        changePhone(){
            this.phoneChangeState = true;
        },
        changePassword(){
            this.passwordChangeState = true;
        },
        cancelName(){
            this.nameChangeState = false;
        },
        cancelPhone(){
            this.phoneChangeState = false;
        },
        cancelPassword(){
            this.passwordChangeState = false;
        },
     
        savePassword(){
            var qs = require('qs');
            this.$post('http://127.0.0.1:4000/updatePassword',qs.stringify(this.form)).then(res => {
                if(res.message == 'OK') {
                    this.$message({
                        message:  "修改密码成功！",
                        type:'success'
                    });
                } else {
                    this.$message({
                        message:  "网络开小差了哦！",
                        type:'error'
                    });
                
                }
                        

            });
            this.passwordChangeState = false;
        },
    }
}
</script>
<style scoped>
    .change{
        font-size: 0.7rem;
        color:#32BA58;
        cursor: pointer;
    }
    .avatar{
        width: 100px;
        height: 100px;
    }
</style>