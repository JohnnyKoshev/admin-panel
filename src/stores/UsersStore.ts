import IUser from "../interfaces/IUser";
import GenericStore from "./GenericStore";

const usersStore = new GenericStore<IUser>();
export default usersStore;
