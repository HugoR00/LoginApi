// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const loginBtn = document.getElementById('login-btn');


    // Função para mostrar mensagens
    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
        }
    }

    // Função para esconder mensagens
    function hideMessage() {
        if (messageDiv) {
            messageDiv.style.display = 'none';
            messageDiv.className = 'message';
        }
    }

    // Função para mostrar loading
    function showLoading() {
        if (loginBtn) {
            loginBtn.innerHTML = '<span class="loading"></span>Entrando...';
            loginBtn.disabled = true;
        }
    }

    // Função para esconder loading
    function hideLoading() {
        if (loginBtn) {
            loginBtn.innerHTML = 'Entrar';
            loginBtn.disabled = false;
        }
    }

    // Capturar submit do formulário
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Esconder mensagens anteriores
            hideMessage();

            // Obter dados do formulário
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Validação básica
            if (!username || !password) {
                showMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }

            // Mostrar loading
            showLoading();

            try {
                console.log('Fazendo requisição de login...');

                // Fazer requisição POST para API
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                console.log('Response status:', response.status);

                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok && data.success) {
                    // Login bem-sucedido
                    showMessage('Login realizado com sucesso!', 'success');

                    // ✅ SALVAR DADOS DO USUÁRIO
                    const userData = {
                        username: username,
                        loginTime: new Date().toISOString(),
                        success: true
                    };

                    localStorage.setItem('userData', JSON.stringify(userData));
                    console.log('Dados salvos no localStorage:', userData);


                    // ✅ GARANTIR REDIRECIONAMENTO
                    setTimeout(() => {
                        console.log('Redirecionando para dashboard...');
                        window.location.replace('dashboard.html'); // usar replace em vez de href
                    }, 1500);

                } else {
                    // Erro de login
                    const errorMessage = data.message || 'Credenciais inválidas.';
                    showMessage(errorMessage, 'error');
                    console.error('Erro de login:', errorMessage);
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                showMessage('Erro de conexão. Tente novamente.', 'error');
            } finally {
                // Esconder loading
                hideLoading();
            }
        });
    }

    // ✅ ADICIONAR LOGS PARA DEBUG
    console.log('Login.js carregado com sucesso');
    console.log('Elementos encontrados:', {
        loginForm: !!loginForm,
        messageDiv: !!messageDiv,
        loginBtn: !!loginBtn
    });
});