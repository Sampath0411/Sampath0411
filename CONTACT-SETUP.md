# Contact Form Setup

Your **"Talk to Us"** form now collects **Name, Email, Phone, and Message**.

## What already works (no setup needed)

- When someone submits the form, **you (sampathlox@gmail.com) get an email** with all their
  details via **Web3Forms** (the `access_key` in `index.html`).
- Because the form now has an **Email** field, Web3Forms sets the sender's email as the
  **Reply-To** — so you can just hit "Reply" in Gmail to answer them directly.

## Optional: send the sender an automatic confirmation email

Web3Forms' auto-reply is a **paid** feature, so this project uses **EmailJS** (free tier:
200 emails/month) to email the sender a "thanks, I'll get back to you" confirmation.
It's **optional** — if you skip this, the form still works and you still get the email; the
sender just won't get an auto-confirmation.

### 5-minute setup

1. Go to **https://www.emailjs.com/** and create a free account.
2. **Add an Email Service** (e.g. connect your Gmail). Copy the **Service ID**
   (looks like `service_xxxxxxx`).
3. **Create an Email Template.** In the template, use these variables (double curly braces):
   - To: `{{email}}`  ← sends the confirmation to the person who filled the form
   - Subject: `Thanks for reaching out, {{name}}!`
   - Body (example):
     ```
     Hi {{name}},

     Thanks for your message — I've received it and will get back to you soon.

     Here's a copy of what you sent:
     Phone: {{phone}}
     Message: {{message}}

     — Sampath Satya Saran
     ```
   - (Optional) Reply-To: `{{reply_to}}`
   Save it and copy the **Template ID** (looks like `template_xxxxxxx`).
4. In **Account → General**, copy your **Public Key** (looks like a short random string).
5. Open **`index.html`**, find this block near the bottom (search for `EMAILJS_PUBLIC_KEY`),
   and paste your three IDs:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_EMAILJS_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
   ```
6. Save and reload the site. Submit a test message with your own email — you should receive
   the confirmation within a few seconds.

> These three IDs are **public/browser-safe** by design (EmailJS is built for client-side use),
> so it's fine that they live in `index.html`. For extra safety you can restrict the Public Key
> to your domain in the EmailJS dashboard (Account → Security → Allowed Origins).

## Field reference

| Field    | name attribute | Used by                                   |
|----------|----------------|-------------------------------------------|
| Name     | `name`         | Web3Forms email + EmailJS `{{name}}`      |
| Email    | `email`        | Web3Forms Reply-To + EmailJS `{{email}}`  |
| Phone    | `phone`        | Web3Forms email + EmailJS `{{phone}}`     |
| Message  | `message`      | Web3Forms email + EmailJS `{{message}}`   |
