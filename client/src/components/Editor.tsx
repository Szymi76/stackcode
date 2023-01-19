import { CSSProperties, forwardRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { formats, modules } from "../utils/quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  defaultValue?: string;
  onChange?: () => void;
  style?: { toolbar?: CSSProperties; editor?: CSSProperties };
}

const Editor = forwardRef<ReactQuill, EditorProps>(({ defaultValue = "", onChange, style }, ref) => {
  return (
    <>
      <div id="editor-container">
        <EditorToolbar style={style?.toolbar} id="toolbar" />
        <ReactQuill
          theme="snow"
          style={style?.editor}
          formats={formats}
          modules={modules("toolbar")}
          ref={ref}
          defaultValue={defaultValue}
          className="test"
          onChange={onChange}
        />
      </div>
    </>
  );
});

export default Editor;
