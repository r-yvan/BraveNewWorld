package rw.ac.binarysupermarket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rw.ac.binarysupermarket.dto.CheckoutRequest;
import rw.ac.binarysupermarket.dto.PurchaseReportDTO;
import rw.ac.binarysupermarket.service.PurchaseService;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;
    
    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody CheckoutRequest request, 
                                          Authentication authentication) {
        purchaseService.checkout(authentication.getName(), request);
        return ResponseEntity.ok("Checkout successful");
    }
    
    @GetMapping("/report")
    public ResponseEntity<List<PurchaseReportDTO>> getReport() {
        return ResponseEntity.ok(purchaseService.getReport());
    }
}
