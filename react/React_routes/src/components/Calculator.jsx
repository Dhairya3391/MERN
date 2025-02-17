import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (number) => {
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setEquation(display + operator);
    setDisplay("0");
  };

  const handleEqual = () => {
    const result = eval(equation + display);
    setDisplay((Math.round(result * 100) / 100).toString());
    setEquation("");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body bg-light">
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg text-end fs-4 bg-dark text-light"
                  value={equation + display}
                  readOnly
                  style={{ height: "60px" }}
                />
              </div>
              <div className="row g-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."].map((num) => (
                  <div className="col-3" key={num}>
                    <button
                      className="btn btn-outline-dark w-100 py-3 fs-5"
                      onClick={() => handleNumber(num.toString())}
                    >
                      {num}
                    </button>
                  </div>
                ))}
                <div className="d-flex justify-content-center gap-1 ">
                  <div className="col-3">
                    <button
                      className="btn btn-warning w-100 py-3 fs-5 fw-bold text-white"
                      onClick={() => handleOperator("*")}
                    >
                      ×
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-warning w-100 py-3 fs-5 fw-bold text-white"
                      onClick={() => handleOperator("-")}
                    >
                      −
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-warning w-100 py-3 fs-5 fw-bold text-white"
                      onClick={() => handleOperator("+")}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-warning w-100 py-3 fs-5 fw-bold text-white"
                      onClick={() => handleOperator("/")}
                    >
                      ÷
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-success w-100 py-3 fs-5 fw-bold"
                    onClick={handleEqual}
                  >
                    =
                  </button>
                </div>
                <div className="col-8">
                  <button
                    className="btn btn-danger w-100 py-3 fs-5 fw-bold"
                    onClick={handleClear}
                  >
                    C
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
