# ETL24 API Documentation

This is ETL APP Standard API documentation

This document provides information on the endpoints available in the ETL24 API. The base URL for all endpoints is `https://etl24-app.onrender.com`.

## Endpoints

### 1. `/table`

#### Description

Fetch all valid tables from the data.

#### Method

GET

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "tableName": "access_keys"
    },
    {
      "tableName": "access_keys_aggregate"
    }
    // ... more tables
  ]
}
```

### 2. `/gas/price`

#### Description

Fetch the average gas price of all transactions.

#### Method

GET

#### Response

```json
{
  "status": "success",
  "data": {
    "avgGasPrice": 28782357637.6585
  }
}
```

### 3. `/block`

#### Description

Fetch details of all blocks.

#### Method

GET

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "block_number": "18994014",
      "transaction_count": 74,
      "timestamp": "2024-01-12T23:11:59",
      "avg_gas_price": 30116446678.162163
    }
    // ... more blocks
  ]
}
```

### 4. `/block/transform`

#### Description

Transform the current structure by removing specific fields from the array and returning the recent 10 transactions.

#### Method

PUT

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "From Address": ...,
      "Amount": ...,
      "Gas Limit": ...,
      "Gas Price": ...,
      "ID": ...,
      "To Address": ...,
      "Block Number": ...,
      "Timestamp": ...
    },
    // ... 9 more block details
  ]
}
```

### 5. `/block/transactions`

#### Description

Fetch the total transactions of a particular block.

#### Method

GET

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "block_number": "18994038",
      "total_transactions": 93
    }
    // ... more blocks
  ]
}
```

### 6. `/block/:block_number`

#### Description

Fetch details of a particular block.

#### Method

GET

#### Note

In this particular API endpoint, you always have to provide the latest block number.

#### Response

```json
{
  "status": "success",
  "data": {
    "block_number": 18994071,
    "transaction_count": 145,
    "timestamp": "2024-01-12T23:23:23"
  }
}
```

## Important Notes

- The base URL for all endpoints is `https://etl24-app.onrender.com`.
- Make sure to follow the specific requirements mentioned for each endpoint.
