package com.rathnaproducts.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitConfig extends OncePerRequestFilter {
    
    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> requestTimes = new ConcurrentHashMap<>();
    
    private static final int MAX_REQUESTS_PER_MINUTE = 100;
    private static final long TIME_WINDOW = 60000; // 1 minute in milliseconds

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String clientIp = getClientIp(request);
        long currentTime = System.currentTimeMillis();
        
        // Clean up old entries
        requestTimes.entrySet().removeIf(entry -> currentTime - entry.getValue() > TIME_WINDOW);
        requestCounts.entrySet().removeIf(entry -> !requestTimes.containsKey(entry.getKey()));
        
        // Check rate limit
        AtomicInteger count = requestCounts.computeIfAbsent(clientIp, k -> new AtomicInteger(0));
        Long firstRequestTime = requestTimes.computeIfAbsent(clientIp, k -> currentTime);
        
        if (currentTime - firstRequestTime < TIME_WINDOW) {
            if (count.incrementAndGet() > MAX_REQUESTS_PER_MINUTE) {
                response.setStatus(429);
                response.getWriter().write("Rate limit exceeded. Please try again later.");
                return;
            }
        } else {
            // Reset counter for new time window
            requestTimes.put(clientIp, currentTime);
            requestCounts.put(clientIp, new AtomicInteger(1));
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}