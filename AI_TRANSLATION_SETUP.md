# Simple AI Translation Setup

## Quick Setup

1. **Get OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create account or sign in
   - Generate new API key (starts with `sk-`)

2. **Add API Key**
   - Create `.env.local` file in project root:
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Restart Server**
   ```bash
   npm run dev
   ```

## How It Works

- **Language Switcher**: Top-right corner dropdown
- **10 Languages**: English, Russian, Polish, Korean, Japanese, Spanish, Arabic, German, Vietnamese, Indonesian
- **AI Translation**: Uses OpenAI GPT-3.5-turbo for all translations
- **Automatic**: Translates ALL text on the website
- **Future-Proof**: Any new content automatically gets translated

## Features

✅ **Simple & Clean**: No complex detection logic  
✅ **Reliable**: Direct AI translation with caching  
✅ **Fast**: Cached translations for performance  
✅ **Complete**: Translates every piece of text  
✅ **Responsive**: Works on all pages and components  

## Cost Estimate

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **Typical page**: ~$0.01-0.05 per translation
- **Monthly**: $5-20 depending on usage

## Troubleshooting

- **No translation**: Check API key in `.env.local`
- **Slow translation**: Normal for first-time (cached after)
- **Partial translation**: Some text may fail - original preserved
