package com.government.payroll.mapper;

import com.government.payroll.dto.response.PayrollResponse;
import com.government.payroll.entity.Payroll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper for Payroll entity
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PayrollMapper {

    @Mapping(target = "payslipCount", expression = "java(payroll.getPayslips() != null ? payroll.getPayslips().size() : 0)")
    PayrollResponse toResponse(Payroll payroll);

}
