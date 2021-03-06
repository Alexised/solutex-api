"use strict";
/**
 * Entities endpoints
 * GET     /api/entities           ->  getAllEntities
 */

const DB = require("../../db");

/**
 * HTTP get method to get all entities.
 * @param {Object} _req HTTP request.
 * @param {Object} res HTTP response.
 * @returns {Promise} The fetched entities.
 */
const getAllOperations = async (_req, res) => {
  // Connects to a connection pool to the Postgres database.

  try {
    // Prepare and execute query.
    const result = await DB.pool.query('SELECT * FROM public."OPERATION";');
    if (result.rows.length === 0) {
      res.locals.results = {
        status: {
          code: "FAILURE",
          description: "Unable to find '.",
        },
      };

      res.status(404);
    } else {
      res.locals.results = {
        result: result.rows,
        status: {
          code: "SUCCESS",
          description: "Successfully retrieved .",
        },
      };
      res.status(200);
    }

    return res.send(res.locals.results);
  } catch (error) {
    res.locals.results = {
      status: {
        code: "FAILURE",
        description: "Unable to find '.",
      },
    };
    res.status(404);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.

  }
};
/**
 * HTTP poist method to create operations
 * @param {Object} _req name cost of the operation
 * @param {Object} res HTTP response id operation.
 * @returns {Promise} The fetched entities.
 */
const createOperations = async (req, res) => {
  try {
    const result = await DB.pool.query(
      `INSERT INTO public."OPERATION"("OPERATION_NAME","OPERATION_COST") VALUES ('${req.body.name}',${req.body.price});`
    );
    res.locals.results = {
      result: result.rows,
      status: {
        code: "SUCCESS",
        description: "Successfully created .",
      },
    };
    res.status(200);
    return res.send(res.locals.results);
  } catch (error) {
    res.locals.results = {
      status: {
        code: "FAILURE",
        description: "no se pudo crear la operacion verifica los datos  '.",
      },
    };
    res.status(404);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.

  }
};

const editOperations = async (req, res) => {

  try {
    const result = await DB.pool.query(
      `UPDATE public."OPERATION"
      SET  "OPERATION_NAME"='${req.body.OPERATION_NAME}', "OPERATION_COST"='${req.body.OPERATION_COST}'
      WHERE "ID_OPERATION"='${req.body.id}';`
    );
    res.locals.results = {
      result: result.rows,
      status: {
        code: "SUCCESS",
        description: "Successfully update .",
      },
    };
    res.status(200);
    return res.send(res.locals.results);
  } catch (error) {
    res.locals.results = {
      status: {
        code: "FAILURE",
        description: "no se pudo editar la operacion'.",
      },
    };
    res.status(404);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.

  }
};

module.exports = { getAllOperations, createOperations, editOperations };
