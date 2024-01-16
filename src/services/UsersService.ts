import IUser from "../interfaces/IUser";
import GenericService from "./GenericService";

const UsersService = new GenericService<IUser>('users');
export default UsersService;