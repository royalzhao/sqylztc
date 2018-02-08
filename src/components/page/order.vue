<template>
    <div class="order">
        <h3>预约上门</h3>
        <el-form ref="form"  label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" size="small" width="200" placeholder="例：张三"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" size="small" width="200" placeholder="例：17878878787"></el-input>
            </el-form-item>
            
            
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" size="small" placeholder="例：朝阳小区2栋2单元102室"></el-input>
            </el-form-item>

            <el-form-item label="预约时间" prop="time">
                <el-date-picker
                v-model="form.time"
                type="datetime"
                placeholder="选择日期时间" size="small">
                </el-date-picker>
            </el-form-item>
            
            
            <el-form-item label="是否加急" prop="profession">
                <el-switch
                v-model="form.profession"
                active-color="#13ce66"
                inactive-color="#ccc"
                :change="switchChange()">
                </el-switch>
                <span v-if="jiaji">
                    <span style="color:#ccc;font-size:0.7rem;">需要支付20元加急费用，见面付款</span>
                </span>
                
            </el-form-item>
            <el-form-item>
                <el-button class="submit" size="small" @click="order">点击预约</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                    name:'',
                    phone:'',
                    address:'',
                    time:'',
                    profession:false
                },
                jiaji:false,
                //表单验证
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    time: [
                        {required: true, message: '请输入预约时间', trigger: 'blur'}
                    ]
                }
                
            }
        },
        methods: {
            switchChange:function(){
               if(this.form.profession){
                    this.jiaji = true;
                }else{
                    this.jiaji = false;
                }
            },
            order(){
                this.$refs.form.validate((valid) => {
                    if(valid) {
                        this.$post('#',qs.stringify(this.form)).then(res => {
                            if(res == 1) {
                                this.$message({
                                    message: "预约成功",
                                    type: 'success'
                                });
                               this.$router.go(-1);
                            } else {
                                this.$message({
                                    message:  "预约失败",
                                    type:'error'
                                });
                                this.$router.go(-1);
                            }
                        });
                    }
                });
                
            }
        }
    }
</script>
<style scoped>
    .submit{
        background: #32BA58;
        color: #fff;
        border: 0;
    }
    .submit:hover{
        background: rgba(50, 186,88, 0.8);
    }

</style>