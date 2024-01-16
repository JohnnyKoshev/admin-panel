import GenericService from "./GenericService";
import IPost from "../interfaces/IPost";

const PostsService = new GenericService<IPost>('posts');
export default PostsService;