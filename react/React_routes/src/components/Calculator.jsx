import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState("");
  const [error, setError] = useState("");

  const scientificFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    π: Math.PI,
    e: Math.E,
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.match(/[0-9.]/)) handleNumber(e.key);
      if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
      if (e.key === "Enter") handleEqual();
      if (e.key === "Escape") handleClear();
      if (e.key === "(" || e.key === ")") handleParentheses(e.key);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, equation]);

  const handleNumber = (number) => {
    setError("");
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setError("");
    setEquation(display + operator);
    setDisplay("0");
  };

  const handleParentheses = (paren) => {
    setError("");
    setDisplay(display === "0" ? paren : display + paren);
  };

  const handleScientific = (func) => {
    setError("");
    if (func === "π" || func === "e") {
      setDisplay(
        display === "0"
          ? scientificFunctions[func].toString()
          : display + scientificFunctions[func]
      );
    } else {
      setDisplay(display === "0" ? `${func}(` : display + `${func}(`);
    }
  };

  const handleEqual = () => {
    try {
      let expression = equation + display;
      // eslint-disable-next-line no-unused-vars
      Object.entries(scientificFunctions).forEach(([key, value]) => {
        if (key !== "π" && key !== "e") {
          expression = expression.replace(
            new RegExp(`${key}\\(`, "g"),
            `Math.${key}(`
          );
        }
      });
      expression = expression.replace(/π/g, Math.PI).replace(/e/g, Math.E);

      const result = eval(expression);
      setHistory(`${expression} = ${result}`);
      setDisplay(Number(result.toFixed(8)).toString());
      setEquation("");
      setError("");
    } catch (err) {
      setError("Invalid expression", err);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setError("");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#2D2D2D",
      }}
    >
      <div className="calculator-wrapper">
        <div
          className="card calculator-card"
          style={{
            background: "#232323",
            borderRadius: "30px",
            padding: "2.5rem",
            width: "400px",
            border: "none",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* History Display */}
          <div
            className="text-end small mb-2"
            style={{
              fontSize: "0.8rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {history}
          </div>

          {/* Main Display */}
          <div className="display-container mb-4">
            <input
              type="text"
              className="form-control border-0 shadow-none text-end fs-1"
              value={error || equation + display}
              readOnly
              style={{
                background: "transparent",
                color: "#FFFFFF",
                height: "80px",
                padding: "1rem 0",
              }}
            />
          </div>

          {/* Scientific Functions */}
          <div className="scientific-functions mb-4">
            <div className="row g-3">
              {[...Object.keys(scientificFunctions), "(", ")"].map((func) => (
                <div className="col-3" key={func}>
                  <button
                    className="btn w-100"
                    onClick={() =>
                      func === "(" || func === ")"
                        ? handleParentheses(func)
                        : handleScientific(func)
                    }
                    style={{
                      background: "#2D2D2D",
                      border: "none",
                      color: "#00BCD4",
                      borderRadius: "15px",
                      padding: "1rem",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#363636";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#2D2D2D";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {func}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Number Pad */}
          <div className="number-pad">
            <div className="row g-3">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].map((num) => (
                <div className="col-4" key={num}>
                  <button
                    className="btn w-100"
                    onClick={() => handleNumber(num.toString())}
                    style={{
                      background: "#2D2D2D",
                      border: "none",
                      color: "#FFFFFF",
                      borderRadius: "15px",
                      padding: "1.2rem",
                      fontSize: "1.2rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#363636";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#2D2D2D";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {num}
                  </button>
                </div>
              ))}

              {/* Operators */}
              <div className="col-12">
                <div className="d-flex gap-3">
                  {["+", "-", "*", "/"].map((op) => (
                    <button
                      key={op}
                      className="btn flex-grow-1"
                      onClick={() => handleOperator(op)}
                      style={{
                        background: "#2D2D2D",
                        border: "none",
                        color: "#00BCD4",
                        borderRadius: "15px",
                        padding: "1.2rem",
                        fontSize: "1.2rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#363636";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#2D2D2D";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      {op === "*" ? "×" : op === "/" ? "÷" : op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equal and Clear */}
              <div className="col-8">
                <button
                  className="btn w-100"
                  onClick={handleEqual}
                  style={{
                    background: "#00BCD4",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "1.2rem",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "0.9";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  =
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn w-100"
                  onClick={handleClear}
                  style={{
                    background: "#2D2D2D",
                    border: "2px solid #00BCD4",
                    color: "#00BCD4",
                    borderRadius: "15px",
                    padding: "1.2rem",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#363636";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#2D2D2D";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  C
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
