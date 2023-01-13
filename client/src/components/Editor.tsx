import { DeltaStatic, Sources } from "quill";
import React, { useEffect, useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { formats, modules } from "../utils/quill";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("Siema co tam");
  const [delta, setDelta] = useState<DeltaStatic>();

  const editorRef = useRef(null);

  const handleEdit = async () => {
    try {
      // @ts-ignore
      const delta = editorRef.current.getEditor().getContents();
      const url = "http://localhost:3000/api/question/edit";
      const response = await axios.patch(
        url,
        {
          questionID: "63c1c857a4642ba3ee37e1b2",
          content: delta,
        },
        { withCredentials: true }
      );

      console.log(response.data.delta);
      setValue(response.data.delta);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUpload = async () => {
    try {
      // @ts-ignore
      const delta = editorRef.current.getEditor().getContents();
      const url = "http://localhost:3000/api/question/add";
      const response = await axios.post(
        url,
        {
          title: "44444",
          content: delta,
          tags: ["tag1", "tag2"],
        },
        { withCredentials: true }
      );

      console.log(response.data.delta);
      setValue(response.data.delta);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/question/by-title/44444")
      .then((res) => {
        setValue(res.data.question.content);
        console.log(res.data.question);
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleChange = (
  //   value: string,
  //   delta: DeltaStatic,
  //   source: Sources,
  //   editor: ReactQuill.UnprivilegedEditor
  // ) => {
  //   const html = editor.getHTML();
  //   const contents = editor.getContents();
  //   // @ts-ignore
  //   // setDelta(contents);
  // };

  return (
    <div>
      <h3>EDYTOR BETA</h3>
      <div id="editor-container">
        <EditorToolbar id="toolbar" />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          formats={formats}
          modules={modules("toolbar")}
          style={{ height: 200 }}
          ref={editorRef}
          // defaultValue={"<h1>Siema</h1>"}
        />
      </div>
      <button onClick={handleUpload}>Prześlij</button>
      <button onClick={handleEdit}>Edytuj</button>
    </div>
  );
};

export default App;

function quillGetHTML(delta: DeltaStatic) {
  var tempCont = document.createElement("div");
  new Quill(tempCont).setContents(delta);
  return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
