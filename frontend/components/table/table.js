import json from "../../data/output.js"
import { render, mapDOM, jsonToTable } from "./template.js"

export default class Table extends HTMLElement {
  constructor() {
    super()
    this._headline = ""
    this.attachShadow({mode: "open"})
    this.root = this.shadowRoot
    this.root.innerHTML = render(json)
    this.dom = mapDOM(this.root)

    this.dom.sortLikes.addEventListener("click", e => {
      if (this._headline !== "") {
        const output = json.filter(entry => entry.headline.includes(this._headline)) 
        const sorted = output.sort((a, b) => b.likes - a.likes)
        this.dom.myTable.innerHTML = jsonToTable(sorted)
      } else  {
        const sorted = json.sort((a, b) => b.likes - a.likes)
        this.dom.myTable.innerHTML = jsonToTable(sorted)
      }
    })

    this.dom.sortComments.addEventListener("click", e => {
      if (this._headline !== "") {
        const output = json.filter(entry => entry.headline.includes(this._headline)) 
        const sorted = output.sort((a, b) => b.comments - a.comments)
        this.dom.myTable.innerHTML = jsonToTable(sorted)
      } else  {
        const sorted = json.sort((a, b) => b.comments - a.comments)
        this.dom.myTable.innerHTML = jsonToTable(sorted)
      }
    })

    this.dom.inputHeadline.addEventListener("input", e => {
      this._headline = e.target.value
      const output = json.filter(entry => entry.headline.includes(this._headline)) 
      output.length > 0
      ? this.dom.myTable.innerHTML = jsonToTable(output) 
      : void 7
    })
    }
}


!customElements.get("cio-table") 
  ? customElements.define("cio-table", Table)
  : void 7
