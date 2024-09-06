import { type ForwardedRef } from "react";
import {
  Editor as ToastUiEditor,
  type EditorProps,
} from "@toast-ui/react-editor";
// eslint-disable-next-line import/no-unresolved -- @toast-ui/editor/dist/toastui-editor.css is correctly imported but ESLint can't resolve it
import "@toast-ui/editor/dist/toastui-editor.css";

interface ToastUiEditorProps {
  forwardedRef: ForwardedRef<ToastUiEditor>;
}

export default function Editor(props: EditorProps & ToastUiEditorProps) {
  return <ToastUiEditor {...props} ref={props.forwardedRef} />;
}
