import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import ListaDeTarefas from './components/ListaDeTarefas';
import './styles.css';

const API_URL = 'http://localhost:3001';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '' });

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get(`${API_URL}/tarefas`);
        setTarefas(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTarefas();
  }, []);

  const adicionarTarefa = async () => {
    if (novaTarefa.titulo.trim() && novaTarefa.descricao.trim()) {
      try {
        const response = await axios.post(`${API_URL}/tarefas`, novaTarefa);
        setTarefas([...tarefas, response.data]);
        setNovaTarefa({ titulo: '', descricao: '' });
        setModalOpen(false);
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    } else {
      console.error('Título e descrição são obrigatórios.');
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await axios.delete(`${API_URL}/tarefas/${id}`);
      const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
      setTarefas(novasTarefas);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="app-container">
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Lista de Tarefas
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Adicionar Tarefa
        </Button>
        <div className="lista-tarefas">
          <ListaDeTarefas tarefas={tarefas} onDelete={deletarTarefa} />
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content">
            <Typography variant="h6" component="div" gutterBottom>
              Adicionar Nova Tarefa
            </Typography>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              margin="normal"
              value={novaTarefa.titulo}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              value={novaTarefa.descricao}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
            />
            <Button variant="contained" color="primary" fullWidth onClick={adicionarTarefa}>
              Adicionar
            </Button>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default App;
