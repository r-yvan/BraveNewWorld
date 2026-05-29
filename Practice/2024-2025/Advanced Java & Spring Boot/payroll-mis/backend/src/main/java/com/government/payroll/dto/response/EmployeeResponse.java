package com.government.payroll.dto.response;

import com.government.payroll.entity.enums.EmployeeStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for employee response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Employee response")
public class EmployeeResponse {

    @Schema(description = "Employee ID", example = "1")
    private Long id;

    @Schema(description = "First name", example = "John")
    private String firstName;

    @Schema(description = "Last name", example = "Doe")
    private String lastName;

    @Schema(description = "Full name", example = "John Doe")
    private String fullName;

    @Schema(description = "Email", example = "john.doe@gov.rw")
    private String email;

    @Schema(description = "District", example = "Kigali")
    private String district;

    @Schema(description = "Mobile", example = "+250788123456")
    private String mobile;

    @Schema(description = "Date of birth", example = "1990-01-15")
    private LocalDate dateOfBirth;

    @Schema(description = "Employee code", example = "EMP001")
    private String employeeCode;

    @Schema(description = "Joining date", example = "2020-01-01")
    private LocalDate joiningDate;

    @Schema(description = "Status", example = "ACTIVE")
    private EmployeeStatus status;

    @Schema(description = "Department", example = "Finance")
    private String department;

    @Schema(description = "Position", example = "Accountant")
    private String position;

    @Schema(description = "Base salary", example = "500000")
    private BigDecimal baseSalary;

}
