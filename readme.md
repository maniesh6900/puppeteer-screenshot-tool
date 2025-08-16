# Puppeteer Screenshot Tool

A Node.js application that captures full-page screenshots of websites using Puppeteer.

## Features

- ✅ Headless browser automation
- ✅ Full-page screenshot capture (entire scrollable content)
- ✅ Configurable viewport settings
- ✅ Error handling and logging
- ✅ Network idle detection for complete page loading
- ✅ Clean, commented code following best practices

## Project Structure

```
puppeteer-screenshot-tool/
├── package.json          # Project configuration and dependencies
├── index.js              # Main script file
├── README.md            # This documentation file
└── screenshot.png       # Output screenshot (created after running)
```

## Prerequisites

- Node.js version 16.0.0 or higher
- npm (Node Package Manager)

## Installation & Setup

1. **Create project directory and navigate to it:**

   ```bash
   mkdir puppeteer-screenshot-tool
   cd puppeteer-screenshot-tool
   ```

2. **Copy the project files:**

   - Copy `package.json` and `index.js` files into the project directory

3. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install Puppeteer (~170MB including Chromium browser)

## Usage

### Basic Usage

Run the script with default settings (captures https://example.com):

```bash
node src/index.js
```

### Customization

To capture a different website, edit the `CONFIG` object in `index.js`:

```javascript
const CONFIG = {
  // Change this URL to your target website
  targetUrl: "https://your-target-website.com",

  // Output file path (relative to project root)
  outputPath: path.join(__dirname, "screenshot.png"),

  // Browser viewport settings
  viewport: {
    width: 1920,
    height: 1080,
  },

  // Page load timeout (milliseconds)
  timeout: 30000,
};
```

## Script Features

### Robust Page Loading

- Waits for `networkidle0` (no network requests for 500ms)
- Additional 2-second buffer for dynamic content
- Configurable timeout settings

### Full-Page Capture

- Captures entire scrollable page content
- Not limited to viewport dimensions
- High-quality PNG output

### Error Handling

- Comprehensive error logging
- Timeout detection
- Network error handling
- Graceful browser cleanup

### Browser Configuration

- Headless mode for server environments
- Security flags for containerized environments
- Custom user agent to avoid bot detection

## Output

The script generates:

- `screenshot.png` - Full-page screenshot in the project directory
- Console logs showing progress and file details

## Example Console Output

```
🚀 Starting screenshot capture process...
📍 Target URL: https://example.com
🌐 Launching headless browser...
📄 Navigating to target website...
⏳ Waiting for page to fully load...
📸 Capturing full-page screenshot...
✅ Screenshot captured successfully!
📁 File path: /path/to/project/screenshot.png
📏 File size: 45.67 KB
🔒 Closing browser...
🎉 Process completed successfully!
```

## Troubleshooting

### Common Issues

1. **Installation fails:**

   - Ensure Node.js version ≥16.0.0
   - Try: `npm cache clean --force` then `npm install`

2. **Screenshot is blank or incomplete:**

   - Increase timeout in CONFIG
   - Check if website blocks headless browsers
   - Try different user agent strings

3. **Memory issues:**
   - The script properly closes browser instances
   - For repeated use, consider implementing browser reuse

### Error Messages

- `TimeoutError`: Page took too long to load - increase timeout value
- `ENOTFOUND`: Network connectivity issue or invalid URL
- Permission errors: Check file system permissions for output directory

## Dependencies

- **puppeteer**: ^21.0.0 - Web scraping and browser automation

## Performance Notes

- First run downloads Chromium (~170MB)
- Subsequent runs are faster
- Full-page screenshots may take longer for content-heavy sites
- Memory usage scales with page complexity

## License

MIT License - Feel free to modify and distribute.
