import acorn from "../../../../type/type"
import { variable, Out } from '../../../index';
export default (
    code: acorn.Body3 | acorn.Body,
    out: acorn.OUT,
    conversion: {
        For: ( data: [ [ string, string ], [ string, string, string ], string ] ) => string
        Kind: {
            let: ( data: string[] ) => string
            const: ( data: string[] ) => string
        }
    }
): acorn.OUT =>
{
    out.cash = Out.cleanCash( out )
    let varible: string[] = [ "" ]
    let t = { name: "", raw: "" };
    if ( code.init.declarations[ 0 ].type == "VariableDeclarator" )
    {
        ( { out, varible } = variable( code.init, out, { Kind: conversion.Kind } ) )
    }
    if ( code.test.type === "BinaryExpression" )
    {
        if ( code.test.left.type === "Identifier" )
        {
            t.name = code.test.left?.name
        }
        if ( code.test.right.type === "Identifier" )
        {
            t.raw = code.test.right?.name
        }
        if ( code.test.right.type === "Literal" )
        {
            t.raw = `${ code.test.right?.value }`
        }
        if ( code.test.left.type === "Literal" )
        {
            t.name = `${ code.test.left?.value }`
        }
    }
    if ( code.update.type === "UpdateExpression" )
    {
        out.cash.return = `${ code.update.argument.name }${ code.update.operator }`
    }
    out.code += conversion.For( [ [ varible[ 0 ], varible[ 1 ] ], [ t.name, t.raw, code.test.operator ], out.cash.return ] )
    return out
}
