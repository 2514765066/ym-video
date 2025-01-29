// 定义事件到函数类型的映射
type EventMap = {
  "error:show": (message: string) => void;
  "success:show": (message: string) => void;
  "command:show": () => void;
  "set:show": () => void;
  "videoSite:show": () => void;
  "video:show": () => void;
  "new:show": () => void;
};

type EventNames = keyof EventMap;

class EventEmitter {
  private listeners = {} as Record<EventNames, Set<Function>>;

  on<T extends EventNames>(eventName: T, listener: EventMap[T]) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = new Set();
    }

    this.listeners[eventName].add(listener);
  }

  emit<T extends EventNames>(eventName: T, ...args: Parameters<EventMap[T]>) {
    this.listeners[eventName].forEach(listener => listener(...args));
  }
}

export default new EventEmitter();
