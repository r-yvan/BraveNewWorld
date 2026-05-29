-- PostgreSQL Trigger and Procedure for Payroll Approval
-- This trigger automatically updates payslip status and creates employee messages when payroll is approved

-- Function to process payroll approval
CREATE OR REPLACE FUNCTION process_payroll_approval()
RETURNS TRIGGER AS $$
DECLARE
    payslip_record RECORD;
    employee_record RECORD;
    message_text TEXT;
BEGIN
    -- Check if status changed to APPROVED
    IF NEW.status = 'APPROVED' AND OLD.status != 'APPROVED' THEN
        
        -- Cursor to iterate through all payslips for this payroll
        FOR payslip_record IN 
            SELECT * FROM payslips WHERE payroll_id = NEW.id AND deleted = false
        LOOP
            -- Update payslip payment status to PAID
            UPDATE payslips 
            SET payment_status = 'PAID', updated_at = CURRENT_TIMESTAMP
            WHERE id = payslip_record.id;
            
            -- Get employee details
            SELECT * INTO employee_record FROM employees WHERE id = payslip_record.employee_id;
            
            -- Generate payment message
            message_text := format(
                'Dear %s, Your salary of %s/%s from GOVERNMENT ERP amount %s has been credited successfully.',
                employee_record.first_name || ' ' || employee_record.last_name,
                NEW.month,
                NEW.year,
                payslip_record.net_salary
            );
            
            -- Insert message for employee
            INSERT INTO messages (
                employee_id, 
                message, 
                month, 
                year, 
                is_read, 
                created_at, 
                updated_at, 
                deleted
            ) VALUES (
                employee_record.id,
                message_text,
                NEW.month,
                NEW.year,
                false,
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                false
            );
            
        END LOOP;
        
        RAISE NOTICE 'Payroll % approved. Payslips updated and messages sent.', NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payroll approval
DROP TRIGGER IF EXISTS trigger_payroll_approval ON payrolls;
CREATE TRIGGER trigger_payroll_approval
    AFTER UPDATE ON payrolls
    FOR EACH ROW
    WHEN (NEW.status = 'APPROVED' AND OLD.status != 'APPROVED')
    EXECUTE FUNCTION process_payroll_approval();

-- Stored Procedure to calculate employee salary
CREATE OR REPLACE FUNCTION calculate_employee_salary(
    p_employee_id BIGINT,
    p_month INTEGER,
    p_year INTEGER
)
RETURNS TABLE (
    base_salary NUMERIC,
    house_amount NUMERIC,
    transport_amount NUMERIC,
    gross_salary NUMERIC,
    employee_tax NUMERIC,
    pension NUMERIC,
    medical_insurance NUMERIC,
    others NUMERIC,
    total_deductions NUMERIC,
    net_salary NUMERIC
) AS $$
DECLARE
    v_base_salary NUMERIC;
    v_house_pct NUMERIC;
    v_transport_pct NUMERIC;
    v_tax_pct NUMERIC;
    v_pension_pct NUMERIC;
    v_medical_pct NUMERIC;
    v_others_pct NUMERIC;
BEGIN
    -- Get employee base salary
    SELECT emp.base_salary INTO v_base_salary
    FROM employments emp
    WHERE emp.employee_id = p_employee_id;
    
    -- Get deduction percentages
    SELECT percentage INTO v_house_pct FROM deductions WHERE deduction_name = 'House' AND is_active = true;
    SELECT percentage INTO v_transport_pct FROM deductions WHERE deduction_name = 'Transport' AND is_active = true;
    SELECT percentage INTO v_tax_pct FROM deductions WHERE deduction_name = 'EmployeeTax' AND is_active = true;
    SELECT percentage INTO v_pension_pct FROM deductions WHERE deduction_name = 'Pension' AND is_active = true;
    SELECT percentage INTO v_medical_pct FROM deductions WHERE deduction_name = 'MedicalInsurance' AND is_active = true;
    SELECT percentage INTO v_others_pct FROM deductions WHERE deduction_name = 'Others' AND is_active = true;
    
    -- Calculate and return salary breakdown
    RETURN QUERY
    SELECT 
        v_base_salary,
        ROUND(v_base_salary * v_house_pct / 100, 2),
        ROUND(v_base_salary * v_transport_pct / 100, 2),
        ROUND(v_base_salary + (v_base_salary * v_house_pct / 100) + (v_base_salary * v_transport_pct / 100), 2),
        ROUND(v_base_salary * v_tax_pct / 100, 2),
        ROUND(v_base_salary * v_pension_pct / 100, 2),
        ROUND(v_base_salary * v_medical_pct / 100, 2),
        ROUND(v_base_salary * v_others_pct / 100, 2),
        ROUND((v_base_salary * v_tax_pct / 100) + (v_base_salary * v_pension_pct / 100) + 
              (v_base_salary * v_medical_pct / 100) + (v_base_salary * v_others_pct / 100), 2),
        ROUND(v_base_salary - ((v_base_salary * v_tax_pct / 100) + (v_base_salary * v_pension_pct / 100) + 
              (v_base_salary * v_medical_pct / 100) + (v_base_salary * v_others_pct / 100)), 2);
END;
$$ LANGUAGE plpgsql;

-- Stored Procedure to get payroll summary
CREATE OR REPLACE FUNCTION get_payroll_summary(p_payroll_id BIGINT)
RETURNS TABLE (
    total_employees BIGINT,
    total_gross_salary NUMERIC,
    total_deductions NUMERIC,
    total_net_salary NUMERIC,
    paid_count BIGINT,
    pending_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_employees,
        COALESCE(SUM(gross_salary), 0) as total_gross_salary,
        COALESCE(SUM(total_deductions), 0) as total_deductions,
        COALESCE(SUM(net_salary), 0) as total_net_salary,
        COUNT(CASE WHEN payment_status = 'PAID' THEN 1 END)::BIGINT as paid_count,
        COUNT(CASE WHEN payment_status = 'PENDING' THEN 1 END)::BIGINT as pending_count
    FROM payslips
    WHERE payroll_id = p_payroll_id AND deleted = false;
END;
$$ LANGUAGE plpgsql;

-- Function to audit employee changes
CREATE OR REPLACE FUNCTION audit_employee_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF NEW.status != OLD.status THEN
            RAISE NOTICE 'Employee % status changed from % to %', NEW.employee_code, OLD.status, NEW.status;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create audit trigger for employees
DROP TRIGGER IF EXISTS trigger_audit_employee ON employees;
CREATE TRIGGER trigger_audit_employee
    AFTER UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION audit_employee_changes();

COMMENT ON FUNCTION process_payroll_approval() IS 'Automatically updates payslip status and creates employee messages when payroll is approved';
COMMENT ON FUNCTION calculate_employee_salary(BIGINT, INTEGER, INTEGER) IS 'Calculates complete salary breakdown for an employee';
COMMENT ON FUNCTION get_payroll_summary(BIGINT) IS 'Returns summary statistics for a payroll period';
COMMENT ON FUNCTION audit_employee_changes() IS 'Audits changes to employee records';
