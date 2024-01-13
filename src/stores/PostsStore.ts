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

    deleteOne(id) {
        this.postsData = this.postsData.filter((post: any) => post.id !== id);
    }

    deleteMany(ids) {
        this.postsData = this.postsData.filter((post: any) => !ids.includes(post.id));
    }

}

const postsStore = new PostsStore();
export default postsStore;
