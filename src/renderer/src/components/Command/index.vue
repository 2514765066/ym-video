<template>
  <Mask v-model="visible">
    <section class="fs-14 p-1 p-f">
      <el-input placeholder="搜索" v-model="search" class="mb-1"></el-input>

      <ul class="h g-1">
        <div v-for="(group, index) of comData" :key="index">
          <Item
            v-for="item of group"
            :key="item.id"
            :data="item"
            @close="visible = false"
          ></Item>
        </div>

        <aside class="v-n-c px-1r g-1 c-ccc" v-if="comData.length === 0">
          没有匹配的结果
        </aside>
      </ul>
    </section>
  </Mask>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import Item from "./Item.vue";
import Mask from "@/components/Mask/index.vue";
import { computed, ref } from "vue";
import eventEmitter from "@/hooks/eventEmitter";
import { CommandItem } from "@type";
import { useListStore } from "@/stores/useListStore";

const list = useListStore();

//输入的关键词
const search = ref("");

//源数据
const data = computed(() => {
  return [
    [
      {
        name: "添加视频",
        edit: false,
        onClick() {
          eventEmitter.emit("create:show");
        },
      },
    ],
    list.data.map(item => {
      item.onClick = () => {
        list.selectedID = item.id;
      };

      return item;
    }),
  ] as CommandItem[][];
});

//显示的项目
const comData = computed(() => {
  return data.value
    .map(arr =>
      arr.filter(item => {
        if (search.value === "") return true;
        return item.search !== false && item.name.includes(search.value);
      })
    )
    .filter(arr => arr.length !== 0);
});

//是否可见
const visible = ref(false);

eventEmitter.on("select:video:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss">
section {
  top: 5px;
  left: 50%;
  width: 600px;
  background-color: #222;
  box-shadow: 0 1px 10px #000;
  border-radius: 0.5rem;
  border: 1px solid #3c3c3c;
  transform: translateX(-50%);
  z-index: 1000;

  ul {
    max-height: 500px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }

    > aside {
      height: 26px;
    }

    > div:not(:last-child) {
      padding-bottom: 5px;
      border-bottom: 1px solid #3c3c3c;
    }
  }
}
</style>
