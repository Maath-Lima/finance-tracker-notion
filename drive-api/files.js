import configDriveApi from '../config/drive-api.js'

const drive = configDriveApi();

async function getFilesList() {
  const folder_id = '1w2DMaOoI4yRLyQHJmHXriGodb7SJ5A8x';
  
  const list_dates_receipts = ['2021-10-06'];

  const response = await drive.files.list({
                     q: `'${folder_id}' in parents and trashed = false and name = `,
                     fields: 'files(id, name)'
                   })
                   .then((res) => {
                     console.log(res.data.files);
                   });
}

getFilesList();