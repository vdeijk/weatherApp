import { makeAutoObservable } from "mobx";

class NavStore {
  currentPage: string = "/";

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }
}

export const navStore = new NavStore();
