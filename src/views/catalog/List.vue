<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd" plain>添加</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="catalogList" style="width: 100%" show-header border>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="trueFlag" width="350"></el-table-column>
      <el-table-column prop="catalogName" label="名称" :show-overflow-tooltip="trueFlag" width="500"></el-table-column>
      <el-table-column prop="username" label="创建人" :show-overflow-tooltip="trueFlag" width="550"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="entity">
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="entity.catalogName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCatalog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as catalogApi from '@/api/CatalogApi.js'

  export default {
    name: 'catalogList',
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
        catalogList: [],

        dialogTableVisible: false,
        dialogFormVisible: false,
        entity: {
          id: '',
          catalogName: '',
        }
      }
    },
    created () {
      this.catalogPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      catalogPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        catalogApi.page(this.q).then(res => {
          this.catalogList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      saveCatalog () {
        this.dialogFormVisible = false
        if (!this.entity.catalogName) {
          this.$message({showClose: true, message: '名称不可以为空', type: 'warning'})
          return
        }
        if (this.entity.id) {                   // update
          catalogApi.updateCatalog(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '修改成功!', type: 'success'})
            }
            this.catalogPage()
          })
        } else {                                // save
          catalogApi.saveCatalog(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '新增成功!', type: 'success'})
            }
            this.catalogPage()
          })
        }
      },
      search () {
        this.$message({showClose: true, message: '就那么几个, 没必要搜索了!', type: 'warning'})
        this.catalogPage()
      },
      handleAdd () {
        this.dialogFormVisible = true
        this.entity = {
          id: '',
          catalogName: '',
        }
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true
        this.entity = JSON.parse(JSON.stringify(row))
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          catalogApi.deleteCatalog(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            }
            this.catalogPage()
          })
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.catalogPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.catalogPage()
      },
    }
  }
</script>

<style>

</style>
