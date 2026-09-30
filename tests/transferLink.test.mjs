import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const module = { exports: {} };
const output = ts.transpileModule(fs.readFileSync(new URL('../src/utils/transferLink.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
new Function('exports','module',output)(module.exports,module);
const {parseTransferLandingPath,transferNativeUrl} = module.exports;
const id = '12345678-1234-1234-1234-123456789abc';
test('public landing route produces the existing mobile native scheme',()=>{
 assert.equal(parseTransferLandingPath('/transfer/'+id),id);
 assert.equal(parseTransferLandingPath('/transfer/'+id.toUpperCase()+'/'),id);
 assert.equal(transferNativeUrl(id),'hflsoccerapp://transfers/'+id);
});
test('invalid paths, extra parameters and injected decisions are rejected',()=>{
 for(const path of ['/transfer/../admin','/transfer/invalid','/transfer/'+id+'/approve','/transfer/'+id+'?token=secret','https://attacker.test/transfer/'+id]) assert.equal(parseTransferLandingPath(path),null);
 for(const value of ['invalid',id+'?approved=true',id+'#token',id+'/approve']) assert.equal(transferNativeUrl(value),null);
});
