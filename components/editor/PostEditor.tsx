import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { FC, useEffect } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useAppDispatch } from "../../redux/hooks";
import { setPostContent, setPostContentRu } from "../../redux/slices/post";
import S3UploadAdapter from "./S3UploadAdapter";

import styles from "../sections/SimpleSection.module.scss";
import { useRouter } from "next/router";

interface PostEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const PostEditor: FC<PostEditorProps> = ({ value = "", onChange }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const dispatch = useAppDispatch();
  const handleEditorChange = (_event: any, editor: any) => {
    if (editor) {
      const data = editor.getData();
      if (locale === "en") {
        dispatch(setPostContent(data));
      } else {
        dispatch(setPostContentRu(data));
      }
      onChange(data);
    }
  };

  useEffect(() => {
    if (locale === "en") {
      dispatch(setPostContent(value));
    } else {
      dispatch(setPostContentRu(value));
    }
  }, []);

  return (
    <div className={styles.section__content}>
      <CKEditor
        editor={Editor}
        data={value}
        onChange={handleEditorChange}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader: any
          ) => {
            return new S3UploadAdapter(loader);
          };
        }}
      />
    </div>
  );
};

export default PostEditor;
