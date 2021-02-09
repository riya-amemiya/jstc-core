import acorn from "../../../../type/type"
const walk = require( "acorn-walk" )
/**
 * @module BinaryExpression
 * @param c
 * @param out
 */
export default ( c: acorn.Body | acorn.Body3, out: acorn.OUT, conversion: { BinaryExpression: ( data: string[] ) => string } ): acorn.OUT =>
{
    let t = { name: "", raw: "" };
    if ( c.expression.arguments[ 0 ].left.type === "Identifier" )
    {
        t.name = c.expression.arguments[ 0 ].left?.name
    }
    if ( c.expression.arguments[ 0 ].right.type === "Identifier" )
    {
        t.raw = c.expression.arguments[ 0 ].right?.name
    }
    if ( c.expression.arguments[ 0 ].right.type === "Literal" )
    {
        t.raw = `${ c.expression.arguments[ 0 ].right?.value }`
    }
    if ( c.expression.arguments[ 0 ].left.type === "Literal" )
    {
        t.name = `${ c.expression.arguments[ 0 ].left?.value }`
    }
    walk?.full( c, ( node: acorn.Argument ) =>
    {

        if ( node.type === "BinaryExpression" )
        {
            if ( node.left.type === "BinaryExpression" )
            {
                if ( node.left.left.type !== 'BinaryExpression' )
                {
                    let left: string | number = node.left.left.value
                    let right: string | number = node.left.right.value
                    if ( node.left.left.type === "Identifie" )
                    {
                        left = node.left.left.name
                    } else if ( node.left.right.type === "Identifie" )
                    {
                        right = node.left.right.name
                    }
                    t.name += `${ left }${ node.left.operator }${ right }`
                } else
                {
                    let right: string | number = node.left.right.value
                    if ( node.left.right.type === "Identifie" )
                    {
                        right = node.left.right.name
                    }
                    t.name += `${ node.left.operator }${ right }`
                }
            }
        }
    } )
    out.cash.code += conversion.BinaryExpression( [ t.name, c.expression.arguments[ 0 ].operator, t.raw ] )
    return (
        out
    );
}