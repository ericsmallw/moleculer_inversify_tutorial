import {injectable} from "inversify";
import IAuthDataObject from "../IAuthDataObject";
import {entry} from "../../db";

@injectable()
export default class AuthDataObject implements IAuthDataObject{
	public async create(data: any): Promise<any> {
		return await entry.insert(data);
	}

	public async delete(id: string): Promise<any> {
		return await entry.remove({_id: id});
	}

	public async get(id: string): Promise<any> {
		return await entry.find({_id: id});
	}

	public async update(id: string, data: any): Promise<any> {
		return await entry.update({_id: id}, {$set: data});
	}

}
