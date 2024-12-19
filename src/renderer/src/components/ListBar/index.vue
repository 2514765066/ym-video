<template>
  <section class="list-bar h g-1r">
    <Logo />

    <Search />

    <ul class="h-100 h g-1">
      <Item
        :title="title"
        :src="src"
        :to="to"
        v-for="{ title, to, src } of list"
        :class="{
          'mt': title == '设置',
          'active': route.path.includes(to),
        }"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import Logo from "@/components/ListBar/Logo.vue";
import Search from "./Search.vue";
import Item from "./Item.vue";

const route = useRoute();
const router = useRouter();

const list = router.options.routes
  .filter(item => item.meta)
  .map(item => {
    return {
      to: item.path,
      title: item.meta!.title as string,
      src: item.meta!.src as URL,
    };
  });
</script>

<style scoped lang="scss">
.list-bar {
  padding: 0.5rem;
  border-right: 1.5px solid #1d1d1d;
  background-color: #202020;

  > ul {
    .active {
      background-color: #2d2d2d;

      &::before {
        background-color: #ff8232;
      }
    }
  }
}
</style>
