<template>
    <div class="family">
        <h3>我的预约</h3>
        <el-table
        ref="multipleTable"
        :data="familyList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="listLoading"
       >
            <el-table-column
                prop="order_name"
                label="姓名"
                width="120"
                >
            </el-table-column>
            <el-table-column
                prop="order_phone"
                label="电话"
                width="120"
                >
            </el-table-column>
            <el-table-column
                prop="order_address"
                width="300"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="order_time"
                width="200"
                label="预约时间">
            </el-table-column>
            <el-table-column
            prop="order_situation"
            label="是否加急"
            width="120"
            >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.order_situation === 'true' ? 'danger' : 'info'"
                        close-transition>
                        <span v-if="scope.row.order_situation == 'true'">是</span>
                        <span v-else>否</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
            prop="order_situation"
            label="预约情况"
            width="120"
            >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.order_cancel == 'false' ? 'Warning' : 'info'"
                        close-transition>
                        <span v-if="scope.row.order_cancel == 'false'">预约中</span>
                        <span v-else>已取消</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="order_state"
                width="120"
                label="预约状态">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.order_state === 'true' ? 'success' : 'info'"
                        close-transition>
                        <span v-if="scope.row.order_state == 'true'">已完成</span>
                        <span v-else>未完成</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
                <template slot-scope="scope">
                        <el-button type="success" @click="cancelOrder(scope.row.id)" plain size="small">取消预约</el-button>
                </template>
            </el-table-column>
           
        </el-table>
        <div class="addPerson" @click="addOrder">
            <i class="el-icon-plus"></i>
            添加预约
        </div>
        
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                familyList:[],
                listLoading:false,
                
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
            this.myOrderInfo()
        },
        methods: {
           
            // 查询
            myOrderInfo(){
                this.listLoading = true;
                
                var qs = require('qs');
                let user = this.getCookie('username');
                this.info.username = user
                this.$post('http://www.spn365.cn:4000/getMyOrderInfo',qs.stringify(this.info)).then(res => {
                    this.familyList = res;
                    this.listLoading = false;
                });
            },
           
            addOrder(){
                this.$router.push('addOrder');
            },
            cancelOrder(row){
                this.map.id = row;
                
                var qs = require('qs');
                //console.log(qs.stringify(this.map))
                this.$confirm('确定取消该预约吗？')
                    .then(_ => {
                        this.$post('http://www.spn365.cn:4000/cancelOrder',qs.stringify(this.map)).then(res => {
                            this.myOrderInfo()
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