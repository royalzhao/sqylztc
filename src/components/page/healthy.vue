<template>
    <div class="healthy">
        <el-tabs v-model="activeName">
            <el-tab-pane label="健康头条" name="first">
                <div class="article_wrap" v-for="item in toutiaoList">
                    <div class="acticle" @click="articleDetail(item._id)">
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
                    <div class="acticle" @click="articleDetail(item._id)">
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
            <el-tab-pane label="常用电话" name="third">
                <el-table
                    :data="common_phone"
                    style="width: 100%">
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
                toutiaoList:[
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
                common_phone:[
                    {
                        title:'急救电话',
                        phone:'120'
                    },
                    {
                        title:'高新区黎明街道社区卫生服务中心',
                        phone:'8999211'
                    },
                    {
                        title:'黎明街道五湖社区卫生服务站',
                        phone:'8977118'
                    },
                    {
                        title:'黎明街道学苑社区卫生服务站',
                        phone:'4338831'
                    },
                    {
                        title:'黎明街道黎明社区卫生服务站',
                        phone:'4677590'
                    }
                ]
            };
        },
        methods: {
            articleDetail:function(id) {
                console.log(id);
            }
        }
    }
</script>
<style scoped>
.article_wrap .acticle{
    display: flex;
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