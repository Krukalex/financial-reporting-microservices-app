const pool = require("../../data/db");
const {
  validateAmount,
  validateDate,
} = require("../../utils/validationFunctions");

const getFundCommitmentsController = async (req, res) => {
  const { fundId } = req.params;

  //check if fund exists
  const fundExists = await pool.query(
    `
            SELECT 1 from subledger_cz.dim_fund
            WHERE fund_id_sk = $1
        `,
    [fundId]
  );

  if (fundExists.rows.length === 0) {
    return res.status(404).send("Fund does not exist");
  }

  try {
    const result = await pool.query(
      `
      select
          *
      from 
          subledger_cz.fact_commitment
      where 
        fund_id_sk = $1
      `,
      [fundId]
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createFundCommitmentsController = async (req, res) => {
  try {
    //Extract fund ID from query params
    const { fundId } = req.params;

    //Extract body of request
    const { investorId, commitmentAmount, commitmentDate } = req.body;

    //check if fund exists
    const fundExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_fund
            WHERE fund_id_sk = $1
        `,
      [fundId]
    );

    if (fundExists.rows.length === 0) {
      return res.status(404).send("Fund does not exist");
    }

    //check if investor exists
    const investorExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_investor
            WHERE investor_id_sk = $1
        `,
      [investorId]
    );

    if (investorExists.rows.length === 0) {
      return res.status(404).send("Investor does not exist");
    }

    //Validate amount is number greater than 0
    const { validAmount, amount } = validateAmount(commitmentAmount);
    if (!validAmount) {
      return res.status(500).send(`Amount must be a number greater than 0`);
    }

    //Validate date valid format
    const { validDate, date } = validateDate(commitmentDate);
    if (!validDate) {
      return res.status(500).send("Amount must be a number greater than 0");
    }

    await pool.query(
      `
      INSERT INTO subledger_cz.fact_commitment (fund_id_sk, investor_id_sk, commitment_amount, commitment_date)
      VALUES ($1, $2, $3, $4)
    `,
      [fundId, investorId, amount, date]
    );

    res.status(200).send("commitment has been created");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Database error: ${err}`);
  }
};

module.exports = {
  getFundCommitmentsController,
  createFundCommitmentsController,
};
