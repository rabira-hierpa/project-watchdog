import * as localforage from "localforage";

export class StorageService {
  constructor() {
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
      name: "storage",
      version: 1.0,
      storeName: "Storage",
      description: "",
    });
  }
  getItem(key) {
    return localforage.getItem(key);
  }
  getItems(keys) {
    const promises = keys.map((item) => {
      return localforage.getItem(item);
    });

    return Promise.all(promises);
  }
  setItem(key, data) {
    return localforage.setItem(key, data);
  }
  removeItem(key) {
    return localforage.removeItem(key);
  }
  keys() {
    return localforage.keys();
  }
  clear() {
    return localforage.clear();
  }
}

export const storage = new StorageService();
