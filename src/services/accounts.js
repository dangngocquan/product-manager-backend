const db = require('./db');

// [GET]
async function getIdByUsername(username) {
    var sql =   
        `SELECT id FROM accounts ` +
        `WHERE status != 'deleted' AND username = '${username}'`;
    
    var ids = await db.query(sql);
    return {
        ids
    }
}

async function loginAccount(formData) {
    var sql = 
        `with account as (
            select id,
                username, 
                password, 
                status, 
                type, 
                extract(
                    epoch from time_registered
                ) as time_registered from accounts where (
                    status != 'deleted' AND username = '${formData.username}' AND password = '${formData.password}'
                )
        ) select clients.id AS id, 
            username, 
            password, 
            status, 
            type, 
            time_registered,
            nickname, 
            email, 
            phone_number, 
            gender, 
            extract(epoch from birthday) as birthday, 
            portrait,
            carts.id as cart_id from (
                account join clients on account.id = clients.account_id
            ) join carts on clients.id = carts.owner_id`;

    const accountInformations = await db.query(sql);
    return {
        accountInformations: accountInformations
    }
}


// [POST]
async function createNewAccount(formData = {}) {
    // Insert into table `accounts`
    var sql = 
        `with new_account as (
            insert into accounts (
                username, 
                password
            ) values (
                '${formData.username}', 
                '${formData.password}'
            ) returning id
        ), 
        new_client as (
            insert into clients (
                account_id,
                nickname
            ) values (
                (select id from new_account),
                '${formData.nickname}'
            ) returning id
        ) insert into carts (
            owner_id
        ) values (
            (select id from new_client)
        )`;
    
    const res = await db.query(sql);
    return res;
}


async function createNewAccountWithGoogle(formData = {}) {
    // Insert into table `accounts`
    var sql = 
        `with new_account as (
            insert into accounts (
                email
            ) values (
                '${formData.email}'
            ) returning id
        ), 
        new_client as (
            insert into clients (
                account_id,
                nickname
            ) values (
                (select id from new_account),
                '${formData.nickname}'
            ) returning id
        ) insert into carts (
            owner_id
        ) values (
            (select id from new_client)
        )`;
    
    const res = await db.query(sql);
    return res;
}


// [PATCH]




// [DELETE]




module.exports = {
    // [GET]
    getIdByUsername,
    loginAccount,
    // [POST]
    createNewAccount
}