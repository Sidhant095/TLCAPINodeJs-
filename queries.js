const Pool = require('pg').Pool
const pool = new Pool({
    user : 'jkmrpjzdkivszj',
    host: 'ec2-54-221-236-144.compute-1.amazonaws.com',
    database: 'dd827p75n0qn9g',
    password: '803a1969c8d20d6d3a11e140a9f5c86c3f6aba7026fc72ceb4d6c9ef2687f746',
    port: 5432,
    ssl:true
})



// get All users
const getUsers = (request, response) =>{
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.log('User list request');
        throw error
      }

      response.status(200).json(results.rows)
    })
  }


  // get particular user
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


//create new user
  const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User added with ID: ${result.insertId}`)
    })
  }


// update user with Id 
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }


 // delete user with id 
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }



// export all methods to use in other files. 
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }