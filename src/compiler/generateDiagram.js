import { resolve } from "./path";
import { writeFileSync } from "./fs";
import { createSyntaxDiagramsCode } from "./chevrotain";
import PRTParser from "../src/parser/Parser";

export default function generateDiagram() {
  // extract the serialized grammar.
  const parserInstance = new PRTParser();
  const serializedGrammar = parserInstance.getSerializedGastProductions();

  // create the HTML Text
  const htmlText = createSyntaxDiagramsCode(serializedGrammar);

  // Write the HTML file to disk
  const outPath = resolve(__dirname, "./../../docs");
  writeFileSync(outPath + "/diagrams/railroad.html", htmlText);
}
