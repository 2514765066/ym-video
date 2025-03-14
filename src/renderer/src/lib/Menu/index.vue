<template>
  <Teleport to="body">
    <div>
      <Transition>
        <section class="menu fixed rounded-lg" v-if="visible" ref="menuRef">
          <Grounp
            v-for="{ title, children } of menuOption.data"
            :key="title"
            :title="title"
          >
            <Item
              v-for="item of children"
              :key="title"
              :data="item"
              @click="handleClick(item.onSelect)"
            />
          </Grounp>
        </section>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Grounp from "./components/Grounp.vue";
import Item from "./components/Item.vue";
import { onClickOutside } from "@vueuse/core";
import eventEmitter from "@/hooks/eventEmitter";
import { MenuGrounp } from "./type";

type MenuOption = {
  data: MenuGrounp[];
  width: number;
  x: number;
  y: number;
};

//菜单配置
const menuOption = ref<MenuOption>({
  data: [],
  width: 300,
  x: 0,
  y: 0,
});

//菜单是否可见
const visible = ref(false);

//菜单元素
const menuRef = ref<HTMLElement>();

//点击菜单
const handleClick = (callback?: () => void) => {
  if (callback) {
    callback();
  }

  handleClose();
};

//关闭菜单
const handleClose = () => {
  visible.value = false;
};

onClickOutside(menuRef as any, handleClose);

//打开菜单
eventEmitter.on("menu:show", option => {
  menuOption.value = option;
  visible.value = true;
});
</script>

<style scoped lang="scss">
.menu {
  width: calc(v-bind("menuOption.width") * 1px);
  max-height: 40vh;

  top: calc(v-bind("menuOption.y") * 1px);
  left: calc(v-bind("menuOption.x") * 1px);

  background-color: #252525;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
