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
                    title:'这是一个标题',
                    from:'admin',
                    see_num:'29',
                    time:'2018-02-08 14:40:12',
                    content:'<p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><img src="../../../static/img/healthy1-1.jpg" /><p>随着研究的不断深入，科研人员发现，由2-3个氨基酸构成的小肽（即二肽、三肽）也可以被吸收。也就是说，人体在对蛋白质吸收利用时，能够以氨基酸和短肽的形式同时吸收。凡是能吸收的，都是可利用的形式，无所谓最大或最小。所以， “氨基酸是人体吸收蛋白质的最小单位”之说也不太恰当的。</p><p> 整蛋白是大分子物质，可能包含几百个氨基酸，并且具有非常复杂的结构，如线性、螺旋、缠绕等，既有平面结构，也有立体结构，必须经过消化才能吸收和利用。而肽尤其是低聚肽和氨基酸，均属小分子物质，易于消化吸收和利用。低聚肽达到了不需要消化或稍加消化即可吸收的程度，吸收效率明显高于氨基酸，是氮源营养物质的首选。</p><p>肽与整蛋白、氨基酸一样，都是我们人体需要的营养物质，能够为人体提供氮源营养物质。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p><p>氨基酸是构成大分子蛋白质的基本组成单位。如果把房子看作蛋白质，那么氨基酸就相当于其中的一砖一瓦。肽是由几个或多个氨基酸构成的，一般认为不超过50个，相当于整蛋白分子中的一个片段。过去认为，食物蛋白质只有分解为游离氨基酸才能被吸收。</p>'
                },
                config: {
                    title: '这是一个标题', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                    description: '氨基酸是构成大分子蛋白质的基本组成单位', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                    image:''
                },
                type:''   
            }
        },
        mounted() {
            //初始化
            this.article.id = this.$route.query.id;
            this.type = this.$route.query.type;
            this.articleInfo();
        },
        methods:{
            articleInfo() {
                var qs = require('qs');
                let info = {};
                info.id= this.$route.query.id;
                info.type=this.type;
                this.$post('http://127.0.0.1:4000/article',qs.stringify(info)).then(res => {
                    this.article = res[0];
                    this.title = res[0].title;
                    this.description = res[0].description;
                    this.image = res[0].img;
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