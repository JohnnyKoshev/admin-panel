import IPost from "../interfaces/IPost";
import GenericStore from "./GenericStore";


const postsStore = new GenericStore<IPost>();
export default postsStore;
