<template>
    <div class="article">
        <h3>{{article.title}}</h3>
        <div class="article_info">
            <div class="left">
                <span>来源：{{article.from}}</span>
            </div>
            <div class="right">
                <span>浏览：{{article.see_num}}</span>
                <span>时间：{{article.time}}</span>
            </div>
        </div>
        <div class="article_content">
            <div v-html="article.content">

            </div>
            <div class="share">
                <share :config="config"></share>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                article:{
                    id:'',
                    title:'',
                    from:'',
                    see_num:'',
                    time:'',
                    content:''
                },
                config: {
                    title: '这是一个标题', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                    description: '氨基酸是构成大分子蛋白质的基本组成单位', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                    image:''
                },
                type:''   
            }
        },
        created() {
            //初始化
            this.articleInfo();
        },
        methods:{
            articleInfo() { 
                this.article.id = this.$route.query.id;
                var qs = require('qs');
                let info = {};
                info.id= this.$route.query.id;
                
                this.$post('http://www.spn365.cn:4000/article',qs.stringify(info)).then(res => {
                    //console.log(res)
                    this.article = res[0];
                    this.article.title = res[0].n_title;
                    this.article.from = res[0].n_from;
                    this.article.see_num = res[0].n_see_num;
                    this.article.time = res[0].n_time;
                    this.article.content = res[0].n_content;

                    this.$post('http://www.spn365.cn:4000/updateSeeNum',qs.stringify(info)).then(res => {
                        console.log(res)
                    }); 
                });
            },
        },
        
    }
</script>
<style scoped>
.article{
    overflow: auto;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.article h3{
    text-align: center;
}
.article .article_info{
    border-bottom: 1px solid #ccc;
}
.article .article_info{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: #999;
    padding-bottom: 10px;
}
.article .article_info .right{
    font-size: 0.8rem;
    color: #999;
}
.article .article_info .right span{
    margin-right: 10px;
}
.article .article_content{
    overflow: hidden;
    font-family: "微软雅黑";
    box-sizing: border-box;
}
.share{
    margin: 20px 0;
}

</style>