package br.com.hugo.LoginApi.dto;


import br.com.hugo.LoginApi.model.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserInfo { //Uma versão segura do user, para exposição dos dados sem risco
    private Long id;
    private String username;
    private String email;

    //Construtor a partir do user, para expor as informações não sensíveis, por isso password não é destacado nem com arg
    //e nem como parâmetro do construtor
    public UserInfo(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
