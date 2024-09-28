<template>
  <Mask v-model="visible">
    <section class="CommandMenu fs-14 p-1 p-f">
      <el-input class="mb-1" placeholder="搜索" v-model="search" />

      <ul class="h g-1">
        <div v-if="!search">
          <FuncItem
            v-for="item of funcData"
            :key="item.name"
            :data="item"
            @close="visible = false"
          />
        </div>

        <div v-if="!search && filterData.length != 0">
          <Item
            v-for="item of filterData.reverse()"
            :key="item.id"
            :data="item"
            @close="visible = false"
          ></Item>
        </div>

        <aside
          class="v-n-c px-1r g-1 c-ccc f-s-0"
          v-if="search && filterData.length == 0"
        >
          没有匹配的结果
        </aside>
      </ul>
    </section>
  </Mask>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import Item from "./Item.vue";
import FuncItem from "./FuncItem.vue";
import Mask from "./Mask.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { useVideoStore } from "@/stores/useVideoStore";

// const router = useRouter();
const { data, selectedID } = storeToRefs(useVideoStore());

//是否可见
const visible = ref(false);

//输入的关键词
const search = ref("");

//功能数据
const funcData = [
  {
    name: "添加视频",
    onClick() {
      selectedID.value = "";
    },
  },
];

//视频数据
const videoData = computed(() => {
  return data.value.map(item => {
    item.onClick = () => {
      selectedID.value = item.id!;
    };

    return item;
  });
});

//搜索后的数据
const filterData = computed(() => {
  return videoData.value.filter(({ name }) => {
    if (search.value === "") return true;

    return name.includes(search.value);
  });
});

eventEmitter.on("command:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss">
.CommandMenu {
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  background-color: #222;
  box-shadow: 0 1px 10px #000;
  border-radius: 0.5rem;
  border: 1px solid #3c3c3c;

  ul {
    max-height: 500px;

    &::-webkit-scrollbar {
      width: 0;
    }

    > div {
      > :deep(li) {
        border-radius: 0.25rem;
        transition: 0.15s;
        padding: 4px 1rem;

        > button {
          $size: 30px;
          width: $size;
          height: $size;
          border-radius: 5px;
          transition: 0.15s;
          right: 10px;
          display: none;

          > img {
            $size: 14px;
            width: $size;
            height: $size;
          }

          &:hover {
            background-color: #373737;
          }
        }

        &:hover {
          background-color: #2a2d2e;

          > button {
            display: flex;
          }
        }
      }

      &:not(:last-child) {
        padding-bottom: 5px;
        border-bottom: 1px solid #3c3c3c;
      }
    }

    > aside {
      height: 28px;
    }
  }
}
</style>
