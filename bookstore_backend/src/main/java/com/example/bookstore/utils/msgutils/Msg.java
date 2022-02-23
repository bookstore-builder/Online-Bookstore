package  com.example.bookstore.utils.msgutils;

public class Msg<T> {
    private long code;
    private String message;
    private T data;

    protected  Msg() {}

    protected  Msg(long code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> Msg<T> success(T data) {
        return new Msg<T>(MsgCode.SUCCESS.getCode(), MsgCode.SUCCESS.getMessage(), data);
    }

    public static <T> Msg<T> success(T data, String message) {
        return new Msg<T> (MsgCode.SUCCESS.getCode(), message, data);
    }

    public static <T> Msg<T> failed(String message) {
        return new Msg<T>(MsgCode.FAILED.getCode(), message, null);
    }

    public static <T> Msg<T> failed() {
        return new Msg<T> (MsgCode.FAILED.getCode(), MsgCode.FAILED.getMessage(), null);
    }

    public static <T> Msg<T> validateFailed() {
        return new Msg<T> (MsgCode.VALIDATE_FAILED.getCode(), MsgCode.VALIDATE_FAILED.getMessage(), null);
    }

    public static <T> Msg<T> validateFailed(String message) {
        return new Msg<T> (MsgCode.VALIDATE_FAILED.getCode(), message, null);
    }

    public static <T> Msg<T> unauthorized() {
        return new Msg<T>(MsgCode.UNAUTHORIZED.getCode(), MsgCode.UNAUTHORIZED.getMessage(), null);
    }

    public static <T> Msg<T> unauthorized(T data) {
        return new Msg<T>(MsgCode.UNAUTHORIZED.getCode(), MsgCode.UNAUTHORIZED.getMessage(), data);
    }

    public static <T> Msg<T> forbidden(T data) {
        return new Msg<T>(MsgCode.FORBIDDEN.getCode(), MsgCode.FORBIDDEN.getMessage(), data);
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}