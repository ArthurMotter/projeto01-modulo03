document.addEventListener('DOMContentLoaded', function () {

    // Properties
    const API_URL = 'http://localhost:8080';
    const form = document.getElementById('form-aluno');
    const tabelaBody = document.getElementById('tabela-alunos');
    const cursosSelect = document.getElementById('cursos');
    const telefoneInput = document.getElementById('telefone');

    let courseMap = new Map();

     // Init
    form.addEventListener('submit', saveStudent);

    loadCourses().then(() => {
        loadStudents();
    });

    // Functions
    async function loadCourses() {
        try {
            const response = await fetch(`${API_URL}/courses`);
            if (!response.ok) {
                throw new Error('Não foi possível carregar os cursos.');
            }
            const courses = await response.json();

            cursosSelect.innerHTML = '<option selected disabled value="">Selecione um curso...</option>';
            courseMap.clear();

            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.name;
                cursosSelect.appendChild(option);

                courseMap.set(course.id, course.name);
            });

        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
            cursosSelect.innerHTML = '<option selected disabled value="">Erro ao carregar cursos</option>';
        }
    }

    async function loadStudents() {
        try {
            const response = await fetch(`${API_URL}/students`);
            if (!response.ok) {
                throw new Error('Não foi possível carregar os estudantes.');
            }
            const students = await response.json();

            tabelaBody.innerHTML = '';

            students.forEach(student => {
                const newRow = document.createElement('tr');
                
                const courseName = courseMap.get(student.idCurso) || 'Curso não encontrado';

                newRow.innerHTML = `
                    <th scope="row">${student.id}</th>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td style="min-width: 150px;">${formatPhone(student.phone)}</td>
                    <td style="min-width: 200px;">${courseName}</td>
                    <td>${student.period}º</td>
                `;
                tabelaBody.appendChild(newRow);
            });

        } catch (error) {
            console.error('Erro ao carregar estudantes:', error);
            tabelaBody.innerHTML = '<tr><td colspan="6" class="text-center">Erro ao carregar estudantes.</td></tr>';
        }
    }

    async function saveStudent(event) {
        event.preventDefault();

        // Coleta os valores do formulário
        const studentData = {
            name: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: telefoneInput.value.replace(/\D/g, ''),
            idCurso: parseInt(cursosSelect.value),
            period: parseInt(document.querySelector('input[name="periodo"]:checked').value)
        };
        
        // Validação simples
        if (!studentData.name || !studentData.email || !studentData.phone || !studentData.idCurso) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Erro ao salvar o estudante.');
            }
            
            alert('Estudante cadastrado com sucesso!');
            form.reset();
            loadStudents();

        } catch (error) {
            console.error('Falha ao salvar estudante:', error);
            alert(`Não foi possível salvar o estudante. Erro: ${error.message}`);
        }
    }

    // Handlers
    function formatPhone(phoneDigits) {
        if (!phoneDigits) return '';
        const value = phoneDigits.toString().replace(/\D/g, '').substring(0, 11);
        if (value.length > 7) {
            return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        } else if (value.length > 2) {
            return `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        return value;
    }

    telefoneInput.addEventListener('input', function (event) {
        event.target.value = formatPhone(event.target.value);
    });
});