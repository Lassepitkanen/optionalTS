import { None, Optional, Some } from './optional';

describe('Optional', () => {
    describe('of', () => {
        it('should return a Some instance when given a non-undefined value', () => {
            const optional = Optional.of('hello');
            expect(optional instanceof Some).toBe(true);
            expect(optional.get()).toBe('hello');
        });

        it('should return a None instance when given an undefined value', () => {
            const optional = Optional.of(undefined);
            expect(optional instanceof None).toBe(true);
            expect(optional.isEmpty()).toBe(true);
        });

        it('should return Some if value is not undefined or null', () => {
            const optional = Optional.of(5);
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe(5);
        });
    });

    describe('empty', () => {
        it('should return a None instance', () => {
            const optional = Optional.empty();
            expect(optional instanceof None).toBe(true);
            expect(optional.isEmpty()).toBe(true);
        });
    });

    describe('map', () => {
        it('should apply the mapper function to the content and return a Some instance with the result', () => {
            const optional = Optional.of('hello').map((str) => str.toUpperCase());
            expect(optional instanceof Some).toBe(true);
            expect(optional.get()).toBe('HELLO');
        });

        it('should return a None instance when called on an empty Optional', () => {
            const optional = Optional.of(undefined as unknown as string).map((str) => str.toUpperCase());
            expect(optional instanceof None).toBe(true);
            expect(optional.isEmpty()).toBe(true);
        });
    });

    describe('isPresent', () => {
        it('should return true when called on a Some instance', () => {
            const optional = Optional.of('hello');
            expect(optional.isPresent()).toBe(true);
        });

        it('should return false when called on a None instance', () => {
            const optional = Optional.empty();
            expect(optional.isPresent()).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should return true when called on a None instance', () => {
            const optional = Optional.empty();
            expect(optional.isEmpty()).toBe(true);
        });

        it('should return false when called on a Some instance', () => {
            const optional = Optional.of('hello');
            expect(optional.isEmpty()).toBe(false);
        });
    });

    describe('get', () => {
        it('should return the content of a Some instance', () => {
            const optional = Optional.of('hello');
            expect(optional.get()).toBe('hello');
        });

        it('should throw an error when called on a None instance', () => {
            const optional = Optional.empty();
            expect(() => optional.get()).toThrowError('NoSuchElementException');
        });
    });

    describe('ifPresent', () => {
        it('should call the consumer function with the content of a Some instance', () => {
            const mockConsumer = jest.fn();
            const optional = Optional.of('hello');
            optional.ifPresent(mockConsumer);
            expect(mockConsumer).toHaveBeenCalledWith('hello');
        });

        it('should not call the consumer function when called on a None instance', () => {
            const mockConsumer = jest.fn();
            const optional = Optional.empty();
            optional.ifPresent(mockConsumer);
            expect(mockConsumer).not.toHaveBeenCalled();
        });

        it('should return the Optional instance to allow method chaining', () => {
            const optional = Optional.of('hello');
            const result = optional.ifPresent((str) => str);
            expect(result).toBe(optional);
        });
    });

    describe('orElse', () => {
        it('should return the value of a Some', () => {
            const optional = Optional.of('hello');
            const value = optional.orElse('world');
            expect(value).toBe('hello');
        });

        it('should return the alternative value for a None', () => {
            const optional = Optional.empty();
            const value = optional.orElse('world');
            expect(value).toBe('world');
        });
    });

    describe('orElseGet', () => {
        it('should return the value of a Some', () => {
            const optional = Optional.of('hello');
            const value = optional.orElseGet(() => 'world');
            expect(value).toBe('hello');
        });

        it('should return the result of the function for a None', () => {
            const optional = Optional.empty();
            const value = optional.orElseGet(() => 'world');
            expect(value).toBe('world');
        });
    });

    describe('orElseThrow', () => {
        it('should return the value of a Some', () => {
            const optional = Optional.of('hello');
            const value = optional.orElseThrow(() => new Error('should not throw'));
            expect(value).toBe('hello');
        });

        it('should throw the given error for a None', () => {
            const optional = Optional.empty();
            expect(() => optional.orElseThrow(() => new Error('should throw'))).toThrowError('should throw');
        });
    });

    describe('equals', () => {
        it('should return true for equal optionals', () => {
            const optional1 = Optional.of('hello');
            const optional2 = Optional.of('hello');
            expect(optional1.equals(optional2)).toBe(true);
        });

        it('should return false for different optionals', () => {
            const optional1 = Optional.of('hello');
            const optional2 = Optional.of('world');
            expect(optional1.equals(optional2)).toBe(false);
        });

        it('should return false for an optional and a non-optional', () => {
            const optional = Optional.of('hello');
            expect(optional.equals('hello' as unknown as Optional<string>)).toBe(false);
        });
    });
});
