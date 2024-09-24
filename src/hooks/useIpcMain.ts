import {
  ipcMain as ipcMain1,
  IpcMainEvent,
  IpcMainInvokeEvent,
} from "electron";
import { EventNames } from "../type";

type IpcMainHandler = (event: IpcMainEvent, ...args: any[]) => void;

class IpcMainWrapper {
  on(event: EventNames, listener: IpcMainHandler) {
    ipcMain1.on(event, listener);
  }

  handle(
    event: EventNames,
    listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any
  ) {
    ipcMain1.handle(event, listener);
  }
}

export const ipcMain = new IpcMainWrapper();
