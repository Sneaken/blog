<template>
  <nav class="article-catalog">
    <div class="catalog-title">目录</div>
    <div class="catalog-body">
      <catalog-list class="catalog-list" :list="list" />
    </div>
  </nav>
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

  private list: List[] = [];

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
    let id = 0;
    while ((matcher = re.exec(this.data)) !== null) {
      const length = matcher[1].length;
      current = {
        id,
        mark: matcher[1],
        title: matcher[2].trim(),
        children: [],
        father: null,
      };
      id++;
      if (length === 1) {
        current.father = list;
        list.push(current);
        pre = current;
        continue;
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
    }
    this.list = this.deleteFather(list) as List[];
  }

  // 删除father属性
  deleteFather(list: ListNode[]) {
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
}
</script>

<style lang="less" scoped>
.article-catalog {
  margin: 10px;
}
.catalog-title {
  font-size: 1.167rem;
  color: #000;
}
.catalog-body {
  position: relative;
  margin: 6px 20px;
  .catalog-list {
    padding: 0;
  }
}
</style>
