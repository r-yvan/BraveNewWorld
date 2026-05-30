package rw.ac.binarysupermarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.ac.binarysupermarket.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
