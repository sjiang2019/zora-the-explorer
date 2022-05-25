let ascii_text_generator = require("ascii-text-generator");

export default function AsciiArt(props: {
  text?: string;
  artStyle: "1" | "2" | "3";
}): JSX.Element {
  return (
    <p
      style={{
        fontWeight: "bold",
        whiteSpace: "pre",
        font: "16px/1 monospace",
      }}
    >
      <strong>{ascii_text_generator(props.text ?? "", props.artStyle)} </strong>
    </p>
  );
}
