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

    deleteOne(id:number) {
        this.postsData = this.postsData.filter((post: any) => post.id !== id);
    }

    deleteMany(ids: number[]) {
        this.postsData = this.postsData.filter((post: any) => !ids.includes(post.id));
    }

}

const postsStore = new PostsStore();
export default postsStore;
