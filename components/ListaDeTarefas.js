const ListaDeTarefas = ({ tarefas, onDelete }) => {
  return (
    <ul className="lista-tarefas">
      {tarefas.map(tarefa => (
        <li key={tarefa.id}>
          <h3>{tarefa.titulo}</h3>
          <p>{tarefa.descricao}</p>
          <button onClick={() => onDelete(tarefa.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default ListaDeTarefas;