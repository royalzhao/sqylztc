<template>
    <div class="order">
        <h3>预约上门</h3>
        <el-form ref="form"  label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="姓名" prop="order_name">
                <el-input v-model="form.order_name" size="small" width="200" placeholder="例：张三"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="order_phone">
                <el-input v-model="form.order_phone" size="small" width="200" placeholder="例：17878878787"></el-input>
            </el-form-item>
            
            
            <el-form-item label="详细地址" prop="order_address">
                <el-input v-model="form.order_address" size="small" placeholder="例：朝阳小区2栋2单元102室"></el-input>
            </el-form-item>

            <el-form-item label="预约时间" prop="order_time">
                <el-date-picker
                v-model="form.order_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间" size="small">
                </el-date-picker>
            </el-form-item>
            
            
            <el-form-item label="是否加急" prop="order_situation">
                <el-switch
                v-model="form.order_situation"
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
            var validatePhone = (rule, value, callback) => {
                var reg=11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;
                if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
                } else if(!value) {
                
                callback(new Error('手机号不能为空'));
                }else{
                callback();
                }
            };
            return{
                form:{
                    d_id:'',
                    order_name:'',
                    order_phone:'',
                    order_address:'',
                    order_time:'',
                    order_situation:false
                },
                jiaji:false,
                //表单验证
                rules: {
                    order_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    order_phone: [
                        {validator:validatePhone, trigger: 'blur'}
                    ],
                    order_address: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    order_time: [
                        {required: true, message: '请输入预约时间', trigger: 'blur'}
                    ]
                }
                
            }
        },
        methods: {
            switchChange:function(){
               if(this.form.order_situation){
                    this.jiaji = true;
                }else{
                    this.jiaji = false;
                }
            },
            order(){
                var qs = require('qs');
                let d_id = this.getCookie('d_id');
                this.form.d_id = d_id;

                this.$refs.form.validate((valid) => {
                    if(valid) {
                        this.$post('http://127.0.0.1:4000/order',qs.stringify(this.form)).then(res => {
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