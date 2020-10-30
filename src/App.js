import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
        setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
        title: "1º Teste",
        url: "http://github.com/RiadOliveira",
        techs: ["HTML", "Javascript"]
    }

    const response = await api.post('/repositories', newRepository);

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const updatedRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          return (
              <li key={index}>{repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          );
        })}    
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
