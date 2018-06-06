<template>
    <div>
        <div class="top-banner">
            <div class="logo"></div>
            <ul class="top-bar">
                <li>
                    <a href="">REGISTER</a>
                </li>
                <li>
                    <a href="">LOGIN</a>
                </li>
                <li>
                    <a href="">COPYRIGHT</a>
                </li>
                <li>
                    <a href="">CONNECT</a>
                </li>
                <li>
                    <a href="">EN/CN</a>
                </li>
            </ul>
        </div>
        <div class="searchbox">
            <div class="searchlogo">
                <el-input v-model="searchcontent" placeholder="请输入内容" size="large" class="searchinput"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
            </div>
            
        </div>
        <div>
            <el-carousel height=450px style="width:100%;">
                <el-carousel-item v-for="(item,index) in videoPoster" :key="item">
                    <img :src="item" width=100% height=450 @click="popup(index)">
                </el-carousel-item>
            </el-carousel>
            <div class="popup-layer" v-show="isShowVideo" @click="hideModal">
                <iframe height=450 width=1000 frameborder=0 allowfullscreen="true" ref="popupmodal" src="" style="padding-top:11%;"></iframe>
            </div>
        </div>       
    </div>
</template>
<script>
export default {
    name: 'Banner',
    data(){
        return{
            isShowVideo: false,
            videoPoster:['./static/img/poster.png','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528041454300&di=ddc102fa8a65769f76694565a542169f&imgtype=0&src=http%3A%2F%2Fdl.zhuansoo.com%2FuserHead%2F8%2F9%2F3%2F89344e0c0f065d6ddb4defd5c312e0fc.jpg'],
            videoSource:["http://player.youku.com/embed/XMzYzNzY2MjY1Ng==","http://player.youku.com/embed/XMzYyMzE5NTM0MA=="],
            searchcontent:""
        }       
    },
    methods:{
        popup: function(index){
            this.$refs.popupmodal.src = this.videoSource[index]
            this.isShowVideo = true
        },
        hideModal:function(){
            this.isShowVideo = false
            this.$refs.popupmodal.src = ""
        }
    },
    mounted:()=>{
    }
}
</script>

<style scoped>
.popup-layer{
    position: fixed;    
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
}
.top-banner{
    margin:0 auto;
    width:1100px;
    height:50px;
}
.logo{
    width: 233px;
    height: 45px;
    background: url('/static/img/logo.png') no-repeat;
    /*background-size: 233px;*/
    float: left;
}
.top-bar{
    height:20px;
    list-style: none;
    float: right;
}
.top-bar li{
    float: left;
    margin-left:30px;
    height: 70px;
    font-size: 14px;
}
.searchbox{
    margin:0 auto;
    height:100px;
    background-color: #71B3D7;
}
.searchlogo{
    width: 380px;
    height: 80px;
    background: url('/static/img/binder.png') no-repeat;
    margin-left:160px;
    /*float: left;*/
}
.searchinput{
    margin-left:400px;
    width:700px;
    height:80px;
}
</style>

    
