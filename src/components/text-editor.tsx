import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
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
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source="# Heading" />
    </div>
  );
};

export default TextEditor;
