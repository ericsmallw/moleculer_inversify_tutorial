import {inject, injectable} from "inversify";
import IAuthDataManager from "../IAuthDataManager";
import {TYPES} from "../../types";
import IAuthDataObject from "../../data-object/IAuthDataObject";

@injectable()
export default class AuthDataManager implements IAuthDataManager {
	private dao: IAuthDataObject;

	public constructor(
		@inject(TYPES.AuthDataObject) dao: IAuthDataObject
	) {
		this.dao = dao;
	}

	public async create(data: any): Promise<any> {
		return await this.dao.create(data);
	}

	public async delete(id: string): Promise<any> {
		return await this.dao.delete(id);
	}

	public async get(id: string): Promise<any> {
		return await this.dao.get(id);
	}

	public async update(id: string, data: any): Promise<any> {
		return await this.dao.update(id, data);
	}
}
