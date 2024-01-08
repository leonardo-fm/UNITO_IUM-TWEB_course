package com.example.springboot.dto;

import com.example.springboot.entity.Search;

public class SearchDto {

    private String id;
    private String name;
    private String entity;

    public SearchDto(Search search) {
        id = search.getId();
        name = search.getName();
        entity = search.getEntity();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }
}
