import { createMachine, assign } from "xstate";

import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign(
            (context: any, event: any) => (context.countries = event.data)
          ),
        },
        onError: {
          target: "failure",
          actions: assign(
            (context: any, event: any) => (context.error = "error al request")
          ),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};
const bookingMachine = createMachine(
  {
    tsTypes: {} as import("./bookingMachine.typegen").Typegen0,
    id: "buy plane tickets",
    initial: "initial",
    schema: {
      services: {} as {
        fetchCountries: {
          data: [];
        };
      },
      context: {} as {
        passengers: [];
        selectedCountry: string;
        countries: [];
        error: string;
      },
    },
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign((context: any, event: any) => {
              context.selectedCountry = event.selectedCountry;
            }),
          },
          CANCEL: "initial",
        },
        ...fillCountries,
      },

      tickets: {
        after: {
          5000: {
            target: "initial",
            actions: "cleanContext",
          },
        },
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger",
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: assign((context: any, event: any) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
    },
  },

  {
    actions: {
      cleanContext: () => {
        assign((context: any, event: any) => {
          context.selectedCountry = "";
          context.passengers = [];
        });
      },
    },
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      },
    },
  }
);

export default bookingMachine;
