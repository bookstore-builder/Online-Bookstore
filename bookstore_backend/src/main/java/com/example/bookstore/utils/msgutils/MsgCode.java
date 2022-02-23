package  com.example.bookstore.utils.msgutils;

public enum MsgCode {

    SUCCESS(200, "Operation Success"),
    FAILED(500, "Operation Failed"),
    VALIDATE_FAILED(404, "Parameter Check Failed"),
    UNAUTHORIZED(401, "Not Logged In or Token Has Expired"),
    FORBIDDEN(403, "No Related Permission");

    private final long code;
    private final String message;

    MsgCode(long code, String message) {
        this.code = code;
        this.message = message;
    }

    public long getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
