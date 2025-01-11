import {
  ipcMain as ipcMain1,
  IpcMainEvent,
  IpcMainInvokeEvent,
} from "electron";
import { IpcEventParameters, IpcEventNames, IpcEventReturn } from "../type";

class IpcMainWrapper {
  on<T extends IpcEventNames>(
    event: T,
    listener: (event: IpcMainEvent, ...args: IpcEventParameters<T>) => void
  ) {
    ipcMain1.on(event, listener);
  }

  handle<T extends IpcEventNames>(
    event: T,
    listener: (
      event: IpcMainInvokeEvent,
      ...args: IpcEventParameters<T>
    ) => Promise<IpcEventReturn<T>> | IpcEventReturn<T>
  ) {
    ipcMain1.handle(event, listener);
  }
}

export const ipcMain = new IpcMainWrapper();
