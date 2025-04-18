/**
 * CLI File Reader - Analyzes text files for word, letter, sentence, line, and paragraph counts
 * @module FileReader
 */

// Import required modules
const fs = require('fs');
const { program } = require('commander');
const prompt = require('prompt-sync')();

// ========================
// PROGRAM CONFIGURATION
// ========================

/**
 * Configure CLI program using Commander
 * Sets name, description, version, and command-line options
 */
program
  .name('cli-file-reader')
  .description('Counts words, letters, sentences, lines, and paragraphs in text files')
  .version('1.0.0')
  .option('-f, --filename <filename>', 'Path to the text file to analyze')
  .parse();

// Get command-line options
const options = program.opts();

// ========================
// FILE INPUT HANDLING
// ========================

// If filename not provided via CLI, prompt user interactively
if (!options.filename) {
  options.filename = prompt('Enter the file path: ');
}

// ========================
// FILE ANALYSIS LOGIC
// ========================

/**
 * Reads and analyzes the specified text file
 * @param {string} filePath - Path to the text file
 */
fs.readFile(options.filename, 'utf8', (err, data) => {
  try {
    if (err) throw err;

    // Display file contents with marker (original requirement)
    console.log(data + " Hello");

    // ========================
    // ANALYSIS METRICS
    // ========================

    // Word count (split by spaces)
    let words = data.split(" ");
    
    // Letter count (all characters including spaces)
    let letters = data.split("");
    
    // Sentence count (split by period+space)
    let sentences = data.split(". ");
    
    // Line count (split by newline)
    let lines = data.split("\n");
    
    // Paragraph count (split by double newline)
    let paragraphs = data.split("\n\n");

    // ========================
    // RESULTS OUTPUT
    // ========================

    console.log("\n📊 Analysis Results:");
    console.log("====================");
    console.log(`📝 Words: ${words.length}`);
    console.log(`🔤 Letters: ${letters.length}`);
    console.log(`💬 Sentences: ${sentences.length}`);
    console.log(`📜 Lines: ${lines.length}`);
    console.log(`📃 Paragraphs: ${paragraphs.length}`);

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
});
