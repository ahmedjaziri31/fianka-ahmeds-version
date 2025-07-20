import nodemailer from 'nodemailer';
import { Order } from '@/types';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.fianka-shop.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'welcome@fianka-shop.com',
      pass: process.env.SMTP_PASS || 'Ahmedjaziri.31',
    },
  });
};

// Welcome email template
export const createWelcomeEmailTemplate = (promoCode: string = 'FIANKEWI-OVERT31') => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Fianka!</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #f8f6f0;
          border: 2px solid #d4af37;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
        .welcome-banner {
          background-color: #e8e8e8;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 30px;
        }
        .welcome-title {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }
        .fianka-highlight {
          color: #d4af37;
        }
        .greeting {
          color: #6b46c1;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .content {
          color: #6b46c1;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .promo-code-container {
          text-align: center;
          margin: 30px 0;
        }
        .promo-code {
          background-color: #8b7355;
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
          display: inline-block;
          margin: 20px 0;
        }
        .promo-description {
          color: #6b46c1;
          font-size: 16px;
          margin: 20px 0;
        }
        .signature {
          color: #6b46c1;
          font-size: 16px;
          margin-top: 30px;
        }
        .team-name {
          color: #d4af37;
          font-weight: bold;
        }
        .dots {
          color: #6b46c1;
          font-size: 24px;
          text-align: center;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #d4af37;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="logo">
          <img src="https://fianka-shop.com/fianka-logo.gif" alt="Fianka Logo" />
        </div>
        
        <div class="welcome-banner">
          <h1 class="welcome-title">Welcome to <span class="fianka-highlight">Fianka!</span></h1>
        </div>
        
        <div class="greeting">Hello!</div>
        
        <div class="content">
          Thank you for subscribing to our newsletter. We are thrilled to have you with us.
        </div>
        
        <div class="content">
          Here is your unique welcome code. Keep it safe, we're now live!
        </div>
        
        <div class="promo-code-container">
          <div class="promo-code">${promoCode}</div>
        </div>
        
        <div class="promo-description">
          You will be able to use this code to unlock a special surprise on our website. Start shopping now!
        </div>
        
        <div class="signature">
          Best regards,<br>
          The <span class="team-name">Fianka</span> Team
        </div>
        
        <div class="dots">•••</div>
        
        <div class="footer">
          <p>FIANKA - Vêtements de qualité supérieure</p>
          <p>Contact: welcome@fianka-shop.com | +216 93 94 66 30</p>
          <p>Vous recevez cet email car vous vous êtes inscrit à notre newsletter.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, promoCode: string = 'FIANKEWI-OVERT31') => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Fianka',
        address: process.env.SMTP_USER || 'welcome@fianka-shop.com'
      },
      to: email,
      subject: 'Welcome to Fianka! 🎉 Your exclusive promo code inside',
      html: createWelcomeEmailTemplate(promoCode),
      text: `
        Hello!
        
        Thank you for subscribing to our newsletter. We are thrilled to have you with us.
        
        Here is your unique welcome code: ${promoCode}
        
        You will be able to use this code to unlock a special surprise on our website. Start shopping now!
        
        Best regards,
        The Fianka Team
        
        ---
        FIANKA - Vêtements de qualité supérieure
        Contact: welcome@fianka-shop.com | +216 93 94 66 30
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email server connection verified');
    return { success: true };
  } catch (error) {
    console.error('Email server connection failed:', error);
    return { success: false, error: error.message };
  }
};

// Invoice email template
export const createInvoiceEmailTemplate = (order: Order) => {
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Facture - Commande #${order.id}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
          color: #333;
        }
        .email-container {
          max-width: 700px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #f8f6f0;
          padding-bottom: 20px;
        }
        .logo img {
          width: 120px;
          height: auto;
          margin-bottom: 10px;
        }
        .invoice-title {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin: 10px 0;
        }
        .order-info {
          background-color: #f8f6f0;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          color: #555;
        }
        .shipping-info {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }
        .items-table th {
          background-color: #2c3e50;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        .items-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .totals-section {
          background-color: #f8f6f0;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 5px 0;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #2c3e50;
          padding-top: 10px;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 14px;
        }
        .contact-info {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }
        .status-confirmed {
          background-color: #d4edda;
          color: #155724;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo">
            <img src="https://fianka-shop.com/logo.png" alt="Fianka" />
          </div>
          <h1 class="invoice-title">FACTURE</h1>
          <p style="color: #666; margin: 0;">Merci pour votre commande !</p>
        </div>

        <!-- Order Information -->
        <div class="order-info">
          <div class="info-row">
            <span class="info-label">Numéro de commande:</span>
            <span>#${order.id}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Date de commande:</span>
            <span>${formatDate(order.created_at)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Statut:</span>
            <span class="status-badge status-${order.status}">${order.status === 'pending' ? 'En attente' : order.status === 'confirmed' ? 'Confirmée' : order.status}</span>
          </div>
          ${order.promo_code ? `
          <div class="info-row">
            <span class="info-label">Code promo:</span>
            <span style="color: #28a745; font-weight: bold;">${order.promo_code}</span>
          </div>
          ` : ''}
        </div>

        <!-- Shipping Information -->
        <div class="shipping-info">
          <h2 class="section-title">Informations de livraison</h2>
          <p><strong>${order.shipping_address.firstName} ${order.shipping_address.lastName}</strong></p>
          <p>${order.shipping_address.address}</p>
          <p>${order.shipping_address.city}, ${order.shipping_address.postalCode}</p>
          <p>Téléphone: ${order.shipping_address.phone}</p>
          <p>Email: ${order.shipping_address.email}</p>
        </div>

        <!-- Order Items -->
        <div>
          <h2 class="section-title">Articles commandés</h2>
          <table class="items-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Détails</th>
                <th>Qté</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td><strong>${item.product.name}</strong></td>
                  <td>
                    ${item.size ? `Taille: ${item.size}` : ''}
                    ${item.size && item.color ? '<br>' : ''}
                    ${item.color ? `Couleur: ${item.color}` : ''}
                  </td>
                  <td>${item.quantity}</td>
                  <td>${formatPrice(item.product.price)}</td>
                  <td>${formatPrice(item.product.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div class="totals-section">
          <div class="total-row">
            <span>Sous-total:</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          ${order.discount > 0 ? `
          <div class="total-row" style="color: #28a745;">
            <span>Remise (${order.promo_code}):</span>
            <span>-${formatPrice(order.discount)}</span>
          </div>
          ` : ''}
          <div class="total-row final">
            <span>TOTAL:</span>
            <span>${formatPrice(order.total)}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>Merci de votre confiance !</strong></p>
          <p>Votre commande sera traitée dans les plus brefs délais.</p>
          
          <div class="contact-info">
            <p><strong>FIANKA</strong></p>
            <p>Email: welcome@fianka-shop.com</p>
            <p>Téléphone: +216 93 94 66 30</p>
            <p>Site web: www.fianka-shop.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send invoice email
export const sendInvoiceEmail = async (order: Order) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'welcome@fianka-shop.com',
      to: order.shipping_address.email,
      subject: `Facture - Commande #${order.id} - Fianka`,
      html: createInvoiceEmailTemplate(order),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Invoice email sent successfully:', result.messageId);
    
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}; 