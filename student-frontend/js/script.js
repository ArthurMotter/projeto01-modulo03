// Aguarda o DOM ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form-aluno');
    const tabelaBody = document.getElementById('tabela-alunos');
    const telefoneInput = document.getElementById('telefone');
    let studentCount = 0;

    // 1. Validação do campo telefone
    telefoneInput.addEventListener('input', function (event) {
        const input = event.target;
        // Remove tudo que não for dígito
        let value = input.value.replace(/\D/g, '');

        // Limita o tamanho para 11 dígitos (DDD + 9 dígitos do celular)
        value = value.substring(0, 11);

        // Aplica a formatação dinamicamente
        let formattedValue = value;
        if (value.length > 2) {
            formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 7) {
            formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }

        // Atualiza o valor do campo de input
        input.value = formattedValue;
    });

    // 2. Prepara o formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // 3. Coleta os valores dos campos do formulário e formata
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = telefoneInput.value.trim();
        const curso = document.getElementById('cursos').value;
        const turnoSelecionado = document.querySelector('input[name="turno"]:checked');

        // 4. Faz a validação dos dados
        if (!nome || !email || !telefone || !curso) {
            alert('Por favor, preencha todos os campos para cadastrar um aluno.');
            return;
        }

        if (telefone.length < 15) {
             alert('Por favor, digite um número de telefone válido.');
             return;
        }

        const turno = turnoSelecionado.value;
        studentCount++;

        // 5. Cria uma nova linha (tr) e preenche com os dados
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${studentCount}</th>
            <td>${nome}</td>
            <td>${email}</td>
            <td style="min-width: 150px;">${telefone}</td>
            <td>${curso}</td>
            <td>${turno}</td>
        `;

        // 6. Adiciona a nova linha ao corpo da tabela 
        // e prepara o formulário para novas interações 
        tabelaBody.appendChild(newRow);
        form.reset();
    });

});