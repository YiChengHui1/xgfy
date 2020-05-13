<template>
  <Table
    height="350"
    :columns="columns10"
    :data="tableData"
    :stripe = 'stripe'
  ></Table>
</template>

<script>
export default {
  data () {
    return {
      stripe: false,
      columns10: [
        {
          title: '地区',
          key: 'country',
          filters: [
            {
              label: '欧洲',
              value: '欧洲'
            },
            {
              label: '北美洲',
              value: '北美洲'
            },
            {
              label: '亚洲',
              value: '亚洲'
            },
            {
              label: '南美洲',
              value: '南美洲'
            },
            {
              label: '非洲',
              value: '非洲'
            },
            {
              label: '大洋洲',
              value: '大洋洲'
            },
            {
              label: '其他',
              value: '其他'
            }
          ],
          filterMethod (value, row) {
            return row.continent.indexOf(value) > -1
          }
        },
        {
          title: '新增确诊',
          key: 'sure_new_cnt',
          sortable: true
        },
        {
          title: '累计确诊',
          key: 'sure_cnt',
          sortable: true
        },
        {
          title: '累计治愈',
          key: 'cure_cnt',
          sortable: true
        },
        {
          title: '累计死亡',
          key: 'die_cnt',
          sortable: true
        }
      ],
      tableData: []
    }
  },
  props: {
    continentsTotalData: Array,
    status: Boolean
  },
  created () {
    this.tableData = this.continentsTotalData
  },
  watch: {
    continentsTotalData: function (newList, oldList) {
      this.tableData = newList
    },
    status: function (newValue, oldValue) {
      this.stripe = newValue
    }
  }
}
</script>

<style lang="less" scoped>
</style>
