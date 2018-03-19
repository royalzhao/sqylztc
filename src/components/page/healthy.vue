<template>
    <div class="healthy">
        <el-tabs v-model="activeName">
            <el-tab-pane label="健康头条" name="first">
                <div class="article_wrap" v-for="item in toutiaoList">
                    <div class="acticle" @click="toutiaoDetail(item.n_id)">
                        <div class="acticle_img">
                            <img :src="item.n_img" alt="健康头条图片">
                        </div>
                        <div class="acticle_content">
                            <h3>{{item.n_title}}</h3>
                            <p>
                                {{item.n_abstract}}
                            </p>
                            <div class="acticle_info">
                                <span> 浏览（{{item.n_see_num}}）</span>
                                <span> 时间（{{item.n_time}}）</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <el-button class="more" @click="next1">加载更多</el-button>
            </el-tab-pane>
            <el-tab-pane label="医疗知识" name="second">
                <div class="article_wrap" v-for="item in zhishiList">
                    <div class="acticle" @click="yiliaoDetail(item.n_id)">
                        <div class="acticle_img">
                            <img :src="item.n_img" alt="医疗知识图片">
                        </div>
                        <div class="acticle_content">
                            <h3>{{item.n_title}}</h3>
                            <p>
                                {{item.n_abstract}}
                            </p>
                            <div class="acticle_info">
                                <span> 浏览（{{item.n_see_num}}）</span>
                                <span> 时间（{{item.n_time}}）</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <el-button class="more" @click="next2">加载更多</el-button>
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
                zhishiList:[],
                common_phone:[],
                listLoading:false,
                limit: 5
            };
        },
        props: {
            page1: {
                type: Number,
                default: 1
            },
            page2: {
                type: Number,
                default: 1
            }
        },
        created () {
            this.toutiaoInfo();
            this.zhishiInfo();
            this.getPhone();
        },
        watch: {
            page1 (val) {
                this.toutiaoInfo()
            },
            page2(val) {
                this.zhishiInfo()
            }
        },
       
        methods: {
            next1(){
                this.page1++
            },
            next2(){
                this.page2++
            },
            toutiaoDetail(id) {
                if(id !== undefined) {
                    this.$router.push({path:'article',query:{id:id}});
                }
            },
            yiliaoDetail(id) {
                if(id !== undefined) {
                    this.$router.push({path:'article',query:{id:id}});
                }
            },
            toutiaoInfo(){
                var qs = require('qs');
                var info = {};
                info.n_type="toutiao"
                info.pageNum=this.page1
                info.pageSize=this.limit
                //读取列表
                this.$post('http://127.0.0.1:4000/showToutiaoList',qs.stringify(info)).then(res => {
                    //console.log(res)
                    res.forEach(function(e,index,array) {
                        this.toutiaoList.push(e);
                    }, this);
                    
                });
            },
            zhishiInfo(){
                var qs = require('qs');
                var info = {};
                info.n_type="zhishi"
                info.pageNum=this.page2
                info.pageSize=this.limit
                //读取列表
                this.$post('http://127.0.0.1:4000/showToutiaoList',qs.stringify(info)).then(res => {
               
                    res.forEach(function(e,index,array) {
                        this.zhishiList.push(e);
                    }, this);
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

.more{
    clear: both;
    margin: 20px 0;
    width: 100%;
}
.healthy{
    height: 100%;
    overflow: auto;
}
.article_wrap .acticle{
    clear: both;
    cursor: pointer;
    height: 120px;
}
.article_wrap .acticle .acticle_img{
    float: left;
    border: 1px solid #ccc;
    padding: 2px;
    margin: 5px;
    border-radius: 3px;
    width: 200px;
    height: 120px;
    margin-right: 10px;
}
.article_wrap .acticle .acticle_img img{
    width: 100%;
    height: 100%;
}
.article_wrap .acticle .acticle_content{
    text-align: left;
    margin-left: 10px;
    padding-top: 2px;
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