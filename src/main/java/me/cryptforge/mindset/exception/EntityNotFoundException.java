package me.cryptforge.mindset.exception;

public class EntityNotFoundException extends Exception {

    private final String type;

    public EntityNotFoundException(String type) {
        super("No " + type + " with that id could be found!");
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
