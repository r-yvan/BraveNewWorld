const db = require('../config/database');

class TokenModel {
  static async createToken(meterNumber, token, amount, tokenValueDays) {
    const query = `
      INSERT INTO purchased_tokens 
      (meter_number, token, amount, token_value_days, token_status) 
      VALUES (?, ?, ?, ?, 'NEW')
    `;
    const [result] = await db.execute(query, [meterNumber, token, amount, tokenValueDays]);
    return result.insertId;
  }

  static async getTokenByValue(token) {
    const query = 'SELECT * FROM purchased_tokens WHERE token = ?';
    const [rows] = await db.execute(query, [token]);
    return rows[0];
  }

  static async getTokensByMeterNumber(meterNumber) {
    const query = `
      SELECT * FROM purchased_tokens 
      WHERE meter_number = ? 
      ORDER BY purchased_date DESC
    `;
    const [rows] = await db.execute(query, [meterNumber]);
    return rows;
  }

  static async updateTokenStatus(token, status) {
    const query = 'UPDATE purchased_tokens SET token_status = ? WHERE token = ?';
    const [result] = await db.execute(query, [status, token]);
    return result.affectedRows > 0;
  }
}

module.exports = TokenModel;
