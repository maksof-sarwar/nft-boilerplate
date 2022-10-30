export type STORAGE_TYPE = "LOCAL" | "SESSION";
class StorageService {
  constructor() { }

  getItemFromStorage(key: string, _type: STORAGE_TYPE = "LOCAL"): any {
    try {
      return JSON.parse(_type == "LOCAL" ? localStorage.getItem(key)! : sessionStorage.getItem(key)!);
    } catch {
      return null;
    }
  };
  setItemToStoage(key: string, item: any, _type: STORAGE_TYPE = "LOCAL"): void {
    _type == "LOCAL" ? localStorage.setItem(key, JSON.stringify(item)) : sessionStorage.setItem(key, JSON.stringify(item));
  };

  deleteItemFromStorage(key: string, _type: STORAGE_TYPE = "LOCAL"): void {
    _type == "LOCAL" ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
  };

  clearAllDataFromStorage(_type: STORAGE_TYPE = "LOCAL"): void {
    _type == "LOCAL" ? localStorage.clear() : sessionStorage.clear();
  };
}

export default new StorageService();