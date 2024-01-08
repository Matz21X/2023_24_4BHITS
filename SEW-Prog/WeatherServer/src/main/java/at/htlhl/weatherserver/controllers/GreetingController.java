package at.htlhl.weatherserver.controllers;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weatherserver/greetings")
public class GreetingController {
    public final static String JSON_STRING = """
            {
            "type": "greeting",
            "value": "Hello ${name}"
            }
            """;

    @GetMapping(value = "/hello", produces = "application/json")
    @Operation(summary = "say hello to the given name")
    @ResponseStatus(HttpStatus.OK)
    public String sayHello(@RequestParam(defaultValue = "World") String name) {

        return JSON_STRING.replace("${name}", name);
    }

    /**
     * Alternative Implementation
     */
    @GetMapping(value = "/hello/{name}", produces = "application/json")
    @Operation(summary = "say hello to the given name")
    @ResponseStatus(HttpStatus.OK)
    public String sayHelloAlternative(@PathVariable String name){
        return JSON_STRING.replace("${name}", name);
    }

}
