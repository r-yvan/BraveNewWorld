package rw.ac.binarysupermarket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.binarysupermarket.dto.AuthRequest;
import rw.ac.binarysupermarket.dto.AuthResponse;
import rw.ac.binarysupermarket.model.Customer;
import rw.ac.binarysupermarket.service.CustomerService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final CustomerService customerService;
    
    @PostMapping("/register")
    public ResponseEntity<Customer> register(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.register(customer));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(customerService.login(request));
    }
}
