#! /usr/bin/env node
import { Command } from 'commander'
const program = new Command();
import create from '../command/create';

// 创建文件命令
program
  .command('create')
  .action((name: string, options: any) => {
    create()
  })
  console.log('asdasd');
  