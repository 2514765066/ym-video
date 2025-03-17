<template>
  <section class="flex gap-5 mb-4">
    <MovieCardInfo
      v-for="(item, index) of tvData.slice(0, cardCount)"
      v-model="tvData[index]"
      color="#1A2735"
      :key="item.name"
    />
  </section>

  <Group title="精选电视剧" icon="star">
    <ul class="gap-4 h-fit grid grid-list" ref="container">
      <MovieInfo
        v-for="(item, index) of tvData.slice(cardCount, count)"
        v-model="tvData[index + cardCount]"
        :key="item.name"
      />
    </ul>
  </Group>
</template>

<script setup lang="ts">
import Group from "@/components/Group.vue";
import MovieInfo from "@/components/Info/MovieInfo.vue";
import MovieCardInfo from "@/components/Info/MovieCardInfo.vue";
import { useTvStore } from "@/stores/useTvStore";
import { useResize } from "@/hooks/useResize";

const { tvData } = storeToRefs(useTvStore());
const container = ref<HTMLElement>();
const { colCount } = useResize(container);

//上方卡片数量
const cardCount = computed(() => (colCount.value <= 3 ? 1 : 2));

//列表卡片数量
const count = computed(() => {
  return (
    Math.floor((tvData.value.length - cardCount.value) / colCount.value) *
      colCount.value +
    cardCount.value
  );
});
</script>

<style scoped lang="scss"></style>
