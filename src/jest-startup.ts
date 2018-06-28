const typeorm = require('typeorm');
// const config = require('config');

module.exports = async function() {
    // const connection = await typeorm.createConnection({
    //     type: "postgres",
    //     host: "localhost",
    //     port: config.db.port,
    //     username: config.db.username,
    //     password: config.db.password,
    //     database: config.db.database
    // });    
//    const sql = "select 'drop table if exists \"' || tablename || '\" cascade;' as col  from pg_tables where schemaname = 'public';";
    // const sql = "select 'delete from \"' || tablename || '\";' as col  from pg_tables where schemaname = 'public';";
    // let res = await connection.manager.query(sql);

    // await connection.manager.query('delete from account;');
    // await connection.manager.query('delete from contact;');
    // await connection.manager.query('delete from vehicle;');
    // await connection.manager.query('delete from company;');
    // await connection.manager.query('delete from feature;');
    // for (const item of res) {
    //     let res = await connection.manager.query(item.col);
    // }
    // await connection.synchronize();
    // connection.close(); 
    // console.log('');
    // console.log('JEST.STARTUP.ts -> DB',config.db.database,' -> all tables emptied'); 

}