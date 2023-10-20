package com.hackathon.server.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringGlobalConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("*");
    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("profilePhoto/**")
//                .addResourceLocations(PropertiesConfig.getResourceHandlerUrl())
//                .setCachePeriod(0);
//    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/profilePhoto/**")
                .addResourceLocations("file:/Users/tarekahmed/Documents/bnta_work/PeregrineHack/profilePhoto/")
                .setCachePeriod(0);
    }
}
