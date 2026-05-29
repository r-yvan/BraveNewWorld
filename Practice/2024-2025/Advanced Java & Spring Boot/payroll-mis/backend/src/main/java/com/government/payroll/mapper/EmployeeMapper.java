package com.government.payroll.mapper;

import com.government.payroll.dto.request.EmployeeRequest;
import com.government.payroll.dto.response.EmployeeResponse;
import com.government.payroll.entity.Employee;
import org.mapstruct.*;

/**
 * MapStruct mapper for Employee entity
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EmployeeMapper {

    @Mapping(target = "fullName", expression = "java(employee.getFullName())")
    @Mapping(target = "department", source = "employee.employment.department")
    @Mapping(target = "position", source = "employee.employment.position")
    @Mapping(target = "baseSalary", source = "employee.employment.baseSalary")
    EmployeeResponse toResponse(Employee employee);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "employment", ignore = true)
    @Mapping(target = "payslips", ignore = true)
    @Mapping(target = "messages", ignore = true)
    Employee toEntity(EmployeeRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "employment", ignore = true)
    @Mapping(target = "payslips", ignore = true)
    @Mapping(target = "messages", ignore = true)
    void updateEntity(EmployeeRequest request, @MappingTarget Employee employee);

}
