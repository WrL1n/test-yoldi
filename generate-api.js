const { generateApi } = require("swagger-typescript-api")
const path = require("node:path")
require("dotenv").config()

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: "yoldi-api.js",
  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), "./shared/__generated__"),
  // url: `${process.env.REACT_APP_API_URL}/docs`,
  input: path.resolve(process.cwd(), "./public/api/schema.json"),
  // httpClientType: "axios", // or "fetch"
  defaultResponseAsSuccess: false,
  generateClient: true,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  unwrapResponseData: true,
  sortTypes: true,
  prettier: {
    // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
  defaultResponseType: "void",
  singleHttpClient: true,
  cleanOutput: false,
  enumNamesAsValues: false,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  typePrefix: "",
  typeSuffix: "",
  enumKeyPrefix: "",
  enumKeySuffix: "",
  addReadonly: false,
})
// .then(({ files, configuration }) => {
//   files.forEach(({ content, name }) => {
//     fs.writeFile(path, content)
//   })
// })
// .catch((e) => console.error(e))
