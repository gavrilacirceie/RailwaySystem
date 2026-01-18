package org.platforma.railwaysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class RailwaySystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(RailwaySystemApplication.class, args);
    }

}
