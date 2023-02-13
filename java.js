const { google } = require("googleapis");
const { auth } = require("google-auth-library");

async function submitFormToGoogleSheets(name, email, phone, product, quantity) {
  const authClient = await auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth: authClient,
  });

  // Thay đổi các giá trị này để phù hợp với bảng tính của bạn
  const spreadsheetId = "19oknq5dVYf8fvYszOGz1uOPEI5BSzIPdFwNXA-6ybfE";
  const range = "Sheet1!A2:E";

  // Tạo một bản ghi mới trên bảng tính
  const values = [[name, email, phone, product, quantity]];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values,
    },
  });

  console.log("Đã gửi thông tin đặt hàng thành công đến Google Sheets!");
}
