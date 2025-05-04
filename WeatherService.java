package com.example.usermanagementapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class WeatherService {
    
    private final RestTemplate restTemplate;
    
    @Value("${weather.api.url}")
    private String weatherApiUrl;
    
    @Value("${weather.api.key}")
    private String weatherApiKey;

    public Object getWeatherForCity(String city) {
        String url = String.format("%s/current.json?key=%s&q=%s", weatherApiUrl, weatherApiKey, city);
        return restTemplate.getForObject(url, Object.class);
    }
}
