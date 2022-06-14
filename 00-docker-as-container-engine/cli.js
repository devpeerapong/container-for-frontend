import { age } from "./age.js"

const [, , year] = process.argv

console.log(age(+year))