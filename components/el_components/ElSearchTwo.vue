<template>
  <transition name="unfold">
    <div class="search">
      <div class="search_mian">
        <a-input-search placeholder="Search" allow-clear @search="onSearch" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    onSearch(i) {
      if (i) {
        window.changePageUrl = `/search/?query=${i}`
        window.location.href = `/search/?query=${i}`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
.search {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  &_mian {
    width: 100%;
    height: 100%;
    border-radius: 42px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(0, 0, 0, 0.5);
    position: relative;
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

@media (max-width: 750px) {
  $pr: math.div(1vw, 3.75);
  .search {
    height: 100%;
    &_mian {
      height: 100%;
      border: none;
      border-radius: 53 * $pr;
      background: rgba(255, 255, 255, 0.08);
      position: relative;
      :deep(.ant-input-search) {
        width: 100%;
        height: 100%;
        .ant-input {
          height: 100%;
          border-radius: 53 * $pr;
          background: rgba(0, 0, 0, 0.2);
          border: none;
          padding-left: 24 * $pr;
          font-size: 16 * $pr;
          line-height: 22 * $pr;
          &::placeholder {
            font-size: 16 * $pr;
            line-height: 22 * $pr;
          }
        }
        .ant-input:not(:last-child) {
          padding-right: 90 * $pr;
        }
        .ant-input-suffix {
          right: 16 * $pr;
          .anticon svg {
            width: 24 * $pr;
            height: 24 * $pr;
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
