import React from 'react'
import Table from '../Optimize/Table'
import data from "../../mock_stores.json"
function mapingArray(array) {
  let newArray = array.map((item) => {
    item.months.push({
      "id": `13_${item.store.id}`,
      "name": "ALL",
      "value": 0
    })
    return item
  })
  return newArray
}
const store = mapingArray(data)
const Main = () => {
  
  return (
    <div>
       <Table items={store}/>
    </div>
  )
}

export default Main