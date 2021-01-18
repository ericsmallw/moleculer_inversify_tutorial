import IAuthBase from "../base/IAuthBase";

export default interface IAuthBusinessManager {
	signup(data: any): Promise<any>;
	login(credentials: any): Promise<any>;
}
