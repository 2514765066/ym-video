<template>
  <div
    class="z-50 fixed top-0 left-0 w-screen h-screen flex justify-center pt-16"
    @click.self="handleClose"
    v-if="visible"
  >
    <main class="h-fit rounded-xl">
      <form class="flex items-center gap-2 px-3" @submit.prevent="handleSubmit">
        <Icon name="search" size="20" color="#ffffffcf" />

        <input
          type="text"
          class="text-color w-full"
          placeholder="在全局中搜索..."
          v-model="keyword"
          ref="inputRef"
        />
      </form>

      <ul
        class="min-h-11 px-2 flex flex-col items-center mb-2"
        v-if="state != 'init'"
      >
        <Icon
          name="loading"
          size="25"
          color="#ffffffcf"
          v-if="state == 'loading'"
        />

        <span class="text-color" v-if="state == 'empty'">暂无搜索内容....</span>

        <HasItem
          v-if="state == 'finish'"
          v-for="item of hasData.slice(0, 2)"
          :key="item.name"
          :data="item"
          @click="handleClose"
        />

        <SearchItem
          v-if="state == 'finish'"
          v-for="item in searchData.slice(0, 5)"
          :key="item.name"
          :data="item"
          @click="handleClose"
        />

        <li
          class="h-8 mt-2 px-4 flex justify-center items-center rounded cursor-pointer"
          v-if="searchData.length > 5"
          @click="handleMore"
        >
          <span class="text-color text-sm">查看更多...</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import HasItem from "./HasItem.vue";
import SearchItem from "./SearchItem.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { useSearchStore } from "@/stores/useSearchStore";

const { keyword, searchData, hasData, state } = storeToRefs(useSearchStore());
const { reset, getSearchData } = useSearchStore();
const router = useRouter();
const route = useRoute();

//搜索栏是否可见
const visible = ref(false);

//输入框元素
const inputRef = ref<HTMLInputElement>();

//提交
const handleSubmit = async () => {
  if (route.path == "/search") {
    handleClose();
  }

  await getSearchData();
};

//关闭
const handleClose = () => {
  visible.value = false;
  console.log("关闭");

  if (route.path == "/search") {
    return;
  }

  reset();
};

//查看更多
const handleMore = async () => {
  await router.push("/search");

  handleClose();
};

//聚焦
const focus = async () => {
  await nextTick();

  inputRef.value?.focus();
};

eventEmitter.on("search:show", () => {
  visible.value = true;

  focus();
});

onMounted(() => {
  //按下ctrl+s打开
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();

      visible.value = true;

      focus();
    }
  });
});
</script>

<style scoped lang="scss">
main {
  width: 60vw;
  max-width: 1160px;
  backdrop-filter: blur(100px);
  background-color: rgba(#000, 0.1);
  box-shadow: rgb(48, 48, 46) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.48) 0px 24px 48px -8px,
    rgba(0, 0, 0, 0.24) 0px 4px 12px -1px;

  > form {
    height: 48px;

    > input {
      &::placeholder {
        color: rgba(#fff, 0.282);
      }
    }
  }

  > ul {
    &:deep(li) {
      transition: background-color 0.1s;

      &:hover {
        background-color: rgba(#fff, 0.08);
      }
    }
  }
}
</style>
