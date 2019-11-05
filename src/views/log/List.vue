<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="deleteWeekBefore">仅保留最近7天数据</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="logList" style="width: 100%" show-header border>
      <el-table-column prop="browser" label="浏览器" :show-overflow-tooltip="trueFlag" width="300"></el-table-column>
      <el-table-column prop="ip" label="IP" :show-overflow-tooltip="trueFlag" width="150"></el-table-column>
      <el-table-column prop="port" label="端口" :show-overflow-tooltip="trueFlag" width="80"></el-table-column>
      <el-table-column prop="url" label="地址" :show-overflow-tooltip="trueFlag" width="250"></el-table-column>
      <el-table-column prop="param" label="参数" :show-overflow-tooltip="trueFlag" width="450"></el-table-column>
      <el-table-column prop="result" label="响应" :show-overflow-tooltip="trueFlag" width="200"></el-table-column>
      <el-table-column prop="createDate" label="时间" :show-overflow-tooltip="trueFlag" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="q.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        :total="totalElements">
      </el-pagination>
    </div>

  </div>
</template>

<script>

  import * as logApi from '@/api/LogApi.js'

  export default {
    name: 'logList',
    data () {
      return {
        trueFlag: true,
        loading: true,
        // Page请求参数
        q: {
          order: 'desc',
          keyword: '',
          pageIndex: 0,
          pageSize: 10,
        },
        // 列表总数
        totalElements: 0,
        totalPages: 0,
        // 列表
        logList: [],

      }
    },
    created () {
      this.logPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      logPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        logApi.page(this.q).then(res => {
          this.logList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      search () {
        this.logPage()
      },
      deleteWeekBefore () {
        logApi.deleteWeekBefore().then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.search();
          }
        })
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            showClose: true,
            message: '暂不支持删除',
            type: 'warning'
          })
          /*logApi.deleteLog(row.id).then(res => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.logPage()
          })*/
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.logPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.logPage()
      },
    }
  }
</script>

<style>

</style>
