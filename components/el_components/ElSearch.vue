<template>
  <div>
    <transition name="unfold">
      <div class="search" v-if="isOpen">
        <div class="search_mian">
          <a-input-search placeholder="Search" allow-clear @search="onSearch" />
          <i class="close" @click="closes"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['hidden'],
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    hidden(val) {
      this.isOpen = val
    },
    isOpen(val) {},
  },
  methods: {
    onSearch(i) {
      if (i) {
        window.changePageUrl = `/search/?query=${i}`
        window.location.href = `/search/?query=${i}`
      }
    },
    closes() {
      this.$emit('toggleHidden')
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.search {
  width: 100%;
  background: #9747ff;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  &_mian {
    width: 1400px;
    height: 44px;
    border-radius: 42px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    .close {
      display: inline-block;
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background: url('../../assets/img/header/close.png') no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    :deep(.ant-input-search) {
      width: 100%;
      height: 100%;
      .ant-input {
        height: 100%;
        border-radius: 42px;
        background: rgba(0, 0, 0, 0.2);
        border: none;
        padding-left: 16px;
        color: #fff;
        font-family: 'Rubik';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.3);
          font-family: 'Rubik';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
        &:not(:last-child) {
          padding-right: 100px;
        }
      }
      .ant-input-suffix {
        right: 16px;
        .anticon svg {
          width: 24px;
          height: 24px;
          color: rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }
      }
      .ant-input-clear-icon {
        margin-right: 16px;
      }
    }
  }
}
@media (max-width: 1500px) {
  .search {
    padding: 16px 160px;
    &_mian {
      width: 100%;
    }
  }
}
@media (max-width: 1366px) {
  .search {
    padding: 12px 130px;
    &_mian {
      height: 34px;
    }
  }
}

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .search {
    width: 100%;
    padding: 8 * $pr 50 * $pr 8 * $pr 16 * $pr;
    display: flex;
    justify-content: center;
    &_mian {
      width: 100%;
      height: 44 * $pr;
      border-radius: 42 * $pr;
      border: 1 * $pr solid rgba(255, 255, 255, 0.24);
      background: rgba(0, 0, 0, 0.5);
      position: relative;
      .close {
        display: inline-block;
        position: absolute;
        right: -30 * $pr;
        top: 50%;
        transform: translateY(-50%);
        width: 20 * $pr;
        height: 20 * $pr;
        background: url('../../assets/img/header/close.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
      :deep(.ant-input-search) {
        width: 100%;
        height: 100%;
        .ant-input {
          height: 100%;
          border-radius: 42 * $pr;
          background: rgba(0, 0, 0, 0.2);
          border: none;
          padding-left: 16 * $pr;
          color: #fff;
          font-family: 'Rubik';
          font-size: 16 * $pr;
          font-style: normal;
          font-weight: 400;
          line-height: 22 * $pr;
          &::placeholder {
            color: rgba(255, 255, 255, 0.3);
            font-family: 'Rubik';
            font-size: 16 * $pr;
            font-style: normal;
            font-weight: 400;
            line-height: 22 * $pr;
          }
          &:not(:last-child) {
            padding-right: 100 * $pr;
          }
        }
        .ant-input-suffix {
          right: 16 * $pr;
          .anticon svg {
            width: 24 * $pr;
            height: 24 * $pr;
            color: rgba(255, 255, 255, 0.4);
            flex-shrink: 0;
          }
        }
        .ant-input-clear-icon {
          margin-right: 16 * $pr;
        }
      }
    }
  }
}
</style>
