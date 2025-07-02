
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard.js carregado');

    // ✅ VERIFICAÇÃO DE AUTENTICAÇÃO MAIS ROBUSTA
    const userData = localStorage.getItem('userData');

    if (!userData) {
        console.log('Sem dados de usuário, redirecionando para login...');
        window.location.replace('index.html');
        return;
    }

    let userInfo;
    try {
        userInfo = JSON.parse(userData);
        console.log('Dados do usuário carregados:', userInfo);

        // Verificar se o login foi bem-sucedido
        if (!userInfo.success || !userInfo.username) {
            throw new Error('Dados de usuário inválidos');
        }
    } catch (e) {
        console.error('Erro ao parsear dados do usuário:', e);
        localStorage.removeItem('userData');
        window.location.replace('index.html');
        return;
    }

    // Elementos do DOM
    const welcomeMessage = document.getElementById('welcomeMessage');
    const currentUser = document.getElementById('currentUser');
    const lastLogin = document.getElementById('lastLogin');
    const sessionTime = document.getElementById('sessionTime');
    const logoutBtn = document.getElementById('logoutBtn');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');

    // Verificar se elementos existem
    console.log('Elementos encontrados:', {
        welcomeMessage: !!welcomeMessage,
        currentUser: !!currentUser,
        lastLogin: !!lastLogin,
        sessionTime: !!sessionTime,
        logoutBtn: !!logoutBtn
    });

    // Variáveis de controle
    let sessionStart = new Date();
    let sessionTimer;

    // Carregar dados do usuário
    loadUserData();

    // Inicializar dashboard
    initializeDashboard();

    // Event listeners
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Função para carregar dados do usuário
    function loadUserData() {
        const username = userInfo.username || 'Usuário';

        // Atualizar interface
        if (currentUser) currentUser.textContent = username;
        if (welcomeMessage) welcomeMessage.textContent = `Bem-vindo, ${username}!`;

        // Definir último login
        const loginTime = userInfo.loginTime ? new Date(userInfo.loginTime) : new Date();
        const lastLoginTime = loginTime.toLocaleString('pt-BR');
        if (lastLogin) lastLogin.textContent = lastLoginTime;

        console.log('Interface atualizada com dados do usuário');
    }

    // Função para inicializar o dashboard
    function initializeDashboard() {
        // Iniciar contador de tempo de sessão
        startSessionTimer();

        console.log('Dashboard inicializado com sucesso');
    }

    // Função para iniciar timer da sessão
    function startSessionTimer() {
        // Atualizar imediatamente
        updateSessionTime();

        // Depois atualizar a cada minuto
        sessionTimer = setInterval(updateSessionTime, 60000);
    }

    // Função para atualizar tempo de sessão
    function updateSessionTime() {
        const now = new Date();
        const diffInMinutes = Math.floor((now - sessionStart) / (1000 * 60));
        if (sessionTime) {
            sessionTime.textContent = diffInMinutes;
        }
    }

    // Função de logout
    function logout() {
        console.log('Fazendo logout...');

        // Limpar timer
        if (sessionTimer) {
            clearInterval(sessionTimer);
        }

        // Limpar dados locais
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');

        console.log('Dados limpos, redirecionando para login...');

        // Redirecionar para login
        window.location.replace('index.html');
    }

    // Função para mostrar modal
    function showModal(title, content) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        if (modal) modal.style.display = 'block';
    }

    // Função para fechar modal
    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    // Funções das ações dos botões
    window.showProfile = function() {
        const username = userInfo.username || 'Usuário';
        const content = `
            <div class="profile-info">
                <p><strong>Nome de usuário:</strong> ${username}</p>
                <p><strong>Tipo de conta:</strong> Usuário Padrão</p>
                <p><strong>Data de criação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Status:</strong> <span style="color: green;">Ativo</span></p>
            </div>
        `;
        showModal('Perfil do Usuário', content);
    };

    window.changePassword = function() {
        const content = `
            <form id="changePasswordForm">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Senha atual:</label>
                    <input type="password" id="currentPassword" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" required>
                </div>
                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Nova senha:</label>
                    <input type="password" id="newPassword" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" required>
                </div>
                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Confirmar nova senha:</label>
                    <input type="password" id="confirmPassword" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;" required>
                </div>
                <button type="submit" style="background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                    Alterar Senha
                </button>
            </form>
        `;
        showModal('Alterar Senha', content);

        // Adicionar listener para o formulário
        setTimeout(() => {
            const form = document.getElementById('changePasswordForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const currentPassword = document.getElementById('currentPassword').value;
                    const newPassword = document.getElementById('newPassword').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;

                    if (newPassword !== confirmPassword) {
                        alert('As senhas não coincidem!');
                        return;
                    }

                    // Simular mudança de senha
                    alert('Senha alterada com sucesso!');
                    closeModal();
                });
            }
        }, 100);
    };

    window.viewLogs = function() {
        const content = `
            <div class="logs-container">
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <strong>${new Date().toLocaleString('pt-BR')}</strong> - Login realizado
                </div>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <strong>${new Date(Date.now() - 86400000).toLocaleString('pt-BR')}</strong> - Logout realizado
                </div>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <strong>${new Date(Date.now() - 172800000).toLocaleString('pt-BR')}</strong> - Login realizado
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 15px;">
                    Mostrando os últimos 3 eventos
                </p>
            </div>
        `;
        showModal('Logs de Atividade', content);
    };
});