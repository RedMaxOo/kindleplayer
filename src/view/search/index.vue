<template>
  <div class="container" :style="{height: height + 'px'}">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="seachValue"><el-button slot="append" icon="el-icon-search" @click=""></el-button>
      </el-input>
    </div>
    <el-container class="page-main">
      <!--side 列表菜单-->
      <el-aside width="300px">
        <el-tabs class="sidetab" v-model="tabActive" type="card" @tab-click="handleTabClick">
          <el-tab-pane
            v-for="(item, index) in sidetabs"
            v-bind:key="index"
            :label="item.title"
            :name="item.name"
          >
            {{item.content}}
          </el-tab-pane>
        </el-tabs>
        <div class="sidetab-list" :style="{height: mainHeight + 'px'}">
          <el-collapse v-model="sidelistctive" accordion class="mycollapse" @change="handleCollapseChange">
            <el-collapse-item :name="index" v-for="(item,index) in listData" v-bind:key="index">
              <template slot="title">
                <div class="list-cell">
                  <div class="list-cell-hd">
                    <div class="list-hd-mid">{{item[itemName]}}</div>
                    <i class="icon-list"></i>
                  </div>
                </div>
              </template>
              <ul class="list-content">
                <li v-for="subitem in listSubData" v-bind:key="subitem.ALBUM_CODE" @click="showAlbumDetail">{{subitem.album_display_title}}</li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>
      <!--mainbox-->
      <el-main>

        <div class="maintitle">
            <div class="tit">RESEARCH RESULTS</div>
            <div class="scale-item">
              <span class="label">Totlee: 204</span>
              <span class="label">Totle: 204</span>
            </div>
        </div>
        <div class="main-wrapper" :style="{height: mainHeight + 'px'}">
          <!--专辑列表-->
          <div class="album-list" v-if="!showSingList">
            <div class="list-item" v-for="(item, index) in albumList" :key="index">
              <img :src="item.album_artwork_filename" alt="">
              <div class="list-item-tit">{{item.album_display_title}}</div>
            </div>
          </div>
          <!--歌曲列表-->
          <div class="album-detail" v-if="showSingList">
            <div class="main-list">
              <img src="～assets/img/album9.png" alt="">
              <div class="mian-cnct">
                <h3 class="cnct-tit">IMCD3161 Back To The Beach</h3>
                <p class="cnct-des">Life's a beach! Let's go surfin? with these great sound waves.</p>
              </div>
            </div>
            <div class="mainbox">
              <div class="list-cell colapse-title">
                <div class="list-cell-hd">
                  <span class="list-cell-icon"></span>
                  <div class="list-hd-befor">TRACK</div>
                  <div class="list-hd-mid">ALBUM</div>
                  <div class="list-hd-after">DURATION</div>
                </div>
              </div>
              <el-collapse v-model="activeName" accordion class="mycollapse">
                <el-collapse-item :name="index" v-for="(item, index) in albunDetailList" v-bind:key="index" :class="{'is-play':item.isPlay}">
                  <template slot="title">
                    <div class="list-cell">
                      <div class="list-cell-hd">
                        <span class="list-cell-icon" v-if="icon" @click.stop="palyAction(item)"><i class="icon-play"></i></span>
                        <div class="list-hd-befor">{{item.title}}</div>
                        <div class="list-hd-mid">{{item.album}}</div>
                        <div class="list-hd-after">{{item.time}}</div>

                        <i class="icon-i" @click.stop="showPower(item)"></i>
                      </div>
                      <div class="list-descripe" @click.stop="">{{item.descrip}}</div>
                    </div>
                  </template>
                  <ul class="list-content detail-infor">
                    <li><label for="">Composer:</label><div>{{item.Composer}}</div></li>
                    <li><label for="">Alternate:</label><div>{{item.Alternate}}</div></li>
                    <li><label for="">Publisher:</label><div>{{item.Publisher}}</div></li>
                    <li><label for="">UserTags:</label><div>{{item.UserTags}}</div></li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <aplayer></aplayer>
  </div>
