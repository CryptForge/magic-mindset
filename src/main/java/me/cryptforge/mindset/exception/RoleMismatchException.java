package me.cryptforge.mindset.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class RoleMismatchException extends ResponseStatusException {

    public RoleMismatchException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
