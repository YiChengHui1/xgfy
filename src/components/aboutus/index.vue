<template>
  <div class="about-us">
    <el-dialog
      title="关于我们"
      width="40%"
      :visible.sync="dialogTableVisible"
      @close="closeFun"
    >
      <el-table :data="gridData">
        <el-table-column
          property="name"
          label="姓名"
          width="150"
        ></el-table-column>
        <el-table-column
          property="contact"
          label="联系方式(微信)"
          width="200"
        ></el-table-column>
        <el-table-column
          property="role"
          label="角色"
        ></el-table-column>
      </el-table>
      <!-- <p>致谢</p>
      <p>感谢伍亮提供的数据API</p>
      <p>感谢王鹏翔帮忙设计部分功能的界面</p> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog, Table, TableColumn } from 'element-ui'
export default {
  data () {
    return {
      gridData: [{
        name: '伊程慧',
        contact: 'hui55628',
        role: '设计&开发'
      },
      {
        name: '伍亮',
        contact: '937743837',
        role: '数据API'
      },
      {
        name: '王鹏翔',
        contact: '保密',
        role: '设计'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  components: {
    'el-dialog': Dialog,
    'el-table': Table,
    'el-table-column': TableColumn
  },
  computed: {
    ...mapGetters(['isModalShow'])
  },
  methods: {
    closeFun () {
      this.$store.commit('CHANGE_IS_MODAL_SHOW_INFO', {isModalShow: false})
    }
  },
  created () {
    this.dialogTableVisible = this.isModalShow
  },
  watch: {
    isModalShow: function (newValue, oldValue) {
      this.dialogTableVisible = newValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.about-us {
  width: 100%;
  /deep/.el-dialog__body{
    padding: 0.3rem 1.8rem 1.8rem;
  }
}
</style>
