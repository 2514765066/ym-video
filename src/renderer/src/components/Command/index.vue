<template>
  <Mask v-model="visible">
    <section class="fs-14 p-1 p-f">
      <el-input placeholder="搜索" v-model="search" class="mb-1"></el-input>

      <ul class="h g-1">
        <div v-for="(group, index) of comData" :key="index">
          <li
            class="click v-n-c px-1r g-1"
            v-for="{ name, onClick, url, edit, id } of group"
            :key="name"
            @click="handleClick(onClick)"
          >
            <span class="c-ccc">{{ name }}</span>
            <span class="c-999 fs-12 ellipsis">{{ url }}</span>

            <el-tooltip content="编辑" placement="bottom">
              <button
                class="ml f-s-0"
                @click.stop="handleEdit(id)"
                v-show="edit != false"
              >
                <img src="@/assets/edit.svg" />
              </button>
            </el-tooltip>

            <el-tooltip content="删除" placement="bottom">
              <button
                class="f-s-0"
                @click.stop="handleRemove(id)"
                v-show="edit != false"
              >
                <img src="@/assets/remove.svg" />
              </button>
            </el-tooltip>
          </li>
        </div>

        <aside class="v-n-c px-1r g-1 c-ccc" v-if="comData.length === 0">
          <span>没有匹配的结果</span>
        </aside>
      </ul>
    </section>
  </Mask>
</template>

<script setup lang="ts">
import { ElInput, ElTooltip } from "element-plus";
import Mask from "@/components/Mask/index.vue";
import { computed, ref } from "vue";
import eventEmitter from "@/hooks/eventEmitter";
import { useListStore } from "@/stores/useListStore";
import { ListItem } from "@type";

const list = useListStore();

type Data = ListItem & {
  search?: boolean;
  edit?: boolean;
};

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
  ] as Data[][];
});

//是否可见
const visible = ref(false);

//输入的关键词
const search = ref("");

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

//点击
function handleClick(func: Function | undefined) {
  if (!func) return;

  func();
  visible.value = false;
}

//编辑
function handleEdit(id: string) {
  list.editID = id;
  eventEmitter.emit("edit:show");
  visible.value = false;
}

//移除
function handleRemove(name: string) {
  list.remove(name);
  eventEmitter.emit("success:show", "移除成功");
}

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

    li {
      border-radius: 0.25rem;
      transition: 0.15s;
      min-height: 28px;

      &:hover {
        background-color: #2a2d2e;

        > button {
          display: flex;
        }
      }

      > button {
        display: none;
        $size: 24px;
        width: $size;
        height: $size;
        border-radius: 5px;
        transition: 0.15s;

        &:hover {
          background-color: #393c3d;
        }

        > img {
          $size: 14px;
          width: $size;
          height: $size;
        }
      }
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
