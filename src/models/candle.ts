import sequelize from '../db/index'
import DataTypes from 'sequelize'

export type candle = {
    timestamp: number
    market: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    usdvol: number
}

const Candle = sequelize.define('candle', {
    timestampp: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    openp: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    closep: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    low: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    high: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    usdvol: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: 'candle',
    timestamps: false,
})

export default Candle