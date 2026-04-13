package com.joaoteste.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // -------------------------------------------------
    // AMBIENTE DE DESENVOLVIMENTO (DEV)
    // -------------------------------------------------

    //NOTA IMPORTANTE: Esta configuração de segurança é extremamente permissiva e esta sendo usada apenas em ambientes de desenvolvimento.

    @Bean
    public SecurityFilterChain devSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());
            
        
        System.out.println(">>> SECURITY DEV CONFIG ATIVA <<<");
        

        return http.build();
    }

    @Bean
    @Profile("prod") 
    public SecurityFilterChain prodSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() 
                .anyRequest().authenticated()            
            )
            .httpBasic(basic -> {}); 

        return http.build();
    }
}