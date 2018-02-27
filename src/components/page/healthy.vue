<template>
    <div class="healthy">
        <el-tabs v-model="activeName">
            <el-tab-pane label="健康头条" name="first">
                <div class="article_wrap" v-for="item in toutiaoList">
                    <div class="acticle" @click="toutiaoDetail(item.id)">
                        <div class="acticle_img">
                            <img :src="item.img" alt="健康头条图片">
                        </div>
                        <div class="acticle_content">
                            <h3>{{item.title}}</h3>
                            <p>
                                {{item.abstract}}
                            </p>
                            <div class="acticle_info">
                                <span> 浏览（{{item.see_num}}）</span>
                                <span> 时间（{{item.time}}）</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="医疗知识" name="second">
                <div class="article_wrap" v-for="item in zhishiList">
                    <div class="acticle" @click="yiliaoDetail(item.id)">
                        <div class="acticle_img">
                            <img :src="item.img" alt="医疗知识图片">
                        </div>
                        <div class="acticle_content">
                            <h3>{{item.title}}</h3>
                            <p>
                                {{item.abstract}}
                            </p>
                            <div class="acticle_info">
                                <span> 浏览（{{item.see_num}}）</span>
                                <span> 时间（{{item.time}}）</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="常用电话" name="third">
                <el-table
                    :data="common_phone"
                    style="width: 100%"  v-loading="listLoading">
                    <el-table-column
                      prop="title"
                      label="常用热线">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="电话">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'first',
                toutiaoList:[],
                zhishiList:[
                    {
                        id:'1',
                        img:'../../../static/img/healthy_img.jpg',
                        title:'健康头条',
                        abstract:'健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条',
                        see_num:'10',
                        time:'2017/01/21'
                    },
                    {
                        id:'1',
                        img:'../../../static/img/healthy_img.jpg',
                        title:'健康头条',
                        abstract:'健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条',
                        see_num:'10',
                        time:'2017/01/21'
                    },
                    {
                        id:'1',
                        img:'../../../static/img/healthy_img.jpg',
                        title:'健康头条',
                        abstract:'健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条健康头条',
                        see_num:'10',
                        time:'2017/01/21'
                    }
                ],
                common_phone:[],
                listLoading:false
            };
        },
        mounted() {
            //初始化
            this.toutiaoInfo();
            this.getPhone();
        },
        methods: {
            toutiaoDetail(id) {
                if(id !== undefined) {
                    this.$router.push({path:'article',query:{id:id,type:1}});
                }
            },
            yiliaoDetail(id) {
                if(id !== undefined) {
                    this.$router.push({path:'article',query:{id:id,type:2}});
                }
            },
            toutiaoInfo(){
                //var qs = require('qs');
                //读取列表
                this.$fetch('http://127.0.0.1:4000/selectToutiao').then(res => {
                    this.toutiaoList = res;
                });
            },
            getPhone(){
                this.listLoading = true;
                    
                this.$fetch('http://127.0.0.1:4000/common_phone').then(res => {
                    this.listLoading = false;
                    this.common_phone = res;
                });
            }
        }
    }
</script>
<style scoped>
.article_wrap .acticle{
    display: flex;
    cursor: pointer;
}
.article_wrap .acticle .acticle_img{
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 2px;
    margin: 5px;
    border-radius: 3px;
    width: 300px;
}
.article_wrap .acticle .acticle_img img{
    width: 100%;
    height: 100%;
}
.article_wrap .acticle .acticle_content{
    flex-grow: 3;
    text-align: left;
    margin-left: 10px;
}
.article_wrap .acticle .acticle_content p{
    font-size: 0.8rem;
    margin: 0px;
    color: #666;
}
.article_wrap .acticle .acticle_content h3{
    margin-top: 15px;
    margin-bottom: 10px;
    color: #444;
    font-size: 1rem;
}
.article_wrap .acticle .acticle_content .acticle_info{
    font-size: 0.7rem;
    text-align: right;
    color: #ccc;
}

</style>