import * as df from "date-fns"
import { add, sub, parse, format, Duration } from "date-fns"
import React, { useRef } from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
// import json from './commands.json'
// import Hinmoku from "./Hinmoku"

import pkg from "../../package.json"
import Modal from "./Modal"

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
  off: boolean
}
type Time = Date | null
type ItemView = Item & {
  time: Time
}
type ViewMode = "view" | "edit"

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  const refEditText = useRef<HTMLInputElement>(null)

  const STORAGE_KEY = "items"
  const STORAGE_KEY_GOAL = "goal"
  //
  const initialGoal = df.set(add(new Date(), { hours: 10 }), { minutes: 0 })
  const [showModal, setShowModal] = useState(false)
  const [showModalImpExp, setShowModalImpExp] = useState(false)
  const [goalDate, setGoalDate] = useState<Date>(initialGoal)
  const [items, setItems] = useState<Item[]>([])
  const [itemsView, setItemsView] = useState<ItemView[]>([])
  const [editItem, setEditItem] = useState<Item>()
  const [viewMode, setViewMode] = useState<ViewMode>("edit")
  const history = useHistory()
  const title = "逆算"

  const [inputLabel, setInputLabel] = useState("")
  const [inputHours, setInputHours] = useState("")
  const [inputMinutes, setInputMinutes] = useState("")
  const [inputEditItemLabel, setInputEditItemLabel] = useState("")
  const [inputImpExp , setInputImpExp] = useState("")
  
  const importData = () => {
    try {
      setItems(JSON.parse(inputImpExp))
    } catch (error) {
      console.log('import error', error);
    }
  }
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

    try {
      setGoalDate(df.parseISO(load(STORAGE_KEY_GOAL)))
      console.log("load goal ok")
    } catch (error) {
      console.log("load goal fatal!!")
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
      off: false
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
    const rangeLimit = (n: number, min: number, max: number) => {
      if (n < min) return min
      if (n > max) return max
      return n
    }
    const hours = toNum(d1.hours) + toNum(d2.hours)
    const mins = toNum(d1.minutes) + toNum(d2.minutes)
    const ret = {
      ...d1,
      hours: rangeLimit(hours, 0, 99),
      minutes: rangeLimit(mins, 0, 59),
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
  const offItem = (item: Item, value: boolean) => {
    setItems(
      items.map(i => {
        if (item.id === i.id) {
          return {
            ...i,
            off: value
          }
        }
        return i
      })
    )
  }
  const deleteItems = () => {
    setItems([])
  }

  const moveUpItem = (item: Item) => {
    // 内部データのitemsは先頭から追加した順番どおりに格納される
    // 画面表示は逆順に表示するので、表示通りで順番を変えるために逆順にしたリストを基準にする
    const _items = items.reverse()
    const index = _items.findIndex((i) => i.id === item.id)
    if (index < 1) return
    // [0, 1, 2, 3, 4, 5]
    // ひとつ前よりも前部分
    let front = _items.slice(0, index - 1)
    let back = _items.slice(index + 1)
    back.unshift(_items[index - 1])

    console.log("front", front)
    console.log("back", back)

    const new_items = front.concat([item]).concat(back)
    console.log("new_items", new_items)

    setItems(new_items.reverse())
  }
  const moveDownItem = (item: Item) => {
    const _items = items.reverse()
    const index = _items.findIndex((i) => i.id === item.id)
    if (index === items.length - 1) return
    let front = _items.slice(0, index)
    let back = _items.slice(index + 2)
    front.push(_items[index + 1])

    console.log("front", front)
    console.log("back", back)

    const new_items = front.concat([item]).concat(back)
    console.log("new_items", new_items)

    setItems(new_items.reverse())
  }
  const editItemLabel = () => {
    if (!editItem) return
    setItems(
      items.map((item) => {
        if (item.id === editItem.id) {
          return {
            ...item,
            label: inputEditItemLabel,
          }
        }
        return item
      })
    )
    setShowModal(false)
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
    save(STORAGE_KEY_GOAL, goalDate)

    // 最後のアイテムの時刻を基準に順番に時刻を算出する
    // const costDuration = (cost: Duration) => ({ hours: cost.hours * -1, minutes: cost.minutes * -1 })
    let preTime = goalDate
    const _items = viewMode === "edit" ? items : items.filter(i => i.off === undefined || i.off === false)
    setItemsView(
      _items
        .map((item, index) => {
          let time: Time = goalDate
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
          if (item.off === undefined || item.off === false) preTime = time
          if (item.off) time = null
          return {
            ...item,
            time,
          }
        })
        .reverse()
    )
  }, [items, goalDate, viewMode])

  useEffect(() => {
    if (!showModal) return
    refEditText.current?.focus()
  }, [showModal])

  const CtrlBtn: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }> = ({ onClick, children }) => {
    return (
      <>
        {viewMode === "edit" && (
          <button className="ctrl-btn bg-green-900 p-2 m-1 rounded " onClick={onClick}>
            {children}
          </button>
        )}
      </>
    )
  }

  const OffsetBtn: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>
    num: number
    label?: string
  }> = ({ onClick, num, label, children }) => (
    <CtrlBtn onClick={onClick}>
      {num > 0 && "+"}
      {/* {num < 0 && "-"} */}
      {num}
      {label}
    </CtrlBtn>
  )
  const OffsetBtnArray: React.FC<{
    item: Item
    nums: number[]
    cb: (item: Item, num: number) => void
  }> = ({ item, nums, cb, children }) => {
    return (
      <>
        {nums.map((num) => {
          return (
            <OffsetBtn
              onClick={() => {
                cb(item, num)
              }}
              num={num}
            ></OffsetBtn>
          )
        })}
      </>
    )
  }
  const OffsetBtnHours: React.FC<{
    item: Item
    nums: number[]
  }> = ({ item, nums, children }) => {
    return (
      <OffsetBtnArray item={item} nums={nums} cb={(item, num) => addItemCost(item, { hours: num })}></OffsetBtnArray>
    )
  }

  const ItemLabel: React.FC<{}> = ({ children }) => {
    return (
      <>
        <span className="text-2xl">{children}</span>
      </>
    )
  }
  const CostLabel: React.FC<{
    num: number | undefined
    label: string
  }> = ({ num, label }) => {
    return (
      <>
        <span className="hours-label text-2xl">{num}</span>
        <span>{label}</span>
      </>
    )
  }
  const TimeLabel: React.FC<{
    time: Time
  }> = ({ time }) => {
    return (
      <>
        <span className="hours-label text-xl text-gray-300">{time && format(time, "MM-dd")}</span>&nbsp;
        <span className="hours-label text-2xl">{time && format(time, "HH:mm")}</span>
      </>
    )
  }

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
      <button className="deleteall-btn bg-red-900 p-2 m-1 rounded " onClick={deleteItems}>
        delete all
      </button>
      <button className="bg-green-900 p-2 m-1 rounded " onClick={() => setViewMode("view")}>
        view mode
      </button>

      <button className="bg-green-900 p-2 m-1 rounded " onClick={() => setViewMode("edit")}>
        edit mode
      </button>

      <button className="bg-green-900 p-2 m-1 rounded " onClick={() => {
        setInputImpExp(JSON.stringify(items))
        setShowModalImpExp(true)
      }}>
        import/export
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <input
          className="input input-edit-label text-2xl p-2 rounded"
          ref={refEditText}
          type="text"
          name=""
          id=""
          value={inputEditItemLabel}
          onChange={(e) => setInputEditItemLabel(e.target.value)}
        />
        <button className="btn bg-green-900 p-2 m-1 rounded " onClick={editItemLabel}>
          update
        </button>
      </Modal>
      <Modal show={showModalImpExp} onClose={() => setShowModalImpExp(false)}>
        <textarea className="input"  name="" id="" cols={70} rows={6} value={inputImpExp} onChange={(e) => setInputImpExp(e.target.value)}></textarea>
        <button className="btn bg-green-900 p-2 m-1 rounded " onClick={importData}>
          import
        </button>
      </Modal>
      <table className="border">
        <thead>
          <th>label</th>
          <th colSpan={2}>所要時間</th>
          <th>start時刻</th>
        </thead>
        <tbody>
          {itemsView.map((item) => {
            return (
              <tr key={item.id} className={item.off === true ? "off" : ""}>
                <td>
                  <ItemLabel>{item.label}</ItemLabel>
                  <div className="ctrl">
                    <CtrlBtn
                      onClick={() => {
                        setEditItem(item)
                        setInputEditItemLabel(item.label)
                        setShowModal(true)
                      }}
                    >
                      edit
                    </CtrlBtn>
                    <CtrlBtn onClick={() => moveUpItem(item)}>up</CtrlBtn>
                    <CtrlBtn onClick={() => moveDownItem(item)}>down</CtrlBtn>
                    {( item.off === undefined || item.off === false ) && <CtrlBtn onClick={() => offItem(item, true)}>off</CtrlBtn>}
                    {item.off === true && <CtrlBtn onClick={() => offItem(item, false)}>on</CtrlBtn>}
                  </div>
                </td>
                <td>
                  {/* <span className="hours-label text-2xl">{item.costOfTime.hours}</span>h */}
                  <CostLabel num={item.costOfTime.hours} label="h"></CostLabel>
                  <div className="ctrl">
                    <OffsetBtnHours item={item} nums={[1, -1]}></OffsetBtnHours>
                  </div>
                </td>
                <td>
                  <CostLabel num={item.costOfTime.minutes} label="m"></CostLabel>
                  <div className="ctrl">
                    <OffsetBtnArray
                      item={item}
                      nums={[5, 10, -5, -10]}
                      cb={(item, num) => addItemCost(item, { minutes: num })}
                    ></OffsetBtnArray>
                  </div>
                </td>
                <td>
                  <TimeLabel time={item.time}></TimeLabel>
                </td>
              </tr>
            )
          })}
          <tr>
            <td colSpan={3}>
              goal
              <OffsetBtn
                onClick={() => {
                  setGoalDate(df.add(goalDate, { hours: 1 }))
                }}
                num={1}
                label="hour"
              ></OffsetBtn>
              <OffsetBtn
                onClick={() => {
                  setGoalDate(df.add(goalDate, { hours: -1 }))
                }}
                num={-1}
                label="hour"
              ></OffsetBtn>
              <OffsetBtn
                onClick={() => {
                  setGoalDate(df.add(goalDate, { minutes: 10 }))
                }}
                num={10}
                label="min"
              ></OffsetBtn>
              <OffsetBtn
                onClick={() => {
                  setGoalDate(df.add(goalDate, { minutes: -10 }))
                }}
                num={-10}
                label="min"
              ></OffsetBtn>
            </td>
            <td>
              <TimeLabel time={goalDate}></TimeLabel>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="three wide column text-left mt-5">© 2022</div>
    </div>
  )
}

export default Main
