package at.htlhl.httpclientdemo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {
    private int id;
    private String name;

    @JsonProperty("self_link")
    private String productUrl;

    public Product() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProductUrl() {
        return productUrl;
    }

    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    @Override
    public String toString() {
        return "Product:" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", productUrl='" + productUrl + '\'';
    }
}
