import {pool} from './database/connection.js'

async function testarConexao() {
  try {
    // Metadados da tabela
    const res = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'CATEGORIA_GASTO'
      ORDER BY ordinal_position
    `);
    console.log('✅ Colunas da tabela categoria_gasto:');
    console.log(JSON.stringify(res.rows, null, 2));
    
    // Dados da tabela
    const resData = await pool.query('SELECT * FROM categoria_gasto LIMIT 1');
    console.log('\n✅ Primeira linha (sample):');
    if(resData.rows.length > 0) {
      console.log('Campos:', Object.keys(resData.rows[0]));
      console.log('Valores:', resData.rows[0]);
    } else {
      console.log('Tabela vazia');
    }
  } catch(err) {
    console.error('❌ Erro:', err.message);
  } finally {
    process.exit(0);
  }
}

testarConexao();