<template>
    <div class="me">
        <h4>聊天记录</h4>
        <div class="chat">
            <span class="title">
                <span>共计</span>
                <span>{{chatNum}}条</span>
            </span>
            <span class="del" @click="delAll">
                清除
            </span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            position:'left',
            chatNum:'',
            nameChangeState:false,
            phoneChangeState:false,
            passwordChangeState:false,
        };
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            var qs = require('qs');
            let info = {};
            info.username = this.getCookie('username');
            this.$post('http://www.spn365.cn:4000/getAllChatNum',qs.stringify(info)).then(res => {
                this.chatNum = res[0].count
               console.log(res)
            });
        },
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
        delAll(){
            this.$confirm('确定要删除吗？')
                .then(_ => {
                    var qs = require('qs');
                    let info = {};
                    info.username = this.getCookie('username');
                    this.$post('http://www.spn365.cn:4000/delAllChat',qs.stringify(info)).then(res => {
                        
                        this.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                    });
                })
                .catch(_ => {
                this.$message({
                        message:  "删除失败",
                        type:'error'
                    });
                });
            
           
        }
    }
}
</script>
<style scoped>
    .change{
        font-size: 0.7rem;
        color:#32BA58;
    }
    .chat{
        display: flex;
        justify-content: space-between;
    }
    .chat .title span:nth-child(2){
        font-size: 0.8rem;
        color: #ccc;
    }
    .chat .del{
        color: #F95843;
        cursor: pointer;
    }
</style>