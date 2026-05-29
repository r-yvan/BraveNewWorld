package com.government.payroll.mapper;

import com.government.payroll.dto.response.PayslipResponse;
import com.government.payroll.entity.Payslip;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper for Payslip entity
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PayslipMapper {

    @Mapping(target = "employeeName", expression = "java(payslip.getEmployee().getFullName())")
    @Mapping(target = "employeeCode", source = "employee.employeeCode")
    @Mapping(target = "month", source = "payroll.month")
    @Mapping(target = "year", source = "payroll.year")
    PayslipResponse toResponse(Payslip payslip);

}
