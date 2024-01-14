package com.example.springboot.controller;

import com.example.springboot.dto.SearchDto;
import com.example.springboot.entity.Search;
import com.example.springboot.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/utils")
public class UtilsController {

    @Autowired
    private final SearchService searchService;

    public UtilsController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/healthCheck")
    @Operation(summary = "Return a health check")
    public ResponseEntity<Date> HealthCheck() {
        try {
            return new ResponseEntity(new Date(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Return a global search", description = "A search that look fro Players, Competitions and Clubs name")
    public ResponseEntity<List<SearchDto>> Search(@RequestParam(name = "src") String src, @RequestParam(name = "take") int take) {
        try {
            List<Search> results = searchService.search(src, take);
            List<SearchDto> response = new ArrayList<>();
            for (Search result : results) response.add(new SearchDto(result));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
