import acorn from "../../../type/type"
import { parse, Out } from "../.."
/**
 * @module python
 * @param {acorn.Node} codes
 * @returns {acorn.OUT} 変換結果を出力
 */
export default function ruby ( codes: acorn.Node, mode: string, option: acorn.OUTOPTION = { optimisation: false } ): acorn.OUT
{
    let out: acorn.OUT = Out.clean( { mode, option } );
    return (
        parse( {
            codes, out, conversion: {
                Function: {
                    Literal: ( data: string ): string => `puts(${ data });`,
                    BinaryExpression: ( data: string[] ): string => `puts(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] });`,
                    Function: ( data: string[] ): string => `def ${ data[ 0 ] }(${ data[ 1 ] }) ${ data[ 2 ] } return ${ data[ 3 ] } end\n`,
                    VariableDeclaration: ( data ): string => `${ data[ 0 ] }=${ data[ 1 ] };`,
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };` }
                },
                Print: {
                    Literal: ( data: string ): string => `puts(${ data })\n`,
                    FunIdentifier: ( data: string[] ): string => `puts(${ data[ 0 ] }(${ data[ 1 ] }))\n`,
                    Identifier: ( data: string ): string => `puts(${ data })\n`,
                    BinaryExpression: ( data: string[] ): string => `print(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] })\n`
                },
                Variable: {
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n` }
                },
                IF: ( data: string[] ) =>
                {
                    return `if (${ data[ 0 ] }) ${ data[ 1 ] } end\n`;
                },
                For: ( data ) =>
                {
                    return data[ 2 ]
                }
            }
        } )
    )
}