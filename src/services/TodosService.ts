import ITodo from "../interfaces/ITodo";
import GenericService from "./GenericService";

const TodosService = new GenericService<ITodo>('todos');
export default TodosService;