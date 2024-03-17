import {DataTypes} from 'sequelize'
import {hashSync} from 'bcrypt'
import db from '../config/db.js'

export const User = db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^[A-Za-z][A-Za-z0-9]{2,15}$/g,
                    msg: 'Username must start with a letter, be 3-15 characters long, and contain only letters and numbers.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            validate: {
                len: {
                    args: [6, 30],
                    msg: 'Password must be between 6 and 30 characters'
                }
            }
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        },
        status: {
            type: DataTypes.ENUM('active', 'blocked'),
            defaultValue: 'active'
        }
    },
    {
        freezeTableName: true
    })

User.beforeCreate((user) => {
    user.password = hashSync(user.password, 5)
})

User.afterFind((user) => {
    if (Array.isArray(user)) {
        user.forEach(user => {
            delete user.dataValues.password;
        });
    }
})

User.sync({force: false}).then(() => {
    console.log("User table created successfully")
})