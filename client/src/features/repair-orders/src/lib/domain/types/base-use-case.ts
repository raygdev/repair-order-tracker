export abstract class BaseUseCase<T, K> {
    abstract execute(value: T): K
}

