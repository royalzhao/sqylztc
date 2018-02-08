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
               <div v-if="nameChangeState">
                    <el-input v-model="form.name" style="width:200px;" size="small"></el-input>
                    <span class="change" @click="saveName">保存</span>
                    <span class="change" @click="cancelName">取消</span>
               </div>

                <div v-else>
                    {{form.name}}
                    <span class="change" @click="changeName">编辑</span>
                </div>
                
            </el-form-item>
            <el-form-item label="手机账号">
                
                <div v-if="phoneChangeState">
                    <el-input v-model="form.phone" style="width:200px;" size="small"></el-input>
                    <span class="change" @click="savePhone">保存</span>
                    <span class="change" @click="cancelPhone">取消</span>
                </div>
                <div v-else>
                    {{form.phone}}
                    <span class="change" @click="changePhone">编辑</span>
                </div>
                
              
            </el-form-item>
            <el-form-item label="密码">
                
                <div v-if="passwordChangeState">
                    <el-input v-model="form.password" type="password" style="width:200px;" size="small"></el-input>
                    <span class="change" @click="savePassword">保存</span>
                    <span class="change" @click="cancelPassword">取消</span>
                </div>
                <div v-else>
                    {{form.password}}
                    <span class="change" @click="changePassword">编辑</span>
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
                name: '张三',
                phone: '17977578877',
                password: 'asdasdasdsadas'
            },
            nameChangeState:false,
            phoneChangeState:false,
            passwordChangeState:false,
        };
    },
    methods:{
        //图片上传
        uploadImg(file) {
            var fd = new FormData();
            fd.append ("file" , file.file);
            this.$post('http://www.bjytzh.cn/jxc/upLoad.thtml',fd).then(res => {
                
                this.form.g_img = res;

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
        saveName(){
            console.log(this.form.name)
            this.nameChangeState = false;
        },
        savePhone(){
            console.log(this.form.phone)
            this.phoneChangeState = false;
        },
        savePassword(){
            console.log(this.form.password)
            this.passwordChangeState = false;
        },
    }
}
</script>
<style scoped>
    .change{
        font-size: 0.7rem;
        color:#32BA58;
    }
</style>