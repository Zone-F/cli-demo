#! /usr/bin/env node
"use strict";
import { Command } from "commander";
const program = new Command();
import create from "../command/create";
program.command("create").action((name, options) => {
  create();
});
