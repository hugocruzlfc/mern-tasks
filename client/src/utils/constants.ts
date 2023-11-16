export const INPUT_CLASS = "input input-bordered w-full p-2 my-2";

export const AUTH_CONTAINER_CLASS =
  "flex h-[calc(100vh-100px)] items-center justify-center flex-col";

export const AUTH_NAVIGATION_DESCRIPTIONS: ReadonlyMap<string, string> =
  new Map([
    ["register", "Don't have an account?"],
    ["login", "Already have an account?"],
  ]);

export const LOADING_LABELS: ReadonlyMap<string, string> = new Map([
  ["Loading", "Loading data"],
]);
