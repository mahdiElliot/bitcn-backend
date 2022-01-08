import sequelize from '../db/index'
import DataTypes from 'sequelize'

const FastPaperBuy = sequelize.define('fast_paper_buy', {
    timestampp: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    market: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    asset_amount: {
        type: DataTypes.FLOAT,
    },
    usdt_balance: {
        type: DataTypes.FLOAT
    },
    buy_amount: {
        type: DataTypes.FLOAT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: 'fast_paper_buy',
    timestamps: false,
})

export default FastPaperBuy