<template>
  <aside v-if="list.length > 0" class="article-catalog">
    <div class="catalog-title">目录</div>
    <div class="catalog-body">
      <catalog-list
        class="catalog-list"
        :list="list"
        :style="{ marginTop: `${marginTop}px` }"
        @click.native="handleCatalogClick"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CatalogList from '@/views/detail/components/CatalogList.vue';

interface ListItem {
  id: number;
  mark: string;
  title: string;
}
interface List extends ListItem {
  children?: List[];
}
interface ListNode extends ListItem {
  father: ListNode | ListNode[] | null;
  children: ListNode[];
}

@Component({
  components: { CatalogList },
})
export default class ArticleDirectory extends Vue {
  @Prop({ type: String, required: true })
  private readonly data!: string;
  @Prop({ type: Number, default: 0 })
  private readonly marginTop!: number;

  private list: List[] = [];

  private _lastElement: HTMLElement | null = null;

  private mounted() {
    this.search();
  }

  private search() {
    const re = /(#+)(.*)/g;
    let matcher;
    let current: ListNode;
    let pre: ListNode = {
      id: 0,
      mark: '#',
      title: '',
      children: [],
      father: null,
    };
    const list: ListNode[] = [];
    let temp: ListNode[] | null = [];
    let id = 0;
    let minMark = 6;
    while ((matcher = re.exec(this.data)) !== null) {
      const length = matcher[1].length;
      current = {
        id,
        mark: matcher[1],
        title: matcher[2].trim(),
        children: [],
        father: null,
      };
      if (minMark > length) {
        minMark = length;
      }
      id++;
      temp.push(current);
    }
    temp.forEach(current => {
      const length = current.mark.length;
      if (length === minMark) {
        current.father = list;
        list.push(current);
        pre = current;
        return;
      }
      if (length > pre.mark.length) {
        // 是上级的子目录
        current.father = pre;
        pre.children.push(current);
      } else if (length < pre.mark.length) {
        // 比上级大
        const preFather = pre.father as ListNode;
        current.father = preFather.father as ListNode;
        current.father.children.push(current);
      } else {
        // 平级
        current.father = pre.father as ListNode;
        current.father.children.push(current);
      }
      pre = current;
    });
    temp = null;
    this.list = this.deleteFather(list) as List[];
  }

  // 删除father属性
  private deleteFather(list: ListNode[]) {
    return list.map(item => {
      delete item.father;
      if (item.children?.length === 0) {
        delete item.children;
        return item;
      }
      if (item.children && item.children.length > 0) {
        this.deleteFather(item.children);
        return item;
      }
    });
  }
  private handleCatalogClick(e: Event) {
    this._lastElement && this._lastElement.classList.remove('current');
    const current = e.target as HTMLElement;
    current.classList.add('current');
    this._lastElement = current;
  }
}
</script>

<style lang="less" scoped>
.article-catalog {
  padding: 10px;
}
.catalog-title {
  font-size: 1.167rem;
  color: #000;
}
.catalog-body {
  position: relative;
  margin: 6px 20px;
  overflow: hidden;
  .catalog-list {
    padding: 0;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 7px;
      bottom: 0;
      width: 2px;
      background-color: #ebedef;
      opacity: 0.5;
    }
  }
}
</style>
