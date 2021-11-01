import { google } from "googleapis";

export default function configDriveApi() {
  
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  return google.drive({
    version: 'v3',
    auth: oauth2Client,
  });
}