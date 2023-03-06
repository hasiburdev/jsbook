import MonacoEditor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onMount: OnMount = (editor, monaco) => {
    onChange(editor.getValue());
    monaco.editor.getModels()[0].updateOptions({ tabSize: 2 });
  };
  return (
    <MonacoEditor
      onChange={(value) => onChange(value as string)}
      value={initialValue}
      onMount={onMount}
      height={200}
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
  );
};
export default CodeEditor;
