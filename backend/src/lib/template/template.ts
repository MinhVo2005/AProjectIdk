const htmlTemplate = (userName:string,verificationLink:string) =>{
    return (
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #f4f4f7;
      margin: 0; padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 3px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      background-color: #346df1;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      margin-top: 30px;
      text-align: center;
    }
    @media (max-width: 500px) {
      .container { margin: 20px; padding: 15px; }
      .button { width: 100%; text-align: center; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, ${userName}!</h1>
    <p>Thanks for creating an account with us. Please verify your email address by clicking the button below:</p>
    <p style="text-align:center;">
      <a href="${verificationLink}" class="button">Verify Email</a>
    </p>
    <p>If that button doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="${verificationLink}">${verificationLink}</a></p>
    <p class="footer">
      If you didn’t sign up for this account, you can safely ignore this email.
    </p>
  </div>
</body>
</html>`)
};

export {htmlTemplate};