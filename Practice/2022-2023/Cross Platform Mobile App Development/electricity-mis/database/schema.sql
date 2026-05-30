-- EUCL Token System Database Schema

CREATE DATABASE IF NOT EXISTS eucl_token_system;
USE eucl_token_system;

CREATE TABLE IF NOT EXISTS purchased_tokens (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    meter_number VARCHAR(6) NOT NULL,
    token VARCHAR(8) NOT NULL UNIQUE,
    token_status ENUM('NEW', 'USED', 'EXPIRED') NOT NULL DEFAULT 'NEW',
    token_value_days INT(11) NOT NULL,
    purchased_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount INT(11) NOT NULL,
    INDEX idx_meter_number (meter_number),
    INDEX idx_token (token),
    INDEX idx_token_status (token_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
