<template>
    <div class="addPersonContent">
        <h3>添加成员</h3>
        <el-form ref="form"  label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" width="200" placeholder="例：张三"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="form.age" width="200" placeholder="例：23"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="form.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="身高" prop="height">
                <el-input v-model="form.height" placeholder="例：175cm"></el-input>
            </el-form-item>

             <el-form-item label="体重" prop="weight">
                <el-input v-model="form.weight" placeholder="例：101kg"></el-input>
            </el-form-item>
            
            
            <el-form-item label="职业" prop="profession">
                <el-input v-model="form.profession" placeholder="例：护士"></el-input>
            </el-form-item>
            <el-form-item label="病史" prop="history">
                <el-input v-model="form.history" placeholder="例：心脏病"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" @click="onSubmit">修改</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
       
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                    id:'',
                    name:'',
                    age:'',
                    height:'',
                    weight:'',
                    history:'',
                    sex:'',
                    profession:''
                },
                //表单验证
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    age: [
                        {required: true, message: '请输入年龄', trigger: 'blur'}
                    ],
                    height: [
                        {required: true, message: '请输入身高', trigger: 'blur'}
                    ],
                    weight: [
                        {required: true, message: '请输入体重', trigger: 'blur'}
                    ],
                    history: [
                        {required: true, message: '请输入病史', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择年龄', trigger: 'blur'}
                    ],
                    profession: [
                        {required: true, message: '请输入职业', trigger: 'blur'}
                    ]
                },
                info:{
                    id:''
                }
                
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                var qs = require('qs');
                this.info.id= this.$route.query.id;
                this.$post('http://127.0.0.1:4000/getFamilyDetail',qs.stringify(this.info)).then(res => {
                    this.form.id = res[0].id;
                    this.form.name = res[0].name;
                    this.form.age = res[0].age;
                    this.form.height = res[0].height;
                    this.form.weight = res[0].weight;
                    this.form.history = res[0].history;
                    this.form.sex = res[0].sex;
                    this.form.profession = res[0].profession;
                    
                   
                });
            },
            back(){
                this.$router.go(-1);
            },
            onSubmit(){
                var qs = require('qs');
                this.$refs.form.validate((valid) => {
                    if(valid) {
                        this.$post('http://127.0.0.1:4000/updateFamilyDetail',qs.stringify(this.form)).then(res => {
                            console.log(res.message)
                            if(res.message == "OK") {
                                this.$message({
                                    message: "修改成功",
                                    type: 'success'
                                });
                                this.$router.go(-1);
                            } else {
                                this.$message({
                                    message:  "修改失败",
                                    type:'error'
                                });
                            }
                        });
                    }
                });
                
            }
        }
    }
</script>
<style scoped>

.addPersonContent{
    clear: both;
}
.submit{
    background: #32BA58;
    color: #fff;
    border:0;
}
</style>