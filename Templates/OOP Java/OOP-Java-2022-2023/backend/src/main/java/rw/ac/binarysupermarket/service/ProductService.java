package rw.ac.binarysupermarket.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.ac.binarysupermarket.model.Product;
import rw.ac.binarysupermarket.model.Quantity;
import rw.ac.binarysupermarket.repository.ProductRepository;
import rw.ac.binarysupermarket.repository.QuantityRepository;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final QuantityRepository quantityRepository;
    
    public Product createProduct(Product product) {
        product.setInDate(LocalDate.now());
        return productRepository.save(product);
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    
    @Transactional
    public Quantity addQuantity(Quantity quantity) {
        Product product = getProductById(quantity.getProductCode());
        quantity.setDate(LocalDate.now());
        
        if ("ADD".equalsIgnoreCase(quantity.getOperation())) {
            product.setAvailableQuantity(product.getAvailableQuantity() + quantity.getQuantity());
        } else if ("REMOVE".equalsIgnoreCase(quantity.getOperation())) {
            product.setAvailableQuantity(product.getAvailableQuantity() - quantity.getQuantity());
        }
        
        productRepository.save(product);
        return quantityRepository.save(quantity);
    }
}
