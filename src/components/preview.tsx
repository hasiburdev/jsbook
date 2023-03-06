import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}
const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
        eval(event.data)
        }, false)
      </script>
    </body>
  </html>
`;
const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      title="code preview"
      style={{ backgroundColor: "white" }}
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};
export default Preview;
