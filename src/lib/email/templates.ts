
export const getBrandedEmailHtml = ({
    title,
    content,
    ctaLink,
    ctaText,
}: {
    title: string;
    content: string;
    ctaLink?: string;
    ctaText?: string;
}) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://startupops.com"; // Fallback
    const logoUrl = `${baseUrl}/assets/logo_light_background_v2.png`;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          
          body {
            background-color: #F5F7FA;
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background-color: #ffffff;
            padding: 32px;
            text-align: center;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .logo {
            height: 40px;
            width: auto;
          }
          
          .content {
            padding: 40px 32px;
            color: #0A1628;
            line-height: 1.6;
            font-size: 16px;
          }
          
          .h1 {
            color: #0A1628;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            margin-top: 0;
          }
          
          .button-container {
            text-align: center;
            margin-top: 32px;
            margin-bottom: 10px;
          }
          
          .button {
            background-color: #2B9AFF;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;
            transition: background-color 0.2s;
          }
          
          .button:hover {
            background-color: #00D4FF;
          }
          
          .footer {
            background-color: #0A1628;
            padding: 24px;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
          
          .footer a {
            color: #2B9AFF;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="StartupOPS" class="logo" />
          </div>
          <div class="content">
            <h1 class="h1">${title}</h1>
            ${content}
            ${ctaLink && ctaText
            ? `
              <div class="button-container">
                <a href="${ctaLink}" class="button">${ctaText}</a>
              </div>
            `
            : ""
        }
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} StartupOPS. All rights reserved.</p>
            <p>
              <a href="${baseUrl}/privacy">Privacy Policy</a> • 
              <a href="${baseUrl}/terms">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
