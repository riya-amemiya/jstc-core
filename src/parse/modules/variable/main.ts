import acorn from "../../../../type/type"
import chalk from "chalk"
/**
 * @module Variable
 * @returns { out: acorn.OUT}
 * @returns {varible: string[]}
 */
export default ( code: acorn.Body3 | acorn.Body, out: acorn.OUT, conversion: { Kind: { let: ( data: string[] ) => string, const: ( data: string[] ) => string } } ): { out: acorn.OUT; varible: string[] } =>
{
    let varible: string[] = [ "" ]
    if ( code.declarations[ 0 ].type === "VariableDeclarator" )
    {
        let raw = ""
        if ( code.declarations[ 0 ].init.type == "Literal" )
        {
            raw = code.declarations[ 0 ].init.raw
        }
        if ( code.declarations[ 0 ].init.type == "Identifier" )
        {
            if ( out.cash.Identifier.findIndex( n => n.name === code.declarations[ 0 ].init.name ) !== -1 )
            {
                if ( out.cash.Identifier.findIndex( n => n.to === code.declarations[ 0 ].init.name ) === -1 )
                {
                    raw = code.declarations[ 0 ].init.name.toUpperCase()
                }
                else
                {
                    raw = `_${ code.declarations[ 0 ].init.name.toUpperCase() }`
                }
            } else
            {
                raw = code.declarations[ 0 ].init.name
            }
        }
        if ( code.declarations[ 0 ].init.type == "CallExpression" )
        {
            raw = code.declarations[ 0 ].init.callee.name + "("
            for ( const c of code.declarations[ 0 ].init.arguments )
            {
                if ( c.type == "CallExpression" )
                {
                    if ( out.ast.Function.findIndex( n => n.name === c.callee.name ) === -1 )
                    {
                        console.log( chalk.red( "警告:宣言されていません!" ) );
                    }
                    raw += c.callee.name + "("
                    for ( const d of c.arguments )
                    {
                        if ( d.type == "Literal" )
                        {
                            raw += `${ d.raw },`
                        }
                    }
                    raw = raw.slice( 0, -1 ) + "))"
                }
                if ( c.type == "Literal" )
                {
                    raw += `${ c.raw },`
                }
                raw = raw.slice( 0, -1 ) + ")"
            }
        }
        if ( code.declarations[ 0 ].init.type == "ArrayExpression" )
        {
            raw = "["
            for ( let c of code.declarations[ 0 ].init.elements )
            {
                if ( c.type == "Literal" )
                {
                    raw += `${ c.raw },`
                }
            }
            raw = raw.slice( 0, -1 ) + "]"
        }
        if ( code.declarations[ 0 ].init.type == "ObjectExpression" )
        {
            raw = "{"
            for ( let c of code.declarations[ 0 ].init.properties )
            {
                raw += `"${ c.key.name }": ${ c.value.raw },`
            }
            raw = raw.slice( 0, -1 ) + "}"
        }
        if ( code.kind === "let" || code.kind === "var" )
        {
            varible = [ code.declarations[ 0 ].id.name, raw ]
            out.cash.code += conversion.Kind.let( [ code.declarations[ 0 ].id.name, raw ] )
        }
        else if ( code.kind === "const" )
        {
            if ( out.cash.Identifier.findIndex( n => n.name === code.declarations[ 0 ].id.name ) === -1 )
            {
                if ( out.cash.Identifier.findIndex( n => n.to === code.declarations[ 0 ].id.name.toUpperCase() ) === -1 )
                {
                    varible = [ code.declarations[ 0 ].id.name.toUpperCase(), raw ]
                    out.cash.code += conversion.Kind.const( [ code.declarations[ 0 ].id.name.toUpperCase(), raw ] )
                    out.cash.Identifier.push( { name: code.declarations[ 0 ].id.name, to: code.declarations[ 0 ].id.name.toUpperCase(), value: code.declarations[ 0 ].init.raw, num: 0 } )
                } else
                {
                    varible = [ `_${ code.declarations[ 0 ].id.name }`, raw ]
                    out.cash.code += conversion.Kind.const( [ `_${ code.declarations[ 0 ].id.name }`, raw ] )
                    out.cash.Identifier.push( { name: code.declarations[ 0 ].id.name, to: `_${ code.declarations[ 0 ].id.name }`, value: code.declarations[ 0 ].init.raw, num: 0 } )
                }
            } else
            {
                varible = [ code.declarations[ 0 ].id.name.toUpperCase(), raw ]
                out.cash.code += conversion.Kind.const( [ code.declarations[ 0 ].id.name.toUpperCase(), raw ] )
                out.cash.Identifier.push( { name: code.declarations[ 0 ].id.name, to: code.declarations[ 0 ].id.name.toUpperCase(), value: code.declarations[ 0 ].init.raw, num: 0 } )
            }
        }
    }
    return { out, varible }
}