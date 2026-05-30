package rw.ac.binarysupermarket.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.ac.binarysupermarket.dto.AuthRequest;
import rw.ac.binarysupermarket.dto.AuthResponse;
import rw.ac.binarysupermarket.model.Customer;
import rw.ac.binarysupermarket.repository.CustomerRepository;
import rw.ac.binarysupermarket.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public Customer register(Customer customer) {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }
    
    public AuthResponse login(AuthRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(customer.getEmail());
        return new AuthResponse(token, customer.getEmail(), customer.getFirstname());
    }
}
