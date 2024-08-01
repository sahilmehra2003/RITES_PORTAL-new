import mySql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool= mySql.createPool({
  // environment variable
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE
}).promise()

 
export async function getDocuments() {
    //  const result = await pool.query("select * from documents")
    //  const rows=result[0]
    // ->this can be written as
    // gives first item from array about notes
    const [rows]=await pool.query("select * from documents")
     return rows
}
 export async function getFolder(id) {
 const[rows]=await pool.query(
    'Select * From folders where folder_id=?',[id]);
     return rows[0];
  
}
export async function createFolder(folder_name, folder_id) {
      const [result] = await pool.query(`
      INSERT INTO folders (folder_name, folder_id)
      VALUES (?, ?)`, [folder_name, folder_id]);
      return result;
   
}
// const result=await createFolder('New Folder 2','CPC_Folder3')
// console.log(result)
// const folders=await getFolder('Cpc_folder1')
// console.log(folders)

// const documents=await getDocuments()
// console.log(documents)


