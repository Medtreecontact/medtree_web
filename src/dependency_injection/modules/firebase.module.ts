import { ContainerModule, interfaces } from "inversify";

import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { FirebaseRepository } from "@/infrastructure/repositories/firebase_repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  // if (process.env.NODE_ENV === "test") {
  //   bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
  //     MockTransactionManagerService,
  //   );
  // } else {
    bind<IFirebaseRepository>(DI_SYMBOLS.IFirebaseRepository).to(
      FirebaseRepository,
    );
  // }
};

export const FirebaseModule = new ContainerModule(initializeModule);
