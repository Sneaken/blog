<!--<template>-->
<!--使用tsx 不能再在这里写标签 这里的优先级比render函数大-->
<!--若这里有内容 那么render函数生成的dom会被覆盖 也可能是直接忽视了render函数？-->
<!--</template>-->
<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ListItem {
  id: number;
  mark: string;
  title: string;
}
interface List extends ListItem {
  children?: List[];
}
@Component
export default class CatalogList extends Vue {
  @Prop({ type: Array, required: true })
  private readonly list!: List[];

  private createCatalog(list: List[]) {
    return (
      <ul>
        {list.map(item => {
          if (item.children) {
            return (
              <li class={`item d${item.mark.length}`}>
                <a title={item.title}>{item.title}</a>
                {this.createCatalog(item.children)}
              </li>
            );
          }
          return (
            <li class={`item d${item.mark.length}`}>
              <a title={item.title}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    );
  }

  private render() {
    return this.createCatalog(this.list);
  }
}
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.item {
  margin: 0;
  padding: 0;
  font-size: 1.167rem;
  font-weight: 400;
  line-height: 1.3;
  color: #333;
  a {
    display: block;
    position: relative;
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -2px;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
    }
  }
  &.d1 {
    font-weight: 600;
    color: #000;
    &:first-child {
      & > a {
        margin-top: 0;
      }
    }
    & > a {
      margin: 6px 0;
      padding: 4px 0 4px 21px;
      &::before {
        left: 5px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
      }
    }
  }
  &.d2 {
    & > a {
      padding-left: 36px;
      &::before {
        left: 24px;
      }
    }
  }
  &.d3 {
    & > a {
      padding-left: 51px;
      &::before {
        left: 39px;
      }
    }
  }
  &.d4 {
    & > a {
      padding-left: 66px;
      &::before {
        left: 44px;
      }
    }
  }
  &.d5 {
    & > a {
      padding-left: 81px;
      &::before {
        left: 59px;
      }
    }
  }
  &.d6 {
    & > a {
      padding-left: 96px;
      &::before {
        left: 74px;
      }
    }
  }
}
</style>
