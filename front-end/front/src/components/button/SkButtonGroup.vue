<template>
  <div class="sk-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SkButtonGroup extends Vue {}
</script>

<style lang="less" scoped>
@media all {
  .sk-button-group {
    display: inline-block;
    vertical-align: middle;
  }
  .sk-button-group::after,
  .sk-button-group::before {
    display: table;
    content: '';
  }
  .sk-button-group::after {
    clear: both;
  }
  .sk-button-group > .sk-button {
    float: left;
    position: relative;
  }
  .sk-button-group > .sk-button + .sk-button {
    margin-left: 0;
  }
  .sk-button-group > .sk-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .sk-button-group > .sk-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .sk-button-group > .sk-button:first-child:last-child {
    border-radius: 4px;
  }
  .sk-button-group > .sk-button:first-child:last-child.is-round {
    border-radius: 20px;
  }
  .sk-button-group > .sk-button:first-child:last-child.is-circle {
    border-radius: 50%;
  }
  .sk-button-group > .sk-button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  .sk-button-group > .sk-button:not(:last-child) {
    margin-right: -1px;
  }
  .sk-button-group > .sk-dropdown > .sk-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--primary:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--primary:last-child {
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--primary:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--success:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--success:last-child {
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--success:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--warning:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--warning:last-child {
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--warning:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--danger:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--danger:last-child {
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--danger:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--info:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--info:last-child {
    border-left-color: rgba(255, 255, 255, 0.5);
  }
  .sk-button-group .sk-button--info:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
