import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'sua_senha',
  database: 'ts_crud',
  port: 5432,  // porta padrão do PostgreSQL
});

// Rota de índice
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Rota GET para inserir dados no banco de dados
router.get('/insere', async (req, res) => {
  const { name, description } = req.query;
  
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  try {
    const result = await pool.query('INSERT INTO db_items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Falta montar:
//Rota GET para listar dados do banco de dados
//Rota GET para atualizar dados no banco de dados
//Rota GET para excluir dados do banco de dados

//Rota POST para inserir dados do banco de dados
//Rota POST para listar dados do banco de dados
//Rota POST para atualizar dados no banco de dados
//Rota POST para excluir dados do banco de dados

export default router;