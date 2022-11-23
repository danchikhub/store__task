import React, { useEffect, useRef, useState } from "react";
import { getTotal, getMonthTotal } from "../../helpers";
import "./Table.css";

const Table = ({ items }) => {
  const [store, setStore] = useState(items);
  const [totalOfMonth, setTotalOfMonth] = useState([]);

  const handleOnBlur = (event, id, item) => {
    const div = document.createElement("div");
    if (event.target.value == "") {
      div.textContent = "0";
    } else {
      div.textContent = event.target.value;
    }
    console.log(event.target.value)
    div.addEventListener("click", (e) => handleOnClick(e, id, item));
    let index = item.months.findIndex((item) => item.id === id);
    item.months[index].value = +event.target.value;
    let storeIndex = store.findIndex((sto) => sto.store.id === item.store.id);
    store[storeIndex] = item;
    setStore(getTotal(store));
    event.target.replaceWith(div);
  };

  const handleOnClick = (e, id, item) => {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", "number");
    if (e.target.textContent == 0) {
      input.value = "";
    } else {
      input.value = e.target.textContent;
    }
    input.addEventListener("blur", (event) => handleOnBlur(event, id, item));
    e.target.replaceWith(input);
    input.focus();
  };

  useEffect(() => {
    getMonthTotal(store, setTotalOfMonth);
  }, [store]);

  return (
    <table>
      <thead>
        <tr className="table__head-row">
          <th>Store Name</th>
          <th>January</th>
          <th>February</th>
          <th>March</th>
          <th>April</th>
          <th>May</th>
          <th>June</th>
          <th>July</th>
          <th>August</th>
          <th>September</th>
          <th>October</th>
          <th>November</th>
          <th>December</th>
          <th>Total Month</th>
        </tr>
      </thead>
      <tbody>
        {store.map((item) => (
          <tr key={item.store.id}>
            <td className="table__head">{item.store.name}</td>
            {item.months.map((elem) =>
              elem.name !== "ALL" ? (
                <td key={elem.id}>
                  <div
                    className="test"
                    onClick={(e) => handleOnClick(e, elem.id, item)}
                  >
                    {elem.value}
                  </div>
                </td>
              ) : (
                <td key={elem.id}>
                  <input className="total__value" value={elem.value} readOnly />
                </td>
              )
            )}
          </tr>
        ))}
        <tr>
          <td>Total</td>
          {totalOfMonth.map((item, index) => (
            <td key={index}>{item}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
