import { add, sub, parse, format, Duration } from "date-fns"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
// import json from './commands.json'
// import Hinmoku from "./Hinmoku"

import pkg from "../../package.json"

function load(key: string): any {
  try {
    const ret = localStorage.getItem(key)
    if (typeof ret === "string") return JSON.parse(ret)
    return null
  } catch (error) {
    return null
  }
}
function save(key: string, value: any): void {
  console.log("save...")
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {}
}

const OptionCheckbox: React.FC<{
  onChange: React.ChangeEventHandler<HTMLInputElement>
  checked: boolean
}> = ({ checked, onChange, children }) => (
  <label className="inline-flex items-center m-1">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{children}</span>
  </label>
)

// 逆算アイテム
// 所要時間を持ち、アイテムを複数積み上げることで逆算していく
// type CostTime = {
//   hour: number
//   minutes: number
// }
type Item = {
  id: string
  label: string
  costOfTime: Duration
}
type ItemView = Item & {
  time: Date
}
type Mode = "edit" | "check"
type ViewMode = "selectShop" | "jouon" | "chilled"

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  const STORAGE_KEY = "items"
  //
  const [goalDate, setGoalDate] = useState<Date>(add(new Date(), { hours: 10 }))
  const [items, setItems] = useState<Item[]>([])
  const [itemsView, setItemsView] = useState<ItemView[]>([])
  const [mode, setMode] = useState<Mode>("edit")
  const history = useHistory()
  const title = "逆算"

  const [inputLabel, setInputLabel] = useState("")
  const [inputHours, setInputHours] = useState("")
  const [inputMinutes, setInputMinutes] = useState("")
  // 初期処理
  useEffect(() => {
    console.log("load...")

    const value = load(STORAGE_KEY)
    console.log("value", value)

    if (value === undefined || value === null) return
    try {
      setItems(value)
    } catch (e) {
      console.log("setItems error on load value.", e)
    }
  }, [])

  useEffect(() => {
    document.title = title
  }, [history.location, title])

  const addItem = () => {
    const toNum = (text: string) => {
      if (text === "") return 0
      return +text
    }
    const item: Item = {
      id: "item_" + Date.now(),
      label: inputLabel,
      costOfTime: {
        hours: toNum(inputHours),
        minutes: toNum(inputMinutes),
      },
    }

    setItems(
      // [ item ].concat(items) // 前に追加
      items.concat([item]) // うしろに追加
    )
  }

  const addDuration = (d1: Duration, d2: Duration): Duration => {
    const toNum = (n: number | undefined) => {
      if (n === undefined) return 0
      if (n === null) return 0
      return n
    }
    // const _add = (d1: Duration, d2: Duration) => {
    //   return toNum(d1) + toNum(d2)
    // }
    const ret = {
      ...d1,
      hours: toNum(d1.hours) + toNum(d2.hours),
      minutes: toNum(d1.minutes) + toNum(d2.minutes),
    }
    console.log("addDuration", d1, d2, ret)

    return ret
  }
  // 指定アイテムのコスト加算
  const addItemCost = (item: Item, du: Duration) => {
    console.log("items", items)

    setItems(
      items.map((i) => {
        if (item.id === i.id) {
          return {
            ...i,
            costOfTime: addDuration(i.costOfTime, du),
          }
        }
        return i
      })
    )
  }
  const deleteItems = () => {
    setItems([])
  }

  // const BtnAddNum: React.FC<{
  //   shop: Shop
  //   hin: Hinmoku
  //   num: number
  // }> = ({ shop, hin, num, children }) => (
  //   <button className="bg-green-900 p-2 m-1 rounded " onClick={() => handleAddNum(shop, hin, num)}>
  //     {num >= 0 ? "+" : ""}
  //     {num}
  //   </button>
  // )

  // items effect
  useEffect(() => {
    // データ更新があったらセーブする
    save(STORAGE_KEY, items)

    // 最後のアイテムの時刻を基準に順番に時刻を算出する
    // const costDuration = (cost: Duration) => ({ hours: cost.hours * -1, minutes: cost.minutes * -1 })
    let preTime = goalDate
    setItemsView(
      items
        .map((item, index) => {
          let time = goalDate
          const cost = item.costOfTime
          // itemsには内部的にゴールから順のリスト
          // 順番にコスト時間を引いた時刻を算出していく
          // if (index !== items.length -1 ) {
          if (index === 0) {
            time = sub(goalDate, cost)
          }
          if (index !== 0) {
            const pre = items[index - 1]
            time = sub(preTime, cost)
          }
          preTime = time
          return {
            ...item,
            time,
          }
        })
        .reverse()
    )
  }, [items])

  const OffsetBtn: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>
    num: number
  }> = ({ onClick, num, children }) => (
    <button className="bg-green-900 p-1 mx-2" onClick={onClick}>
      {num > 0 && "+"}
      {/* {num < 0 && "-"} */}
      {num}
    </button>
  )
  return (
    <div className="App p-5">
      <label htmlFor="">
        項目追加
        <input
          type="text"
          name="label"
          id="input-label"
          className="p-2 m-2"
          onChange={(e) => setInputLabel(e.target.value)}
          value={inputLabel}
        />
      </label>
      <div className="m-2">
        <input
          className="input-time p-2"
          type="number"
          name="hour"
          maxLength={2}
          min={0}
          onChange={(e) => setInputHours(e.target.value)}
          value={inputHours}
        />
        hours
        <input
          className="input-time p-2"
          type="number"
          name="minutes"
          maxLength={2}
          min={0}
          onChange={(e) => setInputMinutes(e.target.value)}
          value={inputMinutes}
        />
        minutes
      </div>
      <button className="add-btn bg-green-900 p-2 m-1 rounded " onClick={addItem}>
        追加
      </button>
      <button className="deleteall-btn bg-green-900 p-2 m-1 rounded " onClick={deleteItems}>
        delete all
      </button>

      <table className="border">
        <thead>
          <th>label</th>
          <th colSpan={2}>所要時間</th>
          <th>時刻</th>
        </thead>
        <tbody>
          {itemsView.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.label}</td>
                <td>
                  {item.costOfTime.hours} h
                  <OffsetBtn
                    onClick={() => {
                      addItemCost(item, { hours: 1 })
                    }}
                    num={1}
                  ></OffsetBtn>
                  <OffsetBtn
                    onClick={() => {
                      addItemCost(item, { hours: -1 })
                    }}
                    num={-1}
                  ></OffsetBtn>
                </td>
                <td>{item.costOfTime.minutes} m</td>
                <td>{format(item.time, "MM-dd HH:mm")}</td>
              </tr>
            )
          })}
          <tr>
            <td colSpan={3}>goal</td>
            <td>{format(goalDate, "MM-dd HH:mm")}</td>
          </tr>
        </tbody>
      </table>
      <div className="three wide column text-left mt-5">© 2022</div>
    </div>
  )
}

export default Main
