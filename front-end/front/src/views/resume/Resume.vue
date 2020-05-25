<template>
  <div>
    <div>
      <div>姜斌</div>
      <ul class="tags">
        <li>本科</li>
        <li>一年工作经验</li>
        <li>男</li>
      </ul>
      <div>联系电话:15212849642</div>
      <div>电子邮箱:924393527@qq.com</div>
    </div>
    <div>
      <h3>教育背景</h3>
      <div>
        <span>2015-2019</span>
        <span>安徽工程大学</span>
        <span>软件工程</span>
      </div>
    </div>
    <h3>工作经历</h3>
    <div>
      <div>公司:上海犀光网络科技有限公司</div>
      <div>岗位: web前端开发</div>
      <div>2019.07-至今</div>
      <div>
        <h4>参与项目</h4>
        <div>
          <h5>cms</h5>
          <div>
            项目描述:
          </div>
        </div>
        <div>
          <h5>cms管理后台</h5>
          <div>
            项目描述:
          </div>
        </div>
        <div>
          <h5>h5</h5>
          <div>
            项目描述:
          </div>
        </div>
        <div>
          <h5>dsp平台</h5>
          <div>
            项目描述:
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Resume extends Vue {}
</script>

<style lang="less" scoped>
.tags {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 1px;
      &:after {
        padding-left: 1px;
        content: '|';
      }
    }
  }
}
</style>
