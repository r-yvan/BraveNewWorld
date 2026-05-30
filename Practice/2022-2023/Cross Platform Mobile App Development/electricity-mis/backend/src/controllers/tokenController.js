const TokenModel = require('../models/tokenModel');

const MAX_DAYS = 365 * 5; // 5 years
const MIN_AMOUNT = 100;
const AMOUNT_PER_DAY = 100;

function generateToken() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

class TokenController {
  static async generateToken(req, res) {
    try {
      const { meterNumber, amount } = req.body;

      // Validate meter number
      if (!meterNumber || !/^\d{6}$/.test(meterNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Meter number must be exactly 6 digits'
        });
      }

      // Validate amount
      const amountNum = parseInt(amount);
      if (isNaN(amountNum) || amountNum < MIN_AMOUNT) {
        return res.status(400).json({
          success: false,
          message: `Minimum amount is ${MIN_AMOUNT} RWF`
        });
      }

      if (amountNum % AMOUNT_PER_DAY !== 0) {
        return res.status(400).json({
          success: false,
          message: `Amount must be a multiple of ${AMOUNT_PER_DAY} RWF`
        });
      }

      // Calculate days
      const days = amountNum / AMOUNT_PER_DAY;
      if (days > MAX_DAYS) {
        return res.status(400).json({
          success: false,
          message: `Maximum allowed is ${MAX_DAYS} days (5 years)`
        });
      }

      // Generate unique token
      let token;
      let isUnique = false;
      let attempts = 0;
      
      while (!isUnique && attempts < 10) {
        token = generateToken();
        const existing = await TokenModel.getTokenByValue(token);
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        return res.status(500).json({
          success: false,
          message: 'Failed to generate unique token. Please try again.'
        });
      }

      // Save token
      await TokenModel.createToken(meterNumber, token, amountNum, days);

      res.status(201).json({
        success: true,
        message: 'Token generated successfully',
        data: {
          token,
          meterNumber,
          amount: amountNum,
          days,
          status: 'NEW'
        }
      });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while generating token'
      });
    }
  }

  static async validateToken(req, res) {
    try {
      const { token } = req.body;

      if (!token || !/^\d{8}$/.test(token)) {
        return res.status(400).json({
          success: false,
          message: 'Token must be exactly 8 digits'
        });
      }

      const tokenData = await TokenModel.getTokenByValue(token);

      if (!tokenData) {
        return res.status(404).json({
          success: false,
          message: 'Token not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Token validated successfully',
        data: {
          token: tokenData.token,
          meterNumber: tokenData.meter_number,
          days: tokenData.token_value_days,
          amount: tokenData.amount,
          status: tokenData.token_status,
          purchasedDate: tokenData.purchased_date
        }
      });
    } catch (error) {
      console.error('Error validating token:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while validating token'
      });
    }
  }

  static async getTokensByMeter(req, res) {
    try {
      const { meterNumber } = req.params;

      if (!meterNumber || !/^\d{6}$/.test(meterNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Meter number must be exactly 6 digits'
        });
      }

      const tokens = await TokenModel.getTokensByMeterNumber(meterNumber);

      res.status(200).json({
        success: true,
        message: 'Tokens retrieved successfully',
        data: tokens.map(t => ({
          token: t.token,
          amount: t.amount,
          days: t.token_value_days,
          status: t.token_status,
          purchasedDate: t.purchased_date
        }))
      });
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving tokens'
      });
    }
  }
}

module.exports = TokenController;
