<template>
  <div class="input_main">
    <no-ssr>
      <a-form-model ref="emailForm" :model="dataEmail" :rules="rules">
        <a-form-model-item label="" prop="email">
          <a-input
            :placeholder="holder"
            allow-clear
            :disabled="disable"
            v-model="dataEmail.email"
          />
        </a-form-model-item>
      </a-form-model>
    </no-ssr>
    <button class="button" v-if="emailHasValue" @click="inputSubmit">
      {{ btn }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['btn', 'holder', 'disable'],
  data() {
    return {
      dataEmail: {
        email: '',
      },
      rules: {
        email: [
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  computed: {
    emailHasValue() {
      return this.dataEmail.email !== ''
    },
  },
  methods: {
    inputSubmit() {
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.$emit('emitted', this.dataEmail.email)
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
    height: 44 * $pr;
    .button {
      position: absolute;
      top: 50%;
      right: 8 * $pr;
      padding: 8 * $pr 32 * $pr;
      border-radius: 42 * $pr;
      font-size: 16 * $pr;
      line-height: 22 * $pr;
    }
    :deep(.ant-input) {
      height: 44 * $pr !important;
      border-radius: 44 * $pr !important;
      padding-left: 16 * $pr;
      font-size: 16 * $pr;
      line-height: 22 * $pr;
    }
    :deep(.ant-input-affix-wrapper .ant-input:not(:last-child)) {
      padding-right: 140 * $pr;
    }
    :deep(.ant-input-clear-icon) {
      font-size: 22 * $pr;
      right: 100 * $pr;
    }
  }
}
</style>
