import sequelize from '../db/index'
import DataTypes from 'sequelize'

export type bits = {
    timestamp: number
    symbol: string
    open: number
    high: number
    low: number
    close: number
    volume_USD: number
    volume_BTC: number
}

const Bitfinex = sequelize.define('bitfinex', {
    timestamp: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    symbol: {
        type: DataTypes.STRING,
    },
    open: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    high: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    low: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    close: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    volume_USD: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    volume_BTC: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default Bitfinex