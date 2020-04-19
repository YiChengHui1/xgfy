<template>
  <div class="city-vehicles">
    <Layout>
      <common-header></common-header>
      <Content class="content">
        <Card class="card">
          <div class="card-left">
            <h3>同乘车辆查询</h3>
            <Form
              ref="formCustom"
              :model="formCustom"
              :rules="ruleCustom"
              :label-width="80"
            >
              <FormItem
                label="日期"
                prop="date"
              >
              <DatePicker type="date" placeholder="Select date" v-model="formCustom.date"></DatePicker>
                <!-- <Input
                  type="Date"
                  v-model="formCustom.date"
                ></Input> -->
              </FormItem>
              <FormItem
                label="车次编号"
                prop="trainNumberCheck"
              >
                <Input
                  type="text"
                  v-model="formCustom.trainNumberCheck"
                  string
                ></Input>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  @click="handleSubmit('formCustom')"
                >Submit</Button>
                <Button
                  @click="handleReset('formCustom')"
                  style="margin-left: 8px"
                >Reset</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  data () {
    const dateCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择日期'))
      } else {
        callback()
      }
    }
    const trainNumberCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入车次编号'))
      } else {
        callback()
      }
    }
    return {
      formCustom: {
        date: '',
        trainNumberCheck: ''
      },
      ruleCustom: {
        date: [{ validator: dateCheck, trigger: 'blur' }],
        trainNumberCheck: [{ validator: trainNumberCheck, trigger: 'blur' }]
      }
    }
  },
  components: {
    'common-header': Header
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.city-vehicles {
  width: 100%;
  .content {
    width: 100%;
    height: 35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      width: 90vw;
      height: 30rem;
      .ivu-card-body {
        width: 100%;
        height: 100%;
        .card-left {
          width: 15rem;
          height: 100%;
          border: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
