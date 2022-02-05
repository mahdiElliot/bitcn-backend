import sequelize from '../db/index'
import DataTypes from 'sequelize'

export type trade = {
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume_btc: number
    volume_usdt: number
    buy: boolean
    sell: boolean
    tradecount: number
    slowk: number
    slowd: number
    k: number
    j: number
    d: number
    profit: number
    profit_percent: number
}

const Trade = sequelize.define('trade', {
    index: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    unix: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    symbol: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    open: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    close: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    low: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    high: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    'Volume BTC': {
        type: DataTypes.DOUBLE,
        allowNull: false,

    },
    'Volume USDT': {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tradecount: {
        type: DataTypes.BIGINT,
    },
    MA_50: {
        type: DataTypes.DOUBLE
    },
    MA_21: {
        type: DataTypes.DOUBLE
    },
    slowk: {
        type: DataTypes.DOUBLE
    },
    slowd: {
        type: DataTypes.DOUBLE
    },
    k: {
        type: DataTypes.DOUBLE
    },
    d: {
        type: DataTypes.DOUBLE
    },
    j: {
        type: DataTypes.DOUBLE
    },
    SMMA_21: {
        type: DataTypes.DOUBLE
    },
    upper: {
        type: DataTypes.DOUBLE
    },
    middle: {
        type: DataTypes.DOUBLE
    },
    lower: {
        type: DataTypes.DOUBLE
    },
    Bollinger_Rank: {
        type: DataTypes.DOUBLE
    },
    direction_MA50: {
        type: DataTypes.BIGINT
    },
    kdj_cross: {
        type: DataTypes.BIGINT
    },
    buy_signal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    sell_signal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    usdt: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    btc: {
        type: DataTypes.DOUBLE
    },
    com: {
        type: DataTypes.DOUBLE
    },
    profit: {
        type: DataTypes.DOUBLE
    },
    profit_percent: {
        type: DataTypes.DOUBLE
    }
}, {
    tableName: 'tarde',
    timestamps: false,
})

export default Trade