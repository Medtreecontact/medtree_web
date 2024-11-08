import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { IAuthenticationRepository } from "@/domain/repositories/authentication_repository_interface";

export const DI_SYMBOLS = {
  // Services
  // IAuthenticationService: Symbol.for("IAuthenticationService"),
  // ITransactionManagerService: Symbol.for("ITransactionManagerService"),

  // Repositories
  IFirebaseRepository: Symbol.for("IFirebaseRepository"),
  IAuthenticationRepository: Symbol.for("IAuthenticationRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  // IAuthenticationService: IAuthenticationService;
  // ITransactionManagerService: ITransactionManagerService;

  // Repositories
  IFirebaseRepository: IFirebaseRepository;
  IAuthenticationRepository: IAuthenticationRepository;
}