</template>
<script>
import Aplayer from '@/components/player/index.vue'
export default {
  components: {Aplayer},
  data () {
    return {
      height: 0,
      mainHeight: 0,
      showSingList: false,
      seachValue: 'Moon,hunt',
      sidetabs: [
        {
          title: 'STYLE',
          name: '1'
        },
        {
          title: 'LIBRARISE',
          name: '2'
        }
      ],
      albumList: [],
      listData: [],
      albunDetailList: [
        {
          'title': '001 - Surf Party  tempo guitar-based surf track with solid dr',
          'album': 'IMCD3161 Back To The Beach',
          'time': '2:04',
          'descrip': 'Energetic up-tempo guitar-based surf track with solid drums.',
          'Composer': 'Owen David Roberts, Peter Hajioff',
          'Alternate': 'Roar of Saturn (No Choir) No Choir 2:07n (No Choir) No Choir 2:07',
          'Publisher': 'Lovely Music Library',
          'UserTags:': '',
          'isPlay': false,
          'subList': [
            {
              'ALBUM_DISPLAY_TITLE': 'AM01 - Big, Big and Bigger',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM01',
              'ALBUM_TITLE': 'Big, Big and Bigger'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM02 - Trailer Acts 1',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM02',
              'ALBUM_TITLE': 'Trailer Acts 1'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM03 - The Platinum Series I',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM03',
              'ALBUM_TITLE': 'The Platinum Series I'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM04 - The Lighter Side',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM04',
              'ALBUM_TITLE': 'The Lighter Side'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM05 - Blood, Death & Fears',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM05',
              'ALBUM_TITLE': 'Blood, Death & Fears'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM06 - The Platinum Series II',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM06',
              'ALBUM_TITLE': 'The Platinum Series II'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM07 - Terminus',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM07',
              'ALBUM_TITLE': 'Terminus'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM08 - The Platinum Series III: Eterna',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM08',
              'ALBUM_TITLE': 'The Platinum Series III: Eterna'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM09 - Trailer Acts 2',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM09',
              'ALBUM_TITLE': 'Trailer Acts 2'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM10 - Maelstrom',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM10',
              'ALBUM_TITLE': 'Maelstrom'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM11 - The Platinum Series lV: Labyrinth',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM11',
              'ALBUM_TITLE': 'The Platinum Series lV: Labyrinth'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM12 - Deus Ex Machina',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM12',
              'ALBUM_TITLE': 'Deus Ex Machina'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM13 - Blood Bath And Beyond',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM13',
              'ALBUM_TITLE': 'Blood Bath And Beyond'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM14 - Drumscores',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM14',
              'ALBUM_TITLE': 'Drumscores'
            }
          ]
        },
        {
          'title': '001 - Surf Party',
          'album': 'IMCD3161 Back To The Beach',
          'time': '2:04',
          'descrip': 'Energetic up-tempo guitar-based surf track with solid drums.',
          'Composer': 'Owen David Roberts, Peter Hajioff',
          'Alternate': 'Roar of Saturn (No Choir) No Choir 2:07n (No Choir) No Choir 2:07',
          'Publisher': 'Lovely Music Library',
          'UserTags:': '',
          'isPlay': false,
          'subList': [
            {
              'ALBUM_DISPLAY_TITLE': 'AM01 - Big, Big and Bigger',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM01',
              'ALBUM_TITLE': 'Big, Big and Bigger'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM02 - Trailer Acts 1',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM02',
              'ALBUM_TITLE': 'Trailer Acts 1'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM03 - The Platinum Series I',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM03',
              'ALBUM_TITLE': 'The Platinum Series I'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM04 - The Lighter Side',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM04',
              'ALBUM_TITLE': 'The Lighter Side'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM05 - Blood, Death & Fears',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM05',
              'ALBUM_TITLE': 'Blood, Death & Fears'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM06 - The Platinum Series II',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM06',
              'ALBUM_TITLE': 'The Platinum Series II'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM07 - Terminus',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM07',
              'ALBUM_TITLE': 'Terminus'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM08 - The Platinum Series III: Eterna',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM08',
              'ALBUM_TITLE': 'The Platinum Series III: Eterna'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM09 - Trailer Acts 2',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM09',
              'ALBUM_TITLE': 'Trailer Acts 2'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM10 - Maelstrom',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM10',
              'ALBUM_TITLE': 'Maelstrom'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM11 - The Platinum Series lV: Labyrinth',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM11',
              'ALBUM_TITLE': 'The Platinum Series lV: Labyrinth'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM12 - Deus Ex Machina',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM12',
              'ALBUM_TITLE': 'Deus Ex Machina'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM13 - Blood Bath And Beyond',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM13',
              'ALBUM_TITLE': 'Blood Bath And Beyond'
            },
            {
              'ALBUM_DISPLAY_TITLE': 'AM14 - Drumscores',
              'LIBRARY_NAME': 'Audiomachine',
              'ALBUM_CODE': 'AM14',
              'ALBUM_TITLE': 'Drumscores'
            }
          ]
        }
      ],
      listSubData: [],
      icon: true,
      sidelistctive: '',
      tabActive: '1',
      activeName: '',
      itemName: 'style'
    }
  },
  methods: {
    palyAction (item) {
      item.isPlay = !item.isPlay
    },
    showPower (item) {
      console.log(item)
    },
    handleTabClick (tab) {
      debugger
      if (tab.name === '2') {
        this.getLibary()
        this.itemName = 'library'
      } else {
        this.getStyles()
        this.itemName = 'style'
      }
    },
    handleCollapseChange (val) {
      console.log(val)
      // let metaValue = this.listData[val].style
      this.getMeta(val)
    },
    showAlbumDetail (val) {
      this.showSingList = true
    },
    getSearchResult () {
      let params = {
        keywords: this.seachValue
      }
      this.$http.get('api/open/hp/search', {params}).then(res => {
        if (res.status === 200) {
          this.albumList = res.data.result
          // console.log('search', this.albumList)
        }
      })
    },
    getStyles () {
      this.$http.get('api/open/hp/styles').then(res => {
        if (res.status === 200) {
          this.listData = res.data.result
          // console.log(this.listData)
        }
      })
    },
    getMeta () {
      let params = {
        style: 'AM01'
      }
      this.$http.get('api/open/hp/metas', {params}).then(res => {
        if (res.status === 200) {
          this.listSubData = res.data.result
          // console.log('search', this.albumList)
        }
      })
    },
    getLibary () {
      this.$http.get('api/open/hp/libraries').then(res => {
        if (res.status === 200) {
          this.listData = res.data.result
          // console.log(this.listData)
        }
      })
    }
  },
  mounted () {
    this.getStyles()
    this.getSearchResult()
    let bodyHeight = document.documentElement.clientHeight
    this.height = bodyHeight - 90
    this.mainHeight = bodyHeight - document.querySelector('.page-main').offsetTop - 40 - 30
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
  margin-top: 30px;
}
/*search*/
.search {
  .el-input__suffix-inner{
    margin-right: 20px;
  }
  .el-input__inner{
    width: 100%;
    height: 80px;
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
    width: 150px;
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
    padding: 0 10px;
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
  }
  .list-descripe{
    background: #F7F7F7;
    padding: 0 20px 0 75px;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    padding: 0 20px;
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
  justify-content: space-between;
  .list-item{
    position: relative;
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
