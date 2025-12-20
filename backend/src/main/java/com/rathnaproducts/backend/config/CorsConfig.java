package com.rathnaproducts.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(
                List.of("http://203.57.85.97", "http://rathnaproducts.store", "http://localhost:5173/")); // frontend
                                                                                                          // domains
        config.addAllowedHeader("*");
        config.addAllowedMethod("*"); // GET, POST, PUT, DELETE, OPTIONS
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
