const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

/**
 * Screenshot configuration
 */
const CONFIG = {
  // Target website URL
  targetUrl: 'https://news.google.com/home',
  
  // Screenshot output path
  outputPath: path.join(__dirname, 'ss/screenshot.png'),
  
  // Browser viewport settings
  viewport: {
    width: 1920, 
    height: 1080, 
  },
  // Page load timeout (ms)
  timeout: 30000,
};

/**
 * Main function to capture full-page screenshot
 */
async function captureFullPageScreenshot() {
  let browser;
  
  try {
    console.log('Starting screenshot capture process...');
    console.log(`Target URL: ${CONFIG.targetUrl}`);
    
    // Launch headless browser
    console.log('Launching headless browser...');
    browser = await puppeteer.launch({
      headless: 'new', // Use new headless mode
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });
    
    // Create new page
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport(CONFIG.viewport);
    
    // Set user agent to avoid bot detection 
    // please note that user agent version may change over time
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.7258.67 Safari/537.36');
    
    // Navigate to target URL
    console.log('Navigating to target website...');
    await page.goto(CONFIG.targetUrl, {
      waitUntil: 'networkidle0', // Wait until network is idle
      timeout: CONFIG.timeout,
    });
    
    // Wait for page to fully load and render
    console.log('Waiting for page to fully load...');
    
    // Capture full-page screenshot
    console.log('Capturing full-page screenshot...');
    
    await page.screenshot({
      path: CONFIG.outputPath,
      fullPage: true, // Capture entire scrollable page
      type: 'png', // Only applies to JPEG.
      // quality method is not used for 
    });
    
    
    console.log('Screenshot captured successfully!');
    console.log(`File path: ${CONFIG.outputPath}`);
    console.log(`File size: ${fileSizeKB} KB`);
    
  } catch (error) {
    console.error('Error capturing screenshot:', error.message);
    
    // Log additional error details for debugging
    if (error.name === 'TimeoutError') {
      console.error('Timeout occurred - the page took too long to load');
    } else if (error.code === 'ENOTFOUND') {
      console.error('Network error - unable to reach the target URL');
    }
    
    throw error;
    
  } finally {
    // Always close browser to free resources
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}

/**
 * Utility function to validate URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    // Validate target URL
    if (!isValidUrl(CONFIG.targetUrl)) {
      throw new Error(`Invalid URL: ${CONFIG.targetUrl}`);
    }
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(CONFIG.outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Start screenshot capture
    await captureFullPageScreenshot();
    
    console.log('🎉 Process completed successfully!');
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Execute main function if this file is run directly

  main();


// Export for potential use as module
// module.exports = {
//   captureFullPageScreenshot,
//   CONFIG,
// };