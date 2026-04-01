import React, { useState } from "react";

export default function NewtonForwardInterpolation() {
  const [points, setPoints] = useState("");
  const [xValue, setXValue] = useState("");
  const [result, setResult] = useState(null);

  const parsePoints = () => {
    try {
      return points.split("\n").map((line) => {
        const [x, y] = line.split(",").map(Number);
        return { x, y };
      });
    } catch {
      return [];
    }
  };

  const calculate = () => {
    const data = parsePoints();
    if (data.length < 2) return;

    const h = data[1].x - data[0].x;
    const x0 = data[0].x;
    const t = (parseFloat(xValue) - x0) / h;

    let n = data.length;
    let diff = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      diff[i][0] = data[i].y;
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
      }
    }

    let result = diff[0][0];
    let term = 1;

    for (let i = 1; i < n; i++) {
      term *= (t - (i - 1));
      result += (term * diff[0][i]) / factorial(i);
    }

    setResult(result);
  };

  const factorial = (n) => {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  return (
    <div className="p-6 max-w-xl mx-auto d-flex flex-column align-items-center">
      <h1 className="text-xl font-bold mb-4">Newton Forward Interpolation</h1>
      <h1>Nyutonun I interpolyasiya çoxhədlisi və xətası</h1>

      <textarea
        placeholder="x,y formatında daxil edin (məsələn: 1,1)"
        className="w-full p-2 border mb-3"
        rows={7}
        cols={70}
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />

      <input
        type="number"
        placeholder="Addımı daxil edin"
        className="w-full p-2 border mb-3"
        value={xValue}
        onChange={(e) => setXValue(e.target.value)}
      />

      <button
        onClick={calculate}
        className="px-4 py-2 rounded btn btn-primary"
      >
        Hesabla
      </button>

      {result !== null && (
        <div className="mt-4 text-lg">
          Nəticə: {result}
        </div>
      )}
    </div>
  );
}
