import fs from 'fs'
import variable from "./parse/modules/variable/main"
import print from "./parse/modules/print/main"
import Function from "./parse/modules/function/main"
import IF from "./parse/modules/if/main"
import Binary from "./parse/modules/Binary/main"
import parse from './parse/parse';
import For from "./parse/modules/for/main"
import { Out } from "./parse/out"
import python from './parse/modes/python';
import ruby from './parse/modes/ruby';
/**
     *
     * @module check
     * @param {string} file
     * ファイルがあるかチェック
     * @returns {boolean} あったらtureなかったらfalse
     */
function check ( file: string ): boolean
{
    let hasfaile = false;
    try
    {
        fs.statSync( file );
        hasfaile = true;
    } catch ( err )
    {
        hasfaile = false;
    }
    return hasfaile;
}
/**
 *
 * @module read
 * @param {string} file
 * @returns {string} 読み込んだ結果をstringで返す
 */
function read ( file: string ): string
{
    if ( check( file ) )
    {
        return fs.readFileSync( file, 'utf8' );
    }
    return "";
}

export
{
    check,
    read,
    python,
    variable,
    print,
    Function,
    ruby,
    IF,
    parse,
    Out,
    Binary,
    For
}