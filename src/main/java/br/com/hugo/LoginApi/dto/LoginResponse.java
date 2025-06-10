package br.com.hugo.LoginApi.dto;

import lombok.*;


@Getter
@Setter
@Builder
public class LoginResponse { //"Envelope" que passa o retorno/resposta ao front
    //1. Padronização: O frontend sempre recebe o mesmo formato
    //2. Clareza: É fácil saber se deu certo ou errado
    //3. Flexibilidade: Pode carregar dados do usuário OU mensagem de erro

    private boolean success;
    private String message;
    private UserInfo user;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public LoginResponse(boolean success, String message, UserInfo user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    public static LoginResponse success(String message, UserInfo user) {
        return new LoginResponse(true, message, user);
    }

    public static LoginResponse error(String message) {
        return new LoginResponse(false, message);
    }

}
