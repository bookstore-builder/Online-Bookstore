package  com.example.bookstore.utils.msgutils;

public enum MsgCode {

    SUCCESS(200, "操作成功"),
    FAILED(500, "操作失败"),
    VALIDATE_FAILED(404, "参数检查错误"),
    UNAUTHORIZED(401, "用户未登录"),
    FORBIDDEN(403, "无相关权限");

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
