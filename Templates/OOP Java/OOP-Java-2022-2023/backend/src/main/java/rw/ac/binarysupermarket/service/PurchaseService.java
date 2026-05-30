package rw.ac.binarysupermarket.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.ac.binarysupermarket.dto.CartItemDTO;
import rw.ac.binarysupermarket.dto.CheckoutRequest;
import rw.ac.binarysupermarket.dto.PurchaseReportDTO;
import rw.ac.binarysupermarket.model.Customer;
import rw.ac.binarysupermarket.model.Product;
import rw.ac.binarysupermarket.model.Purchased;
import rw.ac.binarysupermarket.repository.CustomerRepository;
import rw.ac.binarysupermarket.repository.ProductRepository;
import rw.ac.binarysupermarket.repository.PurchasedRepository;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchasedRepository purchasedRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    
    @Transactional
    public void checkout(String email, CheckoutRequest request) {
        Customer customer = customerRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        for (CartItemDTO item : request.getItems()) {
            Product product = productRepository.findById(item.getProductCode())
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            if (product.getAvailableQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName());
            }
            
            Purchased purchased = new Purchased();
            purchased.setProductCode(product.getCode());
            purchased.setCustomerId(customer.getId());
            purchased.setQuantity(item.getQuantity());
            purchased.setTotal(product.getPrice() * item.getQuantity());
            purchased.setDate(LocalDate.now());
            
            product.setAvailableQuantity(product.getAvailableQuantity() - item.getQuantity());
            productRepository.save(product);
            purchasedRepository.save(purchased);
        }
    }
    
    public List<PurchaseReportDTO> getReport() {
        return purchasedRepository.getPurchaseReport();
    }
}
