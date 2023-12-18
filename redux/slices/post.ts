import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BannerType,
  CreatePostDto,
  ResponseCreatePost,
  ResponseUser,
} from "../../utils/api/types";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

interface initialStateProps {
  banner?: BannerType | null;
  name: string;
  content: string;
  contentRu: string;
  nameRu: string;
}

const initialState: initialStateProps = {
  banner: null,
  name: "",
  nameRu: "",
  content: "<p>Type text here</p>",
  contentRu: "<p>Type text here</p>",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // setPostData: (state, action: PayloadAction<ResponseCreatePost | null>) => {
    //   state.post = action.payload;
    // },
    setPostTitle: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPostTitleRu: (state, action: PayloadAction<string>) => {
      state.nameRu = action.payload;
    },
    setPostContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setPostContentRu: (state, action: PayloadAction<string>) => {
      state.contentRu = action.payload;
    },
    setPostBanner: (state, action: PayloadAction<BannerType | null>) => {
      state.banner = action.payload;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user,
  //     };
  //   },
  // },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.post })
    );
  },
});

export const {
  setPostTitle,
  setPostContent,
  setPostBanner,
  setPostContentRu,
  setPostTitleRu,
} = postSlice.actions;

export const selectPostData = (state: RootState) => state.post;

export const selectPostContent = (state: RootState) => state.post.content;

export const selectPostContentRu = (state: RootState) => state.post.contentRu;

export const selectPostBanner = (state: RootState) => state.post.banner;

export const postReducer = postSlice.reducer;
