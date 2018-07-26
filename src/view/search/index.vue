<template>
  <div class="container" :style="{height: height + 'px'}">
    <div class="search">
      <el-input
        :placeholder="$t('m.seachplace')"
        suffix-icon="el-icon-search"
        v-model="seachValue"><el-button slot="append" icon="el-icon-search" @click="getSearchResult"></el-button>
      </el-input>
    </div>
    <el-container class="page-main">
      <!--side 列表菜单-->
      <el-aside width="300px">
        <el-tabs class="sidetab" v-model="tabActive" type="card" @tab-click="handleTabClick">
          <el-tab-pane
            :label="$t('m.search.style')"
            name="1"
          >
          </el-tab-pane>
          <el-tab-pane
            :label="$t('m.search.library')"
            name="2"
          >
          </el-tab-pane>
        </el-tabs>
        <div class="sidetab-list" :style="{height: mainHeight + 'px'}">
          <el-collapse v-model="sidelistctive" accordion class="mycollapse" @change="handleCollapseChange">
            <el-collapse-item :name="index" v-for="(item,index) in listData" v-bind:key="index">
              <template slot="title">
                <div class="list-cell">
                  <div class="list-cell-hd">
                    <div class="list-hd-mid">{{item[itemName]}}</div>
                    <i class="icon-list" @click.stop="showAlbum(index, item)"></i>
                  </div>
                </div>
              </template>
              <ul class="list-content">
                <li v-for="subitem in listSubData" v-bind:key="subitem.id" @click="showAlbumDetail(subitem)">{{subitem.album_display_title}}</li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>
      <!--mainbox-->
      <el-main>

        <div class="maintitle">
            <div class="tit">{{$t('m.search.result')}}</div>
            <div class="scale-item">
              <span class="label" v-if="showSelectTitle">{{showSelectTitle}}</span>
              <span class="label">{{$t('m.search.total')}}: {{showTotleNum}}</span>
            </div>
        </div>
        <div class="main-wrapper" :style="{height: mainHeight + 'px'}">
          <!--专辑列表-->
          <div class="album-list" v-if="!showSingList">
            <div class="list-item" v-for="(item, index) in listSubData" :key="index" @click="showAlbumDetail(item)">
              <img :src="item.album_cover" alt="">
              <div class="list-item-tit">{{item.album_display_title}}</div>
            </div>
          </div>
          <!--歌曲列表-->
          <div class="album-detail" v-if="showSingList">
            <div class="main-list" v-if="albumInfor">
              <img :src="albumInfor.album_cover" alt="">
              <div class="mian-cnct">
                <h3 class="cnct-tit">{{albumInfor.album_display_title}}</h3>
                <p class="cnct-des">{{albumInfor.album_des}}</p>
              </div>
            </div>
            <div class="mainbox">
              <div class="list-cell colapse-title">
                <div class="list-cell-hd">
                  <span class="list-cell-icon"></span>
                  <div class="list-hd-befor">{{$t('m.search.track')}}</div>
                  <div class="list-hd-mid">{{$t('m.search.album')}}</div>
                  <div class="list-hd-after">{{$t('m.search.duration')}}</div>
                </div>
              </div>
              <el-collapse v-model="activeName" accordion class="mycollapse">
                <el-collapse-item :name="index" v-for="(item, index) in trackList" v-bind:key="index" :class="{'is-play':item.isPlay}">
                  <template slot="title">
                    <div class="list-cell">
                      <div class="list-cell-hd">
                        <span class="list-cell-icon" v-if="icon" @click.stop="palyAction(item,index)"><i class="icon-plays"></i></span>
                        <div class="list-hd-befor">{{item.track_display_title}}</div>
                        <div class="list-hd-mid">{{item.album_display_title}}</div>
                        <div class="list-hd-after">{{formatTime(item.track_duration)}}</div>

                        <i class="icon-i" @click.stop="showPower(item)"></i>
                      </div>
                      <div class="list-descripe" @click.stop="">{{item.track_description}}</div>
                    </div>
                  </template>
                  <ul class="list-content detail-infor">
                    <li><label for="">{{$t('m.search.composer')}}:</label><div>{{item.track_artist}}</div></li>
                    <li><label for="">{{$t('m.search.publisher')}}:</label><div>{{item.track_alternate_title}}</div></li>
                    <li><label for="">{{$t('m.search.alternate')}}:</label><div>{{item.track_publisher}}</div></li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <dialog-form ref="dialog" :showdialog="showForm" :ruleForm="forminfor"></dialog-form>
    <aplayer ref="player" :musicList="musicLists" :isPlayOne="playnum" ></aplayer>
  </div>
