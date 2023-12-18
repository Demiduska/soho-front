import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { commonReducer } from "./slices/common";
import { createWrapper } from "next-redux-wrapper";
import { userReducer } from "./slices/user";
import { postReducer } from "./slices/post";

export function makeStore() {
  return configureStore({
    reducer: {
      common: commonReducer,
      user: userReducer,
      post: postReducer,
    },
  });
}

// const makeStore = wrapMakeStore(() =>
//   configureStore({
//     reducer: {
//       user: userReducer,
//       common: commonReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().prepend(
//         nextReduxCookieMiddleware({
//           subtrees: [{ subtree: "user.data", maxAge: 900 }],
//         })
//       ),
//   })
// );

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });
