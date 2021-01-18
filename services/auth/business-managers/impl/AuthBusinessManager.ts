import {inject, injectable} from "inversify";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import IAuthBusinessManager from "../IAuthBusinessManager";
import {TYPES} from "../../types";
import IAuthDataManager from "../../data-managers/IAuthDataManager";
import {NotFound, BadRequest, Unauthorized} from "../../AuthErrors";

@injectable()
export default class AuthBusinessManager implements IAuthBusinessManager {
	private authDataManager: IAuthDataManager;

	public constructor(
		@inject(TYPES.AuthDataManager) authDataManager: IAuthDataManager
	) {
		this.authDataManager = authDataManager;
	}

	public async login(credentials: any): Promise<any> {
		if (!credentials.email || !credentials.password) {
			throw Error(BadRequest);
		}
		const authData = await this.authDataManager.get(credentials.email);

		if(authData.length === 0) {
			throw Error(NotFound);
		}

		const isCorrectPassword = await this.comparePassword(credentials.password, authData.hash);
		if (!isCorrectPassword) {
			throw Error(Unauthorized);
		}

		const token = randomstring.generate({length: 16, charset: "alphanumeric"});

		await this.authDataManager.update(credentials.email, {token});

		return {token};
	}

	public async signup(data: any): Promise<any> {
		if (!data.email || !data.password || !data.firstname || !data.lastname) {
			throw new Error(BadRequest);
		}

		const hash = await this.generateHash(data.password);

		await this.authDataManager.create({_id: data.email, hash});
	}

	private comparePassword(password: string, hash: string): Promise<any> {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, hash, (err, result) => {
				if(err) {
					return reject(err);
				}

				if (result) {
					return resolve(true);
				}

				resolve(false);
			});
		});
	}

	private generateHash(password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, 10, (err, hash) => {
				if(err) {
					return reject(err);
				}

				resolve(hash);
			});
		});
	}
}
