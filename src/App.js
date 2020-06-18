import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api"

function App() {

  const [repositories, setRepositories] = useState([])

  // const listRepositories = 

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Repository1',
      url: 'www.fedatto.com',
      techs: 'NodeJS, ReactJS'
    })

    const repository = response.data

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
      .catch((erro) => console.log(erro))

    let newRepos = repositories.filter(r => r.id !== id)

    setRepositories(newRepos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
