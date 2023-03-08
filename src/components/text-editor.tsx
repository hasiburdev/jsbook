import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("# Header");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  if (isEditing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(value) => setValue(value || "")} />
      </div>
    );
  }
  return (
    <div onClick={() => setIsEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
