const contas = [];

const formulario = document.getElementsByTagName('input');

const salvarFormulario = () => {
    if (!validaDados()) return;
    const cliente = {
        nome: formulario[0].value,
        cpf: formulario[1].value,
        celular: formulario[2].value,
        senha: formulario[3].value,
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
    if (formulario[0].value.length == 0) {
        alert("Preencha o nome.")
        return;
    }
    return true;
}

const validaCPF = () => {
    const cpf = formulario[1].value;
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
    const celular = formulario[2].value;
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
    if (formulario[3].value.length == 0) {
        alert('Preencha a senha.');
        return;
    }
    if (formulario[3].value != formulario[4].value) {
        alert('Senhas são diferentes. Insira a mesma senha nos dois campos.');
        return;
    }
    return true;
}

const limparFormulario = () => {
    for (element of formulario) {element.value = ''};
}

const submit = document.getElementById('submit');
submit.addEventListener('click', salvarFormulario);

document.getElementById('clear').addEventListener('click', limparFormulario);