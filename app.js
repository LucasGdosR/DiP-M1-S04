const contas = [];

const cadastro = document.getElementsByClassName('cadastro');

const operacao = document.getElementsByClassName('operacao');

const salvarFormulario = () => {
    if (!validaDados()) return;
    const cliente = {
        nome: cadastro[0].value,
        cpf: cadastro[1].value,
        celular: cadastro[2].value,
        senha: cadastro[3].value,
        conta: Math.floor(1000 + Math.random() * 90000),
        saldo: 0,
    };
    contas.push(cliente);
    alert(`Cadastro efetuado com sucesso. Número da conta: ${cliente.conta}.`);
}

const validaDados = () => {
    if (!validaNome()) return;
    if (!validaCPF()) return;
    if (!validaCelular()) return;
    if (!validaSenha()) return;
    return true;
}

const validaNome = () => {
    if (cadastro[0].value.length == 0) {
        alert("Preencha o nome.")
        return;
    }
    return true;
}

const validaCPF = () => {
    const cpf = cadastro[1].value;
    if (cpf === undefined) {
        alert("Preencha o CPF.")
        return;
    }
    if (
        (cpf.length != 14) ||
        (cpf.charAt(3) != '.') ||
        (cpf.charAt(7) != '.') ||
        (cpf.charAt(11) != '-') ||
        (isNaN(cpf.slice(0, 3))) ||
        (isNaN(cpf.slice(4, 7))) ||
        (isNaN(cpf.slice(8, 11))) ||
        (isNaN(cpf.slice(12)))
    ) {
        alert('CPF inválido. Use o formato "999.999.999-99".');
        return;
    }
    return true;
}

const validaCelular = () => {
    const celular = cadastro[2].value;
    if (celular === undefined) {
        alert("Preencha o celular.")
        return;
    }
    if (
        (celular.length != 14) ||
        (celular.charAt(0) != '(') ||
        (celular.charAt(3) != ')') ||
        (celular.charAt(9) != '-') ||
        (isNaN(celular.slice(1, 3))) ||
        (isNaN(celular.slice(4, 9))) ||
        (isNaN(celular.slice(10)))
    ) {
        alert('Celular inválido. Use o formato "(99)99999-9999".');
        return;
    }
    return true;
}

const validaSenha = () => {
    if (cadastro[3].value.length == 0) {
        alert('Preencha a senha.');
        return;
    }
    if (cadastro[3].value != cadastro[4].value) {
        alert('Senhas são diferentes. Insira a mesma senha nos dois campos.');
        return;
    }
    return true;
}

const limparCadastro = () => {
    for (input of cadastro) {input.value = ''};
}

const desativarValor = () => {
    const valor = document.getElementById('valor');
    if (document.getElementById('operacao').value == 'consulta') {
        valor.value = "";
        valor.disabled = true;
    } else {valor.disabled = false;}
}

const limparOperacao = () => {
    for (input of operacao) {input.value = ''};
}

const sacar = () => {

}

const consultar = (acc) => {
    for (conta of contas) {
        if (conta.conta == acc) {
            alert(`Seu saldo é de R$${conta.saldo}.`);
            break;
        }
    }
}

const depositar = (acc, valor) => {
    if (valor < 0) {
        alert("Valor inválido.");
        return;
    }
    for (conta of contas) {
        if (conta.conta == acc) {
            conta.saldo += parseFloat(valor);
            alert(`Depósito realizado com sucesso. Seu saldo é de R$${conta.saldo}.`);
            break;
        }
    }
}

const executar = () => {
    const acc = document.getElementById('conta').value;
    const valor = document.getElementById('valor').value;
    const password = document.getElementById('senha').value;
    for (account of contas) {
        if (account.conta == acc) {
            if (password == account.senha) {
                switch (document.getElementById('operacao').value) {
                    case 'saque':
                        sacar(acc, valor);
                        return;
                    case 'deposito':
                        depositar(acc, valor);
                        return;
                    case 'consulta':
                        consultar(acc);
                        return;
                }
            }
        }
    }
    alert("Combinação inválida de conta e senha.");
}

const submit = document.getElementById('submit');
submit.addEventListener('click', salvarFormulario);

document.getElementById('clear').addEventListener('click', limparCadastro);

document.getElementById('operacao').addEventListener('change', desativarValor);

document.getElementById('clearOperacao').addEventListener('click', limparOperacao);

document.getElementById('execute').addEventListener('click', executar);