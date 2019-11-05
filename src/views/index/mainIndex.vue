<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large fa-lg"></i>快捷方式</p>
          <ul>
            <li>
              <router-link to="/editBlog" class="kjfs kjfs-bluee"><span><i
                class="el-icon-tickets fa-2x"></i></span><span>发表文章</span></router-link>
            </li>
            <li>
              <router-link to="/blogList" class="kjfs kjfs-pinkk"><span><i
                class="fa fa-hand-stop-o fa-2x"></i></span><span>博客管理</span></router-link>
            </li>
            <li>
              <router-link to="/linkList" class="kjfs kjfs-yelloww"><span><i
                class="fa fa-universal-access fa-2x"></i></span><span>友链管理</span></router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/voteList" class="kjfs kjfs-grennn"><span><i
                class="fa fa-cloud-upload fa-2x"></i></span><span>点赞管理</span></router-link>
            </li>
            <li>
              <router-link to="/commentList" class="kjfs kjfs-purplee"><span><i
                class="fa el-icon-menu fa-2x"></i></span><span>评论管理</span></router-link>
            </li>
            <li>
              <router-link to="/logList" class="kjfs kjfs-lightBluee"><span><i
                class="fa fa-file-code-o fa-2x"></i></span><span>日志中心</span></router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-file-text-o"></i>待办事项</p>
          <ul>
            <li>
              <router-link to="#"><span>累计点赞数</span><span class="num">{{ statisticalData.voteTotal }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="#"><span>最近点赞数</span><span class="num">{{ statisticalData.recentVote }}</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="#"><span>累计评论数</span><span class="num">{{ statisticalData.commentTotal }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="#"><span>待审核数量</span><span
                class="num">{{ statisticalData.commentNeedVerifyTotal }}</span></router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-server"></i>版本信息</p>
          <div class="table">
            <p><span class="tit">当前版本</span>v2.0.0</p>
            <p><span class="tit">基于框架</span>Springboot2.14 + JPA + vue2.0全家桶 + element-ui</p>
            <p><span class="tit">主要特色</span>个人站 / 单页面 / 权限管理 / 极简</p>
            <p><span class="tit">获取渠道</span>
              <span class="gitbox">
                  <a target="_blank" href="https://github.com/HouYuSource/blog.git"><el-button type="primary"
                                                         icon="el-icon-download"
                                                         size="small">后台</el-button></a>
                  <a target="_blank" href="https://github.com/HouYuSource/blog-admin-ui.git"><el-button type="primary"
                                                         icon="el-icon-download"
                                                         size="small">管理前端</el-button></a>
                </span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <lineEcharts ref="echarts" id="lineEcharts" :dateArray="chartDateArray" :dataArray="chartDataArray"
                     height="380px"></lineEcharts>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col :span="24">
        <maintable id="maintable"></maintable>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import LineEcharts from '../../components/ECharts/lineEcharts'
  import * as indexApi from '@/api/IndexApi.js'

  export default {
    name: 'mainIndex',
    components: {LineEcharts},

    data () {
      return {
        statisticalData: {},
        chartDateArray: [], //['07/20', '07/21', '07/22', '07/24', '07/25', '07/26', '07/27'],
        chartDataArray: []  //[150, 50, 30, 42, 50, 30, 52]
      }
    },

    // mounted () {
    created () {
      this.selfAdaption()
      this.initData()
    },
    methods: {
      // echart自适应
      selfAdaption () {
        let that = this
        setTimeout(() => {
          window.onresize = function () {
            if (that.$refs.echarts) {
              that.$refs.echarts.chart.resize()
            }
          }
        }, 10)
      },
      initData () {
        let statisticalData = window.sessionStorage.getItem('statisticalData')
        if (statisticalData) {
          this.statisticalData = JSON.parse(statisticalData)
          this.formatChartData()
        } else {
          indexApi.statistical().then(res => {
            if (res.code === 200) {
              this.statisticalData = res.data
              this.formatChartData()
              window.sessionStorage.setItem('statisticalData', JSON.stringify(this.statisticalData))
            }
          })
        }
      },
      formatChartData () {
        let tempMap = this.statisticalData.weekAccessMap
        this.chartDateArray = []
        this.chartDataArray = []
        for (let key in tempMap) {
          this.chartDateArray.push(key)
          this.chartDataArray.push(tempMap[key])
        }
        this.$nextTick(() => {
          this.$refs.echarts.initChart()
        })
      }
    }
  }
</script>

<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  $pinkk: #eec2d3;
  $bluee: #409eff;
  $yelloww: #f4d884;
  $grennn: #89dda0;
  $purplee: #78a2ea;
  $lightBluee: #b8d6ff;

  $list: bluee pinkk yelloww grennn purplee lightBluee;
  $list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
  %shadow {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);

    .title {
      font-size: 14px;
      padding: 10px;

      i {
        margin-#{$right}: 5px;
      }
    }
  }

  @mixin flex($direction:row,$content:space-between) {
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
  }

  .card {
    color: #666;
    @extend %shadow;

    ul {
      @include flex;

      li {
        flex: 1;

        a {
          color: #666666;
          align-items: center;
          padding-#{$top}: 20px;
          padding-#{$bottom}: 20px;
          @include flex(column);

          span {
            height: 44px;
          }

          .num {
            line-height: 44px;
            font-size: 42px;
            color: $bluee;
            margin: 0px;
          }
        }

        .kjfs-bluee {
          color: $bluee;
        }

        .kjfs-pinkk {
          color: $pinkk;
        }

        .kjfs-yelloww {
          color: $yelloww;
        }

        .kjfs-grennn {
          color: $grennn;
        }

        .kjfs-purplee {
          color: $purplee;
        }

        .kjfs-lightBluee {
          color: $lightBluee;
        }

        &:hover {
          .kjfs-bluee {
            color: #ffffff;
            background: $bluee;
          }

          .kjfs-pinkk {
            color: #ffffff;
            background: $pinkk;
          }

          .kjfs-yelloww {
            color: #ffffff;
            background: $yelloww;
          }

          .kjfs-grennn {
            color: #ffffff;
            background: $grennn;
          }

          .kjfs-purplee {
            color: #ffffff;
            background: $purplee;
          }

          .kjfs-lightBluee {
            color: #ffffff;
            background: $lightBluee;
          }
        }
      }
    }

    .table {
      padding: 21px;

      p {
        height: 52px;
        line-height: 52px;
        border: 1px solid #cccccc;
        overflow: hidden;
        border-#{$top}: none;
        @include flex(null, start);

        &:first-child {
          border-#{$top}: 1px solid #cccccc;
        }

        span {
        }

        .tit {
          width: 90px;
          min-width: 90px;
          height: 100%;
          text-align: center;
          border-#{$right}: 1px solid #cccccc;
          margin-#{$right}: 18px;
        }

        span.gitbox {
          flex: 1;
          height: 100%;
          overflow: hidden;
          @include flex(row, start);

          a {
            &:first-child {
              margin-#{$right}: 30px;
            }
          }
        }
      }
    }
  }

  #lineEcharts {
    margin-#{$top}: 30px;
    padding-#{$top}: 30px;
    @extend %shadow;
  }

  #maintable {
    margin-#{$top}: 30px;
    padding-#{$top}: 10px;
    @extend %shadow;
  }
</style>
