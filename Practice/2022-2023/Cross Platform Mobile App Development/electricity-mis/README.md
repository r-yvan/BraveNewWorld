# EUCL Prepaid Token Generation System

Complete prepaid electricity token generation system for Energy Utility Corporation Limited (EUCL).

## Overview

This system allows EUCL customers to purchase prepaid electricity tokens through a mobile application. The system generates 8-digit tokens that provide electricity for a specified number of days based on the amount paid.

## Features

- **Generate Token**: Enter meter number and amount to generate 8-digit tokens
- **Validate Token**: Check token details including days of electricity and status
- **Token History**: View all tokens generated for a specific meter number

## Business Rules

- **Minimum amount**: 100 RWF
- **Token value**: 100 RWF = 1 day of electricity
- **Amount**: Must be multiples of 100 RWF
- **Maximum duration**: 1825 days (5 years)
- **Token format**: 8 digits (automatically generated)
- **Meter number format**: 6 digits
- **Token status**: NEW, USED, or EXPIRED

## Tech Stack

- **Mobile App**: React Native with Expo (Android)
- **Backend**: Node.js + Express
- **Database**: MySQL

## Quick Start

### 1. Database Setup

```bash
# Install MySQL, then run:
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start server
npm start
```

Server runs on `http://localhost:3000`

### 3. Mobile App Setup

```bash
cd mobile
npm install

# Update API URL in mobile/config/api.ts if needed

# Start Expo
npm start

# Then press:
# - 'a' for Android emulator
# - 'i' for iOS simulator
# - Scan QR code for physical device
```

## API Endpoints

### Generate Token
```
POST /api/tokens/generate
Body: { meterNumber: "123456", amount: 500 }
Response: { success: true, data: { token, meterNumber, amount, days, status } }
```

### Validate Token
```
POST /api/tokens/validate
Body: { token: "12345678" }
Response: { success: true, data: { token, meterNumber, days, amount, status, purchasedDate } }
```

### Get Token History
```
GET /api/tokens/meter/:meterNumber
Response: { success: true, data: [...tokens] }
```

## Database Schema

Table: `purchased_tokens`
- `id` (INT, 11) - Primary key
- `meter_number` (VARCHAR, 6) - Customer meter number
- `token` (VARCHAR, 8) - Generated token (unique)
- `token_status` (ENUM: NEW, USED, EXPIRED) - Token status
- `token_value_days` (INT, 11) - Number of days
- `purchased_date` (TIMESTAMP) - Purchase timestamp
- `amount` (INT, 11) - Amount paid in RWF

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── controllers/tokenController.js
│   │   ├── models/tokenModel.js
│   │   ├── routes/tokenRoutes.js
│   │   └── server.js
│   └── package.json
├── mobile/
│   ├── app/(tabs)/
│   │   ├── index.tsx (Generate Token)
│   │   ├── validate.tsx (Validate Token)
│   │   ├── history.tsx (Token History)
│   │   └── _layout.tsx
│   ├── config/api.ts
│   └── package.json
└── database/
    └── schema.sql
```

## Error Handling

The system validates:
- Meter number format (exactly 6 digits)
- Token format (exactly 8 digits)
- Minimum amount (100 RWF)
- Amount must be multiple of 100
- Maximum days (1825 days / 5 years)
- Token uniqueness

All errors return descriptive messages to the user.

## Testing

### Test Scenarios

1. **Valid Token Generation**
   - Meter: 123456, Amount: 100 → 1 day
   - Meter: 123456, Amount: 1000 → 10 days

2. **Invalid Inputs**
   - Meter: 12345 (5 digits) → Error
   - Amount: 50 → Error (less than minimum)
   - Amount: 150 → Error (not multiple of 100)
   - Amount: 200000 → Error (exceeds 5 years)

3. **Token Validation**
   - Valid token → Display all details
   - Invalid token → Error message

4. **Token History**
   - Valid meter → Display all tokens
   - Meter with no tokens → "No tokens found"

## Configuration

### Mobile App API URL

Edit `mobile/config/api.ts`:
- **Android Emulator**: `http://10.0.2.2:3000/api/tokens`
- **iOS Simulator**: `http://localhost:3000/api/tokens`
- **Physical Device**: `http://YOUR_COMPUTER_IP:3000/api/tokens`

### Backend Environment

Edit `backend/.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eucl_token_system
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Mobile Development
```bash
cd mobile
npm start  # Start Expo dev server
```

## Troubleshooting

### Cannot connect to server
- Ensure backend is running on port 3000
- Check API_BASE_URL in `mobile/config/api.ts`
- For physical device, use your computer's IP address
- Ensure firewall allows connections on port 3000

### Android Emulator issues
- Use `http://10.0.2.2:3000/api/tokens` instead of localhost

### Database connection errors
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `eucl_token_system` exists

## License

Proprietary - EUCL Internal Use Only
