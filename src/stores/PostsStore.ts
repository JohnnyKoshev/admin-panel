import {makeAutoObservable} from "mobx";
import IPost from "../interfaces/IPost";

class PostsStore {
    postsData: IPost[] = []

    constructor() {
        makeAutoObservable(this);
    }

    set data(data) {
        this.postsData = data;
    }

    get data() {
        return this.postsData;
    }

    deleteOne(id: number) {
        this.postsData = this.postsData.filter((post: any) => post.id !== id);
    }

    deleteMany(ids: number[]) {
        this.postsData = this.postsData.filter((post: any) => !ids.includes(post.id));
    }

    addOne(post: IPost) {
        this.postsData.push(post);
    }

    updateOne(post: IPost) {
        this.postsData = this.postsData.map((p: IPost) => p.id === post.id ? post : p);
    }

    getIds() {
        return this.postsData.map((post: IPost) => post.id);
    }

}

const postsStore = new PostsStore();
export default postsStore;