</template>
<script>
import DialogForm from './form.vue'
import Aplayer from '@/components/player/play.vue'
export default {
  components: {Aplayer, DialogForm},
  data () {
    return {
      showForm: false, // 表单组件展示状态
      forminfor: {},
      height: 0,
      mainHeight: 0,
      showSingList: true,
      seachValue: '',
      showSelectTitle: '',
      showTotleNum: 0,
      sidetabs: [],
      albumInfor: '', // 专辑封面信息
      trackList: [], // 歌曲列表信息
      listData: [],
      listSubData: [],
      icon: true,
      sidelistctive: '',
      tabActive: '1',
      activeName: '',
      itemName: 'style',
      musicLists: [], // 播放器列表
    }
  },
  methods: {
    formatTime (seconds) {
     return [
        // parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
        ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },
    palyAction (item, i) {
      if (item.isPlay) {
        this.$refs.player.pause()
      } else {
        this.$refs.player.play()
      }
      if (!item.isPlay) {
        this.trackList.map((item) => {
          item.isPlay = false
        })
      }

      item.isPlay = !item.isPlay
      this.$store.commit('changePlaying', i)
    },
    showPower (item) {
      this.$refs.dialog.dialogVisible = true
      let userinfor = JSON.parse(sessionStorage.getItem('userinfor'))
      this.forminfor = {
        username: userinfor ? userinfor.user_id : '',
        email: userinfor ? userinfor.email : '',
        tele: userinfor ? userinfor.mobile : '',
        company: userinfor ? userinfor.company : '',
        albumname: item.album_display_title,
        title: item.track_display_title,
        type: '',
        term: '',
        territory: ''
      }
    },
    handleTabClick (tab) { // tab切换操作
      this.index = ''
      this.sidelistctive = ''
      this.listData = []
      this.listSubData = []
      if (tab.name === '2') {
        this.getLibary()
        this.itemName = 'library'
      } else {
        this.getStyles()
        this.itemName = 'style'
      }
    },
    showAlbum (val) { // collaps
      this.handleCollapseChange(val)
    },
    handleCollapseChange (val) { // collapse 下拉操作
      this.showSingList = false
      let metaValue = ''
      if (typeof (val) === 'number') {
        if (this.tabActive === '1') {
          metaValue = this.listData[val].style
        }
        if (this.tabActive === '2') {
          metaValue = this.listData[val].library
        }
        this.showSelectTitle = metaValue
        this.getMeta(val, metaValue)
      }
    },
    showAlbumDetail (val) {
      this.showSingList = true
      this.getMetaList(val.album_code)
    },
    getSearchResult () { // 搜索结果接口
      let params = {
        keywords: this.seachValue
      }
      this.musicLists = []
      this.trackList = []
      this.$http.get(this.baseUrl + 'open/hp/search', {params}).then(res => {
        if (res.status === 200) {
          let data = res.data.result
          this.showTotleNum = data.length
          for (var i = 0; i < this.showTotleNum; i++) {
            data[i].isPlay = false
            this.musicLists.push({
              title: data[i].track_display_title,
              artist: data[i].track_description,
              src: 'https://kindlemusic.blob.core.chinacloudapi.cn/prods3/music/' + data[i].track_audio_filename + '.mp3', //mp[i],
              img: 'https://kindlemusic.blob.core.chinacloudapi.cn/prods3/images/' + data[i].album_code + '_AlbumArt.jpg',
              album: data[i].album_title
            })
          }
          this.trackList = data
          // console.log('search', this.albumList)
        }
      })
    },
    getMetaList (val) {
      let params = {
        albumCode: val
      }
      this.musicLists = []
      this.$http.get(this.baseUrl + 'open/hp/metas', {params}).then(res => {
        if (res.status === 200) {
          this.albumInfor = res.data.result.album
          this.albumInfor.album_des = res.data.result.tracks[0].album_description || ''
          let data = res.data.result.tracks
          this.showTotleNum = data.length
          for (var i = 0; i < this.showTotleNum; i++) {
            data[i].isPlay = false
            this.musicLists.push({
              title: data[i].track_display_title,
              artist: data[i].track_description,
              src: 'https://kindlemusic.blob.core.chinacloudapi.cn/prods3/music/' + data[i].track_audio_filename + '.mp3',
              img: 'https://kindlemusic.blob.core.chinacloudapi.cn/prods3/images/' + data[i].album_code + '_AlbumArt.jpg',
              album: data[i].album_title
            })
          }
          this.trackList = data
          // console.log('search', this.albumList)
        }
      })
    },
    getStyles () {
      this.listData = []
      this.$http.get(this.baseUrl + 'open/hp/styles').then(res => {
        if (res.status === 200) {
          this.listData = res.data.result
          // console.log(this.listData)
        }
      })
    },
    getLibary () {
      this.$http.get(this.baseUrl + 'open/hp/libraries').then(res => {
        if (res.status === 200) {
          this.listData = res.data.result
          // console.log(this.listData)
        }
      })
    },
    getMeta (val, value) { // 获取风格下的专辑列表
      let params = {}
      this.listSubData = []
      if (this.tabActive === '1') {
        params = {
          style: value
        }
        this.$http.get(this.baseUrl + 'open/hp/albumsByStyle', {params}).then(res => {
          if (res.status === 200) {
            this.listSubData = res.data.result
          }
        })
      }
      if (this.tabActive === '2') {
        params = {
          lib: value
        }
        this.$http.get(this.baseUrl + 'open/hp/albumsByLib', {params}).then(res => {
          if (res.status === 200) {
            this.listSubData = res.data.result
          }
        })
      }
    }
  },
  computed: {
    playnum () {
      let flag = false
      if (flag) {
        this.trackList.map((item,i) => {
          if (i !== this.$store.state.isPlayOne) {
            item.isPlay = false
          } else {
            item.isPlay = true
          }
        })
      }
      flag = true
      return this.$store.state.isPlayOne
    }
  },
  mounted () {
    this.seachValue = this.$route.query.searchValue
    this.getStyles()
    this.getSearchResult()
    let bodyHeight = document.documentElement.clientHeight
    this.height = bodyHeight - 90
    this.mainHeight = bodyHeight - document.querySelector('.page-main').offsetTop - 40 - 30
    let albumCode = this.$route.query.albumCode || ''
    if(albumCode){
      this.getMetaList(albumCode)
    }
  }
}
</script>
<style lang="less" scoped="">
  html,body{
    height: 100%;
  }
</style>
<style lang="less">
.page-main{
  margin-top: 20px;
}
/*search*/
.search {
  .el-input__suffix-inner{
    margin-right: 20px;
  }
  .el-input__inner{
    width: 1098px;
    height: 50px;
    border-radius: 4px;
  }
}
.colapse-title{
  padding-right: 30px;
  font-size: 12px;
  color: #999999;
  line-height: 40px;
}
.mainbox{
  background: #fff;
}
.main-list{
  display: flex;
  background: #fff;
  margin-bottom: 5px;
  img{
    width: 150px;
    height: 150px;
  }
  .mian-cnct{
    padding:0 20px;
    .cnct-tit{
      margin-bottom: 10px;
      font-size: 20px;
    }
    .cnct-des{
      font-size: 16px;
      color: #666666;
    }
  }
}
.main-wrapper{
  overflow-x: hidden;
}
/*侧边栏有沿用mycolaps的样式*/
.sidetab{
  .el-tabs__item{
    width: 149px;
    height: 40px;
    background-image: linear-gradient(-45deg, #4634A9 0%, #F63669 100%);
    opacity:.4;
    color: #ffffff;
    &.is-active{
      opacity: 1;
    }
  }
  /*重置*/
  .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .el-tabs__header{
    margin: 0px;
  }
  &.el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: 0;
  }
  &.el-tabs--card>.el-tabs__header .el-tabs__item{
    border-bottom: 0
  }

}
.sidetab-list  {
  overflow-x: hidden;
  .el-collapse-item__header{
    border-bottom: 1px solid #DDE3E8;
    &:hover{
      background: #F7F7F7;
    }
  }
  .el-collapse-item__wrap{
    border-bottom: 0;
  }
  .el-collapse-item.is-active{
    .list-cell{
      background: #E7E7E7;
    }
  }
  .list-cell{
    background: #ffffff;
  }
  .list-cell .list-cell-hd{
    padding: 0 0 0 10px;
    .icon-list{
      padding: 0 10px;
    }
  }
  .list-content{
    background: #F7F7F7;
    li{
      padding: 0 20px;
      border-bottom: 1px solid #DDE3E8;
    }
    li:hover{
      background: #ffffff;
    }
  }
  .active{
    background: #FFFFFF;
  }
}

/*collapse手风琴样式*/
.mycollapse{
  /*重置*/
  .el-collapse-item__header{
    height: auto;
    line-height: 30px;
    border-bottom: 0;
  }
  .el-collapse-item__arrow{
    line-height: 30px;
  }
  .is-active {
    .list-cell{
      background: #DFF5FF;

    }
  }
  .is-play{
    .list-cell{
      background-image: linear-gradient(-148deg, rgba(255, 93, 81, 0.4) 0%, rgba(200, 75, 213, 0.4) 34%, rgba(126, 94, 255, 0.4) 67%, rgba(68, 192, 237, 0.4) 100%);
      color: #ffffff;
    }
    .el-collapse-item__header{
      color: #fff;
    }
  }
  .list-descripe{
    background: #F7F7F7;
    padding: 0 20px 0 75px;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
    text-align: justify;
  }
  .list-content{
    li{
      line-height: 30px;
    }
  }
  .detail-infor{
    display: flex;
    flex-wrap: wrap;
    background: #E6E6E6;
    padding: 4px 20px 4px 75px;
    li{
      width: 50%;
      display: flex;
      align-items: baseline;
      line-height: 20px;
      color: #1FA4DE;
      label{
        margin-right: 10px;
        color: #666666;
      }
    }
    li:last-child{
      width: 100%;
    }
  }
}
.list-cell{
  .list-cell-icon{
    display: flex;
    width: 55px;
  }
  .list-cell-hd{
    display: flex;
    padding: 0 0 0 10px;
    .icon-plays{
      padding: 0 10px;
    }
    .icon-i{
      padding: 0 13px;
    }
  }
  .list-hd-befor{
    flex: 26%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px;
  }
  .list-hd-mid{
    flex: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px;
  }
  .list-hd-after{
    flex: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px;
  }
}

.maintitle{
  display: flex;
  font-weight: 500;
  align-items: center;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  padding: 0 20px;
  background-image: linear-gradient(45deg, rgba(70,52,169,0.4) 0%, rgba(246,54,105,0.4) 100%);

  .tit{
    flex: 1;
    text-align: left;
  }
}
.scale-item{
    height: 20px;
    text-align: right;

  transform: scale(0.5);
  transform-origin: 100% 0;
  .label{
    background-color: #ffffff;
    color: #999999;
    border-radius: 4px;
    line-height: 38px;
    height: 38px;
    padding: 0 10px;
    display: inline-block;
    align-items: center;
    font-size: 20px;
  }
}
/*专辑封面列表样式*/
.album-list{
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 808px;
  .list-item{
    position: relative;
    margin-right: 30px;
    margin-bottom: 35px;
    width: 230px;
    height: 230px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .list-item-tit{
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 50px;
    font-size: 12px;
    color: #fff;
    line-height: 50px;
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-image: linear-gradient(-148deg, rgba(255, 93, 81, 0.4) 0%, rgba(200, 75, 213, 0.4) 34%, rgba(126, 94, 255, 0.4) 67%, rgba(68, 192, 237, 0.4) 100%);
  }
}
</style>
