<template>
  <button
    class="sk-button"
    @click="click"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? `sk-button--${type}` : '',
      buttonSize ? `sk-button--${buttonSize}` : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SkButton extends Vue {
  @Prop({ type: String, default: 'default' })
  private readonly type!: string;
  @Prop({ type: Boolean })
  private readonly size?: boolean;
  @Prop({ type: String, default: '' })
  private readonly icon!: string;
  @Prop({ type: String, default: 'button' })
  private readonly nativeType!: string;
  @Prop({ type: Boolean })
  private readonly loading?: boolean;
  @Prop({ type: Boolean })
  private readonly disabled?: boolean;
  @Prop({ type: Boolean })
  private readonly plain?: boolean;
  @Prop({ type: Boolean })
  private readonly autofocus?: boolean;
  @Prop({ type: Boolean })
  private readonly round?: boolean;
  @Prop({ type: Boolean })
  private readonly circle?: boolean;

  private get buttonSize() {
    return this.size;
  }
  private get buttonDisabled() {
    return this.disabled;
  }

  @Emit()
  click() {}
}
</script>

<style lang="less" scoped>
@media all {
  .sk-button-group > .sk-button.is-active,
  .sk-button-group > .sk-button.is-disabled,
  .sk-button-group > .sk-button:active,
  .sk-button-group > .sk-button:focus,
  .sk-button-group > .sk-button:hover {
    z-index: 1;
  }
  .sk-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .sk-button + .sk-button {
    margin-left: 10px;
  }
  .sk-button:focus,
  .sk-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .sk-button:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  .sk-button::-moz-focus-inner {
    border: 0;
  }
  .sk-button [class*='sk-icon-'] + span {
    margin-left: 5px;
  }
  .sk-button.is-plain:focus,
  .sk-button.is-plain:hover {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
  .sk-button.is-active,
  .sk-button.is-plain:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
  }
  .sk-button.is-plain:active {
    background: #fff;
    outline: 0;
  }
  .sk-button.is-disabled,
  .sk-button.is-disabled:focus,
  .sk-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .sk-button.is-disabled.sk-button--text {
    background-color: transparent;
  }
  .sk-button.is-disabled.is-plain,
  .sk-button.is-disabled.is-plain:focus,
  .sk-button.is-disabled.is-plain:hover {
    background-color: #fff;
    border-color: #ebeef5;
    color: #c0c4cc;
  }
  .sk-button.is-loading {
    position: relative;
    pointer-events: none;
  }
  .sk-button.is-loading:before {
    pointer-events: none;
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.35);
  }
  .sk-button.is-round {
    border-radius: 20px;
    padding: 12px 23px;
  }
  .sk-button.is-circle {
    border-radius: 50%;
    padding: 12px;
  }
  .sk-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .sk-button--primary:focus,
  .sk-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .sk-button--primary.is-active,
  .sk-button--primary:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .sk-button--primary:active {
    outline: 0;
  }
  .sk-button--primary.is-disabled,
  .sk-button--primary.is-disabled:active,
  .sk-button--primary.is-disabled:focus,
  .sk-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
  .sk-button--primary.is-plain {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .sk-button--primary.is-plain:focus,
  .sk-button--primary.is-plain:hover {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
  .sk-button--primary.is-plain:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
    outline: 0;
  }
  .sk-button--primary.is-plain.is-disabled,
  .sk-button--primary.is-plain.is-disabled:active,
  .sk-button--primary.is-plain.is-disabled:focus,
  .sk-button--primary.is-plain.is-disabled:hover {
    color: #8cc5ff;
    background-color: #ecf5ff;
    border-color: #d9ecff;
  }
  .sk-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
  .sk-button--success:focus,
  .sk-button--success:hover {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
  .sk-button--success.is-active,
  .sk-button--success:active {
    background: #5daf34;
    border-color: #5daf34;
    color: #fff;
  }
  .sk-button--success:active {
    outline: 0;
  }
  .sk-button--success.is-disabled,
  .sk-button--success.is-disabled:active,
  .sk-button--success.is-disabled:focus,
  .sk-button--success.is-disabled:hover {
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
  }
  .sk-button--success.is-plain {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  .sk-button--success.is-plain:focus,
  .sk-button--success.is-plain:hover {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
  .sk-button--success.is-plain:active {
    background: #5daf34;
    border-color: #5daf34;
    color: #fff;
    outline: 0;
  }
  .sk-button--success.is-plain.is-disabled,
  .sk-button--success.is-plain.is-disabled:active,
  .sk-button--success.is-plain.is-disabled:focus,
  .sk-button--success.is-plain.is-disabled:hover {
    color: #a4da89;
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
  .sk-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  .sk-button--warning:focus,
  .sk-button--warning:hover {
    background: #ebb563;
    border-color: #ebb563;
    color: #fff;
  }
  .sk-button--warning.is-active,
  .sk-button--warning:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
  }
  .sk-button--warning:active {
    outline: 0;
  }
  .sk-button--warning.is-disabled,
  .sk-button--warning.is-disabled:active,
  .sk-button--warning.is-disabled:focus,
  .sk-button--warning.is-disabled:hover {
    color: #fff;
    background-color: #f3d19e;
    border-color: #f3d19e;
  }
  .sk-button--warning.is-plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  .sk-button--warning.is-plain:focus,
  .sk-button--warning.is-plain:hover {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
  .sk-button--warning.is-plain:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
    outline: 0;
  }
  .sk-button--warning.is-plain.is-disabled,
  .sk-button--warning.is-plain.is-disabled:active,
  .sk-button--warning.is-plain.is-disabled:focus,
  .sk-button--warning.is-plain.is-disabled:hover {
    color: #f0c78a;
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
  .sk-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
  .sk-button--danger:focus,
  .sk-button--danger:hover {
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }
  .sk-button--danger.is-active,
  .sk-button--danger:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #fff;
  }
  .sk-button--danger:active {
    outline: 0;
  }
  .sk-button--danger.is-disabled,
  .sk-button--danger.is-disabled:active,
  .sk-button--danger.is-disabled:focus,
  .sk-button--danger.is-disabled:hover {
    color: #fff;
    background-color: #fab6b6;
    border-color: #fab6b6;
  }
  .sk-button--danger.is-plain {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
  .sk-button--danger.is-plain:focus,
  .sk-button--danger.is-plain:hover {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
  .sk-button--danger.is-plain:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #fff;
    outline: 0;
  }
  .sk-button--danger.is-plain.is-disabled,
  .sk-button--danger.is-plain.is-disabled:active,
  .sk-button--danger.is-plain.is-disabled:focus,
  .sk-button--danger.is-plain.is-disabled:hover {
    color: #f9a7a7;
    background-color: #fef0f0;
    border-color: #fde2e2;
  }
  .sk-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
  }
  .sk-button--info:focus,
  .sk-button--info:hover {
    background: #a6a9ad;
    border-color: #a6a9ad;
    color: #fff;
  }
  .sk-button--info.is-active,
  .sk-button--info:active {
    background: #82848a;
    border-color: #82848a;
    color: #fff;
  }
  .sk-button--info:active {
    outline: 0;
  }
  .sk-button--info.is-disabled,
  .sk-button--info.is-disabled:active,
  .sk-button--info.is-disabled:focus,
  .sk-button--info.is-disabled:hover {
    color: #fff;
    background-color: #c8c9cc;
    border-color: #c8c9cc;
  }
  .sk-button--info.is-plain {
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6;
  }
  .sk-button--info.is-plain:focus,
  .sk-button--info.is-plain:hover {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
  .sk-button--info.is-plain:active {
    background: #82848a;
    border-color: #82848a;
    color: #fff;
    outline: 0;
  }
  .sk-button--info.is-plain.is-disabled,
  .sk-button--info.is-plain.is-disabled:active,
  .sk-button--info.is-plain.is-disabled:focus,
  .sk-button--info.is-plain.is-disabled:hover {
    color: #bcbec2;
    background-color: #f4f4f5;
    border-color: #e9e9eb;
  }
  .sk-button--text,
  .sk-button--text.is-disabled,
  .sk-button--text.is-disabled:focus,
  .sk-button--text.is-disabled:hover,
  .sk-button--text:active {
    border-color: transparent;
  }
  .sk-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .sk-button--mini,
  .sk-button--small {
    font-size: 12px;
    border-radius: 3px;
  }
  .sk-button--medium.is-round {
    padding: 10px 20px;
  }
  .sk-button--medium.is-circle {
    padding: 10px;
  }
  .sk-button--small,
  .sk-button--small.is-round {
    padding: 9px 15px;
  }
  .sk-button--small.is-circle {
    padding: 9px;
  }
  .sk-button--mini,
  .sk-button--mini.is-round {
    padding: 7px 15px;
  }
  .sk-button--mini.is-circle {
    padding: 7px;
  }
  .sk-button--text {
    color: #409eff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }
  .sk-button--text:focus,
  .sk-button--text:hover {
    color: #66b1ff;
    border-color: transparent;
    background-color: transparent;
  }
  .sk-button--text:active {
    color: #3a8ee6;
    background-color: transparent;
  }
}
</style>
