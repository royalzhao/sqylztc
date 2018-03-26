<template>
    <div>
        <h3>预约信息</h3>
        <el-table
        :data="tableData3"
        v-loading="listLoading"
        style="width: 100%">
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
                        :type="scope.row.order_cancel === true ? 'danger' : 'info'"
                        close-transition>
                        <span v-if="scope.row.order_cancel == false">预约中</span>
                        <span v-else>患者取消</span>
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
            width="150">
                <template slot-scope="scope">
                        <el-button type="success" @click="complateOrder(scope.row.id)" plain size="small"><i class="el-icon-check"></i></el-button>
                        <el-button type="danger" @click="delOrder(scope.row.id)" plain size="small"><i class="el-icon-close"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tableData3: [],
                map: {
                    id:''
                },
                listLoading:'false',
            }
        },
        
        mounted(){
            this.init()
        },
        methods:{
            init(){
                this.listLoading = true;
                var qs = require('qs');
                var info = {};
                info.username = this.getCookie('username');
                this.$post('http://www.spn365.cn:4000/getAllOrder',qs.stringify(info)).then(res => {
                    console.log(res)
                    this.tableData3 = res
                    this.listLoading = false;
                });
            },
            complateOrder(row){
                this.map.id = row;
                
                var qs = require('qs');
                //console.log(qs.stringify(this.map))
                this.$confirm('确定已完成该预约吗？')
                    .then(_ => {
                        this.$post('http://www.spn365.cn:4000/complateOrder',qs.stringify(this.map)).then(res => {
                            this.init()
                         });
                    })
                    .catch(_ => {
                    this.$message({
                            message:  "用户取消",
                            type:'error'
                        });
                    });
            },
            delOrder(row){
                this.map.id = row;
                
                var qs = require('qs');
                //console.log(qs.stringify(this.map))
                this.$confirm('确定删除该预约吗？')
                    .then(_ => {
                        this.$post('http://www.spn365.cn:4000/delOrder',qs.stringify(this.map)).then(res => {
                            this.init()
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

</style>