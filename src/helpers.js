export function getTotal(array) {
  let newArr = array.map((item) => {
    let value = item.months.reduce((sum, item, index) => {
      if (index === 12) {
        return sum + 0;
      }
      return sum + +item.value;
    }, 0);
    item.months[12].value = value;
    return item;
  });
  return newArr;
}

export function getMonthTotal(array, setArray) {
  let list = new Set();
  let totalMonth = [];
  let newArr = array
    .map((item) => {
      return item.months;
    })
    .flat();
  newArr.forEach((item) => {
    list.add(item.name);
  });
  for (let item of list) {
    let test = newArr
      .filter((i) => i.name === item)
      .reduce((total, elem) => elem.value + total, 0);
    totalMonth.push(test);
  }
  setArray([...totalMonth]);
}
