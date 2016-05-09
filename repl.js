#!/usr/bin/env node

const vm = require('vm');

process.stdin.resume();

let exit = false;

const cursor = () => process.stdout.write("> ");

cursor();
process.stdin.on("data", (data) => {
	exit = false;
	if (data.toString().trim() === ".exit") process.exit();
	process.stdout.write(JSON.stringify(vm.runInThisContext(data.toString()), null, 2) + "\n");
	cursor();
});

process.on('SIGINT', function() {
	if (exit) process.exit();
    process.stdout.write(`\n(To exit, press ^C again or type .exit)\n`);
    exit = true;
    cursor();
});

process.on("uncaughtException", (e)=>{
	console.log(e.stack);
	cursor();
});