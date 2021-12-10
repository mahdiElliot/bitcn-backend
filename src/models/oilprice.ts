import sequelize from '../db/index'
import DataTypes from 'sequelize'


export type oilPrice = {
    id: number
    created_at: number
    price: number
    formatted: string
    currency: string
    code: string
    type: string
}

const OilPrice = sequelize.define('oilprice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    formatted: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ttype: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default OilPrice