package com.example.springboot.service;

import com.example.springboot.entity.Search;
import com.example.springboot.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private final SearchRepository searchRepository;

    public SearchService(SearchRepository searchRepository) {
        this.searchRepository = searchRepository;
    }

    public List<Search> search(String src, int take) {
        return searchRepository.search(src, take);
    }
}
