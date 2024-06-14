<template>
  <Mask v-model="visible">
    <section class="fs-14 p-1 p-f">
      <el-input placeholder="搜索" v-model="search" class="mb-1"></el-input>

      <ul class="h g-1">
        <div v-for="(group, index) of comData" :key="index">
          <li
            class="click v-n-c px-1r g-1"
            v-for="{ name, onClick, url, edit } of group"
            :key="name"
            @click="handleHide(onClick)"
          >
            <span class="c-ccc">{{ name }}</span>
            <span class="c-999 fs-12 ellipsis">{{ url }}</span>

            <el-tooltip content="编辑" placement="bottom">
              <button
                class="ml"
                @click.stop="handleEdit(name)"
                v-show="edit != false"
              >
                <img src="@/assets/edit.svg" />
              </button>
            </el-tooltip>

            <el-tooltip content="删除" placement="bottom">
              <button @click.stop="handleRemove(name)" v-show="edit != false">
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

const list = useListStore();

type Data = {
  name: string;
  url?: string;
  onClick?: Function;
  search?: boolean;
  edit?: boolean;
};

const data = computed(() => {
  return [
    [
      {
        name: "添加视频",
        edit: false,
        onClick() {
          eventEmitter.emit("dialog:show", "push");
        },
      },
    ],
    list.data.map(item => {
      item.onClick = () => {
        list.selectedName = item.name;
      };

      return item;
    }),
  ] as Data[][];
});

const visible = ref(false);

const search = ref("");

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

function handleHide(func: Function | undefined) {
  if (!func) return;

  func();
  visible.value = false;
}

function handleEdit(name: string) {
  list.editName = name;
  eventEmitter.emit("dialog:show", "edit");
  visible.value = false;
}

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
