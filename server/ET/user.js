const bcrypt = require('bcrypt');
const { poolPromise, sql } = require('../ET/db');

async function createDefaultUser() {
    try {
        const pool = await poolPromise;

        const checkUser = await pool.request()
            .input("username", sql.VarChar, "TIEI")
            .query(`SELECT * FROM ANDON_USER_LOGIN WHERE USERNAME = @username`);

        if (checkUser.recordset.length > 0) {
            // console.log(" Default user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("TIEI@1234", 10);

        await pool.request()
            .input("USERNAME", sql.VarChar, "TIEI")
            .input("USERID", sql.VarChar, "AAPL032")
            .input("USERTYPE", sql.VarChar, "SUPER ADMIN")
            .input("PASSWORD", sql.VarChar, hashedPassword)
            .input("STATUS", sql.Int, 0)
            .query(`
                INSERT INTO ANDON_USER_LOGIN (DTE, USERNAME, USERID, USERTYPE, PASSWORD, STATUS)
                VALUES (GETDATE(), @USERNAME, @USERID, @USERTYPE, @PASSWORD, @STATUS)
            `);

        // console.log("✅ Default SUPER ADMIN user created");
    } catch (err) {
        console.error("❌ Error creating default user:", err);
    }
}

module.exports = {
    createDefaultUser
};
