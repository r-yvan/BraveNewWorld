package com.government.payroll.util;

import com.government.payroll.entity.Payslip;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for generating PDF documents
 * Note: This is a simplified implementation. For production, use iText or similar library.
 */
@Slf4j
@Component
public class PdfGenerator {

    /**
     * Generate payslip PDF
     */
    public byte[] generatePayslipPdf(Payslip payslip) {
        log.info("Generating PDF for payslip ID: {}", payslip.getId());

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            
            // Create PDF content (simplified HTML-like format)
            StringBuilder content = new StringBuilder();
            content.append("GOVERNMENT ERP PAYROLL SYSTEM\n");
            content.append("PAYSLIP\n\n");
            content.append("=".repeat(60)).append("\n\n");
            
            content.append("Employee Information:\n");
            content.append(String.format("Name: %s\n", payslip.getEmployee().getFullName()));
            content.append(String.format("Employee Code: %s\n", payslip.getEmployee().getEmployeeCode()));
            content.append(String.format("Department: %s\n", 
                    payslip.getEmployee().getEmployment().getDepartment()));
            content.append(String.format("Position: %s\n\n", 
                    payslip.getEmployee().getEmployment().getPosition()));
            
            content.append("Payroll Period:\n");
            content.append(String.format("Month/Year: %d/%d\n\n", 
                    payslip.getPayroll().getMonth(), payslip.getPayroll().getYear()));
            
            content.append("=".repeat(60)).append("\n\n");
            
            content.append("Earnings:\n");
            content.append(String.format("Base Salary: %,.2f RWF\n", payslip.getBaseSalary()));
            content.append(String.format("House Allowance: %,.2f RWF\n", payslip.getHouseAmount()));
            content.append(String.format("Transport Allowance: %,.2f RWF\n", payslip.getTransportAmount()));
            content.append(String.format("Gross Salary: %,.2f RWF\n\n", payslip.getGrossSalary()));
            
            content.append("Deductions:\n");
            content.append(String.format("Employee Tax: %,.2f RWF\n", payslip.getEmployeeTax()));
            content.append(String.format("Pension: %,.2f RWF\n", payslip.getPension()));
            content.append(String.format("Medical Insurance: %,.2f RWF\n", payslip.getMedicalInsurance()));
            content.append(String.format("Others: %,.2f RWF\n", payslip.getOthers()));
            content.append(String.format("Total Deductions: %,.2f RWF\n\n", payslip.getTotalDeductions()));
            
            content.append("=".repeat(60)).append("\n\n");
            
            content.append(String.format("NET SALARY: %,.2f RWF\n\n", payslip.getNetSalary()));
            
            content.append("=".repeat(60)).append("\n\n");
            
            content.append(String.format("Payment Status: %s\n", payslip.getPaymentStatus()));
            content.append(String.format("Generated: %s\n", 
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))));
            
            // Convert to bytes (in production, use proper PDF library)
            baos.write(content.toString().getBytes());
            
            log.info("PDF generated successfully for payslip ID: {}", payslip.getId());
            return baos.toByteArray();
            
        } catch (Exception e) {
            log.error("Error generating PDF for payslip ID: {}", payslip.getId(), e);
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

}
