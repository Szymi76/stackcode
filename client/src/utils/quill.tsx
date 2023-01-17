import { CSSProperties } from "react";
import { Quill } from "react-quill";

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  // @ts-ignore
  this.quill.history.undo();
}
function redoChange() {
  // @ts-ignore
  this.quill.history.redo();
}

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large"];
Quill.register(Size, true);

export const formats = [
  "header",
  //   "font",
  "size",
  "bold",
  "italic",
  "underline",
  // "align",
  // "strike",
  "script",
  // "blockquote",
  // "background",
  "list",
  "bullet",
  // "indent",
  "link",
  "image",
  // "video",
  // "color",
  "code-block",
];

export const EditorToolbar = ({ id, style }: { id: string; style?: CSSProperties }) => {
  return (
    <div id={id} className="toolbar" style={style}>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        {/* <button className="ql-strike" /> */}
      </span>
      <span className="ql-formats">
        <select className="ql-size" defaultValue="medium">
          <option value="small">Mała</option>
          <option value="medium">Średnia</option>
          <option value="large">Duża</option>
        </select>
        <select className="ql-header" defaultValue="">
          <option value="1">Nagłówek 1</option>
          <option value="2">Nagłówek 2</option>
          <option value="3">Nagłówek 3</option>
          <option value="4">Nagłówek 4</option>
          <option value="5">Nagłówek 5</option>
          <option value="6">Nagłówek 6</option>
          <option value="">Normalny</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        {/* <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" /> */}
      </span>
      {/* <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span> */}
      {/* <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span> */}
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        {/* <button className="ql-video" /> */}
      </span>
      <span className="ql-formats">
        {/* <button className="ql-formula" /> */}
        <button className="ql-code-block" />
        {/* <button className="ql-clean" /> */}
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
    </div>
  );
};
export default EditorToolbar;

export const modules = (toolbarId: string) => ({
  toolbar: {
    container: "#" + toolbarId,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});
