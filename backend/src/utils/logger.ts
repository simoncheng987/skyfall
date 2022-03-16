/* eslint-disable */

const info = (...msg: any) => console.log(...msg)
const error = (...msg: any) => console.error(...msg)

const logger = {
    info,
    error
}
export default logger