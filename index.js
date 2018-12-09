const path = require("path");
const program = require("commander");

program.on("--help", () => {
  console.log("\nExamples:");
  console.log(`  $ ${program._name} -f data.example.com`);
  console.log(
    `  $ ${program._name} -f data.example.com -g "Test Family Secret Santa"`
  );
});

program
  .name("secret-santa")
  .version(require("./package.json").version)
  .usage("[-f|--filename] <filename> [--group <group>]")
  .option("-f --filename <filename>", "Data file for gift group. Required")
  .option(
    "-g --group <group>",
    'Name of the gift group. Defaults to "Secret Santa"'
  )
  .parse(process.argv);

if (typeof program.filename === "undefined") {
  console.error("You must provide a data filename\n");
  program.outputHelp();
  process.exit(1);
}

let data;
try {
  data = require(path.join(__dirname, program.filename));
} catch (err) {
  console.error(`Failed to load data file "${program.filename}"\n`);
  program.outputHelp();
  process.exit(1);
}

const resolveGifters = require("./lib/resolve-gifters");
const sendMessage = require("./lib/send-message");
const groupName = program.group || "Secret Santa";

resolveGifters(data)
  .then(giftMappings =>
    Promise.all(
      giftMappings.map(mapping =>
        sendMessage(mapping.from, mapping.to, groupName)
      )
    )
  )
  .then(() => console.log("Finished!"))
  .catch(error => console.error(`Error: ${error.message}`));
