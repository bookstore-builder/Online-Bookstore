package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DataPage<T> {
    private List<T> objectList;
    private final Long total;
    private final Integer currentPage;
    private final Integer pageSize;

    public DataPage(List<T> object_list, Long _total, Integer current_page, Integer page_size) {
        objectList = object_list;
        total = _total;
        currentPage = current_page;
        pageSize = page_size;
    }

    public DataPage(Page<T> page) {
        objectList = page.toList();
        total = page.getTotalElements();
        currentPage = page.getPageable().getPageNumber();
        pageSize = page.getPageable().getPageSize();
    }

    public DataPage() {
        objectList = new ArrayList<>();
        total = 0L;
        currentPage = 0;
        pageSize = 0;
    }
}
