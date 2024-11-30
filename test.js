const fs = require("fs");

let removeComments = (filePath) => {
  try {
    const code = fs.readFileSync(filePath, "utf8");

    let newCode = "";
    let inSingleLineComment = false;
    let inMultiLineComment = false;

    for (let i = 0; i < code.length; i++) {
      if (code[i] === "/" && code[i + 1] === "/" && !inMultiLineComment) {
        inSingleLineComment = true;
        i++;
        continue;
      }

      if (code[i] === "/" && code[i + 1] === "*" && !inSingleLineComment) {
        inMultiLineComment = true;
        i++;
        continue;
      }

      if (code[i] === "*" && code[i + 1] === "/" && inMultiLineComment) {
        inMultiLineComment = false;
        i++;
        continue;
      }

      if (code[i] === "\n" && inSingleLineComment) {
        inSingleLineComment = false;
      }

      if (!inSingleLineComment && !inMultiLineComment) {
        newCode += code[i];
      }
    }

    const outputPath = filePath.replace(".js", ".js");
    fs.writeFileSync(outputPath, newCode);

    console.log(
      `Comments removed successfully. Output saved to: ${outputPath}`,
    );
    return newCode;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

const filePath = "Demo.js";
removeComments(filePath);
