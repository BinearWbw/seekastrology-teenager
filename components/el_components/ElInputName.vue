<template>
  <div class="input_main">
    <no-ssr>
      <a-form-model ref="emailForm" :model="dataName">
        <a-form-model-item label="">
          <a-input
            :placeholder="holderName"
            allow-clear
            v-model="dataName.names"
          />
        </a-form-model-item>
      </a-form-model>
    </no-ssr>
    <button class="button" v-if="nameHasValue" @click="inputSubmit">
      {{ btn }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['btn'],
  data() {
    return {
      dataName: {
        names: '',
      },
    }
  },
  computed: {
    nameHasValue() {
      return this.dataName.names !== ''
    },
    ...mapGetters(['getUserInfo']),
    holderName() {
      return this.getUserInfo.user_name || this.getUserInfo.email
    },
  },
  methods: {
    inputSubmit() {
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.$emit('namested', this.dataName.names)
          this.dataName.names = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.input_main {
  width: 100%;
  height: 54px;
  position: relative;
  .button {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    width: auto;
    padding: 8px 32px;
    border-radius: 42px;
    background: #fff;
    color: #000;
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  :deep(.ant-input) {
    height: 54px !important;
    border-radius: 54px !important;
    border-color: rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.08);
    padding-left: 24px;
    color: #fff;
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
    padding-right: 140px;
  }
  :deep(.ant-input-clear-icon) {
    color: rgba(255, 255, 255, 0.08);
    font-size: 22px;
    position: relative;
    right: 100px;
  }
  :deep(.has-error .ant-input-affix-wrapper .ant-input) {
    background-color: rgba(0, 0, 0, 0.08);
    border-color: #f5222d;
  }
}
@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .input_main {
    width: 100%;
    height: 44 * $pr;
    position: relative;
    .button {
      position: absolute;
      top: 50%;
      right: 8 * $pr;
      transform: translateY(-50%);
      width: auto;
      padding: 8 * $pr 32 * $pr;
      border-radius: 42 * $pr;
      background: #fff;
      color: #000;
      font-family: 'Rubik';
      font-size: 16 * $pr;
      font-style: normal;
      font-weight: 400;
      line-height: 22 * $pr;
    }
    :deep(.ant-input) {
      height: 44 * $pr !important;
      border-radius: 44 * $pr !important;
      border-color: rgba(0, 0, 0, 0.08);
      background: rgba(255, 255, 255, 0.08);
      padding-left: 16 * $pr;
      color: #fff;
      font-family: 'Rubik';
      font-size: 16 * $pr;
      font-style: normal;
      font-weight: 400;
      line-height: 22 * $pr;
    }
    :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
      padding-right: 140 * $pr;
    }
    :deep(.ant-input-clear-icon) {
      color: rgba(255, 255, 255, 0.08);
      font-size: 22 * $pr;
      position: relative;
      right: 100 * $pr;
    }
    :deep(.has-error .ant-input-affix-wrapper .ant-input) {
      background-color: rgba(0, 0, 0, 0.08);
      border-color: #f5222d;
    }
  }
}
</style>
