import ITodo from "../interfaces/ITodo";
import GenericStore from "./GenericStore";

const todosStore = new GenericStore<ITodo>();
export default todosStore;
