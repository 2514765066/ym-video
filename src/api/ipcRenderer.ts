import { ipcRenderer as ipcRenderer1 } from "electron";
import { IpcEventParameters, IpcEventNames, IpcEventReturn } from "../type";

class IpcRendererWrapper {
  send<T extends IpcEventNames>(event: T, ...args: IpcEventParameters<T>) {
    ipcRenderer1.send(event, args);
  }

  async invoke<T extends IpcEventNames>(
    event: T,
    ...args: IpcEventParameters<T>
  ): Promise<IpcEventReturn<T>> {
    return await ipcRenderer1.invoke(event, args);
  }
}

export const ipcRenderer = new IpcRendererWrapper();
