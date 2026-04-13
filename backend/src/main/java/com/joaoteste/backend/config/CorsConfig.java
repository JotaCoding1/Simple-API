package com.joaoteste.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
    

    //NOTA IMPORTANTE: O CORS foi desativado neste projeto para facilitar o desenvolvimento local. Em um ambiente de produção, 
    // é crucial configurar o CORS adequadamente para garantir a segurança da aplicação.
    @Override
    public void addCorsMappings(CorsRegistry registry){

        registry.addMapping("/api/**") 
                .allowedOrigins("http://localhost:5173") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
                .allowedHeaders("*"); 

    }


}
