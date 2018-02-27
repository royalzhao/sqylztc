<template>
    <div class="family">
        <h3>家庭成员</h3>
        <el-table
        ref="multipleTable"
        :data="familyList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            
            <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
                <span class="updatePerson" @click="updatePerson(scope.row.id)">编辑</span>
                <span class="delPerson" @click="delPerson(scope.row.id)">删除</span>
            </template>
            </el-table-column>
        </el-table>
        <div class="addPerson" @click="addPerson">
            <i class="el-icon-plus"></i>
            添加成员
        </div>
        
        <div class="delGroup" v-if="delGroupState" @click="delGroup">
            <i class="el-icon-minus"></i>
            删除选中
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                familyList:[],
                listLoading:false,
                multipleSelection:'',
                delGroupState:false,
                map: {
                    id:''
                },
                info:{
                    username:''
                }        
            }
        },
        mounted() {
            //初始化
            this.familyInfo()
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection.length>0){
                    this.delGroupState = true;
                }else{
                    this.delGroupState = false;
                }
              
            },
            // 查询
            familyInfo(){
                this.listLoading = true;
                
                var qs = require('qs');
                let user = this.getCookie('username');
                this.info.username = user
                this.$post('http://127.0.0.1:4000/getFamilyInfo',qs.stringify(this.info)).then(res => {
                    this.familyList = res;
                    this.listLoading = false;
                });
            },
            delGroup() {  
                var qs = require('qs');
                var ids = this.multipleSelection.map(item => item.g_id);//获取所有选中行的id组成的字符串，以逗号分隔  
                
                this.$confirm('确定要删除选中用户吗？')
                    .then(_ => {
                    this.$post('http://127.0.0.1:4000/delAllPerson?data='+ids).then(res => {
                        
                        this.familyInfo();
                        this.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                    });
                    })
                    .catch(_ => {
                    this.$message({
                            message: "用户取消",
                            type: 'error'
                        });
                    });
            
            },  
            addPerson(){
                this.$router.push('addPerson');
            },
            updatePerson(row){
                if(row !== undefined) {
                    this.$router.push({path:'updatePerson',query:{id:row}});
                }
            },
            delPerson(row){
                this.map.id = row;
                
                var qs = require('qs');
                //console.log(qs.stringify(this.map))
                this.$confirm('确定要删除该选项吗？')
                    .then(_ => {
                    this.$post('http://127.0.0.1:4000/delPerson',qs.stringify(this.map)).then(res => {
                        
                        this.familyInfo();
                        this.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                    });
                    })
                    .catch(_ => {
                    this.$message({
                            message:  "用户取消",
                            type:'error'
                        });
                    });
           }

        }
    }
</script>
<style scoped>
.addPerson{
    color: rgba(249, 88, 67, 0.5);
    font-size: 0.8rem;
    margin: 15px;
    font-weight: bold;
    float: left;
    cursor: pointer;
}
.addPerson i{
    margin-right: 5px;
}
.addPerson:hover{
    color: rgba(249, 88, 67, 1);
}
.delGroup{
    color: rgba(249, 88, 67, 0.5);
    font-size: 0.8rem;
    margin: 15px;
    font-weight: bold;
    float: right;
}
.delGroup:hover{
    color: rgba(249, 88, 67, 1);
    cursor: pointer;
}
.addPersonContent{
    clear: both;
}
.updatePerson{
    color: #32BA58;
    font-size: 0.7rem;
    cursor: pointer;
}
.delPerson{
    color: #F95843;
    font-size: 0.7rem;
    margin-left: 5px;
    cursor: pointer;
}
</style>