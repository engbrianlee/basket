import { ApolloLink, Operation } from "@apollo/client";
import { OperationTypeNode, OperationDefinitionNode } from "graphql";

const formatMessage = (
  operationType: OperationTypeNode,
  operation: Operation,
  ellapsed: number
) => {
  const headerCss = [
    "color: gray; font-weight: lighter", // title
    `color: ${operationType === "query" ? "#03A9F4" : "red"};`, // operationType
    "color: inherit;", // operationName
  ];

  const parts = [
    "%c apollo",
    `%c${operationType}`,
    `%c${operation.operationName}`,
  ];

  if (operationType !== "subscription") {
    parts.push(`%c(in ${ellapsed} ms)`);
    headerCss.push("color: gray; font-weight: lighter;"); // time
  }

  return [parts.join(" "), ...headerCss];
};

const bindToConsole = (consoleMethod: any, polyfill: any) => {
  return consoleMethod ? consoleMethod.bind(console) : polyfill;
};

const logging = (() => {
  let prefix = "";

  const consoleLog = (...args: any) => {
    console.log(prefix, ...args);
  };

  const consoleError = (...args: any) => {
    console.error(prefix, ...args);
  };

  const consoleGroup = (...args: any) => {
    consoleLog(...args);
    prefix += "> ";
  };

  const consoleGroupEnd = () => {
    prefix = prefix.slice(0, -2);
  };

  return {
    log: consoleLog,
    error: consoleError,
    group: bindToConsole(console.group, consoleGroup),
    groupCollapsed: bindToConsole(console.groupCollapsed, consoleGroup),
    groupEnd: bindToConsole(console.groupEnd, consoleGroupEnd),
  };
})();

const loggerLink = new ApolloLink((operation, forward) => {
  const startTime = new Date().getTime();

  return forward(operation).map((result) => {
    const operationNode = operation.query
      .definitions[0] as OperationDefinitionNode;
    const operationType = operationNode.operation;

    const ellapsed = new Date().getTime() - startTime;

    const group = formatMessage(operationType, operation, ellapsed);

    logging.groupCollapsed(...group);

    logging.log("INIT", operation);
    logging.log("RESULT", result);

    logging.groupEnd(...group);
    return result;
  });
});

export default loggerLink;
