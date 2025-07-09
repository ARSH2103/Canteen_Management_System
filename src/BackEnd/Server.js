// Require all the packages needed.
const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Create the instances.
const app = express();
const PORT = 3000;
const path = require('path');


// Creating the middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

// Creating the database connection 
const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root12',
  database: 'userdetails',
})

database.connect((error) => {
  if (error) {
    console.error("Database connection Failed", error)
    return;
  }
  else {
    console.log("MySQL Databse is Successfully Connected");
  }
})

//Signup Route
app.post('/Signup', (req, res) => {

  const { username, employeeId, email, password, department, role } = req.body;

  // Hashing the password field
  bcrypt.hash(password, 8, (error, hash) => {
    if (error) {
      return res.status(500).send("Error Occured")
    }
    const sql = `INSERT INTO users (username , employeeId , email , password , department , role) VALUES (?, ?, ? ,? ,?, ?)`;
    database.query(sql, [username, employeeId, email, hash, department, role], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Database have some error")
      }
      else {
        res.send({
          message: "User Registered successfully",
        })
      }
    });

  });
});

// Login Route
app.post('/Login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';


  database.query('SELECT * FROM users WHERE email =?', [email], (error, result) => {
    if (error) {
      return res.status(500).send('Error Occured in the Database');
    }
    if (result.length === 0) {
      return res.status(401).send('User not Found')
    }

    const user = result[0];
    console.log(user);

    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(500).send("Error Occured")
      }
      if (!isMatch) {
        return res.status(401).send("Incorrect Password")
      }

      res.send({
        message: "Login Successful",
        role: user.role
      })
    })
  })
})


// Stats fetch Route
app.get('/api/stats', (req, res) => {
  const employeeQuery = 'SELECT COUNT(*) AS totalEmployees FROM users';
  const itemsQuery = 'SELECT COUNT(*) AS availableItems FROM master_items';
  const txnQuery = `
    SELECT COUNT(*) AS dailyTransactions 
    FROM transactions 
    WHERE DATE(created_at) = CURDATE()
  `;

  database.query(employeeQuery, (err1, employeeRes) => {
    if (err1) return res.status(500).json({ error: 'Failed to get employee count' });

    database.query(itemsQuery, (err2, itemsRes) => {
      if (err2) return res.status(500).json({ error: 'Failed to get item count' });

      database.query(txnQuery, (err3, txnRes) => {
        if (err3) return res.status(500).json({ error: 'Failed to get transaction count' });

        res.json({
          totalEmployees: employeeRes[0].totalEmployees,
          availableItems: itemsRes[0].availableItems,
          dailyTransactions: txnRes[0].dailyTransactions,
        });
      });
    });
  });
});


// Admin Dashborad Matrics
app.get('/api/dashboard-metrics', (req, res) => {
  const totalUsersQuery = `SELECT COUNT(*) AS totalEmployees FROM users`;
  const totalInvoicesQuery = `SELECT COUNT(*) AS totalInvoices FROM orders`;
  const totalRevenueQuery = `SELECT SUM(total) AS totalRevenue FROM orders`;

  database.query(totalUsersQuery, (err1, userRes) => {
    if (err1) return res.status(500).json({ error: 'Failed to fetch employee count' });

    database.query(totalInvoicesQuery, (err2, invoiceRes) => {
      if (err2) return res.status(500).json({ error: 'Failed to fetch invoice count' });

      database.query(totalRevenueQuery, (err3, revenueRes) => {
        if (err3) return res.status(500).json({ error: 'Failed to fetch revenue' });

        return res.json({
          totalEmployees: userRes[0].totalEmployees,
          totalInvoices: invoiceRes[0].totalInvoices,
          totalRevenue: revenueRes[0].totalRevenue || 0,
          currentDate: new Date().toISOString().split("T")[0],
        });
      });
    });
  });
});



