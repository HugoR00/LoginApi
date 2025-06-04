package br.com.hugo.LoginApi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequest { //Recebe os dados do usuário

    @NotBlank(message = "Por favor, informe o login")
    @Size(min = 3, max = 50, message = "O username deve ter entre 3 e 50 caracteres")
    private String username;

    @NotBlank(message = "Por favor, informe sua senha")
    @Size(min = 3, max = 50, message = "O password deve ter entre 3 e 50 caracteres")
    private String password;

}
