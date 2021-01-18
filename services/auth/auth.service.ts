"use strict";

import Moleculer, {Service, ServiceBroker ,Context} from "moleculer";
import {container} from "./inversify.config";
import AuthBusinessManager from "./business-managers/impl/AuthBusinessManager";
import {TYPES} from "./types";
import {BadRequest, NotFound, ServerError, Unauthorized} from "./AuthErrors";
import MoleculerError = Moleculer.Errors.MoleculerError;

const authBusinessManager = container.get<AuthBusinessManager>(TYPES.AuthBusinessManager);
export default class AuthService extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name:"auth",
			actions:{
				signup: {
					rest: {
						method: "POST",
						path: "/signup",
					},
					async handler(ctx): Promise<string> {
						try {
							return await authBusinessManager.signup(ctx.params);
						} catch (error) {
							console.log(error);
							if(error.message === BadRequest) {
								throw new MoleculerError(BadRequest, 400, "BAD_REQUEST");
							}

							throw new MoleculerError(ServerError, 500, "SERVER, ERROR");
						}
					},
				},
				login: {
					rest: {
						method: "POST",
						path: "/login",
					},
					async handler(ctx): Promise<string> {
						try {
							const res = await authBusinessManager.login(ctx.params);
							// Todo: Get user data

							return res;
						} catch (error) {
							if(error.message === NotFound) {
								throw new MoleculerError(ServerError, 404, "NOT_FOUND");
							}
							 else if (error.message !== BadRequest) {
								throw new MoleculerError(BadRequest, 400, "BAD_REQUEST");
							} else if (error.message !== Unauthorized) {
								throw new MoleculerError(BadRequest, 401, "UNAUTHORIZED");
							} else {
								throw new MoleculerError(ServerError, 500);
							}
						}
					},
				},
			},
		});
	}

	// Action
	public ActionHello(): string {
		return "Hello Moleculer";
	}

	public ActionWelcome(name: string): string {
		return `Welcome, ${name}`;
	}
}
