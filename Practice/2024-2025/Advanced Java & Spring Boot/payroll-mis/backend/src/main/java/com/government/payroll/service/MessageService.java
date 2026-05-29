package com.government.payroll.service;

import com.government.payroll.dto.response.MessageResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.entity.Message;
import com.government.payroll.entity.User;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.mapper.MessageMapper;
import com.government.payroll.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for message operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MessageService {
  
  private final MessageRepository messageRepository;
  private final MessageMapper messageMapper;
  private final AuthService authService;
  
  /**
   * Get messages for current user
   */
  @Transactional(readOnly = true)
  public PageResponse<MessageResponse> getMyMessages(int page, int size) {
    log.info("Fetching messages for current user");
    
    User currentUser = authService.getCurrentUser();
    if (currentUser.getEmployee() == null) {
      throw new ResourceNotFoundException("Employee profile not found for current user");
    }
    
    Pageable pageable = PageRequest.of(page, size);
    Page<Message> messagePage = messageRepository.findByEmployeeId(
      currentUser.getEmployee().getId(), pageable);
    
    return buildPageResponse(messagePage);
  }
  
  /**
   * Get all messages (for admin/manager)
   */
  @Transactional(readOnly = true)
  public PageResponse<MessageResponse> getAllMessages(int page, int size) {
    log.info("Fetching all messages");
    
    Pageable pageable = PageRequest.of(page, size);
    Page<Message> messagePage = messageRepository.findAllActive(pageable);
    
    return buildPageResponse(messagePage);
  }
  
  /**
   * Build page response
   */
  private PageResponse<MessageResponse> buildPageResponse(Page<Message> messagePage) {
    return PageResponse.<MessageResponse>builder()
      .content(messagePage.getContent().stream()
        .map(messageMapper::toResponse)
        .toList())
      .page(messagePage.getNumber())
      .size(messagePage.getSize())
      .totalElements(messagePage.getTotalElements())
      .totalPages(messagePage.getTotalPages())
      .last(messagePage.isLast())
      .build();
  }
  
}
