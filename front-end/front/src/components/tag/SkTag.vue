<script lang="tsx">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SkTag extends Vue {
  @Prop({ type: Boolean })
  private readonly closable?: boolean;
  @Prop({ type: String })
  private readonly type?: string;
  @Prop({ type: Boolean })
  private readonly hit?: boolean;
  @Prop({ type: Boolean })
  private readonly disableTransitions?: boolean;
  @Prop({ type: String })
  private readonly color?: string;
  @Prop({ type: String })
  private readonly size?: string;
  @Prop({
    type: String,
    default: 'light',
    validator(val) {
      return ['dark', 'light', 'plain'].includes(val);
    },
  })
  private readonly effect!: string;

  private get tagSize(): string {
    return this.size || 'small';
  }

  /**
   * 隐式提交emit到方法名指定的事件上 相当于 this.$emit('close',event(隐式提交第一个参数))
   */
  @Emit()
  close(event: Event) {
    event.stopPropagation();
  }
  /**
   * 隐式提交emit到装饰器指定的事件上  相当于 this.$emit('close',event(隐式提交第一个参数))
   * @Emit('close')
   * handleClose(event: Event) {
   *   event.stopPropagation();
   * }*/
  /**
   * 隐式提交emit到装饰器指定的事件上  相当于 this.$emit('close',event)
   * @Emit('close')
   * handleClose(event: Event) {
   *   event.stopPropagation();
   *   return event; // 提交 return 后的值
   * }*/
  @Emit()
  click() {}

  private render() {
    const { type, tagSize, hit, effect } = this;
    const classes = [
      'sk-tag',
      type ? `sk-tag--${type}` : '',
      tagSize ? `sk-tag--${tagSize}` : '',
      effect ? `sk-tag--${effect}` : '',
      hit && 'is-hit',
    ];
    const tagEl = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.click}
      >
        {this.$slots.default}
        {this.closable && (
          <i class="sk-tag__close anticon icon-close" on-click={this.close} />
        )}
      </span>
    );

    return this.disableTransitions ? (
      tagEl
    ) : (
      <transition name="el-zoom-in-center">{tagEl}</transition>
    );
  }
}
</script>

<style lang="less" scoped>
@media all {
  .sk-tag {
    display: inline-block;

    box-sizing: border-box;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    padding: 0 10px;
    height: 32px;

    font-size: 12px;
    line-height: 30px;
    white-space: nowrap;

    color: #409eff;
    background-color: #ecf5ff;

    cursor: default;

    &:not(:last-child) {
      margin-right: 5px;
    }
    &.is-hit {
      border-color: #409eff;
    }
    .sk-tag__close {
      color: #409eff;
      &:hover {
        color: #fff;
        background-color: #409eff;
      }
    }
    &.sk-tag--info {
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
      &.is-hit {
        border-color: #909399;
      }
      .sk-tag__close {
        color: #909399;
        &:hover {
          color: #fff;
          background-color: #909399;
        }
      }
    }
    &.sk-tag--success {
      background-color: #f0f9eb;
      border-color: #e1f3d8;
      color: #67c23a;
      &.is-hit {
        border-color: #67c23a;
      }
      .sk-tag__close {
        color: #67c23a;
        &:hover {
          color: #fff;
          background-color: #67c23a;
        }
      }
    }
    &.sk-tag--warning {
      background-color: #fdf6ec;
      border-color: #faecd8;
      color: #e6a23c;
      &.is-hit {
        border-color: #e6a23c;
      }
      .sk-tag__close {
        color: #e6a23c;
        &:hover {
          color: #fff;
          background-color: #e6a23c;
        }
      }
    }

    &.sk-tag--danger {
      background-color: #fef0f0;
      border-color: #fde2e2;
      color: #f56c6c;
      &.is-hit {
        border-color: #f56c6c;
      }
      .sk-tag__close {
        color: #f56c6c;
        &:hover {
          color: #fff;
          background-color: #f56c6c;
        }
      }
    }
    .icon-close {
      border-radius: 50%;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      height: 16px;
      width: 16px;
      line-height: 16px;
      vertical-align: middle;
      top: -1px;
      right: -5px;
    }
  }
  .sk-tag--dark {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;

    &.is-hit {
      border-color: #409eff;
    }

    .sk-tag__close {
      color: #fff;

      &:hover {
        color: #fff;
        background-color: #66b1ff;
      }
    }

    &.sk-tag--info {
      background-color: #909399;
      border-color: #909399;
      color: #fff;

      &.is-hit {
        border-color: #909399;
      }

      .sk-tag__close {
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #a6a9ad;
        }
      }
    }

    &.sk-tag--success {
      background-color: #67c23a;
      border-color: #67c23a;
      color: #fff;

      &.is-hit {
        border-color: #67c23a;
      }

      .sk-tag__close {
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #85ce61;
        }
      }
    }

    &.sk-tag--warning {
      background-color: #e6a23c;
      border-color: #e6a23c;
      color: #fff;

      &.is-hit {
        border-color: #e6a23c;
      }

      .sk-tag__close {
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #ebb563;
        }
      }
    }

    &.sk-tag--danger {
      background-color: #f56c6c;
      border-color: #f56c6c;
      color: #fff;

      &.is-hit {
        border-color: #f56c6c;
      }

      .sk-tag__close {
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #f78989;
        }
      }
    }
  }

  .sk-tag--plain {
    background-color: #fff;
    border-color: #b3d8ff;
    color: #409eff;
    &.is-hit {
      border-color: #409eff;
    }
    .sk-tag__close {
      color: #409eff;
      &:hover {
        color: #fff;
        background-color: #409eff;
      }
    }
    &.sk-tag--info {
      background-color: #fff;
      border-color: #d3d4d6;
      color: #909399;
      &.is-hit {
        border-color: #909399;
      }
      .sk-tag__close {
        color: #909399;
        &:hover {
          color: #fff;
          background-color: #909399;
        }
      }
    }
    &.sk-tag--success {
      background-color: #fff;
      border-color: #c2e7b0;
      color: #67c23a;
      &.is-hit {
        border-color: #67c23a;
      }
      .sk-tag__close {
        color: #67c23a;
        &:hover {
          color: #fff;
          background-color: #67c23a;
        }
      }
    }
    &.sk-tag--warning {
      background-color: #fff;
      border-color: #f5dab1;
      color: #e6a23c;
      &.is-hit {
        border-color: #e6a23c;
      }
      .sk-tag__close {
        color: #e6a23c;
        &:hover {
          color: #fff;
          background-color: #e6a23c;
        }
      }
    }
    &.sk-tag--danger {
      background-color: #fff;
      border-color: #fbc4c4;
      color: #f56c6c;
      &.is-hit {
        border-color: #f56c6c;
      }
      .sk-tag__close {
        color: #f56c6c;
        &:hover {
          color: #fff;
          background-color: #f56c6c;
        }
      }
    }
  }
  .sk-tag--medium {
    height: 28px;
    line-height: 26px;
    .icon-close {
      transform: scale(0.8);
    }
  }
  .sk-tag--small {
    padding: 0 8px;
    height: 24px;

    line-height: 22px;
    .icon-close {
      transform: scale(0.8);
    }
  }
  .sk-tag--mini {
    padding: 0 5px;
    height: 20px;

    line-height: 19px;
    .icon-close {
      margin-left: -3px;
      transform: scale(0.7);
    }
  }
}
</style>
