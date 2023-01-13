import { DeltaStatic, Sources } from "quill";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { formats, modules } from "../utils/quill";
import axios from "axios";

const App = () => {
  const [data, setData] = useState<DeltaStatic>();
  const [html, setHtml] = useState("");
  const [fetched, setFetched] = useState(null);

  const handleUpload = async () => {
    try {
      const url = "http://localhost:3000/api/question/add";
      const response = await axios.post(
        url,
        {
          title: "12345",
          content: data,
          tags: ["tag1", "tag2"],
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGetData = async () => {
    try {
      const url = "http://localhost:3000/api/question/by-title/";
      const response = await axios.get(url);
      console.log(response);
      setFetched(response.data.database);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const html = editor.getHTML();
    const contents = editor.getContents();
    console.log(html);
    setData(contents);
    setHtml(html);
  };

  return (
    <div>
      <h3>EDYTOR BETA</h3>
      <div id="editor-container">
        <EditorToolbar id="toolbar" />
        <ReactQuill
          theme="snow"
          value={data}
          onChange={handleChange}
          formats={formats}
          modules={modules("toolbar")}
          style={{ height: 200 }}
        />
      </div>
      {fetched && (
        <div
          className="data-container"
          dangerouslySetInnerHTML={{ __html: quillGetHTML(fetched) }}></div>
      )}
      {/* {fetched && (
        <div className="data-container" dangerouslySetInnerHTML={{ __html: fetched }}></div>
      )} */}
      <button onClick={handleUpload}>Prześlij</button>
      <button onClick={handleGetData}>Pobierz dane</button>
    </div>
  );
};

export default App;

function quillGetHTML(delta: DeltaStatic) {
  var tempCont = document.createElement("div");
  new Quill(tempCont).setContents(delta);
  return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
