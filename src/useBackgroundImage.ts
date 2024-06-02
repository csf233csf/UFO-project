import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useBackgroundColor() {
  const route = useRoute();
  const backgroundColor = ref(getBackgroundColor(route.path));

  watch(route, (newRoute) => {
    backgroundColor.value = getBackgroundColor(newRoute.path);
  });

  function getBackgroundColor(path: string) {
    switch (path) {
      case '/page1':
        return '#ffcccb'; // 例如：淡红色
      case '/page2':
        return '#add8e6'; // 例如：淡蓝色
      case '/page3':
        return '#90ee90'; // 例如：淡绿色
      default:
        return '#ffffff'; // 默认：白色
    }
  }

  return {
    backgroundColor,
  };
}
