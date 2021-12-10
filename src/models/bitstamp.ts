import sequelize from '../db/index'
import DataTypes from 'sequelize'

const Bitstamp = sequelize.define('bitstamp', {
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

export default Bitstamp