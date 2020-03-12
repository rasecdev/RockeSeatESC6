import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlres();
    }

    setLoadin(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    registerHandlres() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        //previnir que o request e a atualização da página aconteça
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length == 0)
            return;
        
        this.setLoadin();
        
        try {
            //Template Literals
            const response = await api.get(`/users/${repoInput}`);

            //Desestruturação de Objetos
            const {name, description, html_url, avatar_url} = response.data;

                console.log(response);

            this.repositories.push({
                //Short Sintaxe
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';
            
            this.render();
        } catch (error) {
            alert("O repositorio não existe!");
        }

        this.setLoadin(false);            
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();