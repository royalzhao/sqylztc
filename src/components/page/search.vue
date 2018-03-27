<template>
    <div class="search">
        <h3>搜索结果</h3>
        <div class="article_wrap" v-for="item in toutiaoList">
            <div class="acticle" @click="toutiaoDetail(item.n_id)">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                        <div class="acticle_img">
                            <img :src="item.n_img" alt="搜索图片">
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16">
                        <div class="acticle_content">
                            <h3>{{item.n_title}}
                            </h3>
                            <p>
                                {{item.n_abstract}}
                            </p>
                            <div class="acticle_info">
                                <span> 浏览（{{item.n_see_num}}）</span>
                                <span> 时间（{{item.n_time}}）</span>
                                
                            </div>
                        </div>
                    </el-col>
                </el-row>
               
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                toutiaoList:[],
                searchValue:'',
               
                listLoading:false
            };
        },
        mounted() {
            //初始化
            this.getSearchInfo();
        },
        methods: {
            toutiaoDetail(id) {
               
                if(id !== undefined) {
                    
                    this.$router.push({path:'/sqztc/article',query:{id:id}});
                }
            },
            getSearchInfo(){
                var qs = require('qs');
                this.searchValue = this.$route.params.info
                var info = {};
                info.searchValue = this.searchValue
                //读取列表
                this.$post('http://www.spn365.cn:4000/search',qs.stringify(info)).then(res => {
                    //console.log(res[0])
                    this.toutiaoList = res;
                });
            }
        },
        watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "getSearchInfo"
        }
    }
</script>
<style scoped>
.article_wrap .acticle{
    clear: both;
    cursor: pointer;
    height: 120px;
    margin-bottom: 10px;
}
.article_wrap .acticle .acticle_img{
    float: left;
    border: 1px solid #ccc;
    padding: 2px;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
    height: 120px;
    margin-right: 10px;
}
.article_wrap .acticle .acticle_img img{
    width: 100%;
    height: 100%;
}
.article_wrap .acticle .acticle_content{
    text-align: left;
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