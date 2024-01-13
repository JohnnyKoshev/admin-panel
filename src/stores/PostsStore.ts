import {makeAutoObservable} from "mobx";

class PostsStore {
    postsData = []

    constructor() {
        makeAutoObservable(this);
    }

    set posts(data) {
        this.postsData = data;
    }

    get posts() {
        return this.postsData;
    }

}

const postsStore = new PostsStore();
export default postsStore;
