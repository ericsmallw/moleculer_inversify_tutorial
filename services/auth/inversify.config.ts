import { Container } from "inversify";
import "reflect-metadata";
import {TYPES} from "./types";
import IAuthBusinessManager from "./business-managers/IAuthBusinessManager";
import AuthBusinessManager from "./business-managers/impl/AuthBusinessManager";
import AuthDataManager from "./data-managers/impl/AuthDataManager";
import IAuthDataManager from "./data-managers/IAuthDataManager";
import AuthDataObject from "./data-object/impl/AuthDataObject";
import IAuthDataObject from "./data-object/IAuthDataObject";

export const container = new Container();

container.bind<IAuthBusinessManager>(TYPES.AuthBusinessManager).to(AuthBusinessManager);
container.bind<IAuthDataManager>(TYPES.AuthDataManager).to(AuthDataManager);
container.bind<IAuthDataObject>(TYPES.AuthDataObject).to(AuthDataObject);

