package me.cryptforge.mindset.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EntityNotFoundException extends ResponseStatusException {

    private final String type;

    public EntityNotFoundException(String type) {
        super(HttpStatus.NOT_FOUND, "No " + type + " with that id could be found!");
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
