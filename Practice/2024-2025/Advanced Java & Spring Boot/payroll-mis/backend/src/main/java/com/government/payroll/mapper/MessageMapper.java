package com.government.payroll.mapper;

import com.government.payroll.dto.response.MessageResponse;
import com.government.payroll.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper for Message entity
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MessageMapper {

    @Mapping(target = "employeeName", expression = "java(message.getEmployee().getFullName())")
    MessageResponse toResponse(Message message);

}
