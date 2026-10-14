
   async function realizarRegistro() {
    const apelido = document.getElementById('regApelido').value;
    const senha = document.getElementById('regSenha').value;
    const telefone = document.getElementById('regTelefone').value;

    if (!apelido || !senha || !telefone) {
        alert('Por favor, preencha todos os campos para criar a conta.');
        return;
    }

    // Mudamos para enviar como um objeto JSON simples
    const dadosRegistro = {
        apelido: apelido,
        senha: senha,
        telefone: telefone
    };

    try {
        const resposta = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Informa ao Express que é um JSON
            },
            body: JSON.stringify(dadosRegistro)
        });
        
        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Sucesso: ' + dados.mensagem);
            document.getElementById('regApelido').value = '';
            document.getElementById('regSenha').value = '';
            document.getElementById('regTelefone').value = '';
        } else {
            alert('Atenção: ' + dados.mensagem);
        }
    } catch (erro) {
        console.error('Erro de comunicação:', erro);
        alert('Falha ao conectar com o servidor da API.');
    }
}

async function enviarMensagem() {
    // 1. Resgatar destinatário e texto da tela
    const telefoneDestino = document.getElementById('destinatario').value;
    const mensagem = document.getElementById('textoMensagem').value;

    if (!telefoneDestino || !mensagem) {
        alert('Por favor, preencha o destinatário e a mensagem.');
        return;
    }

    // Dados de autenticação fixos para teste local
    const meuTelefone = '5518999999999';
    const minhaSenhaHash = '5f4dcc3b5aa765d61d8327deb882cf99';

    // 2. Montar o payload no formato JSON documentado
    const dadosMensagem = {
        telefone: telefoneDestino,
        mensagem: mensagem
    };

    try {
        // 3. Configurar Fetch com Query Params na URL e JSON no Body
        const url = `http://localhost:3000/chat?telefone=${meuTelefone}&senha_hash=${minhaSenhaHash}`;

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosMensagem) 
        });

        const dadosRetorno = await resposta.json();

        // 200 OK significa que a mensagem foi enviada
        if (resposta.ok) {
            alert('Status: ' + dadosRetorno.mensagem);
            document.getElementById('textoMensagem').value = ''; // Limpa apenas o campo de texto da mensagem
        } else {
            // Trata o erro 401 Unauthorized (Credenciais inválidas)
            alert('Falha: ' + dadosRetorno.mensagem);
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao tentar enviar a mensagem.');
    }
}
