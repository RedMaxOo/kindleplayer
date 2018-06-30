<template>
  <div class="case-wrapper clearfix">
    <div class="case-item" v-for="(item, index) in caseData" :key="index">
      <div class="img-box">
        <img :src="item.img" alt="">
        <el-button  type="text" icon="icon-play-btn"></el-button>
        <div class="time is-play">
          <i class="icon-plays"></i>
          01:30:38-01:35:47
        </div>
      </div>
      <div class="case-infor">
        <div class="diliver"></div>
        <h3>{{item.title}}</h3>
        <p>{{item.music}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import img from '../../assets/img/1.png'
export default {
  data () {
    return {
      caseData: [
        {
          title:'Starship Troopers',
          music:'Girls Like You.    Maroon 5 / Cardi B',
          img: img
        },
        {
          title:'Starship Troopers',
          music:'Girls Like You.    Maroon 5 / Cardi B',
          img: img
        },
        {
          title:'Starship Troopers',
          music:'Girls Like You.    Maroon 5 / Cardi B',
          img: img
        },
        {
          title:'Starship Troopers',
          music:'Girls Like You.    Maroon 5 / Cardi B',
          img: img
        }
      ]
    }
  },
  methods: {
    getCases(){
       var token = sessionStorage.getItem('token')
        this.$http.post(this.baseUrl + 'open/hp/examples',{headers: {
          'Authorization': token
        }}).then(res=>{
          if(res.status === 200) {
          }
        })
     }
  },
  mounted () {
    this.getCases()
  }
}
</script>
<style lang="less">
  .case-wrapper{
    width: 1100px;
    margin: 30px auto 50px;
    .case-item{
      float: left;
      margin-right: 10px;
      &:nth-child(3n){
        margin-right: 0;
      }
      .img-box{
        position: relative;
        width: 360px;
        height: 175px;
        border-radius: 4px;
        img{
          border-radius: 4px;
        }
        .el-button{
          position: absolute;
          top: 50px;
          left: 146px;
        }
        .time{
          display: inline-block;
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 12px;
          color: #fff;
          .icon-plays{
            margin-right: 6px;
          }
        }
      }
      .case-infor{
        position: relative;
        padding-left: 10px;
        margin: 11px 0;
        .diliver{
          position: absolute;
          left: 0;
          top:0;
          height: 100%;
          width: 4px;
          background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
          opacity: .4;
        }
        h3{
          margin: 0 0 5px;
          font-size: 16px;
          line-height: 22px;
          color: #666666;
        }
        p{
          font-size: 12px;
          color: #666666;
          line-height: 16px;
          &:before{
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            background: url("../../assets/icons/music.png") no-repeat center;
          }
        }
      }

    }
  }
</style>
