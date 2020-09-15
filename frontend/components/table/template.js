const pipe = fns => x => fns.reduce((v, f) => f(v), x)


export const mapDOM = scope => ({
  sortLikes: scope.querySelector("#likes"),
  sortComments: scope.querySelector("#comments"),
  sortHeadline: scope.querySelector("#headline"),
  inputHeadline: scope.querySelector("input[type='text']"),
  myTable: scope.querySelector(".mytable")
})

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const jsonToTable = (json) => {
  const cols = Object.keys(json[0])
  let headerRow = ""
  let bodyRows = ""

  cols.map(col =>
    headerRow += "<th>" + 
    capitalizeFirstLetter(col) + "</th>"
  )

  json.map(row => {
    bodyRows += "<tr>"

    cols.map(colName =>
      bodyRows += "<td>" +
      row[colName] + "</td>"
    )
    bodyRows += "</tr>"
  })

  return `<table class="mytable">
  <thead>
  <tr>
    ${headerRow}
  </tr>
  </thead>
  <tbody>${bodyRows}</tbody>
  </table>
  `
}

const html = props => console.log(props) ||
  `
  <div>
  <span>Brought to you by Datastack.de | </span>
  <a href="https://www.datastack.de">Check out all our services</a>
  </div>
  <hr>
  <br>
  <p>Data comes from: <a href="https://www.xing.com/news/pages/cio-de-203" target="_blank">https://www.xing.com/news/pages/cio-de-203</a></p>
  <p><b>Total Articles in the database: ${((props || []).length || 0)}</b></p>
  <input type="text" placeholder="Enter Headline">
  <button id="likes">Sort by Likes</button>
  <button id="comments">Sorty by Comments</button>
  <br>
  <br>
  ${jsonToTable(props)}

  `


const css = props => html =>
  `
  ${html}
  <style>
  </style>
  `

export const render = props => pipe([
  html,
  css (props)
]) (props)
