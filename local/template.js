const fs = require('fs');
const path = require('path');

// Load the template json file
const template = JSON.parse(fs.readFileSync(path.join(__dirname, 'template.json')));
const start_template = JSON.parse(fs.readFileSync(path.join(__dirname, 'start_template.json')));

module.exports = {
    returnTemplate: name => template.filter(t => t._name == name),
    returnTemplates: () => template.map(t => t._name),
    returnStartTemplate: () => start_template,
}
