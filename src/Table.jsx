import { useState } from "react";
import { Button } from "antd";
var x = new Array(9);
for (var i = 0; i < x.length; i++) {
  x[i] = new Array(9).fill("");
}

const Table = () => {
  const [board, setboard] = useState(x);
  const [showres, setshowres] = useState(false);
  const [arr, setarr] = useState([]);
  const [error, setError] = useState(""); // Add error state

  const handlechange = (e, r, c) => {
    const inputValue = e.target.value;

    // Check if the input is a valid number between 1 and 9 or an empty string
    if (/^[1-9]$/.test(inputValue) || inputValue === "") {
      // Valid input, update the board
      board[r][c] = inputValue;
      setboard([...board]);

      // Add the cell to the array if it's not empty
      if (inputValue !== "") {
        arr.push(`${r},${c}`);
        setarr([...arr]);
      }
      
      // Clear any previous error message
      setError("");
    } else {
      // Invalid input, set an error message
      setError(`Invalid input at row ${r}, column ${c}: ${inputValue}`);
    }
  };

  const solvehandle = () => {
    main(board);
    console.log(pos);
    setshowres(true);
  };

  return (
    <>
      <table>
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rind) => {
            return (
              <tr key={rind}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cind) => {
                  return (
                    <td key={cind + rind}>
                      {showres ? (
                        <input
                          type="text"
                          value={board[row][col]}
                          className={!arr.includes(`${row},${col}`) ? "cellInputsolved" : "cellInput"}
                        />
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => handlechange(e, row, col)}
                          className="cellInput"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <button className="btn" onClick={solvehandle}>
        Solve!
      </button>
    </>
  );
};

var pos;

function check(i, j, val, board) {
  for (let k = 0; k < 9; k++) {
    if (board[i][k] === val || board[k][j] === val) return false;
  }
  let bx = Math.floor(i / 3) * 3,
    by = Math.floor(j / 3) * 3;
  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      if (board[bx + dx][by + dy] == val) return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  function backtrack(i, j, acc) {
    if (i === 9) {
      return true;
    }
    if (j === 9) {
      return backtrack(i + 1, 0, acc);
    }
    if (board[i][j] != 0) {
      return backtrack(i, j + 1, acc);
    } else {
      for (let k = 1; k < 10; k++) {
        if (check(i, j, k, board)) {
          let solution = acc[0];
          solution[i][j] = k;
          let newAcc = [solution];
          let success = backtrack(i, j + 1, newAcc);
          if (success) {
            return true;
          }
          solution[i][j] = 0;
        }
      }
    }
    return false;
  }
  let initAcc = [board];
  return backtrack(0, 0, initAcc);
}

function main(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === "") board[i][j] = 0;
      else board[i][j] = parseInt(board[i][j]);
    }
  }
  pos = solveSudoku(board);
}

export default Table;
