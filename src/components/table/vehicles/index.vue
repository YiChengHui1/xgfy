<template>
  <Table
    class="table"
    :columns="columns10"
    :data="tableData"
    :stripe='stripe'
    size="small"
  >
    <template
      slot-scope="{ row }"
      slot="name"
    >
      <strong>{{ row.name }}</strong>
    </template>
    <template
      slot-scope="{ row, index }"
      slot="action"
    >
      <a
        class="a-style"
        :href="tableData[index].source"
      >
        查看详情&nbsp;》</a>

    </template>
  </Table>
</template>

<script>
export default {
  data () {
    return {
      stripe: true,
      columns10: [
        {
          title: '编号',
          key: 'no',
          align: 'center'
        },
        {
          title: '起点',
          key: 'pos_start',
          align: 'center'
          // sortable: true
        },
        {
          title: '终点',
          key: 'pos_end',
          align: 'center'
          // sortable: true
        },
        {
          title: '交通工具类型',
          key: 'car_type',
          align: 'center'
        },
        {
          title: '乘坐日期',
          key: 'date',
          align: 'center'
          // sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  props: {
    vehiclesData: Array,
    status: Boolean
  },
  created () {
    this.tableData = this.vehiclesData
  },
  watch: {
    vehiclesData: function (newList, oldList) {
      this.tableData = newList
    },
    status: function (newValue, oldValue) {
      this.stripe = newValue
    }
  }
}
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  height: 100%;
  /deep/.ivu-table-header {
    table {
      thead {
        tr {
          th {
            background-color: #e3f5fc;
            border-bottom: none;
          }
        }
      }
    }
  }
  /deep/.ivu-table-body {
    // padding: 0;
     .ivu-table-row {
      td {
        border-bottom:none;
      }
    }
    .ivu-table-row:nth-child(2n) {
      td {
        background-color: #f5fbfe;
      }
    }
  }
  // /deep/.ivu-table-wrapper {
  //   border: none;
  // }
  /deep/.ivu-table{
    &::before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
  }
    /deep/.ivu-table{
      &::after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}
    }
  .a-style {
    color: #36a5ff;
  }
}
</style>
