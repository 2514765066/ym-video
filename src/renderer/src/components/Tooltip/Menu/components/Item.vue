<template>
  <section
    v-if="!data.hidden"
    class="menu-item flex items-center rounded-md cursor-pointer px-3 gap-1"
    :class="{ hover: data.hoverColor }"
    @click="handleClick"
  >
    <div class="flex justify-center items-center mr-1.5" v-if="data.icon">
      <Icon :name="data.icon" size="18" color="#ffffffcf"></Icon>
    </div>

    <span
      class="text-sm text-color mr-auto whitespace-nowrap text-ellipsis overflow-hidden"
      v-if="data.title"
    >
      {{ data.title }}
    </span>

    <span
      class="text-xs text-color-darken whitespace-nowrap text-ellipsis overflow-hidden"
      v-if="data.sub"
    >
      {{ data.sub }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { MenuItem } from "../type";

const props = defineProps<{
  data: MenuItem;
}>();

const handleClick = () => {
  if (props.data.onSelect) {
    props.data.onSelect(props.data);
  }
};
</script>

<style scoped lang="scss">
.menu-item {
  height: 32px;

  transition: 0.1s;

  &:hover {
    background-color: #313131;
  }
}

.hover {
  &:hover {
    > div {
      > i {
        background-color: v-bind("data.hoverColor ");
      }
    }

    > span {
      color: v-bind("data.hoverColor");
    }
  }
}
</style>
