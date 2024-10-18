import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";

export const DI_SYMBOLS = {
  // Services
  // IAuthenticationService: Symbol.for("IAuthenticationService"),
  // ITransactionManagerService: Symbol.for("ITransactionManagerService"),

  // Repositories
  IFirebaseRepository: Symbol.for("IFirebaseRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  // IAuthenticationService: IAuthenticationService;
  // ITransactionManagerService: ITransactionManagerService;

  // Repositories
  IFirebaseRepository: IFirebaseRepository;
}
