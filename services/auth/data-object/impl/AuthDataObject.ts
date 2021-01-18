import {injectable} from "inversify";
import IAuthDataObject from "../IAuthDataObject";
import {auth} from "../../db";

@injectable()
export default class AuthDataObject implements IAuthDataObject{
	public async create(data: any): Promise<any> {
		return await auth.insert(data);
	}

	public async delete(id: string): Promise<any> {
		return await auth.remove({_id: id});
	}

	public async get(id: string): Promise<any> {
		return await auth.find({_id: id});
	}

	public async update(id: string, data: any): Promise<any> {
		return await auth.update({_id: id}, {$set: data});
	}

}
