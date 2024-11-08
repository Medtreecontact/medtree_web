import { ContainerModule, interfaces } from "inversify";

import { IAuthenticationRepository } from "@/domain/repositories/authentication_repository_interface";
import { AuthenticationRepository } from "@/infrastructure/repositories/authentication_repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  // if (process.env.NODE_ENV === "test") {
  //   bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
  //     MockTransactionManagerService,
  //   );
  // } else {
    bind<IAuthenticationRepository>(DI_SYMBOLS.IAuthenticationRepository).to(
      AuthenticationRepository,
    );
  // }
};

export const AuthenticationModule = new ContainerModule(initializeModule);
