const sqlite = require('sqlite3');
const path = require('path');
const { Resolver } = require('dns');
const { resolve } = require('path');


const dbFile = path.resolve(__dirname, '../../database.db');
console.log('Opening Database', dbFile);
const db = new sqlite.Database(dbFile);

const usersTableName = 'users';

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} lastName
 * @property {number} birthdate
 * @property {number} registerDate
 * @property {number} sex
 * @property {string} department
 * @property {number[]} visitsTimestamps
 * @property {string} notes
 */

module.exports = {
    getUsers() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${usersTableName}`, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
                console.log('result is', result)
            });
        });
    },

    getUserById(id) {
        return new Promise((resolve, reject) => {
            db.get(`
            SELECT name, lastName,birthdate, registerDate, sex, department, visitsTimestamps, notes
            FROM ${usersTableName}
            WHERE ID = $id;
            `, {
                $id: id,

            }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            });
        });

    },

    /**
     * @param user {User}
     */
    addUser(user) {
        return new Promise((resolve, reject) => {
            console.log('adding', user)
            db.run(`
            INSERT INTO ${usersTableName}(name, lastName, birthdate, registerDate, sex, department, visitsTimestamps, notes)
            VALUES ($name, $lastName, $birthdate, $registerDate, $sex, $department, $visitsTimestamps, $notes)`, {
                $name: user.name,
                $lastName: user.lastName,
                $birthdate: user.birthdate,
                $registerDate: user.registerDate,
                $sex: user.sex,
                $department: user.department,
                $visitsTimestamps: user.visitsTimestamps,
                $notes: user.notes,
            }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });

    },

    /**
     * @param id {id}
     * @param user {User}
     */
    editUser(ID, user) {
        return new Promise((resolve, reject) => {
            console.log('editing', user);
            db.run(`
            UPDATE ${usersTableName} 
            SET name = $name, lastName = $lastName, birthdate = $birthdate, registerDate = $registerDate, sex = $sex, department = $department, visitsTimestamps = $visitsTimestamps, notes = $notes
            WHERE ID = $id`, {
                $id: ID,
                $name: user.name,
                $lastName: user.lastName,
                $birthdate: user.birthdate,
                $registerDate: user.registerDate,
                $sex: user.sex,
                $department: user.department,
                $visitsTimestamps: user.visitsTimestamps,
                $notes: user.notes
            }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    },

    deleteUser(ID) {
        return new Promise((resolve, reject) => {
            db.run(`
            DELETE FROM ${usersTableName}
            WHERE ID = $id`, {
                $id: ID
            }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })

    }
}