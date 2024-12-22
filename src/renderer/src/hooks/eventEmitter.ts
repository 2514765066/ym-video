//事件名称
const eventNames = [
  "error:show",
  "success:show",
  "command:show",
  "set:show",
  "videoSite:show",
  "video:show",
] as const;

// 定义事件到函数类型的映射
interface EventMap {
  "error:show": (message: string) => void;
  "success:show": (message: string) => void;
  "command:show": () => void;
  "set:show": () => void;
  "videoSite:show": () => void;
  "video:show": () => void;
}

type EventNames = keyof EventMap;

type Listeners = Record<EventNames, Set<Function>>;

class EventEmitter {
  private listeners = {} as Listeners;

  constructor() {
    eventNames.forEach(name => {
      this.listeners[name] = new Set();
    });
  }

  on<T extends EventNames>(eventName: T, listener: EventMap[T]) {
    this.listeners[eventName].add(listener);
  }

  emit<T extends EventNames>(eventName: T, ...args: Parameters<EventMap[T]>) {
    this.listeners[eventName].forEach(listener => listener(...args));
  }
}

export default new EventEmitter();