// All Items in masterlist Route
app.get('/api/master-list', (req, res) => {
  const query = 'SELECT id, name, price, img FROM master_items';
  database.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch master items:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Post for items of the day
app.post('/api/items-of-the-day', (req, res) => {
  const items = req.body.items;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' });
  }

  const deleteQuery = 'DELETE FROM items_of_the_day';
  const insertQuery = 'INSERT INTO items_of_the_day (item_id, quantity) VALUES ?';

  const values = items.map(item => [item.id, 1]);

  database.query(deleteQuery, (err) => {
    if (err) {
      console.error('Failed to delete existing items:', err);
      return res.status(500).json({ error: 'Failed to reset items of the day' });
    }

    database.query(insertQuery, [values], (err2) => {
      if (err2) {
        console.error('Failed to insert new items:', err2);
        return res.status(500).json({ error: 'Failed to insert items of the day' });
      }
      res.status(200).json({ message: 'Items of the day updated' });
    });
  });
});

// Route for getting all items of the day
app.get('/api/items-of-the-day', (req, res) => {
  const query = `
    SELECT iod.item_id AS id, iod.quantity, mi.name, mi.price, mi.img
    FROM items_of_the_day iod
    JOIN master_items mi ON iod.item_id = mi.id
  `;
  database.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch items of the day:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Quantity update Route
app.put('/api/items-of-the-day', (req, res) => {
  const items = req.body.items;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items to update' });
  }

  const updates = items.map(({ id, quantity }) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE items_of_the_day SET quantity = ? WHERE item_id = ?';
      database.query(query, [quantity, id], (err, result) => {
        if (err) {
          console.error('Update error for item_id:', id, err);
          return reject(err);
        }
        resolve(result);
      });
    });
  });

  Promise.all(updates)
    .then(() => res.json({ message: 'Quantities updated successfully' }))
    .catch(err => {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database update failed' });
    });
});




//Add Employee Route
app.post('/api/users', (req, res) => {
  const { username, employeeId, email, password, department, role } = req.body;

  bcrypt.hash(password, 6, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    const sql = `INSERT INTO users (username, employeeId, email, password, department, role) VALUES (?, ?, ?, ?, ?, ?)`;

    database.query(sql, [username, employeeId, email, hash, department, role], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add employee' });
      }
      return res.status(201).json({ message: 'Employee added successfully' });
    });
  });
});

// View Employee Route
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  database.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
});




