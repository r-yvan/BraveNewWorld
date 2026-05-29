package com.government.payroll.dto.request;

import com.government.payroll.entity.enums.EmployeeStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for employee creation/update request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Employee request payload")
public class EmployeeRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    @Schema(description = "Employee first name", example = "John")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    @Schema(description = "Employee last name", example = "Doe")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Schema(description = "Employee email", example = "john.doe@gov.rw")
    private String email;

    @Size(max = 100, message = "District must not exceed 100 characters")
    @Schema(description = "Employee district", example = "Kigali")
    private String district;

    @Size(max = 20, message = "Mobile must not exceed 20 characters")
    @Schema(description = "Employee mobile number", example = "+250788123456")
    private String mobile;

    @Past(message = "Date of birth must be in the past")
    @Schema(description = "Employee date of birth", example = "1990-01-15")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Employee code is required")
    @Size(max = 50, message = "Employee code must not exceed 50 characters")
    @Schema(description = "Unique employee code", example = "EMP001")
    private String employeeCode;

    @NotNull(message = "Joining date is required")
    @Schema(description = "Employee joining date", example = "2020-01-01")
    private LocalDate joiningDate;

    @Schema(description = "Employee status", example = "ACTIVE")
    private EmployeeStatus status;

    @NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department must not exceed 100 characters")
    @Schema(description = "Employee department", example = "Finance")
    private String department;

    @NotBlank(message = "Position is required")
    @Size(max = 100, message = "Position must not exceed 100 characters")
    @Schema(description = "Employee position", example = "Accountant")
    private String position;

    @NotNull(message = "Base salary is required")
    @Positive(message = "Base salary must be positive")
    @Schema(description = "Employee base salary", example = "500000")
    private BigDecimal baseSalary;

}
