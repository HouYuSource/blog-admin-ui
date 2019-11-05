<template>
  <div>
    <el-form :model="entity" label-width="100px" ref="entity">
      <el-form-item label="文章标题">
        <el-input v-model="entity.title" style="font-weight: bold;" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <el-form-item label="文章摘要">
        <el-input rows="3" type="textarea" v-model="entity.summary" placeholder="请选择文章摘要"></el-input>
      </el-form-item>

      <el-form-item label="文章正文">
        <mavon-editor v-model="entity.content" style="min-height: 500px;"/>
      </el-form-item>

      <el-form-item label="文章分类">
        <el-select v-model="entity.catalogId" placeholder="请选择文章分类">
          <el-option v-for="item in catalogList" :key="item.id" :label="item.catalogName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章标签">
        <el-tag :key="tag" v-for="tag in tagList" closable :disable-transitions="false" @close="tagHandleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="tagInputVisible" v-model="tagInputValue" ref="saveTagInput" size="small"
                  @keyup.enter.native="tagHandleInputConfirm"
                  @blur="tagHandleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="tagShowInput"> + 标签</el-button>
      </el-form-item>

      <el-form-item label="首页图">
        <lable>https://shaines.cn/view/image?src=</lable><br>
        <el-input v-model="entity.displayImg" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="是否发布">
        <el-switch v-model="entity.status"></el-switch>
      </el-form-item>

      <el-form-item label="是否可评论">
        <el-switch v-model="entity.canComment"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm()">发布</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import * as blogApi from '@/api/BlogApi.js'

  export default {
    name: 'blogAdd',
    data () {
      return {
        tagList: [],
        catalogList: [],
        tagInputVisible: false,
        tagInputValue: '',

        entity: {
          id: '',
          title: '',
          summary: '',
          content: '',
          displayImg: '',
          catalogId: '',
          catalogName: '',
          tags: '',
          status: true,
          canComment: true,
        },
      }
    },
    created () {
      this.findCategoryList()
      let blogEntity = this.$route.params.blogEntity;
      if (blogEntity) {
        this.entity = JSON.parse(JSON.stringify(blogEntity))
        this.tagList = this.entity.tags.split(",")
        this.entity.status =  this.entity.status == 1
        this.entity.canComment =  this.entity.canComment == 1
      }
    },
    methods: {
      testlog (a) {
        this.$message({
          showClose: true,
          message: a,
          type: 'success'
        })
      },
      resetForm () {
        this.entity = {
          id: '',
          title: '',
          summary: '',
          content: '',
          displayImg: '',
          catalogId: '',
          catalogName: '',
          tags: '',
          status: true,
          canComment: true,
        }
        this.tagList = []
      },

      submitForm () {
        let tmpEntity = JSON.parse(JSON.stringify(this.entity))
        tmpEntity.status = tmpEntity.status ? 1 : 0
        tmpEntity.canComment = tmpEntity.canComment ? 1 : 0
        this.catalogList.forEach(v => {
          if (v.id === tmpEntity.catalogId) {
            tmpEntity.catalogName = v.catalogName
          }
        })
        tmpEntity.tags = ''
        this.tagList.forEach(v => {
          tmpEntity.tags += v + ','
        })
        tmpEntity.tags = tmpEntity.tags.substring(0, tmpEntity.tags.length - 1)
        let checkMsg = this.checkForm(tmpEntity)// true//
        if (checkMsg === true) {
          if (tmpEntity.id) {
            blogApi.updateBlog(tmpEntity).then(res => {
              this.$message({showClose: true, message: res.msg, type: 'success'})
              this.$router.push({path: '/blogList'})
            })
          } else {
            blogApi.saveBlog(tmpEntity).then(res => {
              this.$message({showClose: true, message: res.msg, type: 'success'})
              this.$router.push({path: '/blogList'})
            })
          }
        } else {
          this.$message({showClose: true, message: checkMsg, type: 'warning'})
        }
      },

      /** 检查表单 */
      checkForm (entity) {
        if (!entity.title) return '标题不可以为空'
        if (!entity.summary) return '摘要不可以为空'
        if (!entity.content) return '内容不可以为空'
        if (!entity.catalogId || !entity.catalogName) return '分类不可以为空'
        if (!entity.tags) return '标签不可以为空'
        if (!entity.displayImg) return '首页图不可以为空'
        if (typeof entity.status != 'number') return '文章状态不可以为空'
        if (typeof entity.canComment != 'number') return '评论状态不可以为空'
        return true
      },

      /** 获取分类列表 */
      findCategoryList () {
        blogApi.findCategoryList().then(res => {
          this.catalogList = res.data
        })
      },

      /** tag组件需要的方法 */
      tagHandleClose (tag) {
        this.tagList.splice(this.tagList.indexOf(tag), 1)
      },
      tagShowInput () {
        this.tagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      tagHandleInputConfirm () {
        let tagInputValue = this.tagInputValue
        if (tagInputValue) {
          this.tagList.push(tagInputValue)
        }
        this.tagInputVisible = false
        this.tagInputValue = ''
      },

    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
