// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

class ApolloDataNotFoundError extends Error {
  data: object;
  constructor(data: object, ...params: any[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApolloDataNotFoundError);
    }

    this.name = "ApolloDataNotFoundError";
    this.data = data;
  }
}

export { ApolloDataNotFoundError };
