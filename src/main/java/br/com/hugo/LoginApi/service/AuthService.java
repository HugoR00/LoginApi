package br.com.hugo.LoginApi.service;

import br.com.hugo.LoginApi.dto.LoginRequest;
import br.com.hugo.LoginApi.dto.LoginResponse;
import br.com.hugo.LoginApi.dto.UserInfo;
import br.com.hugo.LoginApi.model.User;
import br.com.hugo.LoginApi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse authenticate(LoginRequest loginRequest) {
        try{
            if (loginRequest.getUsername() == null || loginRequest.getUsername().trim().isEmpty()) {
                return LoginResponse.builder()
                        .success(false)
                        .message("Por favor informe um nome de usuário")
                        .build();
            }
            if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                return LoginResponse.builder()
                        .success(false)
                        .message("Por favor informe uma senha")
                        .build();
            }

            Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername().trim());

            if(userOptional.isEmpty()){
                return LoginResponse.builder()
                        .success(false)
                        .message("Usuário não encontrado")
                        .build();
            }

            User user = userOptional.get();

            if (!user.getPassword().equals(loginRequest.getPassword())) {
                return LoginResponse.builder()
                        .success(false)
                        .message("A senha não está correta")
                        .build();
            }

            UserInfo userInfo = new UserInfo().builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .build();
            return LoginResponse.builder()
                    .success(true)
                    .message("Login efetuado com sucesso!")
                    .user(userInfo)
                    .build();

        }catch (Exception e){
            return LoginResponse.builder()
                    .success(false)
                    .message("Erro interno do servidor: " + e.getMessage())
                    .build();
        }
    }
}
