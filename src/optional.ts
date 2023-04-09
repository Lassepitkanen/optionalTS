export abstract class Optional<T> {
    protected abstract content: T;

    protected constructor() {
        //
    }

    /**
     * Returns an Optional with the specified value, or an empty Optional if the value is null or undefined.
     *
     * @param value - The value to wrap in an Optional.
     * @returns {Optional<T>} - An Optional containing the specified value or an empty Optional.
     */
    static of<T>(value: T): Optional<NonNullable<T>> {
        return value != null ? new Some(value) : (new None(value) as Optional<NonNullable<T>>);
    }

    /**
     * Returns an empty Optional.
     *
     * @returns {Optional<undefined>} - An empty Optional.
     */
    static empty(): Optional<undefined> {
        return new None(undefined);
    }

    /**
     * Applies the given mapping function to the content of this Optional and returns a new Optional that wraps the result.
     *
     * @param mapper - A function that maps the content of this Optional.
     * @returns An Optional that wraps the result of the mapping function if this Optional is not empty, otherwise an empty Optional.
     */
    abstract map<K extends (param: NonNullable<T>) => any>(mapper: K): Optional<ReturnType<K>> | Optional<T>;

    /**
     * Returns true if this Optional contains a value, false otherwise.
     *
     * @returns true if this Optional contains a value, false otherwise.
     */
    abstract isPresent(): boolean;

    /**
     * Returns true if this Optional does not contain a value, false otherwise.
     *
     * @returns true if this Optional does not contain a value, false otherwise.
     */
    abstract isEmpty(): boolean;

    /**
     * Returns the content of this Optional, throwing an error if it is empty.
     *
     * @returns The content of this Optional.
     * @throws An error if this Optional is empty.
     */
    abstract get(): NonNullable<T> | never;

    /**
     * Applies the given consumer function to the content of this Optional, if it is not empty.
     *
     * @param consumer - A function that consumes the content of this Optional.
     * @returns This Optional, with methods to execute in a fluent style.
     */

    abstract ifPresent<K extends (param: NonNullable<T>) => any>(consumer: K): Optional<T>;

    /**
     * Returns the content of this Optional if it is not empty, or the specified value otherwise.
     *
     * @param value - The value to return if this Optional is empty.
     * @returns The content of this Optional if it is not empty, or the specified value otherwise.
     */
    abstract orElse<K>(value: K): K | NonNullable<T>;

    /**
     * Returns the content of this Optional if it is not empty, or the result of the given function otherwise.
     *
     * @param func - A function that returns the value to use if this Optional is empty.
     * @returns The content of this Optional if it is not empty, or the result of the given function otherwise.
     */
    abstract orElseGet<K extends () => any>(func: K): ReturnType<K> | NonNullable<T>;

    /**
     * Returns the content of this Optional if it is not empty, or throws the specified error otherwise.
     *
     * @param error - The error to throw if this Optional is empty.
     * @returns The content of this Optional if it is not empty.
     * @throws The specified error if this Optional is empty.
     */
    abstract orElseThrow<K extends Error>(error: K): never | NonNullable<T>;

    /**
     compares this optional with another to determine equality.
     *
     @param {Optional} optional - the optional to compare to.
     @returns {boolean} - true if the two optional objects are equal, false otherwise.
     */
    equals(optional: Optional<T>): boolean {
        return optional instanceof Optional && this.content === optional.content;
    }
}

export class Some<T> extends Optional<T> {
    constructor(protected content: NonNullable<T>) {
        super();
    }

    map<K extends (param: NonNullable<T>) => any>(mapper: K): Some<ReturnType<K>> {
        this.content = mapper(this.content);
        return this as Some<ReturnType<K>>;
    }

    isEmpty(): boolean {
        return false;
    }

    isPresent(): boolean {
        return true;
    }

    get(): NonNullable<T> {
        return this.content;
    }

    ifPresent<K extends (param: NonNullable<T>) => void>(consumer: K): Some<T> {
        consumer(this.content);
        return this;
    }

    orElse(): NonNullable<T> {
        return this.content;
    }

    orElseGet(): NonNullable<T> {
        return this.content;
    }

    orElseThrow(): NonNullable<T> {
        return this.content;
    }
}

export class None<T> extends Optional<T> {
    constructor(protected readonly content: T) {
        super();
    }

    map(): None<T> {
        return this;
    }

    isEmpty(): boolean {
        return true;
    }

    isPresent(): boolean {
        return false;
    }

    get(): never {
        throw new Error('NoSuchElementException');
    }

    ifPresent(): None<T> {
        return this;
    }

    orElse<K>(value: K): K {
        return value;
    }

    orElseGet<K extends () => any>(func: K): ReturnType<K> {
        return func();
    }

    orElseThrow<K extends Error>(error: K): never {
        throw error;
    }
}
