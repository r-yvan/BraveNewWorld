package com.government.payroll.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for deduction response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Deduction response")
public class DeductionResponse {

    @Schema(description = "Deduction ID", example = "1")
    private Long id;

    @Schema(description = "Deduction name", example = "EmployeeTax")
    private String deductionName;

    @Schema(description = "Percentage", example = "30.0")
    private BigDecimal percentage;

    @Schema(description = "Description", example = "Employee tax deduction")
    private String description;

    @Schema(description = "Is active", example = "true")
    private Boolean isActive;

}
