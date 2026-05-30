-- Trigger to calculate total price before insert
-- This trigger automatically calculates total = price * quantity before inserting into purchased table

CREATE OR REPLACE FUNCTION calculate_purchase_total()
RETURNS TRIGGER AS $$
BEGIN
    SELECT price INTO NEW.total
    FROM products
    WHERE code = NEW.product_code;
    
    NEW.total := NEW.total * NEW.quantity;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_purchase_insert
BEFORE INSERT ON purchased
FOR EACH ROW
EXECUTE FUNCTION calculate_purchase_total();

-- Note: The trigger is optional since the application already calculates the total
-- But it's included here as per requirements
