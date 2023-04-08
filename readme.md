# OptionalTS
OptionalTS is an npm package for TypeScript that provides an Optional class similar to Java's Optional class. This class allows you to work with values that may be null or undefined in a more concise and readable way.

## Installation

You can install the package using npm:
```sh
npm install optionalts
```

## Usage

You can import the Optional class in your TypeScript code:
```ts
import { Optional } from 'optionalts';
```
### Creating an Optional

You can create an Optional object using the of static method. This method takes a value as a parameter and returns an Optional object containing the value:
```ts
const value = 'hello';
const optional = Optional.of(value);
```

If the value is null or undefined, the of method returns an empty Optional:
```ts
const value = null;
const optional = Optional.of(value);
console.log(optional.isPresent()); // false
```

You can also create an empty Optional using the empty static method:
```ts
const optional = Optional.empty();
console.log(optional.isPresent()); // false
```

### Mapping an Optional

You can apply a mapping function to the content of an Optional using the map method. This method takes a mapping function as a parameter and returns a new Optional object containing the result of the mapping function:
```ts
const value = 'hello';
const optional = Optional.of(value);
const mappedOptional = optional.map((str: string) => str.length);
console.log(mappedOptional.get()); // 5
```

If the Optional is empty, the map method returns an empty Optional:
```ts
const optional = Optional.empty();
const mappedOptional = optional.map((str: string) => str.length);
console.log(mappedOptional.isPresent()); // false
```

### Checking for Presence

You can check whether an Optional object contains a value using isPresent and isEmpty methods:
```ts
const value = 'hello';
const optional = Optional.of(value);
console.log(optional.isPresent()); // true
console.log(optional.isEmpty()); // false
```

### Getting the Value
You can get the value of an Optional object using the get method. If the Optional is empty, the get method throws an error:

```ts
const value = 'hello';
const optional = Optional.of(value);
console.log(optional.get()); // hello
```

```ts
const optional = Optional.empty();
console.log(optional.get()); // throws an error
```

### Consuming the Value

You can consume the value of an Optional object using the ifPresent method. This method takes a consumer function as a parameter and applies it to the value if the Optional is not empty:
```ts
const value = 'hello';
const optional = Optional.of(value);
optional.ifPresent((str: string) => console.log(str)); // logs 'hello'
```

If the Optional is empty, the ifPresent method does nothing:
```ts
const optional = Optional.empty();
optional.ifPresent((str: string) => console.log(str)); // does nothing
```

### Providing a Default Value
You can provide a default value for an Optional object using the orElse method. This method takes a default value as a parameter and returns either the value of the Optional if it is not empty, or the default value if it is empty:
```ts
const optional = Optional.of('hello');
const result = optional.orElse('world');
console.log(result); // hello
```
```ts
const optional = Optional.empty();
const result = optional.orElse('world');
console.log(result); // world
```

You can provide a default value for an Optional object using the orElseGet method. This method takes a function that returns a default value as a parameter and returns either the value of the Optional if it is not empty, or the result of the function if it is empty:
```ts
const optional = Optional.of('hello');
const result = optional.orElseGet(() => 'world');
console.log(result); // hello
```
```ts
const optional = Optional.empty();
const result = optional.orElseGet(() => 'world');
console.log(result); // world
```

### Comparing Optionals
You can compare two Optional objects for equality using the equals method. This method takes another Optional as a parameter and returns true if the two objects are equal, or false otherwise. Two Optional objects are considered equal if they are of the same type and their content is equal:

```ts
const optional1 = Optional.of('hello');
const optional2 = Optional.of('hello');
console.log(optional1.equals(optional2)); // true
```
```ts
const optional1 = Optional.of('hello');
const optional2 = Optional.of('world');
console.log(optional1.equals(optional2)); // false
```
```ts
const optional1 = Optional.of('hello');
const optional2 = Optional.empty();
console.log(optional1.equals(optional2)); // false
```

## API
#### Optional.of<T>(value: T): Optional<T>
Creates a new Optional instance containing the specified value. If the value is null or undefined, an empty Optional is returned instead.

#### Optional.empty(): Optional<undefined>
Returns an empty Optional instance.

#### map<K extends (param: NonNullable<T>) => any>(mapper: K): Optional<ReturnType<K>> | Optional<T>
Applies the given mapping function to the content of this Optional and returns a new Optional that wraps the result.

#### isPresent(): boolean
Returns true if this Optional contains a value, false otherwise.

#### isEmpty(): boolean
Returns true if this Optional does not contain a value, false otherwise.

#### get(): NonNullable<T> | never
Returns the content of this Optional, throwing an error if it is empty.

#### ifPresent<K extends (param: NonNullable<T>) => any>(consumer: K): Optional<T>
Applies the given consumer function to the content of this Optional, if it is not empty.

#### orElse<K>(value: K): K | NonNullable<T>
Returns the content of this Optional if it is not empty, or the specified value otherwise.

#### orElseGet<K extends () => any>(func: K): ReturnType<K> | NonNullable<T>
Returns the content of this Optional if it is not empty, or the result of the given function otherwise.

#### orElseThrow<K extends Error>(error: K): never | NonNullable<T>
Returns the content of this Optional if it is not empty, or throws the specified error otherwise.

#### equals(optional: Optional<T>): boolean
Compares this Optional with another to determine equality. Returns true if the two Optional objects are equal, false otherwise.
