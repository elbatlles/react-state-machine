// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.getCountries": {
      type: "done.invoke.getCountries";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.getCountries": {
      type: "error.platform.getCountries";
      data: unknown;
    };
    "xstate.after(5000)#buy plane tickets.tickets": {
      type: "xstate.after(5000)#buy plane tickets.tickets";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    cleanContext: "CANCEL" | "xstate.after(5000)#buy plane tickets.tickets";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    moreThanOnePassenger: "DONE";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "initial"
    | "passengers"
    | "search"
    | "search.failure"
    | "search.loading"
    | "search.success"
    | "tickets"
    | { search?: "failure" | "loading" | "success" };
  tags: never;
}
