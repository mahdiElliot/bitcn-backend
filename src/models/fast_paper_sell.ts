import sequelize from '../db/index'
import DataTypes from 'sequelize'

const FastPaperSell = sequelize.define('fast_paper_sell', {
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
    sell_amount: {
        type: DataTypes.FLOAT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: 'fast_paper_sell',
    timestamps: false,
})

export default FastPaperSell