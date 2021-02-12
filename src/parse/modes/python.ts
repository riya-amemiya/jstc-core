import acorn from "../../../type/type"
import Modes from './modes';
/**
 * @module python
 * @param {acorn.Node} codes
 * @returns {acorn.OUT} 変換結果を出力
 */
/*function python ( codes: acorn.Node, mode: string, option: acorn.OUTOPTION = { optimisation: false } ): acorn.OUT
{
    let out: acorn.OUT = Out.clean( { mode, option } );
    return (
        parse( {
            codes, out, conversion: {
                Function: {
                    Literal: ( data: string ): string => `print(${ data });`,
                    BinaryExpression: ( data: string[] ): string => `print(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] });`,
                    Function: ( data: string[] ): string => `def ${ data[ 0 ] }(${ data[ 1 ] }): ${ data[ 2 ] } return ${ data[ 3 ] }\n`,
                    VariableDeclaration: ( data ): string => `${ data[ 0 ] }=${ data[ 1 ] };`,
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };` }
                },
                Print: {
                    Literal: ( data: string ): string => `print(${ data })\n`,
                    FunIdentifier: ( data: string[] ): string => `print(${ data[ 0 ] }(${ data[ 1 ] }))\n`,
                    Identifier: ( data: string ): string => `print(${ data })\n`,
                    BinaryExpression: ( data: string[] ): string => `print(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] })\n`
                },
                Variable: {
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n` }
                },
                IF: ( data: string[] ) =>
                {
                    return `if (${ data[ 0 ] }): ${ data[ 1 ] }\n`;
                },
                For: ( data ) =>
                {
                    return `for ${ data[ 0 ][ 0 ] } in range(${ data[ 1 ][ 1 ] }):\n\tif(${ data[ 0 ][ 0 ] }+${ data[ 0 ][ 1 ] }${ data[ 1 ][ 2 ] }${ data[ 1 ][ 1 ] }):\n\t\tprint(${ data[ 0 ][ 0 ] }+${ data[ 0 ][ 1 ] });\n`
                }
            }
        } )
    )
}*/
export default class Python extends Modes
{
    constructor ( { codes, option, mode }: { codes: acorn.Node; option: acorn.OUTOPTION; mode: string; } )
    {
        super( {
            codes, option,
            conversion:
            {
                Function: {
                    Literal: ( data: string ): string => `print(${ data });`,
                    BinaryExpression: ( data: string[] ): string => `print(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] });`,
                    Function: ( data: string[] ): string => `def ${ data[ 0 ] }(${ data[ 1 ] }): ${ data[ 2 ] } return ${ data[ 3 ] }\n`,
                    VariableDeclaration: ( data: [ string, number ] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`,
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };` }
                },
                Print: {
                    Literal: ( data: string ): string => `print(${ data })\n`,
                    FunIdentifier: ( data: string[] ): string => `print(${ data[ 0 ] }(${ data[ 1 ] }))\n`,
                    Identifier: ( data: string ): string => `print(${ data })\n`,
                    BinaryExpression: ( data: string[] ): string => `print(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] })\n`
                },
                Variable: {
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n` }
                },
                IF: ( data: string[] ) =>
                {
                    return `if (${ data[ 0 ] }): ${ data[ 1 ] }\n`;
                },
                For: ( data: [ [ string, string ], [ string, string, string ], string ] ) =>
                {
                    return `for ${ data[ 0 ][ 0 ] } in range(${ data[ 1 ][ 1 ] }):\n\tif(${ data[ 0 ][ 0 ] }+${ data[ 0 ][ 1 ] }${ data[ 1 ][ 2 ] }${ data[ 1 ][ 1 ] }):\n\t\tprint(${ data[ 0 ][ 0 ] }+${ data[ 0 ][ 1 ] });\n`
                }
            }, mode
        } );
    }
}
