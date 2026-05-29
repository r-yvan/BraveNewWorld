package com.government.payroll.mapper;

import com.government.payroll.dto.response.DeductionResponse;
import com.government.payroll.entity.Deduction;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper for Deduction entity
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeductionMapper {

    DeductionResponse toResponse(Deduction deduction);

}
