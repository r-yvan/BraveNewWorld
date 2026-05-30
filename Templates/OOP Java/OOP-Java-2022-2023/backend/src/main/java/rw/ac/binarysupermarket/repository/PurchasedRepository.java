package rw.ac.binarysupermarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import rw.ac.binarysupermarket.model.Purchased;
import rw.ac.binarysupermarket.dto.PurchaseReportDTO;
import java.util.List;

public interface PurchasedRepository extends JpaRepository<Purchased, Long> {
    @Query("SELECT new rw.ac.binarysupermarket.dto.PurchaseReportDTO(" +
           "p.id, c.firstname, p.date, p.productCode, pr.name, p.quantity, pr.price, p.total) " +
           "FROM Purchased p " +
           "JOIN Customer c ON p.customerId = c.id " +
           "JOIN Product pr ON p.productCode = pr.code " +
           "ORDER BY p.date DESC")
    List<PurchaseReportDTO> getPurchaseReport();
}
