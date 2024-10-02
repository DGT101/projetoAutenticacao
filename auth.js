class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Auth {
    constructor() {
        this.users = [];
    }

    // Método para registrar usuário
    registerUser(name, email, password) {
        if (this.isEmailRegistered(email)) {
            this.showError("O e-mail já está registrado.");
            return false;
        }
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        alert("Usuário cadastrado com sucesso!");
        return true;
    }

    // Método para verificar se o e-mail já está cadastrado
    isEmailRegistered(email) {
        return this.users.some(user => user.email === email);
    }

    // Método para login de usuário
    loginUser(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login bem-sucedido!");
            window.location.href = "main.html";  // Redireciona para página principal
        } else {
            this.showError("E-mail ou senha inválidos.");
        }
    }

    // Método para validar senhas
    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Exibe mensagem de erro
    showError(message) {
        alert(message);
    }
}

// Instância de Auth
const auth = new Auth();

// Lógica de Cadastro
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (auth.validatePassword(password, confirmPassword)) {
        auth.registerUser(name, email, password);
        document.getElementById("registerForm").reset(); // Limpa o formulário
    } else {
        auth.showError("As senhas não coincidem.");
    }
});

// Lógica de Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.loginUser(email, password);
});
