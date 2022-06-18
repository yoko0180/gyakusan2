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
type Item = {
  id: string
  label: string
  costOfTime: {
    hour: number
    minutes: number
  }
}
type ItemView = Item & {
  time: {
    hour: number
    minutes: number
  }
}
type Mode = "edit" | "check"
type ViewMode = "selectShop" | "jouon" | "chilled"

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  const STORAGE_KEY = "items"
  const [items, setItems] = useState<Item[]>([])
  const [itemsView , setItemsView] = useState<ItemView[]>([])
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
    const item = 
        {
          id: "item_" + Date.now(),
          label: inputLabel,
          costOfTime: {
            hour: +inputHours,
            minutes: +inputMinutes,
          },
        }

    setItems(
      [ item ].concat(items)
    )
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
    setItemsView(items.map(item => {
      return {
        ...item,
          time: {
            hour: 0,
            minutes: 0,
          }
      }
    }))
  }, [items])

  const OffsetBtn: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>
    num: number
  }> = ({ onClick, num, children }) => (
    <button className="bg-green-900 p-1 mx-2" onClick={onClick}>
      {num > 0 && "+"}
      {num < 0 && "-"}
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
      </label>

      <table className="border">
        <thead>
          <th>label</th>
          <th colSpan={2}>所要時間</th>
          <th colSpan={2}>時刻</th>
        </thead>
        <tbody>
          {itemsView.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.label}</td>
                <td>
                  {item.costOfTime.hour} h<OffsetBtn onClick={() => {}} num={1}></OffsetBtn>
                </td>
                <td>{item.costOfTime.minutes} m</td>
                <td>{item.time.hour}</td>
                <td>{item.time.minutes}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="three wide column text-left mt-5">© 2022</div>
    </div>
  )
}

export default Main
