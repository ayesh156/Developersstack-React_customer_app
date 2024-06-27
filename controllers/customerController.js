const connectionPool = require('../db/databaseConnection')

const initializeUi = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        const sql = "SELECT * FROM customer";
        connection.query(sql, (err, rows) => {
            connection.release();

            if (!err) {
                resp.render('home',{rows});
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}

const findCustomers = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        let searchText = req.body.text;

        connection.query("SELECT * FROM customer WHERE name LIKE ? OR address LIKE ?", ['%'+searchText+'%','%'+searchText+'%'], (err, rows) => {
            connection.release();

            if (!err) {
                resp.render('home',{rows});
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}

const newCustomerForm = (req, resp) => {
    resp.render('new-customer-form');
}

const createCustomer = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        let {nic,name,address,salary} = req.body;

        connection.query("INSERT INTO customer VALUES (?,?,?,?)", [nic,name,address,salary], (err, rows) => {
            connection.release();

            if (!err) {
                resp.render('new-customer-form');
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}

const updateCustomerForm = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        connection.query("SELECT * FROM customer WHERE nic = ?", [req.params.nic], (err, rows) => {
            connection.release();

            let data = rows[0];

            if (!err) {
                resp.render('update-customer-form',{customer:data});
            } else {
                console.log(err);
            }

            console.log(data);
        });
    });
    
}

const modifyCustomer = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        let {nic,name,address,salary} = req.body;

        connection.query("UPDATE customer SET name=?, address=?, salary=? WHERE nic=?", [name,address,salary,nic], (err, rows) => {
            connection.release();

            if (!err) {
                resp.redirect('/');
            } else {
                console.log(err);
            }

        });
    });
    
}

const deleteCustomer = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        connection.query("DELETE FROM customer WHERE nic = ?", [req.params.nic], (err, rows) => {
            connection.release();

            if (!err) {
                resp.redirect('/');
            } else {
                console.log(err);
            }

        });
    });
    
}

const showCustomer = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }

        connection.query("SELECT * FROM customer WHERE nic = ?", [req.params.nic], (err, rows) => {
            connection.release();

            let data = rows[0];

            if (!err) {
                resp.render('show-customer',{customer:data});
            } else {
                console.log(err);
            }

            console.log(data);
        });
    });
}

module.exports = {
    initializeUi, findCustomers, newCustomerForm, createCustomer, updateCustomerForm, modifyCustomer, deleteCustomer, showCustomer
}