// Add Items Route
app.post('/api/items', (req, res) => {
  const { name, quantity, rate, category_name, status } = req.body;
  console.log("Incoming Data:", req.body);

  if (!name || !quantity || !rate || !category_name || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const insertQuery = `
    INSERT INTO items (name, quantity, rate, category_name, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  database.query(
    insertQuery,
    [name, parseInt(quantity), parseFloat(rate), category_name, status],
    (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Database insertion failed' });
      }
      return res.status(201).json({ message: 'Item added successfully', id: result.insertId });
    }
  );
});

// Fetch All Items
app.get('/api/items', (req, res) => {
  const query = 'SELECT * FROM items';
  database.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database fetch failed' });
    res.status(200).json(results);
  });
});

// Delete Items Route
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM items WHERE id = ?';
  database.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
});

// Update Items Route
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const { quantity, rate } = req.body;
  const query = 'UPDATE items SET quantity = ?, rate = ? WHERE id = ?';
  database.query(query, [quantity, rate, id], (err, ressult) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.status(200).json({ message: 'Item updated successfully' });
  });
});




// Get Balance + Transaction Route
app.get('/api/users/:employeeId/money', (req, res) => {
  const { employeeId } = req.params;

  const userQuery = 'SELECT id, money FROM users WHERE employeeId = ?';
  database.query(userQuery, [employeeId], (err, userResults) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (userResults.length === 0) return res.status(404).json({ error: 'User not found' });

    const userId = userResults[0].id;
    const money = userResults[0].money;

    const txnQuery = `
        SELECT id, amount, type, balance_after AS balanceAfter, created_at AS date
        FROM transactions
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 10
      `;

    database.query(txnQuery, [userId], (txnErr, txnResults) => {
      if (txnErr) return res.status(500).json({ error: 'Transaction fetch failed' });
      res.json({ money, transactions: txnResults });
    });
  });
});

//Add Money Route
app.post('/api/money', (req, res) => {
  const { employeeId, Amount } = req.body;

  if (!employeeId || !Amount || isNaN(Amount)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const getUserQuery = 'SELECT id, money FROM users WHERE employeeId = ?';
  database.query(getUserQuery, [employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const userId = results[0].id;
    const newBalance = parseFloat(results[0].money) + parseFloat(Amount);

    const updateQuery = 'UPDATE users SET money = ? WHERE id = ?';
    database.query(updateQuery, [newBalance, userId], (err2) => {
      if (err2) return res.status(500).json({ error: 'Balance update failed' });

      const insertTxn = `
        INSERT INTO transactions (user_id, amount, type, balance_after, created_at)
        VALUES (?, ?, 'Credit', ?, NOW())
      `;
      database.query(insertTxn, [userId, parseFloat(Amount), newBalance], (err3) => {
        if (err3) return res.status(500).json({ error: 'Transaction log failed' });
        res.status(200).json({ message: 'Money added and transaction recorded' });
      });
    });
  });
});



// GET all transactions for a specific user
app.get('/api/users/:userId/transactions', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      id,
      amount,
      type,
      balance_after AS balanceAfter,
      created_at AS date
    FROM transactions
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  database.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Transaction fetch error:", err);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    res.json(results); // return full list
  });
});





// Purchse Route
app.post('/api/orders', (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const total = items.reduce((sum, it) => sum + (it.total || 0), 0);

  database.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to start transaction' });
    }


    database.query(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [userId, total],
      (orderErr, orderRes) => {
        if (orderErr) {
          return database.rollback(() => res.status(500).json({ error: 'Order insert failed' }));
        }

        const orderId = orderRes.insertId;

        let idx = 0;

        const nextItem = () => {
          if (idx >= items.length) {
            return database.commit(commitErr => {
              if (commitErr) {
                return database.rollback(() => res.status(500).json({ error: 'Commit failed' }));
              }
              return res.json({ orderId, total });
            });
          }

          const it = items[idx++];

          database.query(
            'INSERT INTO order_items (order_id, item_id, name, price, quantity, total) VALUES (?, ?, ?, ?, ?, ?)',
            [orderId, it.id, it.name, it.price, it.quantity, it.total],
            itemErr => {
              if (itemErr) {
                console.error(itemErr);
                return database.rollback(() => res.status(500).json({ error: 'Order item insert failed' }));
              }

              database.query(
                'UPDATE items SET quantity = quantity - ? WHERE id = ?',
                [it.quantity, it.id],
                stockErr => {
                  if (stockErr) {
                    console.error(stockErr);
                    return database.rollback(() => res.status(500).json({ error: 'Stock update failed' }));
                  }
                  nextItem();
                }
              );
            }
          );
        };

        nextItem();
      }
    );
  });
});




// Admin purchase Route
app.post('/api/admin-orders', (req, res) => {
  const { user_id, items, total } = req.body;
  const created_at = new Date();

  if (!user_id || !items || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const insertOrderQuery = `INSERT INTO orders (user_id, total, created_at) VALUES (?, ?, ?)`;

  database.query(insertOrderQuery, [user_id, total, created_at], (err, result) => {
    if (err) {
      console.error('Order insert error:', err);
      return res.status(500).json({ error: 'Order creation failed' });
    }

    const orderId = result.insertId;
    const orderItemsQuery = `INSERT INTO order_items (order_id, item_id, quantity, price) VALUES ?`;
    const values = items.map(item => [orderId, item.id, item.quantity, item.price]);

    database.query(orderItemsQuery, [values], (err2) => {
      if (err2) {
        console.error('Order items insert error:', err2);
        return res.status(500).json({ error: 'Order items insert failed' });
      }

      const getBalanceQuery = `SELECT money FROM users WHERE id = ?`;
      database.query(getBalanceQuery, [user_id], (err3, result3) => {
        if (err3 || result3.length === 0) {
          console.error('Failed to fetch user balance:', err3);
          return res.status(500).json({ error: 'Failed to fetch user balance' });
        }

        const currentBalance = result3[0].money;
        const newBalance = currentBalance - total;

        const updateBalanceQuery = `UPDATE users SET money = ? WHERE id = ?`;
        database.query(updateBalanceQuery, [newBalance, user_id], (err4) => {
          if (err4) {
            console.error('Balance update error:', err4);
            return res.status(500).json({ error: 'Balance update failed' });
          }

          const transactionQuery = `
            INSERT INTO transactions (user_id, amount, type, balance_after, created_at)
            VALUES (?, ?, 'debit', ?, ?)
          `;

          database.query(transactionQuery, [user_id, total, newBalance, created_at], (err5) => {
            if (err5) {
              console.error('Transaction insert error:', err5);
              return res.status(500).json({ error: 'Transaction insert failed' });
            }

            res.json({
              success: true,
              orderId,
              total,
              created_at,
              newBalance,
            });
          });
        });
      });
    });
  });
});



// Starting the server using .listen
app.listen(PORT, () => {
  console.log(`The BackEnd Server is running at ${PORT} `);

})  