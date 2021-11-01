import { google } from "googleapis";

export default function configDriveApi() {
  const CLIENT_ID = '649392812719-9622vpv0gb2dth42keb292b3q3opbrsc.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

  const REFRESH_TOKEN = '1//048aMMQHGoDeXCgYIARAAGAQSNwF-L9IrUhh6lZzFGHG7EOJQicXXGjvmCXC_ck5YJn9f_13nMKJ4l9nOz_aJvRCqFdUwXdLwe7E';

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