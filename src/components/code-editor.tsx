import MonacoEditor, { OnMount, useMonaco } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  input: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  input,
}) => {
  const monaco = useMonaco();
  const onMount: OnMount = (editor, monaco) => {
    onChange(editor.getValue());
    monaco.editor.getModels()[0].updateOptions({ tabSize: 2 });
  };
  const onFormatClick = () => {
    const unformattedCode = monaco?.editor.getModels()[0].getValue();
    // Format code
    const formattedCode = prettier
      .format(unformattedCode || "", {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "") as string;
    onChange(formattedCode);
  };
  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <MonacoEditor
        onChange={(value) => onChange(value as string)}
        value={input}
        onMount={onMount}
        defaultValue={initialValue}
        height={"100%"}
        theme={"vs-dark"}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        language="javascript"
      />
    </div>
  );
};
export default CodeEditor;
