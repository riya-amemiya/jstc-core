import acorn from "../../../../type/type"
/**
 * @module BinaryExpression
 * @param c
 * @param out
 */
export default ( c: acorn.Body, out: acorn.OUT, conversion: { BinaryExpression: ( data: string[] ) => string } ): acorn.OUT =>
{
    let t = { name: "", raw: "" };
    if ( c.expression.arguments[ 0 ].left.type === "Identifier" )
    {
        t.name = c.expression.arguments[ 0 ].left?.name
    }
    else if ( c.expression.arguments[ 0 ].right.type === "Identifier" )
    {
        t.name = c.expression.arguments[ 0 ].right?.name
    }
    if ( c.expression.arguments[ 0 ].right.type === "Literal" )
    {
        t.raw = `"${ c.expression.arguments[ 0 ].right?.value }"`
    }
    else if ( c.expression.arguments[ 0 ].left.type === "Literal" )
    {
        t.raw = `"${ c.expression.arguments[ 0 ].left?.value }"`
    }
    out.cash.code += conversion.BinaryExpression( [ t.name, c.expression.arguments[ 0 ].operator, t.raw ] )
    return (
        out
    );
}