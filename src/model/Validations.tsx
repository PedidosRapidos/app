import { Either, left, right, either, isRight } from "fp-ts/lib/Either";
import { formatError } from "../res/translations/en";

export const Validations = {
  isUserName: combineChecks(notNull(), minLength(1)),
  isEmail: combineChecks(
    combineChecks(notNull(), minLength(1)),
    matchesRegex(/.@./, { type: "NOT_EMAIL" } as const)
  ),
  isCBU: combineChecks(
    combineChecks(notNull(), minLength(22)),
    matchesRegex(/[0-9]+/, { type: "NUMERIC_SEQUENCE" } as const)
  ),
  isPassword: combineChecks(
    combineChecks(
      combineChecks(
        combineChecks(notNull(), minLength(6)),
        matchesRegex(/(?=.*[A-Z])/, {
          type: "MISSING_CAPS",
        } as const)
      ),
      matchesRegex(/(?=.*[0-9])/, { type: "MISSING_NUMBERS" } as const)
    ),
    matchesRegex(/(?=\S+$).{6,}$/, { type: "WHITE_SPACES" } as const)
  ),
};

export const ValidationComponents = {
  combine: combineChecks,

  alwaysAccepted,
  minLength,
  notNull,
  equalTo,
  atLeastOneSelected,
};

type Validator<In, Out, E> = (value: In) => Either<E, Out>;

type InputFor<V> = V extends Validator<infer In, infer Out, infer E>
  ? In
  : never;
type OutputFor<V> = V extends Validator<infer In, infer Out, infer E>
  ? Out
  : never;
type ErrorFor<V> = V extends Validator<infer In, infer Out, infer E>
  ? E
  : never;

export function doValidate<V, K extends keyof V>(validations: V) {
  return (
    values: Partial<{ [X in K]: InputFor<V[X]> }>
  ): Either<{ [X in K]?: ErrorFor<V[X]> }, { [X in K]: OutputFor<V[X]> }> => {
    let errors = {};
    let result = {};
    Object.keys(validations).forEach((key) => {
      const value = values[key];
      const check = validations[key](value);
      if (isRight(check)) {
        result[key] = check.right;
      } else {
        errors[key] = check.left;
      }
    });
    if (Object.keys(errors).length === 0) {
      return right(result) as any;
    } else {
      return left(errors);
    }
  };
}

type Schema = Record<string, Validator<any, any, any>>;

type Form<V extends Schema> = {
  [key in keyof V]: V[key] extends Validator<any, infer Out, any> ? Out : never;
};

type Errors<V extends Schema> = { [key in keyof V]?: string };

export function createValidator<S extends Schema>(
  schema: S | ((data: Partial<Form<S>>) => S)
) {
  return (values: Partial<Form<S>>): Either<Errors<S>, Form<S>> => {
    const validations = typeof schema === "function" ? schema(values) : schema;
    const errors: Errors<S> = {};
    const result: Partial<Form<S>> = {};
    for (const key in validations) {
      const value = values[key];
      const validator = validations[key];
      const check = validator(value);
      if (isRight(check)) {
        result[key] = check.right;
      } else {
        errors[key] = formatError(check.left);
      }
    }
    if (Object.entries(errors).length === 0) {
      return right<Errors<S>, Form<S>>(result as Form<S>);
    } else {
      return left<Errors<S>, Form<S>>(errors);
    }
  };
}

function combineChecks<In, Mid, Out, E1, E2>(
  first: Validator<In, Mid, E1>,
  second: Validator<Mid, Out, E2>
): Validator<In, Out, E1 | E2> {
  return (value) => {
    const mid = first(value);
    return isRight(mid) ? second(mid.right) : mid;
  };
}

function alwaysAccepted<T>(): Validator<T, T, never> {
  return (value) => right(value);
}

interface LengthValidationFailure {
  type: "LENGTH_BELOW_MIN";
  length: number;
  min: number;
}

function minLength(
  min: number
): Validator<
  string,
  string,
  LengthValidationFailure | { type: "VALUE_MISSING" }
> {
  return (text) =>
    text.length >= min
      ? right(text)
      : left(
          text.length === 0
            ? { type: "VALUE_MISSING" }
            : { type: "LENGTH_BELOW_MIN", length: text.length, min }
        );
}

function atLeastOneSelected<T, E>(otherOne: T, error: E): Validator<T, T, E> {
  return (value) => (value || otherOne ? right(otherOne) : left(error));
}

function equalTo<T, E>(expected: T, error: E): Validator<T, T, E> {
  return (value) => (value === expected ? right(expected) : left(error));
}

function isEmpty(value: any) {
  return typeof value === "string" && value.trim().length === 0;
}
function notNull<T>(): Validator<
  T | null | undefined,
  T,
  { type: "VALUE_MISSING" }
> {
  return (value) =>
    value !== null && value !== undefined && !isEmpty(value)
      ? right(value)
      : left({ type: "VALUE_MISSING" });
}

function matchesRegex<E>(
  regexp: RegExp,
  error: E
): Validator<string, string, E> {
  return (text) => (text.match(regexp) ? right(text) : left(error));
}
