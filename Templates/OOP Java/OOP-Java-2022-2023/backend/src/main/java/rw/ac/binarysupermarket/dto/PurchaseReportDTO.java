package rw.ac.binarysupermarket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PurchaseReportDTO {
    private Long no;
    private String customerName;
    private LocalDate date;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double unitPrice;
    private Double total;
}
