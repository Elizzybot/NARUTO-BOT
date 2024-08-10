const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUtpVlVCZlFKN0tudXpXS3ZOWXVHTVZVMFgveVh4UDJ2bUQ3QS9mc1hGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHFRSUMydjBBU05pZlhSZndHKzcwSE53bmZ1a0RvOTdxdlhCbjFGejR5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSXUrL3dJL3hRbnBOTkRtV3lTd2p1ZExoeFgwNnVBS0p1cHZFUFVINFdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZNysySzhjR2NhYkt1UVB2d1ZQUHIwcDBMZmtpVDFZMWs5cWl5amhnOFJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZHRDM0U3FvemhhaW5Yc2FNd2pXUG4zZzZaclBWd2FUdHlrbGVJN2R5a009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBISzNVeDlSSWNOeVU3Tm5iOE45WWZ5RkhyMnkwaEl2bjA3S3I4dGZ0aDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0R1Z2ZwU2VUZ0hCTldwLzF2dzc3dE1OemxDcG5EVGlFek11b1FVbnFHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1BNLzJjd2l4d0Q1eWoxalBwVzl4RTh1Z1NQR3NIUDNYNlc1WXVJVHh6OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFtUUdINC9abW42VTBqNFQ3TWhEWGxabTU3RXozSG5ZbThFS0Fvb1FuR3FPRW9paitFM01yUmV2RC8wcXVzYWpEdWJ0c29uM3dvS3hKQmFCc256SWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6Im91TDFNTEpTTWVQSjF3YUhkRXlLWmFJMmV4REVuMGhBQmM1ODBqaTgycUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1QZU5qS2RqVHhTcVNZXzNDV09taUEiLCJwaG9uZUlkIjoiMDI3YmY3MTgtNDc0NS00ZGU4LWFlMTItY2M5NDNmMjk2N2E4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI4dTBOdFVVZEgxQ1FqcldlM0ljejIyTERIUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2bmdmaGE2R1Z5SFQyS0ZyK3c0SVBJYytFc1k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjRLQ1hXQVciLCJtZSI6eyJpZCI6IjIzNDcwMzg0OTQ5OTc6NzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibm8tbmFtZSB0ZWNoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKLzh5SWtGRU5YdjNiVUdHQlFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDR1dRVFAvSVBHMDRrOGF0WXc2S2N0TG4xN3BKMk1rV1dxY1BPckNmWkM4PSIsImFjY291bnRTaWduYXR1cmUiOiJvZTh0TkxVSFhaZUFoaWxCbWFWL3MzT0VSdWR2enhIU0FvbU5PZ3RRb0xIM3RSWWdPVUVMVm5CbmlUMXZFMjBSL0NFZ2t6di90Z25TdWdPYXhOaXVDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYlZ5SnRFbUxOZnhkdTBtRlpOTjNLMmFUdmNDWnRhemxyb2VUSDhXSEpiR0JqMjdZMkNuZThsa2V0emw0ZzFDam9mY21vWTFhc1Z0d2FxdS9ST29naVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDM4NDk0OTk3Ojc4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFobGtFei95RHh0T0pQR3JXTU9pbkxTNTllNlNkakpGbHFuRHpxd24yUXYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMyOTk4MTB9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "no-name tech",
    NUMERO_OWNER : process.env.OWNER_NUM || "2347038494997",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Naruto bot',
    URL : process.env.BOT_MENU_LINKS || 'ttps://telegra.ph/file/4f47eea9c68463c5d8340.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
