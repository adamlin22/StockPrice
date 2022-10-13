import React, { useMemo, useState } from "react";
import { PricesType } from "./StockPrices";

interface StockPriceExplorerType {
  dates: Array<string>;
  prices: PricesType;
}

const StockPriceExplorer = ({ dates, prices }: StockPriceExplorerType) => {
  const [checkedSymbols, setCheckedSymbols] = useState<string[]>([]);

  const headers = useMemo(() => ["Date", ...checkedSymbols], [checkedSymbols]);
  const rows = useMemo(() => {
    const rowList = [];

    for (let i = 0; i < dates.length; i++) {
      const row = [];
      row.push(dates[i]);

      for (let j = 1; j < headers.length; j++) {
        if (prices[headers[j]]) row.push(prices[headers[j]][i]);
      }

      rowList.push(row);
    }

    return rowList;
  }, [dates, prices, headers]);

  return (
    <div
      style={{
        width: "100%",
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <h1>Stock Data</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>
          {Object.keys(prices)
            .sort((a, b) => {
              if (a < b) {
                return -1;
              }
              if (a > b) {
                return 1;
              }
              return 0;
            })
            .map((symbol: string, i: number) => (
              <div
                key={i}
                style={{
                  textAlign: "left",
                  marginBottom: "10px",
                  fontSize: "20px",
                }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedSymbols(
                        [...checkedSymbols, symbol].sort((a, b) => {
                          if (a < b) {
                            return -1;
                          }
                          if (a > b) {
                            return 1;
                          }
                          return 0;
                        })
                      );
                    } else {
                      setCheckedSymbols(
                        checkedSymbols.filter((item) => item !== symbol)
                      );
                    }
                  }}
                />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {symbol}
                </span>
              </div>
            ))}
        </div>
        <div style={{ flex: "50%" }}>
          <table>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  textAlign: "center",
                  minWidth: "150px",
                  border: "1px solid",
                }}
              >
                {header}
              </th>
            ))}

            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((col, i) => (
                  <td
                    key={i}
                    style={{
                      border: "1px solid",
                      textAlign: i === 0 ? "left" : "center",
                    }}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockPriceExplorer;
