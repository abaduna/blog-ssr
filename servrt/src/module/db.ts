import mysql from "promise-mysql";

const comection = mysql.createConnection({
    host:"localhost",
    database:"blogssr",
    user:"root",
    password:"1234"
})

const getConnection = async ()=>await comection

export { getConnection };