# Google Translate API Setup Guide

## 🆓 **Free Translation with Google Translate API**

This guide will help you set up **Google Translate API** with the **free tier** (500,000 characters per month) for your Viking Rise Compendium translation system.

## 📋 **Step 1: Create Google Cloud Account**

1. **Go to Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com)
2. **Sign in** with your Google account (or create one)
3. **Accept terms** and complete the setup

## 🔑 **Step 2: Enable Google Translate API**

1. **Go to APIs & Services**: [console.cloud.google.com/apis](https://console.cloud.google.com/apis)
2. **Click "Enable APIs and Services"**
3. **Search for "Cloud Translation API"**
4. **Click on "Cloud Translation API"**
5. **Click "Enable"**

## 💳 **Step 3: Set Up Billing (Required for API)**

1. **Go to Billing**: [console.cloud.google.com/billing](https://console.cloud.google.com/billing)
2. **Click "Link a billing account"**
3. **Add a payment method** (credit card)
4. **Don't worry**: You get 500,000 characters FREE per month!

## 🔐 **Step 4: Create API Key**

1. **Go to Credentials**: [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. **Click "Create Credentials"**
3. **Select "API Key"**
4. **Copy the generated key** (starts with `AIza...`)
5. **Optional**: Restrict the key to Cloud Translation API for security

## ⚙️ **Step 5: Configure Your Project**

1. **In your project folder**, create/edit `.env.local` file
2. **Add this line**:
   ```
   NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=AIza-your-actual-api-key-here
   ```
3. **Replace** `AIza-your-actual-api-key-here` with your actual API key

## 🚀 **Step 6: Restart Development Server**

```bash
npm run dev
```

## 💰 **Cost Information**

- **Free Tier**: 500,000 characters per month
- **After Free Tier**: $20 per 1 million characters
- **For Your Website**: The free tier should last months!

## 🧪 **Test Translation**

1. **Open your website**: `http://localhost:3000`
2. **Click language switcher** (top-right)
3. **Select any language** (e.g., Russian, Polish)
4. **Watch the magic happen!** ✨

## 🔒 **Security Best Practices**

- ✅ **Restrict API Key**: Limit to Cloud Translation API only
- ✅ **Environment Variables**: Never commit API keys to Git
- ✅ **Monitor Usage**: Check Google Cloud Console for usage

## 🆘 **Troubleshooting**

### **"API key not configured"**
- Check `.env.local` file exists
- Verify API key is correct
- Restart development server

### **"API request failed"**
- Check if Cloud Translation API is enabled
- Verify billing account is set up
- Check API key restrictions

### **"Quota exceeded"**
- You've used your free 500k characters
- Wait for next month or upgrade billing

## 📊 **Monitor Usage**

1. **Go to Google Cloud Console**
2. **Navigate to "APIs & Services" > "Quotas"**
3. **Search for "Cloud Translation API"**
4. **Check your usage**

## 🎯 **Supported Languages**

All languages in your language switcher are supported:
- ✅ English (en)
- ✅ Russian (ru)
- ✅ Polish (pl)
- ✅ Korean (ko)
- ✅ Japanese (ja)
- ✅ Spanish (es)
- ✅ Arabic (ar)
- ✅ German (de)
- ✅ Vietnamese (vi)
- ✅ Indonesian (id)

## 🚀 **You're All Set!**

Once configured, your Viking Rise Compendium will have:
- 🌍 **Real-time translation** for all text
- 💾 **Smart caching** for better performance
- 🆓 **Free usage** up to 500k characters/month
- ⚡ **Fast and reliable** Google Translate quality

Enjoy your multilingual Viking Rise Compendium! 🛡️⚔️
