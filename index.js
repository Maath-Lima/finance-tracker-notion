import { Client } from "@notionhq/client";
import moment from "moment";

const integration_key = 'secret';
const database_id = 'secret';

const notion = new Client({ auth: integration_key })
const monthPropertie = '📆Month'
const typePropertie = '📉Type'

function getSpendingDaysCurrentMonth() {
  let date = new Date();
  const start_payment_day = 6;
  const end_payment_day = 3;
  
  let first_day = new Date(date.getFullYear(), date.getMonth(), start_payment_day);
  let last_day = new Date(date.getFullYear(), date.getMonth() + 1, end_payment_day);

  return {
    and: [
      {
        property: monthPropertie,
        date: {
          on_or_after: moment(first_day).format('yyyy-MM-DD'),
        }
      },
      {
        property: monthPropertie,
        date: {
          on_or_before: moment(last_day).format('yyyy-MM-DD'),
        }
      },
      {
        property: typePropertie,
        select: {
          equals: 'Spend',
        }
      },
    ]
  }
}

async function getDatabase() {
   return (await notion.databases.query( { database_id, filter: getSpendingDaysCurrentMonth()})).results;
}

function getReceiptFromDrive(receipt_date) {

  return null;

  return {
    type: 'external',
    name: 'teste',
    external: {
      url: 'teste.txt'
    }
  }
}

function updateBillsReceipts(finance_tracker_current_month) {
  finance_tracker_current_month.forEach(async (receipt) => {
    const date_formated = receipt.properties[monthPropertie].date.start;
    
    if (receipt.properties.Receipts.files.length !== 0) return;
    
    const file_object = getReceiptFromDrive(date_formated);

    if (file_object === null) {
      console.log(`Arquivo não encontrado para o dia ${date_formated}`)
      return;
    }
    //create a list to add all file names that will be searched
    //return a list of objects with file url and name from a function 

    const response = await notion.pages.update({
      page_id: receipt.id,
      properties: {
        Receipts: {
          files: [file_object]
        },
      },
    });

    console.log(`SUCESSO - conta do dia ${date_formated} adicionada!`);
  });
}

const financeTrackerCurrentMonth = getDatabase();

financeTrackerCurrentMonth
  .then((financeTrackerCurrentMonth) => {
    updateBillsReceipts(financeTrackerCurrentMonth);
  })
  .catch((error) => {
    console.error('Deu merd@', error);
  })
